'use client'
import { Badge } from '@/components/Badge'
import { BlockShadow } from '@/components/BlockShadow'
import { getConfidentiality } from '@/services/confidentiality'
import { createInterest, getInterest } from '@/services/interest'
import { updateUser } from '@/services/user'
import { ConfidentialityType } from '@/utils/confidentiality'
import { InterestCreate, InterestType } from '@/utils/interest'
import { schemaInterest } from '@/yup_schema/interest'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { toast } from 'react-toastify'

const first_connection = () => { 
  const[interestList,setInterestList]=useState<InterestType[]>()
  const[interestAdd,setInterestAdd]=useState<InterestType[]>([])
  const[interestUser,setInterestUser]=useState<string[]>([])
  const[confidentialityList,setConfidentialityList]=useState<ConfidentialityType[]>()
  const[confidentiality, setConfidentiality]=useState('')
  const [isActive, setIsActive]=useState(false)

  const router= useRouter()

  useEffect(() => {
    getInterest().then((res)=>{
      setInterestList(res.data)
    })
    getConfidentiality().then((res)=>{
      setConfidentialityList(res.data)

    })
  }, [])
  
const {register,handleSubmit}=useForm<InterestCreate>({mode:'onSubmit', resolver:yupResolver(schemaInterest)})
const onSubmit: SubmitHandler<InterestCreate> = (data) => {
 createInterest(data.name).then((res)=>{
  if(res.status === 201){
    setInterestAdd((prev) => {
      return [...prev, res.data];
    })
  }
  }).catch((e)=>(
    toast.error(e.response.data.message)
  )
)}

  return (
<>
  <div className={`second flex flex-col justify-center items-center h-lvh ${isActive === false? 'hidden':""}`}>
    <BlockShadow>
        <div className='flex justify-between items-center w-full p-2'>
           <p className='cursor-pointer flex items-center gap-3' onClick={()=>{setIsActive(false)}}><FaArrowLeftLong/>Retour</p>
           <p className='hidden cursor-pointer md:flex items-center gap-3' onClick={()=>{
            updateUser(interestUser,confidentiality).then((res)=>{
              if(res.status === 200){
                router.push('/home')
              }
            })
           }}>Suivant<FaArrowRightLong /></p> 
        </div>
        <h1 className='font-semibold text-2xl'>Bienvenue sur Interest</h1>
        <p className='md:self-start text-center text-lg p-4'>Choisis la confidentialitée de ton compte: </p> 
       <select className='bg-white border border-black text-center rounded-md p-2 w-2/4' onChange={(e)=>{
        setConfidentiality(e.target.value)
       }}>
       {confidentialityList && confidentialityList.map((option)=>{
        return(
          <option key={option.id} value={option.id}>{option.name}</option>
        )
       })}
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
                <p onClick={()=> setIsActive(true)} className='  cursor-pointer'>Suivant</p> 
                <FaArrowRightLong />
            </div>
            <h1 className='font-semibold text-2xl'>Bienvenue sur Interest</h1>
            <p className='md:self-start text-lg'>Choisis tes centres d'intérets: </p> 
            <div className='flex flex-row flex-wrap gap-10'>
            { interestList && interestList.map( (interest: InterestType) => {
                return <Badge key={interest.id} content={false} interest={interest} setInterestUser={setInterestUser}/>
            }) }
            </div>
            <form className='flex flex-row gap-2 m-4' onSubmit={handleSubmit(onSubmit)}>
              <input {...register('name')} type="text" placeholder="Ajoute ton centre d'interet" className='appearance-none border-b-2 text-center outline-none border-b-gray-300' />
              <button type='submit' className='bg-primary text-white rounded-md p-1'>Ajouter</button>
            </form>
            <div className='flex gap-4'>
            { interestAdd && interestAdd.map( (interest: InterestType) => {
                return <Badge key={interest.id} content={false} interest={interest} setInterestUser={setInterestUser}/>
            }) }
            </div>
            <p className='bg-primary rounded-md text-white text-center p-3 w-1/2 md:hidden'onClick={()=>{
              setIsActive(true)
            }}>Suivant</p>
        </BlockShadow>
      </div>
</>)
}

export default first_connection