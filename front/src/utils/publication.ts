import { InterestType } from "./interest"
import { UserType } from "./user"

export type PublicationType ={
    _id:string
    image?: string
    description:string
    createdAt:Date
    userId:string
    interestId: string[]
    like: string[]
    save: string[]
    user: UserType
}
export type CreatePublication={
    file?: File[]
    description:string
    interestId: string[]
    image: string
}