'use client'
import forget_password from '@/app/forget_password/page'
import { Badge } from '@/components/Badge'
import { InterestForm } from '@/components/InterestForm'
import ProfileUser from '@/components/ProfileUser'
import { getConfidentiality } from '@/services/confidentiality'
import { deleteImage, InsertImage } from '@/services/image'
import { getInterest } from '@/services/interest'
import { change_Password, deleteUser, forgetPassword, getCurrentUser, updateUser } from '@/services/user'
import { ConfidentialityType } from '@/utils/confidentiality'
import { InterestType } from '@/utils/interest'
import { ParamsType } from '@/utils/parametre'
import { UserType, UserUpdateType } from '@/utils/user'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Rings } from 'react-loader-spinner'
import { toast } from 'react-toastify'

const Setting = ({params}:ParamsType) => {
    const[interest,setInterest]=useState<InterestType[]>()
    const[user,setUser]=useState<UserType>()
    const[interestUser,setInterestUser]=useState<string[]>([])
    const[confidentialityList,setConfidentialityList]=useState<ConfidentialityType[]>()
    const[confidentiality, setConfidentiality]=useState('')
   
    const router=useRouter()

    const {register,handleSubmit}=useForm<UserUpdateType>()
    const onSubmit: SubmitHandler<UserUpdateType> = async (data) => {
        if (data.profile_image && data.profile_image[0]) {
            deleteImage(user?.profile_image)

            const formData = new FormData();
            formData.append("file", data.profile_image[0]);
            try {
              const uploadResponse = await InsertImage(formData);
              const filename = uploadResponse.data; 

        updateUser(interestUser,data, filename).then((res)=>{
            if(res.status === 200 ) 
            toast.success('modification prise en compte')
            window.location.reload()
        })
    }catch (error) {
        toast.error("Echec de la creation de publication");
      }
    }else{ 
        updateUser( interestUser,data).then((res)=>{
            if(res.status === 200 )
            toast.success('modification prise en compte')
            window.location.reload()
        })
    }
  };

    useEffect(() => {
     getInterest().then((res)=>{
        setInterest(res.data)
     })

     getCurrentUser().then((res)=>{
        setUser(res.data)
     })

     getConfidentiality().then((res)=>{
        setConfidentialityList(res.data)
     })
    
    }, [])

    if(!user){
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
  <>
    <div className='bg-white w-full md:hidden p-3'>
        <ul className='flex gap-3 justify-center items-center text-center'>
            <li className={`${params.setting === 'updateProfile'? 'font-bold':''} cursor-pointer`} onClick={()=>{
                router.push('/setting/updateProfile')
            }}>Modifier le profil </li>
            <li className={`${params.setting === 'confidentialiter'? 'font-bold':''} cursor-pointer`} onClick={()=>{
                router.push('/setting/confidentialiter')
            }}>Confidentialité du compte</li>
            <li className={`${params.setting === 'personal'? 'font-bold':''} cursor-pointer`} onClick={()=>{
                router.push('/setting/personal')
            }}>Information personnelle</li>
        </ul>
    </div>

    {params.setting === 'updateProfile'?
    <form className='flex flex-col gap-10 items-center' onSubmit={handleSubmit(onSubmit)}>
        <div className='bg-white rounded-md flex justify-around md:w-1/2 w-full  m-5'>
            <ProfileUser button={false} col={true} user={user}/>
            <div className='flex justify-center items-center gap-3'>
                {user.interestId && user.interestId.map((interest)=>{
                    return <Badge key={interest.id} content={true} interest={interest}/>
                })}
            </div>
        </div>
        <p className='text-lg' onClick={()=>{ console.log(interestUser)}}>Modifier la photo de profil:</p>
        <input {...register('profile_image')} type="file" className=' border bg-white border-black text-center rounded-md p-2 md:w-1/3 w-4/5'/>
        <p className='text-lg'>Modifier le pseudo:</p>
        <input {...register('pseudo')} defaultValue={user.pseudo} type="text" placeholder={user.pseudo} className=" border border-black text-center rounded-md md:w-1/3 w-4/5 p-2"/>
            <p className='text-lg'>Ajouter ou supprimer des interets:</p>
            <div className='md:w-1/3 w-4/5'>
                <InterestForm setInterestUser={setInterestUser} user={user}/>
            </div>     
        <button type="submit" className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/3'>Modifier
        </button>
    </form>:''}

    {params.setting === 'confidentialiter'?
     <form className='flex flex-col gap-10 justify-center items-center md:w-1/2 w-full md:h-lvh text-center mx-auto m-5' onSubmit={handleSubmit(onSubmit)}>
       <p className='font-semibold text-2xl'onClick={()=>{console.log(user)}}>Confidentialité du compte</p>
       <p>{`La confidentialité d'un compte fait référence à la gestion de la visibilité des publications et informations partagées sur ce compte. Si un compte est défini comme privé, cela signifie que seules les personnes qui suivent ce compte (après avoir reçu une autorisation) peuvent voir les publications, photos partagées. En revanche, si un compte est défini comme public, tout le monde, y compris ceux qui ne suivent pas le compte, peut accéder et voir les publications. Le choix entre un compte privé ou public permet donc de contrôler qui a accès à ses informations.`}</p>
       <p>Votre compte est actuellement {user.confidentialityId == 'c8a2e0ab-19f3-443d-8809-90c62741fc9e'?'Public':'Privé'}</p>
       <select {...register('confidentialityId')} className='bg-white border border-black text-center rounded-md p-2 w-2/4'>
       {confidentialityList && confidentialityList.map((option)=>{
        return(
          <option key={option.id} value={option.id}>{option.name}</option>
        )
       })}
       </select>
        <button type="submit" className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2'>Modifier
        </button>
        <button className='bg-red-600 rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{
            deleteUser()
            toast.success('Votre compte a été supprimé')
            router.push('/')
        }}>Supprimer son compte 
        </button>
     </form>
    :''}

    {params.setting === 'personal'?
    <form className='flex flex-col gap-10 items-center justify-center md:w-1/2 w-full md:h-lvh h-full text-center mx-auto m-5' onSubmit={handleSubmit(onSubmit)}>
        <p className='font-semibold text-2xl'>Confidentialité du compte</p>
        <p className='text-lg'>Modifier votre email:</p>
        <input {...register('email')}  type="email" placeholder='Ecrire votre Email' className=' border bg-white border-black text-center rounded-md p-2 md:w-1/2 w-4/5'/>
        <p className='text-lg'>Modifier votre votre genre:</p>
        <select {...register('gender')} defaultValue={user.gender} className='bg-white border border-black rounded-md p-3 pl-4 md:w-1/2 w-4/5 text-center '>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
        </select>
        <p className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{ 
            console.log(user.email)
            forgetPassword(user.email).then((res)=>{
                if(res.status === 200){
                    toast.success('un email vous a été envoyé')
                }
            }).catch((e)=>{
                toast.error(e.response.data.message)
            })
        }}>Modifier votre mot de passe
        </p>
        <button type="submit" className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2'>Modifier 
        </button>
    </form>
    :''}
  </>
  )
}

export default Setting