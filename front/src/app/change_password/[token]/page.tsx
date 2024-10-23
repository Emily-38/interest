'use client'
import { BlockShadow } from '@/components/BlockShadow'
import { change_Password } from '@/services/user'
import { ParamsType } from '@/utils/parametre'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = ({params}:ParamsType) => {
    const[newPassword,setNewPassword]=useState('')
  return (
    <div className='flex flex-col justify-center items-center h-lvh'> 
    <BlockShadow>
        <p className='font-semibold text-xl text-center'>Nouveau mot de passe:</p>
        <input type='Password' placeholder="Nouveau mot de passe" className=" outline-none border border-black rounded-md p-3 pl-4 w-full" onChange={(e)=>{
            setNewPassword(e.target.value)
        }}/>

        <button type='submit' className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{
            change_Password(newPassword,params.token).then((res)=>{
              if(res.status === 200){
                toast.success('changement de mots de passe reussie')
              }
            }).catch((e)=>{
              toast.error(e.response.data.message)
            })
        }}>Changer de mot de passe</button>
  </BlockShadow>
  </div>
  )
}

export default page