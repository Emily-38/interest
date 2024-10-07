import { InterestType } from "./interest"

export type PublicationType ={
    file?: string
    description:string
    createdAt:Date
    interestId: InterestType[]
}
export type CreatePublication={
    file?: File[]
    description:string
    interestId: string[]
    image: string
}