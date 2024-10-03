import { BlockShadow } from '@/components/BlockShadow'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'

const register = () => {
  return (<div className='flex flex-col items-center h-lvh'> 
    <Link className='m-3 flex items-center gap-3 self-start  text-xl' href={'/'} ><FaArrowLeftLong /> Retour</Link>
    <Image src={'/logo_interest.png'} alt={'logo black'} width={130} height={130} className='md:hidden'/>
    <p className='font-bold text-xl p-3 '>Inscription</p>
    <BlockShadow> 
    <Image src={'/logo_interest.png'} alt={'logo black'} width={130} height={130}className='hidden md:block'/>
        <form className=' flex flex-col justify-center items-center w-5/6 gap-4 m-4 md:grid md:grid-cols-2 md:grid-rows-6 md:place-items-center'>
        <input type="email" placeholder="Adresse e-mail" className=" border border-black rounded-md p-3 pl-4 w-full md:col-span-2"/>
        <input type="text" placeholder="Pseudo" className=" border border-black rounded-md p-3 pl-4 w-full md:col-span-2"/>
        
            <input type="number" placeholder="Age" className=" border border-black rounded-md p-3 pl-4 w-full"/>
                <select className='bg-white border border-black rounded-md p-3 pl-4 w-full '>
                    <option value="">Homme</option>
                    <option value="">Femme</option>
                    <option value="">Autre</option>
                </select>
            <input type="password" placeholder='Password' className='border border-black rounded-md p-3 pl-4 w-full'/>
            <input type='password' placeholder='confirme password' className='border border-black rounded-md p-3 pl-4 w-full '/>
            
            <div className="inline-flex items-center col-span-2">
            <label  className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3" data-ripple-dark="true">
                <input type="checkbox"  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-primary checked:bg-primary checked:before:bg-primary hover:before:opacity-10"/>
                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-width="1"
                    >
                    <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                    ></path>
                    </svg>
               </span>
            </label>
            <label
          className="mt-px cursor-pointer select-none font-light "
          
        >
          <p className=" font-sans text-sm font-normal w-full ">
          J'accepte les <span className='font-bold text-sm hover:underline hover:text-primary'>Conditions d'utilisations</span>
          </p>
          
        </label>
        </div>
        <button className='bg-primary text-white font-semibold text-center w-2/3 p-3 rounded-md col-span-2'>Inscription</button>
       </form>
     </BlockShadow>
  </div>)
}

export default register
