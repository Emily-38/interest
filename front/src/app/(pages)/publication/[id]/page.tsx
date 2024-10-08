'use client'
import { Publication } from '@/components/Publication'
import { getPublictionById } from '@/services/publication'
import { ParamsType } from '@/utils/parametre'
import { PublicationType } from '@/utils/publication'
import React, { useEffect, useState } from 'react'

const publication = ({params}:ParamsType) => {
  const[publication, setPublication]=useState<PublicationType>()
  useEffect(() => {
    getPublictionById(params.id).then((res)=>{
      setPublication(res.data)
    })
  }, [])
  
  if(!publication){
    return <>Error</>
  }
  console.log(publication)
  return (
    <div className='w-5/6 mx-auto'>
        <Publication full={true} publication={publication}/>
    </div>
  )
}

export default publication