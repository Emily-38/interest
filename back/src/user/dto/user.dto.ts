import { IsArray, IsBoolean, IsEmail, IsInt, IsOptional, IsString, IsStrongPassword, Min } from "class-validator"

export class UserDto {

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsString()
    pseudo: string

    @IsOptional()
    @IsInt()
    @Min(18) 
    age: number
    
    @IsOptional()
    @IsString()
    gender: string

    @IsOptional()
    @IsStrongPassword()
    password: string

    @IsOptional()
    profile_image:string

    @IsOptional()
    token: string

    @IsBoolean()
    @IsOptional()
    isActive: boolean

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    interestId?: string[];  

    @IsOptional()
    confidentialityId: string

    @IsOptional()
    roleId: string

}