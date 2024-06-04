// import { Module } from '@nestjs/common';
// import { BooksService } from './books.service';
// import { BooksController } from './books.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { BookEntity } from './entities/book.entity';
// import { CloudinaryModule } from '../cloudinary/cloudinary.module';
// import { AuthorsModule } from '../authors/authors.module';
// import { CategoriesModule } from '../categories/categories.module';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([BookEntity]),
//     CloudinaryModule,
//     AuthorsModule,
//     CategoriesModule,
//   ],
//   controllers: [BooksController],
//   providers: [BooksService],
//   exports: [BooksService],
// })
// export class BooksModule {}
