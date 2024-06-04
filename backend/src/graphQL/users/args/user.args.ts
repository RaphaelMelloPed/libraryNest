import { ArgsType, Field } from '@nestjs/graphql';
import { CreateUserInput } from '../input/user.input';

@ArgsType()
export class CreateUserArgs {
  @Field()
  data: CreateUserInput;
}