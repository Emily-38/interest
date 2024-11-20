'use client'
import { deleteComment, getAllComment } from '@/services/comment'
import { deletePublication, getPublication } from '@/services/publication'
import { deleteUser, disabledUser, getAllUser } from '@/services/user'
import { commentAdminType} from '@/utils/comment'
import { ParamsType } from '@/utils/parametre'
import { PublicationType } from '@/utils/publication'
import { UserType } from '@/utils/user'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaBan, FaEye, FaTrash } from 'react-icons/fa6'
import { toast } from 'react-toastify'

const Admin = ({params}:ParamsType) => {
    const[userList,setUserList]=useState<UserType[]>()
    const[publicationList,setPublicationList]=useState<PublicationType[]>()
    const[commentList,setCommentList]=useState<commentAdminType[]>()
    const router = useRouter()

  useEffect(() => {
    getAllUser().then((res)=>{
        setUserList(res.data)
    }) 
    getPublication().then((res)=>{
        setPublicationList(res.data)
    })
    getAllComment().then((res)=>{
        setCommentList(res.data)
    })
  }, [])
  
    return (
    <>
     <div className='bg-white w-full md:hidden p-3'>
        <ul className='flex gap-3 justify-center items-center text-center'>
            <li className={`${params.setting === 'users'? 'font-bold':''} cursor-pointer`} onClick={()=>{
                router.push('/admin/users')
            }}>Users </li>
            <li className={`${params.setting === 'publications'? 'font-bold':''} cursor-pointer`} onClick={()=>{
                router.push('/admin/publications')
            }}>Publications</li>
            <li className={`${params.setting === 'commentaires'? 'font-bold':''} cursor-pointer`} onClick={()=>{
                router.push('/admin/commentaires')
            }}>Commentaires</li>
        </ul>
    </div>
    {params.setting === 'users'?
        <div className={`text-gray-900`}>
        <div className="p-4 flex justify-center">
            <h1 className="text-3xl">
                Users
            </h1>
        </div>
        <div className="px-3 py-4 overflow-x-scroll">
            <table className="md:w-full  text-md bg-white shadow-md rounded mb-4 ">
                <tbody className=''>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Pseudo</th>
                        <th className="text-left p-3 px-5">Email</th>
                        <th className="text-left p-3 px-5">Active</th>
                        <th className="text-left p-3 px-5">Date</th>
                        <th className="text-center p-3 px-5">Action</th>   
                    </tr>
                    {userList && userList.map((user)=>{
                        const createdAt= new Date(user.createdAt)
                        return(
                            <tr key={user.id} className="border-b hover:bg-sky-100 bg-gray-100">
                            <td className="p-3 px-5">{user.pseudo}</td>
                            <td className="p-3 px-5">{user.email}</td>
                            <td className="p-3 px-5">{user.isActive === true ? 'Active': 'Inactive'} </td>
                            <td className="p-3 px-5">{ createdAt.toLocaleString('fr-FR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        })}</td>
                            <td className="p-3 px-5 flex justify-center">
                            <button aria-label='view' type="button" className="mr-3 text-xl  py-1 px-2" onClick={()=>{
                                router.push(`../profil/${user.pseudo}`)
                            }}><FaEye /></button>
                            <button aria-label='delete' type="button" className="text-xl py-1 px-2" onClick={()=>{
                                deleteUser().then((res)=>{
                                    if(res.status === 200){
                                        toast.success('L\'utilisateur a été supprimer')
                                    }
                                })
                            }}><FaTrash /></button>
                            <button aria-label='desable' className='py-1 px-2 text-red-600 text-xl' onClick={()=>{
                                disabledUser(user.id).then((res)=>{
                                    if(res.status === 200){
                                        toast.success('L\'utilisateur a été désactivé')
                                    }
                                })
                            }}><FaBan /></button>
                            </td>
                            </tr>
                        )
                        })} 
                </tbody>
            </table>
        </div>
    </div>
:''}
{params.setting === 'publications'?
    <div className={`text-gray-900`}>
        <div className="p-4 flex justify-center">
            <h1 className="text-3xl">
                Publications
            </h1>
        </div>
        <div className="px-3 py-4 overflow-x-scroll">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <tbody>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Pseudo</th>
                        <th className="text-left p-3 px-5">Publication</th>
                        <th className="text-left p-3 px-5">Image</th>
                        <th className="text-left p-3 px-5">Date</th>
                        <th className="text-center p-3 px-5">Action</th>   
                    </tr>
                    {publicationList && publicationList.map((publication)=>{
                       const userPublication = userList?.find(user => user.id === publication.userId);
                            
                        
                        const createdAt = new Date(publication.createdAt)
                        return(
                            <tr key={publication._id} className="border-b hover:bg-sky-100 bg-gray-100">
                            <td className="p-3 px-5">{userPublication?.pseudo}</td>
                            <td className="p-3 px-5">{publication._id}</td>
                            <td className="p-3 px-5">{publication.image ? 'Oui': 'Non'} </td>
                            <td className="p-3 px-5">{ createdAt.toLocaleString('fr-FR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        })}</td>
                            <td className="p-3 px-5 flex justify-center">
                            <button aria-label='view' type="button" className="mr-3 text-xl  py-1 px-2 " onClick={()=>{
                                router.push(`../publication/${publication._id}`)
                            }}><FaEye /></button>
                            <button aria-label='delete' type="button" className="text-xl py-1 px-2" onClick={()=>{
                                deletePublication(publication._id).then((res)=>{
                                    if(res.status === 200){
                                        toast.success('La publication a été supprimer')
                                    }
                                })
                            }}> <FaTrash />
                            </button>
                            </td>
                            </tr>
                        )
                        })} 
                </tbody>
            </table>
        </div>
    </div>
:''}
{params.setting === 'commentaires'?
    <div className={`text-gray-900`} >
        <div className="p-4 flex justify-center">
            <h1 className="text-3xl">
                Commentaires
            </h1>
        </div>
        <div className="px-3 py-4 overflow-x-scroll">
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <tbody>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Pseudo</th>
                        <th className="text-left p-3 px-5">comment</th>
                        <th className="text-left p-3 px-5">Date</th>
                        <th className="text-center p-3 px-5">Action</th>   
                    </tr>
                    {commentList && commentList.map((comment)=>{
                        
                       const userComment = userList?.find(user => user.id === comment.userId);
                        const createdAt = new Date(comment.createdAt)
                        return(
                            <tr  key={comment._id} className="border-b hover:bg-sky-100 bg-gray-100">
                            <td className="p-3 px-5">{userComment?.pseudo}</td>
                            <td className="p-3 px-5">{comment._id}</td>
                            <td className="p-3 px-5">{ createdAt.toLocaleString('fr-FR', {
                                        year: 'numeric',
                                        month: 'numeric',
                                        day: 'numeric',
                                        })}</td>
                            <td className="p-3 px-5 flex justify-center">
                            <button aria-label='view' type="button" className="mr-3 text-xl  py-1 px-2 " onClick={()=>{
                                router.push(`../publication/${comment.postId}`)
                            }}><FaEye /></button>
                            <button aria-label='delete' type="button" className="text-xl py-1 px-2" onClick={()=>{
                                deleteComment(comment._id).then((res)=>{
                                    if(res.status === 200){
                                        toast.success('Le commentaire a été supprimer')
                                    }
                                })
                            }}> <FaTrash />
                            </button>
                            </td>
                            </tr>
                        )
                        })} 
                </tbody>
            </table>
        </div>
    </div>
:''}

</>
  )
}

export default Admin