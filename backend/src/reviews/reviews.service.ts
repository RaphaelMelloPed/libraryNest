import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ReviewEntity } from './entities/review.entity'; // Importe a entidade correta
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
    private readonly bookService: BooksService,
    private readonly userService: UsersService,
  ) {}

  async create({ book_id, rating, user_id, comment }: CreateReviewInput) {
    await this.userService.findOne(user_id);
    await this.bookService.findOne(book_id);

    const existingReview = await this.reviewsRepository.findOne({
      where: { book: { id: book_id }, user: { id: user_id } },
    });

    if (existingReview) {
      throw new BadRequestException('This review already exists');
    }

    const newReview = this.reviewsRepository.create({
      rating,
      comment,
      book: { id: book_id },
      user: { id: user_id },
    });

    return await this.reviewsRepository.save(newReview);
  }

  async findAll() {
    const allReviews = await this.reviewsRepository.find({
      relations: ['book', 'user'],
    });
    return allReviews;
  }

  async findOne(id: number) {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['book', 'user'],
    });
  
    if (!review) {
      throw new NotFoundException('Review not found');
    }
  
    return review;
  }

  async remove(id) {
    const existingReview = await this.reviewsRepository.findOne(id);
    
    if (!existingReview) {
      throw new NotFoundException(`Review not found`);
    }
    
    await this.reviewsRepository.remove(existingReview);
    
    return { message: 'Review successfully deleted' };
  }}
