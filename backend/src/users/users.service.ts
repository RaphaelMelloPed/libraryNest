import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from 'src/graphQL/users/input/user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
const salts = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create({ email, name, password, image }: CreateUserInput) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: email },
    });

    if (existingUser) {
      return 'User already exist';
    }

    password = await bcrypt.hash(password, salts);

    const newUser = await this.usersRepository.create({
      email,
      name,
      password,
      image,
    });

    return await this.usersRepository.save(newUser);
  }

  async findAll() {
    const allUsers = await this.usersRepository.find();

    if (!allUsers) {
      throw new NotFoundException('We do not have any users yet');
    }

    return allUsers;
  }

  async findOne(id: number) {
    const findUser = await this.usersRepository.findOne({ where: { id } });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    return findUser;
  }

  async update(id: number, data: CreateUserInput) {
    const findUser = await this.usersRepository.findOne({ where: { id } });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(data.password, salts);

    const updatedUserData = {
      ...data,
      password: hashedPassword,
    };

    await this.usersRepository.update(id, updatedUserData);

    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    return updatedUser;
  }

  async remove(id: number) {
    const findUser = await this.usersRepository.findOne({ where: { id } });

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const deleteUser = await this.usersRepository.delete({ id });

    return deleteUser;
  }
}
