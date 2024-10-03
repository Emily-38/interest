'use client'
import { Badge } from '@/components/Badge'
import { BlockShadow } from '@/components/BlockShadow'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

const first_connection = () => { 
const [isActive, setIsActive]=useState(false)
const router= useRouter()
 async function next(){
    setIsActive(true)
  }
  async function preview(){
    setIsActive(false)
  }
  return (
<>
  <div className={`second flex flex-col justify-center items-center h-lvh ${isActive === false? 'hidden':""}`}>
    <BlockShadow>
        <div className='flex justify-between items-center w-full p-2'>
           <p className='cursor-pointer flex items-center gap-3' onClick={()=> preview()}><FaArrowLeftLong/>Retour</p>
           <p className='hidden cursor-pointer md:flex items-center gap-3' onClick={()=>{
            router.push('/home')
           }}>Suivant<FaArrowRightLong /></p> 
        </div>
        <h1 className='font-semibold text-2xl'>Bienvenue sur Interest</h1>
        <p className='md:self-start text-center text-lg p-4'>Choisis la confidentialitée de ton compte: </p> 
       <select className='bg-white border border-black text-center rounded-md p-2 w-2/4'>
        <option value="">Public</option>
        <option value="">Privée</option>
       </select>
       <p className='p-4 text-center'>privé: les amis uniquement peuvent voir tes publications</p>
       <p className='p-4 text-center'>public: tout le monde peut voir tes publications</p>
       <p className='bg-primary rounded-md text-white text-center p-3 w-1/2 md:hidden'onClick={()=>{
              router.push('/home')
            }}>Suivant</p>
    </BlockShadow>
  </div> 
    <div className={`first flex flex-col justify-center items-center h-lvh ${isActive === true? 'hidden':""}`}>
        <BlockShadow>
            <div className=' hidden md:flex justify-end gap-2 items-center w-full p-2'>
                <p onClick={()=> next()} className='  cursor-pointer'>Suivant</p> 
                <FaArrowRightLong />
            </div>
            <h1 className='font-semibold text-2xl'>Bienvenue sur Interest</h1>
            <p className='md:self-start text-lg'>Choisis tes centres d'intérets: </p> 
            <div className='flex flex-row flex-wrap gap-10'>
              <Badge/>
              <Badge/>
              <Badge/>
              <Badge/>
            </div>
            <div className='flex flex-row gap-2 m-4'>
              <input type="text" placeholder="Ajoute ton centre d'interet" className='appearance-none border-b-2 text-center outline-none border-b-gray-300'/>
              <button type='submit' className='bg-primary text-white rounded-md p-1'>Ajouter</button>
            </div>
            <p className='bg-primary rounded-md text-white text-center p-3 w-1/2 md:hidden'onClick={()=>{
              next()
            }}>Suivant</p>
        </BlockShadow>
      </div>
</>)
}

export default first_connection