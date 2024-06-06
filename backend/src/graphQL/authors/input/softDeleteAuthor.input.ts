import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SoftDeleteAuthorInput {
  @Field()
  id: number;
}
