import { CreateAuthorDto } from '../../dto/create-author.dto';
import { AuthorEntity } from '../../entities/author.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from '../../authors.service';
import { NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { faker } from '@faker-js/faker';


const mockAuthorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('AuthorsService', () => {
    let service: AuthorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthorsService,
                { provide: 'AuthorEntityRepository', useValue: mockAuthorRepository },
            ],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
    });

    describe('create', () => {
        it('should create a new author', async () => {
            const createAuthorDto: CreateAuthorDto = { name: faker.person.firstName() };

            const mockAuthor: AuthorEntity = { id: 1, ...createAuthorDto };


            mockAuthorRepository.findOne.mockResolvedValueOnce(null);
            mockAuthorRepository.create.mockReturnValueOnce(mockAuthor);
            mockAuthorRepository.save.mockResolvedValueOnce(mockAuthor);

            const result = await service.create(createAuthorDto);

            expect(result).toEqual(mockAuthor);
        });

        it('should return "This author already exist" if author already exists', async () => {
            const createAuthorDto: CreateAuthorDto = { name: faker.person.firstName() };

            mockAuthorRepository.findOne.mockResolvedValueOnce({});

            const result = await service.create(createAuthorDto);

            console.log(result)

            expect(result).toEqual('This author already exist');
        });
    });

    describe('findAll', () => {
        it('Should return all authors', async () => {
            const mockAuthor: AuthorEntity[] = [
                { id: 1, name: faker.person.firstName() },
                { id: 2, name: faker.person.firstName() },
            ]

            mockAuthorRepository.find.mockResolvedValueOnce(mockAuthor)

            const result = await service.findAll();

            expect(result).toEqual(mockAuthor);
        })
    })

    describe('findOne', () => {
        it('Should return one Author', async () => {
            const mockAuthor: AuthorEntity = { id: 1, name: faker.person.firstName() }

            mockAuthorRepository.findOne.mockResolvedValue(mockAuthor)

            const result = await service.findOne(1);

            expect(result).toEqual(mockAuthor);

        })
        it('should throw NotFoundException if author with the specified ID is not found', async () => {
            mockAuthorRepository.findOne.mockResolvedValueOnce(null);
            const invalidId = faker.number.int();
            await expect(service.findOne(invalidId)).rejects.toThrow(NotFoundException);
        });

        describe('update', () => {
            it('should update the author with the specified ID and return the updated author', async () => {
                const existingAuthor: AuthorEntity = { id: 1, name: faker.person.firstName() };

                const updatedAuthor: AuthorEntity = { id: 1, name: faker.person.firstName() };

                mockAuthorRepository.findOne.mockResolvedValueOnce(existingAuthor);

                mockAuthorRepository.update.mockResolvedValueOnce({});

                mockAuthorRepository.findOne.mockResolvedValueOnce(updatedAuthor);

                const result = await service.update(1, { name: faker.person.firstName() });

                expect(result).toEqual(updatedAuthor);
            });

            it('should throw NotFoundException if author with the specified ID is not found', async () => {
                mockAuthorRepository.findOne.mockResolvedValueOnce(null);

                const invalidId = faker.number.int();

                await expect(service.update(invalidId, { name: faker.person.firstName() })).rejects.toThrow(NotFoundException);
            });
        });

        describe('remove', () => {
            it('should remove the author with the specified ID and return the deletion information', async () => {
                const existingAuthor: AuthorEntity = { id: 1, name: faker.person.firstName() };

                const deleteInfo = { affected: 1 };

                mockAuthorRepository.findOne.mockResolvedValueOnce(existingAuthor);

                mockAuthorRepository.delete.mockResolvedValueOnce(deleteInfo);
                const result = await service.remove(1);
                expect(result).toEqual(deleteInfo);
            });

            it('should throw NotFoundException if author with the specified ID is not found', async () => {
                mockAuthorRepository.findOne.mockResolvedValueOnce(null);


                const invalidId = faker.number.int();

                await expect(service.remove(invalidId)).rejects.toThrow(NotFoundException);
            });
        });


    })
});