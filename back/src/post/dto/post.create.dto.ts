import { IsNotEmpty, IsOptional } from "class-validator"

export class createPostDto {

    @IsNotEmpty()
    description: string
    
    @IsOptional()
    image : string

}
