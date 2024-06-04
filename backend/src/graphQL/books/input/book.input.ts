import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateBookInput {

    @Field()
    @Length(3)
    @IsString()
    @IsNotEmpty()
    name: string;

    @Field()
    @IsNotEmpty()
    quantity: number;

    @Field()
    @IsUrl()
    image: string;

    @Field()
    @IsString()
    description: string;

    @Field()
    category_id: number;

    @Field()
    author_id: number;
}