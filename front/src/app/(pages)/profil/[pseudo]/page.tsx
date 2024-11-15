'use client'
import { Badge } from '@/components/Badge'
import ProfileUser from '@/components/ProfileUser'
import { Publication } from '@/components/Publication'
import { getConfidentiality } from '@/services/confidentiality'
import { addFollow, getFollowByUser, unFollow } from '@/services/follow'
import { getPubliction } from '@/services/publication'
import { getCurrentUser, getUserByPseudo } from '@/services/user'
import { ConfidentialityType } from '@/utils/confidentiality'
import { followType } from '@/utils/follow'
import { ParamsType } from '@/utils/parametre'
import { PublicationType } from '@/utils/publication'
import { UserType } from '@/utils/user'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Rings } from 'react-loader-spinner'
import { toast } from 'react-toastify'


const Profil = ({params}:ParamsType) => {
  const [userPage,setUserPage]=useState<UserType>()
  const [userCurrent,setUserCurrent]=useState<UserType>()
  const[publication,setPublication]=useState<PublicationType[]>()
  const[filteredPublications,setFilteredPublications]=useState<PublicationType[]>()
  const[followList,setFollowList]=useState<followType>()
  const[follow,setFollow]=useState(false)
  const[followers,setFollowers]=useState<string[]>([])
  const[abonned,setAbonned]=useState<string[]>([])
  const[isPublication,setIsPublication]=useState(false)
  const[confidentiality,setConfidentiality]=useState<string>()

  
  useEffect(() => {
    getCurrentUser().then((res)=>{
      setUserCurrent(res.data)
    })
    getUserByPseudo(params.pseudo).then((res)=>{
      setUserPage(res.data)
      
    }).catch((e)=>{
      return toast.error(e.response.data.message) 
    })

    getPubliction().then((res)=>{
      setPublication(res.data)
    })

  }, [params.pseudo])

  useEffect(() => {
if(userPage){
  getConfidentiality().then((res)=>{
    setConfidentiality(res.data[1].id)
   
  })
}
    if(userPage){
      getFollowByUser(userPage.id).then((res)=>{
        setFollowList(res.data)   
      })
    }

    if (userPage && publication && publication.length > 0) {
      const userPublications = publication.filter(
        (publication) => publication.userId === userPage.id
      );
      setFilteredPublications(userPublications);
    }

  }, [userPage, publication])
  

  useEffect(() => {
    if(followList){ 
      followList.follow.map((followerId)=>{
        if(followerId.followerId === userPage?.id){
          setFollowers((prev)=>{ 
          return [...prev, followerId.followerId]})
        }
      })
    }

    if(followList){ 
      followList.follow.map((userId)=>{
        if(userId.userId === userPage?.id){
          setAbonned((prev)=>{ 
          return [...prev, userId.userId]})
        }
      })
    }
  }, [followList])

  
  useEffect(() => {
    
    if(followList){ 
      followList.follow.map((followerId)=>{
        if(followerId.followerId === followList.user.id){
          setFollow(true)
        }
      })
    }
    
  }, [followList])
 
  if(!userPage){
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
 
  if(userCurrent)
  return (
    <div className='p-3'>
        <div className='flex  gap-10 md:justify-around items-center'> 
            <ProfileUser col={true} button={false} user={userPage}/>
            <div>
                <ul className='flex gap-10 md:gap-5 mb-5'>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'>
                    <p>{filteredPublications?.length}</p>
                     Publications
                  </li>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'>
                    <p>{abonned.length}</p>
                    Abonnés
                  </li>
                  <li className='flex flex-col items-center md:flex-row md:gap-3'> 
                    <p>{followers.length}</p>

                    Suivis
                  </li>
                </ul>

                <ul className='hidden md:flex gap-5 text-center'>
                  {userPage.interestId && userPage.interestId.map((interest)=>{
                   return( 
                    <li key={interest.id}>
                      <Badge content={true} interest={interest} />
                    </li> 
                  )
                  })}
                </ul>
            </div>
            { userPage.id !== followList?.user.id ? 
            follow === false ? 
            <button className='hidden md:block bg-primary text-center rounded-md w-1/6 text-white p-3' onClick={()=>{ 
              addFollow(userPage.id).then((res)=>{
                if(res.status === 201){
                  setFollow(true) }
                })
            }}>Suivre</button>
            : <button className='hidden md:block bg-primary text-center rounded-md w-1/6 text-white p-3'onClick={()=>{
              unFollow(userPage.id).then((res)=>{
                if(res.status === 200){
                  setFollow(false) }
                })
              }}>Ne plus suivre</button>:<button className='hidden md:block bg-primary text-center rounded-md w-1/6 text-white p-3' onClick={()=>{
                setIsPublication(!isPublication)
              }}>{isPublication ===false ? 'Voir les publications sauvegardés' : 'Voir mes publications'  }  </button>}
            
        </div>
        <div className="md:hidden flex justify-between">
        <ul className='flex text-center'>
        {userPage.interestId && userPage.interestId.map((interest)=>{
          return(
            <li key={interest.id}>
              <Badge content={true} interest={interest}/>
            </li>
          )
        })}
                </ul>
                { userPage.id !== userCurrent.id ? 
                follow === false?
                <button className=' bg-primary text-center rounded-md w-1/4 text-white p-1' onClick={()=>{ 
              addFollow(userPage.id).then((res)=>{
                if(res.status === 201){
                  setFollow(true) }
                })
            }}>Suivre</button>
            :
              <button className=' bg-primary text-center rounded-md w-1/4 text-white p-1' onClick={()=>{
              unFollow(userPage.id).then((res)=>{
                if(res.status === 200){
                  setFollow(false) }
                })
              }}>Ne plus suivre</button>:<button className='hidden md:block bg-primary text-center rounded-md w-1/6 text-white p-3' onClick={()=>{
                setIsPublication(!isPublication)
              }}>{isPublication ===false ? 'Voir les publications sauvegardés' : 'Voir mes publications'  }  </button>}
        </div>
        <div className='w-10/12 md:w-2/3 mx-auto'>
        {isPublication === true?<>
        {publication && publication.map((publicationSave)=>{
          if(publicationSave.favorite.includes(userCurrent.id)){
            return <Publication key={publicationSave._id} full={false} publication={publicationSave}/>
          }
        })}</> :<>
        
        {userPage.confidentialityId !== 'cac9c843-ef0a-4ba8-8b90-e0191df0d1b6'?<div key={userPage.id} className='flex justify-center items-center font-semibold'>Ce compte est privé </div>: <>{filteredPublications && filteredPublications.map((publicationUser)=>{
          if(confidentiality && userPage.confidentialityId === confidentiality && publicationUser.userId === userPage.id  || publicationUser.userId === userCurrent.id){
            
          return(
            
            <Publication key={publicationUser._id} full={false} publication={publicationUser}/>
           ) }
        })}</>}
        </>}
          
          
        </div>
    </div>
  )
}

export default Profil