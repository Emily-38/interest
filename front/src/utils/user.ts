import { InterestType } from "./interest"

export type RegisterType={
    email: string
    pseudo:string
    age: number
    gender: string
    password: string
    confirmPassword: string 
    checkbox: boolean
}
export type LoginType={
    email:string
    password:string
}
export type UserType={
    id:string
    email: string
    pseudo:string
    age: number
    gender: string
    profile_image: string
    confidentialityId: string
    isActive: boolean
    createdAt: Date
    roleId: string
    interestId: InterestType[]
    user:UserType
}
export type UserUpdateType={
    email?: string
    pseudo?:string
    gender?: string
    profile_image?: string
    confidentialityId?: string
    interestId?: InterestType[]  
}