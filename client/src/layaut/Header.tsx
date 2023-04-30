import React from 'react'
import { Navbar } from './Navbar'
import { userAtom } from '@/atom'
import { useAtom } from 'jotai';

export const Header = () => {
  const [user,] = useAtom(userAtom);
  return (
    <div className=' bg-orange-400'>
        <div className=''>
            {
              user?<div>{user.firstName} {user.lastName}</div>:null
            }
        </div>
        <Navbar/>
    </div>
  )
}
