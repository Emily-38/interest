'use client'
import { Badge } from '@/components/Badge'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import { getPubliction } from '@/services/publication'
import { getUserByPseudo } from '@/services/user'
import { ParamsType } from '@/utils/parametre'
import { PublicationType } from '@/utils/publication'
import { UserType } from '@/utils/user'
import React, { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'

const page = ({params}:ParamsType) => {
  const [user,setUser]=useState<UserType>()
  const[publication,setPublication]=useState<PublicationType[]>()
  const[filteredPublications,setFilteredPublications]=useState<PublicationType[]>()

  useEffect(() => {
   getUserByPseudo(params.pseudo).then((res)=>{
    setUser(res.data)
   })
   getPubliction().then((res)=>{
    setPublication(res.data)
   })
   
  }, [])

  useEffect(() => {
    if (user && publication && publication.length > 0) {
      // Filtrer les publications dont le userId correspond à l'ID de l'utilisateur
      const userPublications = publication.filter(
        (publication) => publication.userId === user.id
      );
      setFilteredPublications(userPublications);
    }
  }, [user, publication])
  
  
  if(!user){
    return<div className='flex flex-col justify-center items-center font-semibold'>
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
    <div className='p-3'>
        <div className='flex  gap-10 md:justify-around items-center'> 
            <ProfileUser col={true} button={false} user={user}/>
            <div>
                <ul className='flex gap-10 md:gap-5 mb-5'>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'>
                    <p>{filteredPublications?.length}</p>
                     Publications
                  </li>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'>
                    <p>100</p>
                    Abonnés
                  </li>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'> 
                    <p>105</p>
                    Suivis
                  </li>
                </ul>


                <ul className='hidden md:flex gap-5 text-center'>
                  {user.interestId && user.interestId.map((interest)=>{
                   return( 
                    <li key={interest.id}>
                      <Badge content={true} interest={interest} />
                    </li> 
                  )
                  })}
                </ul>
                
            </div>
            <button className='hidden md:block bg-primary text-center rounded-md w-1/6 text-white p-3'>Suivre</button>
        </div>
        <div className="md:hidden flex justify-between">
        <ul className='flex text-center'>
        {user.interestId && user.interestId.map((interest)=>{
                   return(
                  <li key={interest.id}>
                    <Badge content={true} interest={interest}/>
                  </li>
                  )
        })}
                </ul>
                <button className=' bg-primary text-center rounded-md w-1/4 text-white p-1'>Suivre</button>
        </div>
        <div className='w-10/12 md:w-2/3 mx-auto'>
        {filteredPublications && filteredPublications.map((publicationUser)=>{
          if(publicationUser.userId === user.id){
            
          return(
            
            <Publication key={publicationUser._id} full={false} publication={publicationUser}/>
          ) }else{
            return <div className='flex justify-center items-center font-semibold'>Cette personne n'a pas de publication</div>
          }
        })}
          
          
        </div>
    </div>
  )
}

export default page