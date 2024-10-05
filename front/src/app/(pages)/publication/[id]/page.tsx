'use client'
import { Publication } from '@/components/Publication'
import { ParamsType } from '@/utils/parametre'
import React from 'react'

const publication = ({params}:ParamsType) => {
  return (
    <div className='w-5/6 mx-auto'>
        <Publication full={true}/>
    </div>
  )
}

export default publication