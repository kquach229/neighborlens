'use client';
import ThemeToggler from './ThemeToggler';
import { LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { Avatar } from './ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { useSession, signOut } from 'next-auth/react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import SignInButton from './SignInButton';
import CreateIdeaButton from './CreateIdeaButton';

import Logo from './Logo';

export const NavLogo = () => {
  return (
    <Link href='/' className='inline-flex items-center gap-2 font-oleo'>
      <div className='w-[150px] h-[50px] flex'>
        <Logo />
      </div>
    </Link>
  );
};

export const UserButton = () => {
  const session = useSession();
  if (!session.data?.user) return <SignInButton />;

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={session?.data?.user?.image || ''} alt='image' />
          <AvatarFallback>
            {session.data.user.name?.split(' ')[0][0]}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col gap-3'>
        <Link
          className='flex items-center gap-2'
          href={`/users/user-profile/${session.data.user.id}`}>
          <User />
          <span>Profile</span>
        </Link>
        <span
          className='w-full flex items-center gap-2 cursor-pointer'
          onClick={() => signOut()}>
          <LogOut />
          <span>Sign Out</span>
        </span>
      </PopoverContent>
    </Popover>
  );
};

const Navbar = () => {
  const session = useSession();
  // const [credits, setCredits] = useState<number | null>(null);

  // useEffect(() => {
  //   const fetchCredits = async () => {
  //     try {
  //       const res = await fetch('/api/user/credits');
  //       const data = await res.json();
  //       setCredits(data.credits);
  //     } catch (error) {
  //       console.error('Failed to fetch credits', error);
  //       setCredits(0);
  //     }
  //   };

  //   if (session.data?.user) {
  //     fetchCredits();

  //     const handleCreditsUpdated = () => fetchCredits();
  //     window.addEventListener('credits-updated', handleCreditsUpdated);

  //     return () => {
  //       window.removeEventListener('credits-updated', handleCreditsUpdated);
  //     };
  //   }
  // }, [session.data?.user]);

  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <NavLogo />
          <div className='hidden md:flex gap-6 items-center'>
            {session.data?.user && (
              <>
                <CreateIdeaButton />
              </>
            )}
            <Link
              href='/dashboard'
              className='text-sm font-medium transition-colors hover:text-primary'>
              Dashboard
            </Link>
            <Link
              href='/suggest'
              className='text-sm font-medium transition-colors hover:text-primary'>
              SallySuggest
            </Link>
            <Link
              href='/about'
              className='text-sm font-medium transition-colors hover:text-primary'>
              About
            </Link>
            <Link
              href='/pricing'
              className='text-sm font-medium transition-colors hover:text-primary'>
              Pricing
            </Link>
            <Link
              href='/blog/posts'
              className='text-sm font-medium transition-colors hover:text-primary'>
              Blog
            </Link>
          </div>
          <div className='flex gap-4 items-center'>
            <ThemeToggler />
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
