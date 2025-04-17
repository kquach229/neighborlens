'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import Image from 'next/image';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';

import ThemeToggler from './ThemeToggler';
import { NavLogo } from './Navbar';

export default function MobileSideBar() {
  const { toggleSidebar } = useSidebar();
  const { data: userSession } = useSession();
  return (
    <Sidebar>
      <SidebarHeader className='p-3'>
        <div className='flex w-full flex-row justify-between items-center'>
          <NavLogo />
          <ThemeToggler />
        </div>
      </SidebarHeader>
      <SidebarContent className='p-3'>
        <SidebarGroup className='mt-5'>
          <div className='relative flex flex-col gap-5'>
            <Link onClick={toggleSidebar} href={'/dashboard'}>
              Dashboard
            </Link>
            <Link onClick={toggleSidebar} href={'/about'}>
              About
            </Link>
            <Link onClick={toggleSidebar} href={'/pricing'}>
              Pricing
            </Link>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
