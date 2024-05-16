import { IsInt, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateRentDto {
  @IsNotEmpty()
  @IsDateString()
  pick_up_date: string;

  @IsNotEmpty()
  @IsDateString()
  returns_date: string;

  @IsInt()
  @IsNotEmpty()
  user_id: number

  @IsInt()
  @IsNotEmpty()
  book_id: number
}
