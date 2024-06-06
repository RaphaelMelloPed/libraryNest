import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService} from 'src/reviews/reviews.service'
import { ReviewType } from '../type/review.type';
import { CreateReviewInput } from '../input/review.input';
import { SoftDeleteReviewInput } from '../input/softDeleteReview.input';

@Resolver('Review')
export class ReviewResolver {
  constructor(
    private readonly ReviewsService: ReviewsService,
  ) {}

  @Query(() => [ReviewType])
  async reviews() {
    return this.ReviewsService.findAll();
  }

  @Query(() => ReviewType)
  async review(@Args('id') id: number) {
    return this.ReviewsService.findOne(id);
  }

  @Mutation(() => ReviewType)
  async createReview(@Args('data') data: CreateReviewInput) {
    const book = await this.ReviewsService.create({ ...data });
    return book;
  }

  @Mutation(() => ReviewType)
  async updatereview(
    @Args('id') id: number,
    @Args('input') input: CreateReviewInput,
  ) {
    return this.ReviewsService.update(+id, { ...input });
  }

  @Mutation(() => ReviewType)
  async removeBook(@Args('id') id: number) {
    return this.ReviewsService.remove(+id);
  }

  @Mutation(() => ReviewType)
  async softDeleteBook(@Args('id') id: number) {
    return this.ReviewsService.softDelete(id);
  }
}
