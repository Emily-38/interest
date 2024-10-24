
import { UserType } from '@/utils/user'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const ProfileUser = ({button,col,user}:{button:boolean,col:boolean,user:UserType}) => {

const router= useRouter()
    return (
    <div className={`flex ${col === true ?'flex-col flex-shrink-0 p-3':'w-full'} justify-between items-center gap-3 flex-nowrap cursor-pointer `} onClick={()=>{
        router.push(`/profil/${user.pseudo}`)
    }}>
        {user.profile_image? <Image width={1000} height={1000} alt='Profile user' src={`http://localhost:3000/image/view/${user.profile_image}`} className={`object-cover rounded-full h-12 w-12 ${col === true? 'md:w-32 md:h-32':''} `}/>:<Image width={1000} height={1000} alt='Profile user' src='/default_profile.png' className={`object-cover rounded-full h-12 w-12 ${col === true? 'md:w-32 md:h-32':''} `}/>}
        <p className='mx-auto'>{user.pseudo}</p>
    {button === true ?
     <button className='bg-primary text-white rounded-md p-1'>Suivre</button>
    :''}
    </div>
  )
}

export default ProfileUser