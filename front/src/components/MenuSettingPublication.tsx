import { PublicationType } from '@/utils/publication'
import React, { useState } from 'react'
import { SlOptions } from 'react-icons/sl'

export const MenuSettingPublication = ({publication}:{publication:PublicationType}) => {

    const[open,setOpen]=useState(false)
  return (

  <div className='text-right p-2 w-20'>
    <button onClick={()=> {setOpen(!open)}}>
        <SlOptions className='cursor-pointer'/>
    </button>
    
    {publication.userId !== publication.user.id? 
    <div className={`${open ===true?'flex':'hidden'}  absolute flex-col p-2 w-28 items-center gap-3 border shadow-md bg-white text-center`}>
        <p className='text-red-600'>Signaler</p>
    </div>
    :<div className={`${open ===true?'flex':'hidden'}  absolute flex-col p-2 w-28 items-center gap-2 border shadow-md bg-white text-center`}>
    <p>Modifier</p>
    <hr className='w-4/5'/>
    <p className='text-red-600'>Supprimer</p>
</div>}
    
  </div>
  )
}
