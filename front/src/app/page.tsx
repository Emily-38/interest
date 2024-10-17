'use client'
import { loginForm } from "@/services/auth";
import { LoginType } from "@/utils/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";


export default function Home() {
  const router = useRouter()
  const {register,handleSubmit}=useForm<LoginType>()
  const onSubmit: SubmitHandler<LoginType> = (data) => {
    loginForm(data).then((res)=>{
      console.log(res.data)
      const interests = res.data.interest

      if(res.status=== 201){
        localStorage.setItem('token', res.data.token.access_token)
        toast.success('Bienvenue sur interest')
        if(interests.length > 0){ 
          router.push('/home')
        }else{
          router.push('/first_connection')
        }
      }
    }).catch((e)=>(
      toast.error(e.response.data.message)
    )
  )}
  return (
    <div className=" relative flex flex-col items-center h-lvh md:flex-row md:justify-around">
      <div className="hidden w-2/5 md:block">
        <Image src={"/image_home.jpg"} alt={"téléphone avec differents ecran"} width={1000} height={1000} className="rounded-md"/>
      </div>
      <Image src={"/logo_interest.png"} alt={"logo"} width={1000} height={1000} className="w-1/2 md:hidden"></Image>
      <div className="bg-white shadow-md w-3/4 rounded-md md:w-1/3">
        <h1 className="font-bold text-center text-xl m-3">Connexion</h1>

        <form className="flex flex-col justify-center items-center gap-4 p-3" onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email')} type="email" placeholder="Adresse e-mail" className=" border border-black rounded-md p-3 pl-4 w-5/6"/>
          <input {...register('password')} type="password" placeholder="Mot de passe" className=" border border-black rounded-md p-3 pl-4 w-5/6"/>
          <a href="" className="underline  self-start ml-7 text-xs hover:text-primary md:ml-12">Mot de passe oublié ?</a>
          <button type="submit" className="bg-primary text-white font-semibold text-center w-5/6 p-3 rounded-md">Connexion</button>
          <hr className="w-11/12 border border-black"/>
          <Link className="bg-primary text-white font-semibold text-center w-3/5 p-3 rounded-md" href={'/register'}>Crée un compte</Link>
        </form>
        
      </div>
    </div>
  );
}
