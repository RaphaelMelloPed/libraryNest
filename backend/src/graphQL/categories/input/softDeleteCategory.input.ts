import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class SoftDeleteCategoryInput {
  @Field(() => Int)
  id: number;
}
