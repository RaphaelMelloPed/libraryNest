import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { validate } from 'class-validator';
import { UserEntity } from '../../entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'UserEntityRepository', useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('Should create a user', async () => {
      const data: CreateUserDto = {
        email: faker.internet.email(),
        password: 'teste123',
        name: faker.internet.userName(),
        image: faker.image.url(),
      };

      const mockUser: UserEntity = { id: 1, ...data, admin: 0 };

      mockUserRepository.findOne.mockResolvedValueOnce(null);
      mockUserRepository.create.mockReturnValueOnce(mockUser);
      mockUserRepository.save.mockResolvedValueOnce(mockUser);

      const result = await service.create(data);

      expect(result).toEqual(mockUser);
    });
  });
});
