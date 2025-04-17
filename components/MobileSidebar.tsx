'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { useSidebar } from '@/components/ui/sidebar';
import { useSession } from 'next-auth/react';

import ThemeToggler from './ThemeToggler';
import { NavLogo, UserButton } from './Navbar';
import UserCredits from './UserCredits';

export default function MobileSideBar() {
  const { toggleSidebar } = useSidebar();
  const session = useSession();
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

        <SidebarGroup>
          <div className='relative flex flex-col gap-5'>
            <Link onClick={toggleSidebar} href={'/privacy-policy'}>
              Privacy Policy
            </Link>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div>
          <UserButton session={session} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
