import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl, Length, MaxLength } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class CreateUserInput {

    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string

    @Field()
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 0,
        minNumbers: 3
    })
    password: string

    @Field()
    @IsString()
    @IsUrl()
    image: string;
}