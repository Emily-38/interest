'use client'
import { BlockShadow } from '@/components/BlockShadow'
import { messageType } from '@/utils/message'
import { register } from 'module'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaArrowLeftLong } from 'react-icons/fa6'

const Contact = () => {
    const {register,handleSubmit}=useForm<messageType>()
const onSubmit: SubmitHandler<messageType> = (data) => console.log(data)
    const router = useRouter()
  return (
    <div className={`first flex flex-col justify-center items-center h-lvh`}>
        <BlockShadow>
            <div className='flex justify-start gap-2 items-center w-full p-2'>
            <FaArrowLeftLong />
            <p className='cursor-pointer'onClick={()=>{
                  if(localStorage.getItem('token')){
                    router.push('/home')
                  }else{
                    router.push('/')
                  }
            }}>Retour</p>     
            </div>
            <h1 className='font-semibold text-2xl'>Nous contacter</h1> 
            <form className='flex flex-col w-1/2 gap-2 m-4' onSubmit={handleSubmit(onSubmit)}>
                <p>Votre email :</p>
                <input {...register('email')} type="email" className='border border-black  rounded-md p-2' />
                <p>Sujet du message:</p>
                <input {...register('sujet')} type="text" className='border border-black  rounded-md p-2' />
                <p>Votre message:</p>
                <textarea {...register('description')} maxLength={1000} className='border border-black  rounded-md p-2' />            
                <button type='submit' className='bg-primary rounded-md text-white text-center p-3 md:w-1/2 mx-auto'>Envoyer</button>
            </form>
        </BlockShadow>
      </div>
  )
}

export default Contact