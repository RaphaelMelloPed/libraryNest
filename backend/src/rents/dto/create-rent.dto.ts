import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  @IsDateString()
  pick_up_date: Date;

  @IsNotEmpty()
  @IsDateString()
  returns_date: Date;

  @IsInt()
  @IsNotEmpty()
  user_id: number

  @IsInt()
  @IsNotEmpty()
  book_id: number
}
