'use client'
import { BlockShadow } from '@/components/BlockShadow'
import { forgetPassword } from '@/services/user'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const forget_password = () => {
const[email,setEmail]=useState('')
useEffect(() => {
 
}, [])


  return (
    <div className='flex flex-col justify-center items-center h-lvh'> 
    <BlockShadow>
    <p className='font-semibold text-xl text-center'>Veuillez entrer votre email :</p>
        <input type="email" placeholder="Adresse e-mail" className=" outline-none border border-black rounded-md p-3 pl-4 w-full" onChange={(e)=>{
            setEmail(e.target.value)
        }}/>
        <button type='submit' className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{
             forgetPassword(email).then((res)=>{
                if(res.status === 200){
                    toast.success(res.data)
                }
              }).catch((e)=>{
                toast.error(e.response.data.message)
              })
        }}> Envoyer</button>
    </BlockShadow>
    </div>
  )
}

export default forget_password