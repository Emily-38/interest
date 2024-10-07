import axios from "axios";

export async function InsertImage(image:any){
    let axiosConfig = {
        headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem("token")}`
        },
    }
   
    const url = `${process.env.NEXT_PUBLIC_URL_API}image/upload`
    return axios.post(
        url, image, axiosConfig
    ).then((res) => {
        return res;
      })
      .catch((e) => {
       console.log(e)
        
        return e;
      });
    }