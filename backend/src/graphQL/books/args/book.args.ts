import { ArgsType, Field } from '@nestjs/graphql';
import { CreateBookInput } from '../input/book.input';

@ArgsType()
export class CreateBookArgs {
  @Field()
  data: CreateBookInput;
}