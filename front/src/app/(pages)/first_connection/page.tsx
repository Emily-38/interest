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
        <div className='flex justify-between gap-2 items-center w-full p-2'>
           <p className='cursor-pointer flex items-center gap-3' onClick={()=> preview()}><FaArrowLeftLong/>Retour</p>
           <p className='cursor-pointer flex items-center gap-3' onClick={()=>{
            router.push('/')
           }}>Suivant<FaArrowRightLong /></p> 
        </div>
        <h1 className='font-semibold text-2xl'>Bienvenue sur Interest</h1>
        <p className='self-start text-lg'>Choisis ta confidentialité: </p> 
       <select className='bg-white border border-black text-center rounded-md p-2 w-2/4'>
        <option value="">Public</option>
        <option value="">Privée</option>
       </select>
       <p>privé: les amis uniquement peuvent voir tes publications</p>
       <p>public: tout le monde peut voir tes publications</p>
    </BlockShadow>
  </div> 
    <div className={`first flex flex-col justify-center items-center h-lvh ${isActive === true? 'hidden':""}`}>
        <BlockShadow>
            <div className='flex justify-end gap-2 items-center w-full p-2'>
                <p onClick={()=> next()} className='cursor-pointer'>Suivant</p> 
                <FaArrowRightLong />
            </div>
            <h1 className='font-semibold text-2xl'>Bienvenue sur Interest</h1>
            <p className='self-start text-lg'>Choisis tes centres d'intérets: </p> 
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
        </BlockShadow>
      </div>
</>)
}

export default first_connection