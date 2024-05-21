import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class AuthLoginDTO{

    @IsNotEmpty()
    @IsEmail()
    email: string


    @IsNotEmpty()
    @IsStrongPassword({
        minNumbers: 2,
        minSymbols: 0,
        minUppercase: 0,
        minLowercase: 0,
        minLength: 8
    })
    password: string
}