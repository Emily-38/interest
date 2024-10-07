import { CreatePublication } from "@/utils/publication"
import axios from "axios"

export async function createPubliction(data: CreatePublication){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}post/create`
    if(data.image){
        return axios.post(
            url,{
                image:data.image,
                description:data.description,
                interestId: data.interestId
            },axiosConfig
        )
    }else{ 
    
    return axios.post(
        url,{
            description:data.description,
            interestId: data.interestId
        },axiosConfig
    )
}
    
}