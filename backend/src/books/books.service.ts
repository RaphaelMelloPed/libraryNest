import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from 'src/authors/authors.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private readonly categoryService: CategoriesService,
    private readonly authorService: AuthorsService,
  ) {}

  async create({
    name,
    description,
    quantity,
    image,
    category_id,
    author_id,
  }: CreateBookDto) {
    const existingBook = await this.bookRepository.findOne({
      where: { name: name },
    });

    if (existingBook) {
      return 'This book already exist';
    }

    await this.authorService.findOne(author_id);
    
    await this.categoryService.findOne(category_id);
    
    const newBook = this.bookRepository.create({
      name,
      description,
      quantity,
      image,
      author: {id: author_id},
      category: {id: category_id},
    });
    return await this.bookRepository.save(newBook);
  }

  async findAll() {
    const allBooks = await this.bookRepository.find({ relations: ['category', 'author'] })

    if(!allBooks){
      throw new NotFoundException('No books found')
    }

    return allBooks;
  }

  async findOne(id: number) {

    const findBook = await this.bookRepository.findOne({ where: { id } });

    if (!findBook) {
      throw new NotFoundException('Book not found');
    }

    const oneBook = await this.bookRepository.findOne({ where: { id }, relations: ['category', 'author'] })

    return oneBook;
  }

  async update(id: number, data: UpdateBookDto) {
    const findBook = await this.bookRepository.findOne({ where: { id } });

    if (!findBook) {
      throw new NotFoundException('Book not found');
    }

    const updateBook = await this.bookRepository.update(id, data);

    return updateBook;
  }

  async remove(id: number) {
    const findBook = await this.bookRepository.findOne({ where: { id } });

    if (!findBook) {
      throw new NotFoundException('Book not found');
    }

    const deleteBook = await this.bookRepository.delete({ id });

    return deleteBook;
  }
}
