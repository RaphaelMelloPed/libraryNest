import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookResolver } from 'src/graphQL/books/resolver/book.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    CloudinaryModule,
    AuthorsModule,
    CategoriesModule,
  ],
  providers: [BooksService, BookResolver],
  exports: [BooksService],
})
export class BooksModule {}
