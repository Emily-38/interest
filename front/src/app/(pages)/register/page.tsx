'use client'

import { BlockShadow } from '@/components/BlockShadow'
import { RegisterType } from '@/utils/user'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaArrowLeftLong } from 'react-icons/fa6'
import { schemaRegister } from '@/yup_schema/register'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerForm } from '@/services/auth'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


const register = () => {
  const router = useRouter()
  const {register,handleSubmit ,formState:{errors}}=useForm<RegisterType>({mode:'onSubmit', resolver:yupResolver(schemaRegister)})
  const onSubmit: SubmitHandler<RegisterType> = (data) => {
   registerForm(data).then((res)=>{
    if(res.status=== 201){
      toast.success('Verifier votre boite mail')
     router.push('/')
    }
    }).catch((e)=>(
      toast.error(e.response.data.message)
    )
  )}
  

return (
  <div className='flex flex-col items-center h-lvh'> 
    <Link className='m-3 flex items-center gap-3 self-start  text-xl' href={'/'} ><FaArrowLeftLong /> Retour</Link>
    <Image src={'/logo_interest.png'} alt={'logo black'} width={130} height={130} priority={true} className='md:hidden object-cover'/>
    <p className='font-bold text-xl p-3 '>Inscription</p>
    <BlockShadow> 
      <Image src={'/logo_interest.png'} alt={'logo black'} width={130} height={130}className='hidden md:block'/>
      <form className=' flex flex-col justify-center items-center w-5/6 gap-4 m-4 md:grid md:grid-cols-2 md:grid-rows-6 md:place-items-center' onSubmit={handleSubmit(onSubmit)}>
        
        <div>
          <input {...register('email')} type="email" placeholder="Adresse e-mail" className=" outline-none border border-black rounded-md p-3 pl-4 w-full md:col-span-2"/>
          {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
        </div>

        <div>
          <input {...register('pseudo')} type="text" placeholder="Pseudo" className=" outline-none border border-black rounded-md p-3 pl-4 w-full md:col-span-2"/>
          {errors.pseudo && <p className='text-red-600'>{errors.pseudo.message}</p>}
        </div>

        <div>
          <input {...register('age')} type="number" min={18}  placeholder="Age" className="outline-none border border-black rounded-md p-3 pl-4 w-full"/>
          {errors.age && <p className='text-red-600'>{errors.age.message}</p>}
        </div>
          
        <select {...register('gender')} className='bg-white border border-black rounded-md p-3 pl-4 w-full '>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
          <option value="Autre">Autre</option>
        </select>
          
        <div>
          <input {...register('password')} type="password" placeholder='Password' className=' outline-none border border-black rounded-md p-3 pl-4 w-full'/>
          { errors.password && <p className="text-red-600">{errors.password.message} </p> }
        </div>

        <div>
          <input {...register('confirmPassword')} type='password' placeholder='confirme password' className=' outline-none border border-black rounded-md p-3 pl-4 w-full '/>
          { errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message} </p> }
        </div>

        <div className="inline-flex items-center col-span-2">
          <label className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" data-ripple-dark="true">
            <input {...register('checkbox')} type="checkbox"  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"/>
            <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
              </svg>
            </span>
          </label>
          <label className="mt-px cursor-pointer select-none font-light ">
            <p className=" font-sans text-sm font-normal w-full ">
              J'accepte les 
              <span className='font-bold text-sm hover:underline hover:text-primary'>Conditions d'utilisations</span>
            </p>
            {errors.checkbox && <p className='text-red-600'>{errors.checkbox.message}</p>} 
          </label>
        </div>

        <button type='submit' className='bg-primary text-white font-semibold text-center w-2/3 p-3 rounded-md col-span-2'>Inscription</button>
      
      </form>
     </BlockShadow>
  </div>)
}
export default register
