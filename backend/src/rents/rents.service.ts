import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class RentsService {
  constructor(
    @InjectRepository(RentEntity)
    private rentRepository: Repository<RentEntity>,
    private readonly BooksService: BooksService,
    private readonly usersService: UsersService,
  ) {}

  async create({
    pick_up_date,
    returns_date,
    user_id,
    book_id,
  }: CreateRentDto) {
    const book = await this.BooksService.findOne(book_id);
    const user = await this.BooksService.findOne(user_id);

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
    await this.BooksService.update(book_id, { quantity: book.quantity });

    const newRent = this.rentRepository.create({
      pick_up_date,
      returns_date,
      book: { id: book_id },
      user: { id: user_id },
    });

    return await this.rentRepository.save(newRent);
  }

  async findAll() {
    const allRents = await this.rentRepository.find()

    if(!allRents){
      throw new NotFoundException('There are no rents')
    }

    return allRents;
  }

  async findOneRent(id: number) {
    const findRents = await this.rentRepository.findOne({where: {id}})


    if (!findRents) {
      throw new NotFoundException(`Rent not found`);
    }

    const oneAuthor = await this.rentRepository.find({
      where: { id },
      relations: ['book', 'user']
    });

    return oneAuthor;
  }

  async findOne(id: number) {
    const allRents = await this.rentRepository.find({ relations: ['book', 'user'] })
    const rentsWithMatchingBookId = allRents.filter(rents => rents.user.id == id);

    if (rentsWithMatchingBookId.length == 0) {
      throw new NotFoundException(`No reviews found for book with ID ${id}`);
    }

    return rentsWithMatchingBookId;

  }

  async update(id: number, data: UpdateRentDto) {

    const findRents = await this.rentRepository.findOne({where: {id}})


    if (!findRents) {
      throw new NotFoundException(`Rent not found`);
    }

    const updateBook = await this.rentRepository.update(id, data);


    return updateBook;
  }

  async remove(id: number) {

    const findRents = await this.rentRepository.findOne({ where: { id }, relations: ['book'] })

    if (findRents.book.quantity > 0) {
      findRents.book.quantity += 1;
      await this.BooksService.update(findRents.book.id, { quantity: findRents.book.quantity });

    } else {
      throw new BadRequestException(`Book is not available for rent`);
    }

    await this.rentRepository.delete({ id });


    return { message: `Rent successfully deleted` };
  }
}
