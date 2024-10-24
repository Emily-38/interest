import { UserType } from "./user"

export type commentType ={
    
   comment:{ _id:string
    userId: string
    postId: string
    description:string
    createdAt: Date},
    user: UserType[]
}
export type commentAdminType ={
     _id:string
    userId: string
    postId: string
    description:string
    createdAt: Date
}
   
export type createCommentType ={
    description:string
}