import { InterestType } from "@/utils/interest"
import axios from "axios"

export async function updateUser(data:string[],confidentiality:string){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}user/update/add/interest`
    return axios.patch(
        url,{
            confidentialityId:confidentiality,
           interestId: data
        },axiosConfig
    )
}