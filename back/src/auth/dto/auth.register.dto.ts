import { IsEmail, IsInt, IsNotEmpty, IsString, IsStrongPassword, Min } from "class-validator";


export class RegisterDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    pseudo: string

    @IsNotEmpty()
    @IsInt()
    @Min(18) // ne marche pas
    age: number
    
    @IsNotEmpty()
    @IsString()
    gender: string

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minNumbers: 1,
        minUppercase: 1
    })
    password: string

    @IsNotEmpty()
    confirmPassword
}