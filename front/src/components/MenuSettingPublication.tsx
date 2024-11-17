import { PublicationType } from '@/utils/publication'
import React, { useEffect, useState } from 'react'
import { SlOptions } from 'react-icons/sl'
import { ModaleUpdatePublication } from './ModaleUpdatePublication'
import { deletePublication } from '@/services/publication'
import { toast } from 'react-toastify'
import { getCurrentUser } from '@/services/user'
import { UserType } from '@/utils/user'

export const MenuSettingPublication = ({publication}:{publication:PublicationType}) => {
    const[open,setOpen]=useState(false)
    const[user,setUser]=useState<UserType>()
    useEffect(() => {
   getCurrentUser().then((res)=>{
    setUser(res.data)
   })
    }, [])
    
  return (

  <div className='text-right p-2 w-20'>
    <button aria-label='setting' onClick={()=> {setOpen(!open)}}>
        <SlOptions className='cursor-pointer'/>
    </button>
    
    {publication.userId !== user?.id? 
    <div className={`${open ===true?'flex':'hidden'}  absolute flex-col p-2 w-28 items-center gap-3 border shadow-md bg-white text-center`}>
        <p className='text-red-600'>Signaler</p>
    </div>
    :<div className={`${open ===true?'flex':'hidden'}  absolute flex-col p-2 w-28 items-center gap-2 border shadow-md bg-white text-center`}>
    <div><ModaleUpdatePublication publication={publication}/></div>
    <hr className='w-4/5'/>
    <p className='text-red-600 cursor-pointer' onClick={()=>{
      deletePublication(publication._id).then((res)=>{
       if(res.status === 200 ){
        toast.success('La publication a bien été supprimé')
        window.location.reload()
       }
      })
    }}>Supprimer</p>
</div>}

  </div>
  )
}
