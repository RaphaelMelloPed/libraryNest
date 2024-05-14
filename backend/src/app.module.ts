import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { RentsModule } from './rents/rents.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AuthorsModule } from './authors/authors.module';
import { RentEntity } from './rents/entities/rent.entity';
import { BookEntity } from './books/entities/book.entity';
import { UserEntity } from './users/entities/user.entity';
import { ReviewEntity } from './reviews/entities/review.entity';
import { AuthorEntity } from './authors/entities/author.entity';
import { CategoriesModule } from './categories/categories.module';
import { CategoryEntity } from './categories/entities/category.entity';

@Module({
  imports: [
    CategoriesModule,
    BooksModule,
    AuthorsModule,
    RentsModule,
    ReviewsModule,
    UsersModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: parseInt(process.env.PMA_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [
        AuthorEntity,
        BookEntity,
        CategoryEntity,
        RentEntity,
        ReviewEntity,
        UserEntity,
      ],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
