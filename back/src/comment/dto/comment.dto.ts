import { IsNotEmpty } from "class-validator"

export class commentDto {

    @IsNotEmpty()
    description: string
}