import React from 'react';
import AppRoutes from '@/AppRoutes';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className='flex'>
        <Link href={AppRoutes.home}>Home</Link>
        <Link href={AppRoutes.music.add}>Add Music</Link>
    </nav>
  )
}
