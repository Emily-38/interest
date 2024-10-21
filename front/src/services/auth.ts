import { LoginType, RegisterType } from "@/utils/user"
import axios from "axios"

export async function registerForm(data:RegisterType){
    let axiosConfig = {
        headers: {
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

export async function loginForm(data:LoginType){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}auth/login`
    return axios.post(
        url,
        {
            email: data.email,
            password: data.password, 
            
        },
        axiosConfig
    )  
}


export async function activateAccount(token:string){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}auth/validate/${token}`
    return axios.patch(
        url,
        {},
        axiosConfig
    )  
}
