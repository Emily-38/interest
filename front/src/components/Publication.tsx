import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {  BiSolidCommentDetail } from 'react-icons/bi'
import { FaBookmark, FaHeart } from 'react-icons/fa6'
import { Badge } from './Badge'
import { MenuSettingPublication } from './MenuSettingPublication'
import { MenuLikePublication } from './MenuLikePublication'
import { PublicationType } from '@/utils/publication'
import { commentType, createCommentType } from '@/utils/comment'
import { UserType } from '@/utils/user'
import { getAllUser } from '@/services/user'
import { createComment, getCommentByIdPost } from '@/services/comment'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { likePublication, savePublication } from '@/services/publication'
import { useRouter } from 'next/navigation'
import { getInterest } from '@/services/interest'
import { InterestType } from '@/utils/interest'
import { MenuSettingComment } from './MenuSettingComment'

export const Publication = ({full,publication}:{full:boolean, publication:PublicationType}) => {
    const[isLike,setIsLike]= useState(false)
    const[isSave,setIsSave]= useState(false)
    const[userList,setUserList]= useState<UserType[]>()
    const[commentList,setCommentList]= useState<commentType[]>()
    const[lastComment,setLastComment]= useState<commentType>()
    const[interestList,setInterestList]= useState<InterestType[]>()
    const[compteurLike,setCompteurLike]=useState<number>(publication.like.length)
    const[isReload,setIsReload]=useState(false)
    const date = new Date(publication.createdAt)
    const router= useRouter()


    const {register,handleSubmit, reset}=useForm<createCommentType>()
    const onSubmit: SubmitHandler<createCommentType> = async (data) => {
        createComment(publication._id,data).then((res)=>{
            if(res.status ===201){
                toast.success('Commentaire envoyé')
                reset()
                setIsReload(true)
            }
        })
    }

    useEffect(() => {
        getAllUser().then((res)=>{
            setUserList(res.data)
          })
          getInterest().then((res)=>{
            setInterestList(res.data)
          })
          
          getCommentByIdPost(publication._id).then((res)=>{
             
            setCommentList(res.data)
          })
         
          if(publication.favorite.includes(publication.user.id)){
            setIsSave(true)
          }
          

    }, [publication._id,publication.favorite,publication.like,publication.user.id,isReload])
    
    useEffect(() => {
        if(publication.like.includes(publication.user.id)){
            setIsLike(true)
          }
    }, [])
    
    useEffect(() => {
        if ( isLike === true && isReload === true ) {
            setCompteurLike((prev) => {
              return prev + 1;
             
            });
          } else if(isLike === false && isReload === true) {
    
            setCompteurLike((prev) => {
              return prev - 1;
            });
          }
          setIsReload(false)
      }, [isLike]);
   
     useEffect(() => {
        if(commentList){  
            setLastComment(commentList[0])
        }
        commentList && commentList.map((comment)=>{

        
        if(!userList?.some(user=>user.id === comment.comment.userId)){
           return <div key={comment.comment._id} className='flex flex-row items-center gap-2 md:text-base'>
            <Image width={50} height={50} alt='Profile User' src={'/default_profile.png'} className='rounded-full h-10 w-10 object-cover  md:h-12 md:w-12'/>
            <p className='font-semibold'> Utilisateur supprimer </p>
            </div>
        }
              })  
     }, [commentList,userList])
    
       
  return (
    <div className=' w-full md:w-[600px] md:mt-10 bg-white  mx-auto col-span-2 rounded-md mt-5'>
        <div className='flex justify-between items-center pl-3 pr-3 m-2'>
          {userList && userList.map((user)=>{
            if(user.id === publication.userId){ 
                return( <div key={user.id} onClick={()=>{
                    router.push(`/profil/${user.pseudo}`)
                }}>
                        <div className='flex items-center gap-3 p-3 cursor-pointer'>
                           {user.profile_image? <Image width={50} height={50} alt='Profile User' src={`https://interest-48022f6f5975.herokuapp.com/image/view/${user.profile_image}`} property='true' className='rounded-full h-10 w-10 object-cover'/> :<Image width={50} height={50} alt='Profile User' src={'/default_profile.png'} property='true' className='rounded-full h-10 w-10 object-cover'/>} 
                            <p> {user.pseudo} </p>
                        </div>
                        </div>
                )
            }   
        } )}
            <MenuSettingPublication publication={publication}  />
        </div>


        {publication.image && 
        <> 
        <div onClick={()=>{
            router.push(`/publication/${publication._id}`)
            }} className='cursor-pointer'>
            <Image src={`https://interest-48022f6f5975.herokuapp.com/image/view/${publication.image}`} alt='Image de publication' width={1000} height={1000} className='mt-2 w-full' property='true'/>
            </div>
            <div className='flex justify-between p-3'>
                <div>
                    <ul className='flex gap-5 ml-4 mb-2'>
                       <li> <MenuLikePublication publication={publication} isReload={isReload} compteurLike={compteurLike}/></li>
                        <li>{commentList?.length}</li>  
                    </ul>
                <div className='flex gap-3 ml-3 text-xl'>
                    <button  aria-label='like' onClick={()=>{ likePublication(publication._id)
                        setIsLike(!isLike)
                        setIsReload(true) 
                    }}>
                        <FaHeart className={`${isLike === true? 'text-red-600': 'text-red-300'}`}  />
                    </button>
                    <BiSolidCommentDetail />
                    <button aria-label='save' onClick={()=>{savePublication(publication._id)
                        setIsSave(!isSave)}}>
                        <FaBookmark className={`${isSave === true? 'text-primary': 'text-sky-300'}`} />
                    </button>
                </div>
                </div>
                <div>             
            { publication.image && full === true ? 
            <ul className='flex w-full justify-end text-xs'>
                {interestList && interestList.map((interest)=>{ 
                    const hasCommonInterest = publication.interestId.some(interestId =>  interest.id.includes(interestId));
                    if(hasCommonInterest){ 
                    return( 
                    <li key={interest.id} className='text-gray-400'><Badge content={true} interest={interest} /></li>
                    )}
                })}
            </ul>
            :''}
        </div>
            </div>
        </>}
            
        <div onClick={()=>{
            router.push(`/publication/${publication._id}`)
        }} className='cursor-pointer'>
        <p className='text-center'> {publication.description}</p>
        <ul className='flex justify-center'>
        {!publication.image && full === true ?
         interestList && interestList.map((interest)=>{ 
                const hasCommonInterest = publication.interestId.some(interestId => interest.id.includes(interestId))
                if(hasCommonInterest){ 
                return( 
                <li key={interest.id} className='text-gray-400 text-center text-xs'><Badge content={true} interest={interest} /></li>
                )}
            }): ''}</ul>
        </div>
        
        {!publication.image && <>
            <div className='flex justify-between p-3'>
                <div>
                    <ul className='flex gap-5 ml-4 mb-2'>
                       <li> <MenuLikePublication publication={publication} isReload={isReload} compteurLike={compteurLike}/></li>
                        <li>{commentList?.length}</li>
                    </ul>
                <div className='flex gap-3 ml-3 text-xl'>
                    <button  aria-label='like' onClick={()=>{likePublication(publication._id)
                         setIsLike(!isLike)
                         setIsReload(true)
                    }}>
                        <FaHeart className={`${isLike === true? 'text-red-600': 'text-red-300'}`}  />
                    </button>
                    <BiSolidCommentDetail />
                    <button  aria-label='save' onClick={()=>{ savePublication(publication._id)
                        setIsSave(!isSave)}}>
                        <FaBookmark className={`${isSave === true? 'text-primary': 'text-sky-300'}`} />
                    </button>
                </div>

                </div>
            </div>
            </>}
        <p className='text-gray-400 text-xs text-right pr-3'>{date.toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'}) 
        }</p>
       {full===true? <p className='text-gray-400 pl-3 '>Commentaires:</p>:'' } 
       <div className='overflow-y-scroll'>
        {commentList && commentList.map((comment)=>{
            const commentDate= new Date(comment.comment.createdAt)
                if(full === true) { 
                    return(
                           
                            <div key={comment.comment._id} className=' max-w-full max-h-60'>

                            <div className='flex justify-between flex-nowrap md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                                <div className='flex flex-row items-center gap-2 md:text-base'>
                                { comment.user[0].profile_image ? <Image src={`https://interest-48022f6f5975.herokuapp.com/image/view/${comment.user[0]?.profile_image}`} alt='Profile user' height={50} width={50} className='object-cover rounded-full h-10 w-10'/> : <Image src={'/default_profile.png'} alt='Profile user' height={50} width={50} className='object-cover rounded-full h-10 w-10'/>} 
                                    <p className='font-semibold cursor-pointer' onClick={()=>{
                                        router.push(`/profil/${comment.user[0].pseudo}`)
                                    }}> {comment.user[0].pseudo} </p>
                                    <p className='pr-5 text-center w-72'> {comment.comment.description} </p>
                                </div>
                                <div className='flex justify-between'>
                                <p className='text-gray-400 text-xs text-right'>{ commentDate.toLocaleString('fr-FR', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'}) 
                                }</p>
                                <MenuSettingComment comment={comment} setIsReload={
                                    setIsReload
                                }/>
                                </div>
                            </div>  
                        </div>
        
        )
    }
       }
               )} 
</div>
                    {lastComment && full === false ? <>
                        <p className='text-gray-400 pl-3 '>Dernier commentaire:</p>
                    <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                                <div className='flex flex-row items-center gap-2 md:text-base'>
                                { lastComment.user[0].profile_image ? <Image src={`https://interest-48022f6f5975.herokuapp.com/image/view/${lastComment.user[0].profile_image}`} alt='Profile user' height={50} width={50} className='object-cover rounded-full h-12 w-12'/> : <Image src={'/default_profile.png'} alt='Profile user' height={50} width={50} className='object-cover rounded-full h-12 w-12'/>} 
                                    <p className='font-semibold cursor-pointer' onClick={()=>{
                                        router.push(`/profil/${lastComment.user[0].pseudo}`)
                                    }}> {lastComment.user[0].pseudo} </p>
                                    <p className='pr-5 w-[500px] text-center md:text-left truncate ...'> {lastComment.comment.description} </p>
                                </div>
                            </div>  
               
        
</> : ''}
        <form className='border border-black rounded-b-md flex' onSubmit={handleSubmit(onSubmit)}>
            <input {...register('description')} type="text" placeholder='Ecrire un commentaire' className='md:p-3 p-2 flex w-full outline-none' ></input>
            <button type='submit' className='md:p-3 p-2 bg-primary text-white'>Envoyer</button>
        </form>   
    </div>
  )
}
