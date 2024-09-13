import { IsString } from "class-validator";

export class confidentialityDto {

    @IsString()
    name: string
}