import { ArgsType, Field } from '@nestjs/graphql';
import { CreateReviewInput } from '../input/review.input';

@ArgsType()
export class CreateReviewArgs {
  @Field()
  data: CreateReviewInput;
}