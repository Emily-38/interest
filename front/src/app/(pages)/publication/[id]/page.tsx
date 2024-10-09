'use client'
import { Publication } from '@/components/Publication'
import { getPublictionById } from '@/services/publication'
import { ParamsType } from '@/utils/parametre'
import { PublicationType } from '@/utils/publication'
import React, { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'

const publication = ({params}:ParamsType) => {
  const[publication, setPublication]=useState<PublicationType>()
  useEffect(() => {
    getPublictionById(params.id).then((res)=>{
      setPublication(res.data)
    })
  }, [])
  
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
  console.log(publication)
  return (
    <div className='w-5/6 mx-auto'>
        <Publication full={true} publication={publication}/>
    </div>
  )
}

export default publication