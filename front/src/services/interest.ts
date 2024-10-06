import { InterestCreate } from "@/utils/interest"
import axios from "axios"

export async function getInterest(){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}interest`
    return axios.get(
        url,axiosConfig
    )
}
export async function createInterest(data:InterestCreate){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}interest/create`
    return axios.post(
        url,{
            name: data.name
        },axiosConfig
    )
}
