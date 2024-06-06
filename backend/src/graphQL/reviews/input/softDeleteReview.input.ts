import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SoftDeleteReviewInput {
  @Field(() => ID)
  id: number;
}