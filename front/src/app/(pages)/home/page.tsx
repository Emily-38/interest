'use client'
import { CardProfil } from '@/components/CardProfil'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import { getPubliction } from '@/services/publication'
import { getAllUser, getCurrentUser } from '@/services/user'
import { PublicationType } from '@/utils/publication'
import { UserType } from '@/utils/user'
import React, { useEffect, useState } from 'react'
import {Rings} from 'react-loader-spinner'
import { ConfidentialityType } from '@/utils/confidentiality'
import { getConfidentiality } from '@/services/confidentiality'

const Home = () => {
  
  const [publicationList, setPublicationList]=useState<PublicationType[]>()
  const[userList,setUserList]=useState<UserType[]>()
  const[currentUser,setCurrentUser]=useState<UserType>()
  const[confidentiality,setConfidentiality]=useState<ConfidentialityType>()
  const[userConfidentiality, setUserConfidentiality]= useState<UserType[]>([])
 

  useEffect(() => {
    
    localStorage.removeItem('page')

    getPubliction().then((res)=>{
      setPublicationList(res.data)
    })

    getCurrentUser().then((res)=>{
      setCurrentUser(res.data)
    })

    getAllUser().then((res)=>{
      setUserList(res.data)
    })
    getConfidentiality().then((res)=>{
      setConfidentiality(res.data[1])
      
    })
    
  }, [])
  useEffect(() => {
    if (confidentiality){
      userList?.map((user)=>{
        if(user.confidentialityId === confidentiality.id){
          setUserConfidentiality((prev)=>{ 
            return [...prev, user]})
        }
      })
    }
  }, [confidentiality])
  
  if(!userList){
    return <div className='flex flex-col justify-center items-center font-semibold'>
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#2274A5"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    Veuillez patienter</div>
  }

  return (
    <div className='flex justify-center flex-col place-self-center w-96 md:w-11/12 md:gap-20 text-sm md:text-base md:flex-row'>
        <div className='flex overflow-x-scroll md:hidden'>
        {userList && currentUser && userList.map((user)=>{
           const currentinterestId=currentUser.interestId.map((interest)=>{return interest.id})
           const userMatchInterest = currentinterestId.some(interest => {
            return currentUser.id !== user.id && user.interestId.some(userInterest => userInterest.id === interest)});
            if(userMatchInterest === true){ 
            return(<ProfileUser key={user.id} button={false} col={true} user={user}/>)}
          })}
          
        </div>
        <div className='w-11/12 md:w-2/3 mx-auto'>
         {publicationList && publicationList.map((publication)=>{
           const userInterestIds = publication.user.interestId.map(interest => interest.id);
           const hasCommonInterest = userInterestIds.some(interestId => publication.interestId.includes(interestId));
           const hasConfidentiality = userConfidentiality.some(user => publication.userId.includes(user.id))
          
           
            if (hasCommonInterest === true && hasConfidentiality === true) {
              return(
                <Publication key={publication._id} full={false} publication={publication} />
              )
            }else{
              ''
            }
         })}
        </div>
       <div className=' m-5 hidden md:block md:w-1/3'>
          <CardProfil/>
          <div className='flex flex-col gap-4 p-5'>
            <p className='text-gray-400 m-3 text-center'>Suggestion de profile</p>
            {userList && currentUser && userList.map((user)=>{
           const currentinterestId=currentUser.interestId.map((interest)=>{return interest.id})
           const userMatchInterest = currentinterestId.some(interest => {
            return currentUser.id !== user.id && user.interestId.some(userInterest => userInterest.id === interest)});
            if(userMatchInterest === true){ 
            return(<ProfileUser key={user.id} button={false} col={false} user={user}/>)}
          })}
          </div>
        </div>
    </div>
  )
}

export default Home