import { IsNotEmpty, IsString } from "class-validator";

export class interestDto {

    @IsNotEmpty()
    @IsString()
    name: string
}