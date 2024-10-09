import { UserType } from "./user"

export type followType= {
    follow:[{ userId: string
            followerId: string
            }]
    user:UserType
    
}