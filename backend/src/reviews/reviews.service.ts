import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { CreateReviewInput } from 'src/graphQL/reviews/input/review.input';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<ReviewEntity>,
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  async create({ book_id, rating, user_id, comment }: CreateReviewInput) {
    const user = await this.usersService.findOne(user_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.booksService.findOne(book_id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const newReview = new ReviewEntity();
    newReview.rating = rating;
    newReview.comment = comment;
    newReview.book = book;
    newReview.user = user;

    return await this.reviewsRepository.save(newReview);
  }

  async findAll() {
    return await this.reviewsRepository.find({
      where: { deletedAt: null }, // Alteração aqui
      relations: ['book', 'user'],
    });
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id, deletedAt: null },
      relations: ['book', 'user'],
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    return review;
  }

  async update(id, data: CreateReviewInput) {
    const review = await this.reviewsRepository.findOne(id);

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    Object.assign(review, data);
    await this.reviewsRepository.save(review);

    return review;
  }

  async remove(id) {
    const deleteResult = await this.reviewsRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException('Review not found');
    }

    return { message: 'Review successfully deleted' };
  }

  async softDelete(id) {
    const review = await this.reviewsRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!review) {
      throw new NotFoundException('Review not found');
    }

    review.deletedAt = new Date();
    await this.reviewsRepository.save(review);

    return review;
  }
}
