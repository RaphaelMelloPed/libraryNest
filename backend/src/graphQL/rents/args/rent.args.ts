import { ArgsType, Field } from '@nestjs/graphql';
import { CreateRentInput } from '../input/rent.input';

@ArgsType()
export class CreateRentArgs {
  @Field()
  data: CreateRentInput;
}
