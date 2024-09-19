import { IsArray, isArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class createPostDto {

    @IsNotEmpty()
    description: string
    
    @IsOptional()
    image : string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    interestId: string[]

}
