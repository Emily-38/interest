import { IsNotEmpty, IsString } from "class-validator";

export class roleDto {
    @IsNotEmpty()
    @IsString()
    name: string
}