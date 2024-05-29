import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from '../../reviews.service';
import { ReviewEntity } from '../../entities/review.entity';
import { BooksService } from '../../../books/books.service';
import { UsersService } from '../../../users/users.service';
import { CreateReviewDto } from '../../dto/create-review.dto';
import { AuthorsService } from '../../../authors/authors.service';
import { CategoriesService } from '../../../categories/categories.service';

const mockReviewsRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn().mockImplementation((id) => {
    if (id.where.id == 1) {
      return Promise.resolve(new ReviewEntity());
    }
    return null;
  }),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockBookRepository = {
  findOne: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
};

const mockCategoryRepository = {
  findOne: jest.fn(),
};

const mockAuthorRepository = {
  findOne: jest.fn(),
};

describe('ReviewsService', () => {
  let reviewService: ReviewsService;
  let bookService: BooksService;
  let userService: UsersService;
  let categoryService: CategoriesService;
  let authorService: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        BooksService,
        UsersService,
        CategoriesService,
        AuthorsService,
        { provide: 'ReviewEntityRepository', useValue: mockReviewsRepository },
        { provide: 'BookEntityRepository', useValue: mockBookRepository },
        { provide: 'UserEntityRepository', useValue: mockUserRepository },
        { provide: 'CategoryEntityRepository', useValue: mockCategoryRepository },
        { provide: 'AuthorEntityRepository', useValue: mockAuthorRepository },
      ],
    }).compile();

    reviewService = module.get<ReviewsService>(ReviewsService);
    bookService = module.get<BooksService>(BooksService);
    userService = module.get<UsersService>(UsersService);
    categoryService = module.get<CategoriesService>(CategoriesService);
    authorService = module.get<AuthorsService>(AuthorsService);
  });

  describe('ReviewService test', () => {
    describe('create', () => {
      it('Should create a new review', async () => {
        const data: CreateReviewDto = {
          comment: faker.lorem.text(),
          rating: 5,
          book_id: 1,
          user_id: 1,
        };

        const mockBook: ReviewEntity = {
          id: 1,
          ...data,
          book: {
            id: 1,
            name: faker.person.firstName(),
            image: faker.image.url(),
            description: faker.lorem.text(),
            author: { id: 1, name: faker.person.firstName() },
            category: { id: 1, name: faker.person.firstName() },
            quantity: faker.datatype.number(),
          },

          user: {
            email: faker.internet.email(),
            password: faker.internet.password(),
            name: faker.internet.userName(),
            image: faker.image.url(),
            admin: 0,
            id: 1,
          },
        };

        mockBookRepository.findOne.mockReturnValueOnce(1);
        mockAuthorRepository.findOne.mockReturnValueOnce(1);
        mockUserRepository.findOne.mockReturnValueOnce(1);

        mockReviewsRepository.create.mockReturnValueOnce(mockBook);
        mockReviewsRepository.save.mockResolvedValueOnce(mockBook);

        const result = await reviewService.create(data);

        expect(result).toEqual(mockBook);
      });
    });

    describe('findAll', () => {
      it('Should return all Reviews', () => {
        const mockBooks: ReviewEntity[] = [
          {
            id: 1,
            comment: faker.lorem.text(),
            rating: 5,
            book: {
              id: 1,
              name: faker.person.firstName(),
              image: faker.image.url(),
              description: faker.lorem.text(),
              author: { id: 1, name: faker.person.firstName() },
              category: { id: 1, name: faker.person.firstName() },
              quantity: faker.datatype.number(),
            },
            user: {
              email: faker.internet.email(),
              password: faker.internet.password(),
              name: faker.internet.userName(),

              image: faker.image.url(),
              admin: 0,
              id: 1,
            },
          },
          {
            id: 3,
            comment: faker.lorem.text(),
            rating: 5,
            book: {
              id: 1,
              name: faker.person.firstName(),
              image: faker.image.url(),
              description: faker.lorem.text(),
              author: { id: 1, name: faker.person.firstName() },
              category: { id: 1, name: faker.person.firstName() },
              quantity: faker.datatype.number(),
            },
            user: {
              email: faker.internet.email(),
              password: faker.internet.password(),
              name: faker.internet.userName(),

              image: faker.image.url(),
              admin: 0,
              id: 1,
            },
          },
        ];

        mockReviewsRepository.find.mockReturnValueOnce(mockBooks);
      });
    });

    describe('findOne', () => {
      it('should throw NotFoundException if no reviews are found for the review', async () => {
        const id = null;
        const emptyReviews = [];
        jest.spyOn(mockReviewsRepository, 'find').mockResolvedValue(emptyReviews);

        await expect(reviewService.findOne(null)).rejects.toThrow(
          new NotFoundException(`No reviews found`),
        );
      });

      it('should return reviews if reviews are found for the book', async () => {
        const id = 1;
        const allReviews = [
          { id: 1, book: { id: 1 }, user: { id: 1 } },
          { id: 2, book: { id: 1 }, user: { id: 2 } },
        ];
        jest.spyOn(mockReviewsRepository, 'find').mockResolvedValue(allReviews);

        const result = await reviewService.findOne(id);

        expect(result).toEqual(allReviews);
      });
    });

    describe('remove', () => {
      it('Should remove the review with the specified ID and Return the deletion information', async () => {
        mockReviewsRepository.findOne.mockResolvedValueOnce(1)

        const deleteinfo = { affected: 1 };
        mockReviewsRepository.delete.mockResolvedValueOnce(deleteinfo);

        const result = await reviewService.remove(1)
        expect(result).toEqual(deleteinfo)

      })

      it('should throw NotFoundException if review with the specified ID is not found', async () => {
        mockBookRepository.findOne.mockResolvedValueOnce(null);

        await expect(reviewService.remove(faker.number.int())).rejects.toThrow(NotFoundException);
      });
    })
  });
});