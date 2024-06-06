import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class SoftDeleteBookInput {
  @Field(() => ID)
  id: number;
}
