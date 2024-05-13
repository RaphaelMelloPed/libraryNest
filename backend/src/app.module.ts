import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { RentsModule } from './rents/rents.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CategoriesModule, BooksModule, AuthorsModule, RentsModule, ReviewsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
