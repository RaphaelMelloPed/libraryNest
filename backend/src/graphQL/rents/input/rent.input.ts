import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRentInput {
  @Field()
  @IsNotEmpty()
  pick_up_date: string;

  @Field()
  @IsNotEmpty()
  returns_date: string;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  user_id?: number;

  @Field({ nullable: true })
  @IsInt()
  @IsOptional()
  book_id?: number;
}
