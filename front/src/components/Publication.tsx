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
import { comment } from 'postcss'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { likePubliction, savePubliction } from '@/services/publication'

export const Publication = ({full,publication}:{full:boolean, publication:PublicationType}) => {
    const[isLike,setIsLike]= useState(false)
    const[isSave,setIsSave]= useState(false)
    const[userList,setUserList]= useState<UserType[]>()
    const[commentList,setCommentList]= useState<commentType[]>()
    const[lastComment,setLastComment]=useState<commentType>()
    const date = new Date(publication.createdAt)

    const {register,handleSubmit, reset}=useForm<createCommentType>()
    const onSubmit: SubmitHandler<createCommentType> = async (data) => {
        createComment(publication._id,data).then((res)=>{
            if(res.status ===201 ){
                toast.success('Commentaire envoyé')
                reset()
            }
        })
    }

    useEffect(() => {
        getAllUser().then((res)=>{
            setUserList(res.data)
          })
          
          getCommentByIdPost(publication._id).then((res)=>{
             console.log('comment',res.data)
            setCommentList(res.data)
          })
          if(publication.like.includes(publication.user.id)){
            setIsLike(true)
          }
          if(publication.save.includes(publication.user.id)){
            setIsSave(true)
          }
         
    }, [])
    
     useEffect(() => {
        if(commentList){  
            setLastComment(commentList[0])
        }
        
     }, [commentList])

  return (

    <div className=' w-full md:w-full md:mt-10 bg-white  mx-auto col-span-2 rounded-md mt-5'>
        <div className='flex justify-between items-center pl-3 pr-3 m-2'>
          {userList && userList.map((user)=>{
            if(user.id === publication.userId){ 
                return( <div key={user.id}>
                        <div className='flex items-center gap-3 p-3 cursor-pointer'>
                            <Image width={50} height={50} alt='Profile User' src={`http://localhost:3000/image/view/${user.profile_image}`} property='true' className='rounded-full h-10 w-10 object-cover'/>
                            <p> {user.pseudo} </p>
                        </div>
                        </div>
                )
            }   
        } )}
            <MenuSettingPublication publication={publication}/>
        </div>

        {publication.image && 
        <>
            <Image src={`http://localhost:3000/image/view/${publication.image}`} alt='Image de publication' width={1000} height={1000} className='mt-2 w-full' property='true'/>
            <div className='flex justify-between p-3'>
                <div>
                    <ul className='flex gap-5 ml-4'>
                        <MenuLikePublication publication={publication} isLike={isLike}/>
                        <li>{commentList?.length}</li>  
                    </ul>
                <div className='flex gap-3 ml-3 text-xl'>
                    <button onClick={()=>{ likePubliction(publication._id)
                        setIsLike(!isLike)
                    
                    }}>
                        <FaHeart className={`${isLike === true? 'text-red-600': 'text-red-300'}`}  />
                    </button>
                    <BiSolidCommentDetail />
                    <button onClick={()=>{savePubliction(publication._id)
                        setIsSave(!isSave)}}>
                        <FaBookmark className={`${isSave === true? 'text-primary': 'text-sky-300'}`} />
                    </button>
                </div>
                </div>
            </div>
        </>}
            <div>             
            { full === true ? 
            <ul className='flex'>
                <li className='text-gray-400'><Badge content={true} interest={{
                          id: '',
                          name: ''
                      }} setInterestUser={function (value: React.SetStateAction<string[]>): void {
                          throw new Error('Function not implemented.')
                      } }/></li>
                <li className='text-gray-400'><Badge content={true} interest={{
                          id: '',
                          name: ''
                      }} setInterestUser={function (value: React.SetStateAction<string[]>): void {
                          throw new Error('Function not implemented.')
                      } }/></li>
                <li className='text-gray-400'><Badge content={true} interest={{
                          id: '',
                          name: ''
                      }} setInterestUser={function (value: React.SetStateAction<string[]>): void {
                          throw new Error('Function not implemented.')
                      } }/></li>
            </ul>
            :''}
        </div>
        <p className='text-center'> {publication.description}</p>
        {!publication.image && <>
            <div className='flex justify-between p-3'>
                <div>
                    <ul className='flex gap-5 ml-4'>
                        <MenuLikePublication publication={publication} isLike={isLike}/>
                        <li>{commentList?.length}</li>
                        
                    </ul>
                <div className='flex gap-3 ml-3 text-xl'>
                    <button onClick={()=>{likePubliction(publication._id)
                         setIsLike(!isLike)
                    }}>
                        <FaHeart className={`${isLike === true? 'text-red-600': 'text-red-300'}`}  />
                    </button>
                    <BiSolidCommentDetail />
                    <button onClick={()=>{ savePubliction(publication._id)
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
        {commentList && commentList.map((comment)=>{
           
            const commentDate= new Date(comment.comment.createdAt)
                            if(full === true) { 
                                return(
                                        <>
                                            <p className='text-gray-400 pl-3 '>Commentaires:</p>
                                            <div className='overflow-y-scroll max-w-full max-h-60'>

                            <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                                <div className='flex flex-row items-center gap-2 md:text-base'>
                                    <Image width={50} height={50} alt='Profile User' src={`http://localhost:3000/image/view/${comment.user[0].profile_image}`} className='rounded-full h-10 w-10 object-cover  md:h-12 md:w-12'/>
                                    <p className='font-semibold'> {comment.user[0].pseudo} </p>
                                    <p className='pr-5 text-center md:text-left'> {comment.comment.description} </p>
                                </div>
                                <p className='text-gray-400 text-xs text-right pr-3'>{ commentDate.toLocaleString('fr-FR', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'}) 
                                }</p>
                            </div>  
                        </div>
        </>
        )
    }
       }
               )} 

               
                    <p className='text-gray-400 pl-3 '>Dernier commentaire:</p>
                    {lastComment? <>
                    <div className='flex justify-between md:items-center gap-2 p-3 flex-col md:flex-row  md:text-base'>
                                <div className='flex flex-row items-center gap-2 md:text-base'>
                                    <Image width={50} height={50} alt='Profile User' src={`http://localhost:3000/image/view/${lastComment.user[0].profile_image}`} className='rounded-full h-10 w-10 object-cover md:h-12 md:w-12'/>
                                    <p className='font-semibold'> {lastComment.user[0].pseudo} </p>
                                    <p className='pr-5 text-center md:text-left'> {lastComment.comment.description} </p>
                                </div>
                            </div>  
               
        
</> : <div className='text-gray-400  pr-3 text-center'>Pas encore de commentaire ... </div> }
        <form className='border border-black rounded-b-md flex' onSubmit={handleSubmit(onSubmit)}>
            <input {...register('description')} type="text" placeholder='Ecrire un commentaire' className='md:p-3 p-2 flex w-full outline-none' ></input>
            <button type='submit' className='md:p-3 p-2 bg-primary text-white'>Envoyer</button>
        </form>   
    </div>
  )
}
