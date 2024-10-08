import { UserType } from "./user"

export type commentType ={
   comment:{ id:string
    userId: string
    description:string
    createdAt: Date},
    user: UserType[]
}
export type createCommentType ={
    description:string
}