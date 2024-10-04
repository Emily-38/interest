'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  return (
    <div className=" relative flex flex-col items-center h-lvh md:flex-row md:justify-around">
      <div className="hidden w-2/5 md:block">
        <Image src={"/image_home.jpg"} alt={"téléphone avec differents ecran "} width={1000} height={1000} className="rounded-md"/>
      </div>
      <Image src={"/logo_interest.png"} alt={"logo"} width={1000} height={1000} className="w-1/2 md:hidden"></Image>
      <div className="bg-white shadow-md w-3/4 rounded-md md:w-1/3">
        <h1 className="font-bold text-center text-xl m-3">Connexion</h1>
        <form action="" className="flex flex-col justify-center items-center gap-4 p-3">
          <input type="email" placeholder="Adresse e-mail" className=" border border-black rounded-md p-3 pl-4 w-5/6"/>
          <input type="password" placeholder="Mot de passe" className=" border border-black rounded-md p-3 pl-4 w-5/6"/>
          <a href="" className="underline  self-start ml-7 text-xs hover:text-primary md:ml-12">Mot de passe oublié ?</a>
          <button type="submit" className="bg-primary text-white font-semibold text-center w-5/6 p-3 rounded-md">Connexion</button>
          <hr className="w-11/12 border border-black"/>
          <Link className="bg-primary text-white font-semibold text-center w-3/5 p-3 rounded-md" href={'/register'}>Crée un compte</Link>
        </form>
      </div>

    </div>
  );
}
