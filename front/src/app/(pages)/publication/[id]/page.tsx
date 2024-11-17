'use client'
import { Publication } from '@/components/Publication'
import { getPublicationById } from '@/services/publication'
import { ParamsType } from '@/utils/parametre'
import { PublicationType } from '@/utils/publication'
import React, { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'
import { toast } from 'react-toastify'

const PublicationId = ({params}:ParamsType) => {
  const[publication, setPublication]=useState<PublicationType>()

  useEffect(() => {
    getPublicationById(params.id).then((res)=>{
      setPublication(res.data)
    }).catch((e)=>{
      return toast.error(e.response.data.message) 
  })
  }, [params.id])
  
  if(!publication){
    return <div className='flex flex-col justify-center items-center font-semibold'>
    <Rings
      visible={true}
      height="80"
      width="80"
      color="#2274A5"
      ariaLabel="rings-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  Veuillez patienter</div>
  }
  
  return (
    <div className='w-5/6 mx-auto'>
        <Publication full={true} publication={publication}/>
    </div>
  )
}

export default PublicationId