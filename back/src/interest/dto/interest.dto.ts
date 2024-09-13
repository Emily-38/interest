import { IsNotEmpty } from "class-validator"

export class interestDto {

    @IsNotEmpty()
    name: string

}