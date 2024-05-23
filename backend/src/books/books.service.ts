import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorsService } from 'src/authors/authors.service';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private readonly categoryService: CategoriesService,
    private readonly authorService: AuthorsService,
  ) {}

  async create({ name, description, quantity, image, category_id, author_id }: CreateBookDto) {
    const existingBook = await this.bookRepository.findOne({ where: { name } });

    if (existingBook) {
      throw new BadRequestException('This book already exists');
    }

    const author = await this.authorService.findOne(author_id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const category = await this.categoryService.findOne(category_id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const newBook = this.bookRepository.create({
      name,
      description,
      quantity,
      image,
      author,
      category,
    });

    return await this.bookRepository.save(newBook);
  }

  async findAll() {
    const allBooks = await this.bookRepository.find({ relations: ['category', 'author'] });

    if (!allBooks || allBooks.length === 0) {
      throw new NotFoundException('No books found');
    }

    return allBooks;
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['category', 'author'] });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async update(id: number, data: UpdateBookDto) {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['category', 'author'] });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    if (data.author_id) {
      const author = await this.authorService.findOne(data.author_id);
      if (!author) {
        throw new NotFoundException('Author not found');
      }
      book.author = author;
    }

    if (data.category_id) {
      const category = await this.categoryService.findOne(data.category_id);
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      book.category = category;
    }

    Object.assign(book, data);
    await this.bookRepository.save(book);

    return book;
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    await this.bookRepository.delete(id);

    return { message: 'Book successfully deleted' };
  }
}
