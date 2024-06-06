import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, Min, Max, IsString } from 'class-validator';

@InputType()
export class CreateReviewInput {

    @Field()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    rating: number;

    @Field()
    @IsString()
    comment?: string;

    @Field()
    user_id: number;

    @Field()
    book_id: number;
}
