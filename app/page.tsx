'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

const Mainmenu = () => {
  const router = useRouter()
  
  return (
    <div className=' w-sceen h-screen py-auto flex items-center bg-zinc-950 '>
      <div className='m-auto flex flex-col bg-zinc-900 w-[50%] h-[50%] items-center rounded-xl '>
        <div className='w-full m-auto flex flex-col items-center'>
        <button className='w-[90%] h-12 mt-4 p-auto border-zinc-600 border-solid border-2 rounded-lg hover:bg-slate-950 ' onClick={() => {router.push('/Game/Ai')}}>
          Against Ai
        </button>
        <button className='w-[90%] h-12 mt-4 p-auto border-zinc-600 border-solid border-2 rounded-lg hover:bg-slate-950' onClick={() => {router.push('/Game/local')}}>
          Local Multiplayer
        </button>
        <button className='w-[90%] h-12 mt-4 p-auto border-zinc-600 border-solid border-2 rounded-lg hover:bg-slate-950'>
          Online Multiplayer
        </button>

        </div>
      </div>
    </div>
  )
}

export default Mainmenu
