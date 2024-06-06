import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewResolver } from 'src/graphQL/reviews/resolver/review.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    UsersModule,
    BooksModule
],
  providers: [ReviewsService, ReviewResolver],
})
export class ReviewsModule { }