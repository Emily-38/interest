'use client'
import { Badge } from '@/components/Badge'
import ProfileUser from '@/components/ProfileUser'
import { ParamsType } from '@/utils/parametre'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaCircle } from 'react-icons/fa6'

const setting = ({params}:ParamsType) => {
    const router=useRouter()
    
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
    <div className='flex flex-col gap-10 items-center'>
        <div className='bg-white rounded-md flex justify-around md:w-1/2 w-full  m-5'>
            <ProfileUser button={false} col={true} pseudo={'NoName'}/>
            <div className='flex justify-center items-center gap-3'>
                <Badge content={true}/>
                <FaCircle className='self-center text-xs'/>
                <Badge content={true}/>
                <FaCircle className='self-center text-xs'/>
                <Badge content={true}/>
            </div>
        </div>
        <p className='text-lg'>Modifier la photo de profil:</p>
        <input type="file" className=' border bg-white border-black text-center rounded-md p-2 md:w-1/3 w-4/5'/>
        <p className='text-lg'>Modifier le pseudo:</p>
        <input type="text" placeholder="Pseudo" className=" border border-black text-center rounded-md md:w-1/3 w-4/5 p-2"/>
        <p className='text-lg'>Ajouter ou supprimer des interets:</p>
        <div className='border border-black p-2 bg-white rounded-md flex flex-col md:flex-row md:w-1/3 w-4/5 '>
            <div className='p-3 grid grid-cols-2 gap-4'>
                <Badge content={false}/>
                <Badge content={false}/>
                <Badge content={false}/>
            </div>
            <div className='self-end flex mx-auto'>
                <input type="text" placeholder="Ajoute ton centre d'interet" className='appearance-none border-b-2 text-center outline-none border-b-gray-300'/>
                <button type='submit' className='bg-primary  text-white rounded-md p-1'>Ajouter</button>
            </div>
        </div>
        <button type="submit" className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/3' onClick={()=>{ 
            }}>Modifier
        </button>
    </div>:''}

    {params.setting === 'confidentialiter'?
     <div className='flex flex-col gap-10 justify-center items-center md:w-1/2 w-full md:h-lvh text-center mx-auto m-5'>
       <p className='font-semibold text-2xl'>Confidentialité du compte</p>
       <p>La confidentialité d'un compte fait référence à la gestion de la visibilité des publications et informations partagées sur ce compte. Si un compte est défini comme privé, cela signifie que seules les personnes qui suivent ce compte (après avoir reçu une autorisation) peuvent voir les publications, photos partagées. En revanche, si un compte est défini comme public, tout le monde, y compris ceux qui ne suivent pas le compte, peut accéder et voir les publications. Le choix entre un compte privé ou public permet donc de contrôler qui a accès à ses informations.</p>
       <select className='bg-white border border-black rounded-md p-3 pl-4 w-1/2 text-center '>
            <option value="">Public</option>
            <option value="">Privée</option>  
        </select>
        <button type="submit" className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{ 
            }}>Modifier
        </button>
        <button type="submit" className='bg-red-600 rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{ 

        }}>Supprimer son compte 
        </button>
     </div>
    :''}

    {params.setting === 'personal'?
    <div className='flex flex-col gap-10 items-center justify-center md:w-1/2 w-full md:h-lvh h-full text-center mx-auto m-5'>
        <p className='font-semibold text-2xl'>Confidentialité du compte</p>
        <p className='text-lg'>Modifier  votre email:</p>
        <input type="email" placeholder='Ecrire votre Email' className=' border bg-white border-black text-center rounded-md p-2 md:w-1/2 w-4/5'/>
        <p className='text-lg'>Modifier votre votre genre:</p>
        <select className='bg-white border border-black rounded-md p-3 pl-4 md:w-1/2 w-4/5 text-center '>
            <option value="">Homme</option>
            <option value="">Femme</option>
            <option value="">Autre</option>
        </select>
        <button type="submit" className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{ 

        }}>Modifier votre mot de passe
        </button>
        <button type="submit" className='bg-primary rounded-md text-white text-center p-3 mx-auto w-4/5 md:w-1/2' onClick={()=>{ 

        }}>Modifier 
        </button>
    </div>
    :''}
  </>
  )
}

export default setting