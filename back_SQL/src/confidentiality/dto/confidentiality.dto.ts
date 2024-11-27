import { IsNotEmpty, IsString } from "class-validator";

export class confidentialityDto {

    @IsNotEmpty()
    @IsString()
    name: string
}