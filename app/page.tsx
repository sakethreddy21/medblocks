"use client"
import {useRouter} from "next/navigation";

export default function Home() {
  const router= useRouter()
  

  return (
    <div className="flex items-center justify-center h-screen bg-cyan-800">
     <div className="w-96 h-96 bg-gray-200 p-4 rounded-3xl flex flex-col items-center justify-center space-y-4">
     <button className="p-4 rounded-xl border-black border-2 w-32  justify-center items-center" onClick={()=>router.push("/register")}>
      Register
    </button>
    <button className="p-4 rounded-xl border-black border-2 w-32 justify-center items-center"
    onClick={()=>router.push("/list")}>
      List
    </button>
    <button className="p-4 rounded-xl border-black border-2 w-32 justify-center items-center"
    onClick={()=>router.push("/tree")}>
      Tree
    </button>
  </div>
    </div>
  );
}
