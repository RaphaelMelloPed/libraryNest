import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from 'src/books/books.service';
import { BookType } from '../type/book.type';
import { CreateBookInput } from '../input/book.input';
import { SoftDeleteBookInput } from '../input/softDeleteBook.input';

@Resolver('Book')
export class BookResolver {
  constructor(
    private readonly booksService: BooksService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Query(() => [BookType])
  async books() {
    return this.booksService.findAll();
  }

  @Query(() => BookType)
  async book(@Args('id') id: number) {
    return this.booksService.findOne(id);
  }

  @Mutation(() => BookType)
  async createBook(@Args('data') data: CreateBookInput) {
    try {
      const book = await this.booksService.create({ ...data });

      return book;
    } catch (error) {
      console.error('Error creating book:', error);
      throw error;
    }
  }

  @Mutation(() => BookType)
  async updateBook(
    @Args('id') id: number,
    @Args('input') input: CreateBookInput,
  ) {
    return this.booksService.update(+id, { ...input });
  }

  @Mutation(() => BookType)
  async removeBook(@Args('id') id: number) {
    return this.booksService.remove(+id);
  }

  @Mutation(() => BookType)
  async softDeleteBook(@Args('id') id: number) {
    return this.booksService.softDelete(id);
  }
}
