import publication from "@/app/(pages)/publication/[id]/page"
import { InterestType } from "@/utils/interest"
import { CreatePublication, PublicationType } from "@/utils/publication"
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

export async function getPubliction(){
    let axiosConfig = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}post`
    
        return axios.get( url,axiosConfig )  
}

export async function getPublictionById(id:string){
    let axiosConfig = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}post/byId/${id}`
    
        return axios.get( url,axiosConfig )  
}

export async function likePubliction(id:string){
    let axiosConfig = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}post/like/${id}`
    
        return axios.put( url,{},axiosConfig )  
}

export async function savePubliction(id:string){
    let axiosConfig = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}post/save/${id}`
    
        return axios.put( url,{},axiosConfig )  
}

export async function updatePublication(id:string,description:string,interestId:string[]){
    let axiosConfig = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}post/update/${id}`
    
        return axios.patch( url,{
            description:description,
            interestId: interestId
        },axiosConfig )  
}

export async function deletePubliction(id:string){
    let axiosConfig = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}post/delete/${id}`
    
        return axios.delete( url,axiosConfig )  
}