import { ArgsType, Field } from '@nestjs/graphql';
import { CreateAuthorInput } from '../input/author.input';

@ArgsType()
export class CreateAuthorArgs {
  @Field()
  data: CreateAuthorInput;
}
