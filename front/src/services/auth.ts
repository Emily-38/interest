import { RegisterType } from "@/utils/user"
import axios from "axios"

export async function registerForm(data:RegisterType){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}auth/register`
    return axios.post(
        url,
        {
            email:data.email,
            pseudo:data.pseudo,
            age:data.age,
            gender: data.gender,
            password: data.password, 
            confirmPassword: data.confirmPassword
        },
        axiosConfig
    )
      
}