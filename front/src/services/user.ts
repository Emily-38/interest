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

export async function getAllUser(){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}user`
    return axios.get(
        url,axiosConfig
    )
}
export async function getCourentUser(){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}user/courent`
    return axios.get(
        url,axiosConfig
    )
}
export async function getUserByPseudo(pseudo:string){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}user/byPseudo/${pseudo}`
    return axios.get(
        url,axiosConfig
    )
}

export async function getUserById(id:string){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}user/byId/${id}`
    return axios.get(
        url,axiosConfig
    )
}

export async function getSearch(query:string){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}user/search?query=${query}`
    return axios.get(
        url,axiosConfig
    )
}

