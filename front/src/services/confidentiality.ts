import axios from "axios"

export async function getConfidentiality(){
    let axiosConfig = {
        headers: {
            'content-type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
    const url = `${process.env.NEXT_PUBLIC_URL_API}confidentiality`
    return axios.get(
        url,axiosConfig
    )
}