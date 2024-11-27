
import { IsEmail, IsInt, IsNotEmpty, IsString, IsStrongPassword, Max, MaxLength, Min, MinLength } from "class-validator"

export class RegisterDto {

    @IsNotEmpty()
    @IsEmail()
    @MinLength(3)
    @MaxLength(255)
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    pseudo: string

    @IsNotEmpty()
    @IsInt()
    @Min(18) 
    @Max(150)
    age: number
    
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    gender: string

    @IsNotEmpty()
    @IsStrongPassword()
    password: string

    @IsNotEmpty()
    confirmPassword: string
}