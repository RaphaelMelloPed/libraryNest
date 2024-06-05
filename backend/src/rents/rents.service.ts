import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { CreateRentInput } from 'src/graphQL/rents/input/rent.input';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(RentEntity)
    private rentRepository: Repository<RentEntity>,
    private readonly booksService: BooksService,
    private readonly userService: UsersService
  ) {}

  async create({ pick_up_date, returns_date, user_id, book_id }: CreateRentInput) {
    const book = await this.booksService.findOne(book_id);
    const user = await this.userService.findOne(user_id);

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (book.quantity < 0) {
      throw new BadRequestException(`Book not available for rent`);
    }

    book.quantity -= 1;
    await this.booksService.update(book_id, { quantity: book.quantity });

    const newRent = this.rentRepository.create({
      pick_up_date,
      returns_date,
      book: { id: book_id },
      user: { id: user_id },
    });

    return await this.rentRepository.save(newRent);
  }

  async findAll() {
    const allRents = await this.rentRepository.find({ relations: ['book', 'user'] });

    if (!allRents) {
      throw new NotFoundException('There are no rents');
    }

    return allRents;
  }

  async findOne(id: number) {
    const oneRent = await this.rentRepository.findOne({ where: { id }, relations: ['book', 'user'] });

    if (!oneRent) {
      throw new NotFoundException('Rent not found');
    }

    return oneRent;
  }

  async update(id: number, data: CreateRentInput) {
    const { pick_up_date, returns_date, user_id, book_id } = data;

    const rent = await this.rentRepository.findOne({ where: { id }, relations: ['user', 'book'] });

    if (!rent) {
      throw new NotFoundException(`Rent not found`);
    }

    if (user_id) {
      const user = await this.userService.findOne(user_id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      rent.user = user;
    }

    if (book_id) {
      const book = await this.booksService.findOne(book_id);
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      rent.book = book;
    }

    rent.pick_up_date = pick_up_date;
    rent.returns_date = returns_date;

    await this.rentRepository.save(rent);

    return rent;
  }

  async remove(id: number) {
    const rent = await this.rentRepository.findOne({ where: { id }, relations: ['book', 'user'] });

    if (!rent) {
      throw new NotFoundException('Rent not found');
    }

    if (rent.book.quantity > 0) {
      rent.book.quantity += 1;
      await this.booksService.update(rent.book.id, { quantity: rent.book.quantity });
    } else {
      throw new BadRequestException(`Book is not available for rent`);
    }

    await this.rentRepository.delete({ id });

    return { message: `Rent successfully deleted` };
  }
}
