
import { IsEmail, IsInt, IsNotEmpty, IsString, IsStrongPassword, Min } from "class-validator"

export class RegisterDto {

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    pseudo: string

    @IsNotEmpty()
    @IsInt()
    @Min(18) 
    age: number
    
    @IsNotEmpty()
    @IsString()
    gender: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    confirmPassword
}