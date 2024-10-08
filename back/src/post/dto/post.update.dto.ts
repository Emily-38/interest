import { IsArray, IsOptional, IsString } from "class-validator"

export class updatePostDto {

    @IsOptional()
    description: string

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    interestId: string[]

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    like: string[]

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    save: string[]

}