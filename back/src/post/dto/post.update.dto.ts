import { IsOptional } from "class-validator"

export class updatePostDto {

    @IsOptional()
    description: string

}