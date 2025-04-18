import type { Metadata } from 'next';
import { Oleo_Script, Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';
import { GlobalDialog } from '@/components/ReusableDialog';
import IdeaForm from '@/components/IdeaForm';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import MobileSideBar from '@/components/MobileSidebar';
import { Toaster } from 'sonner';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

const oleo = Oleo_Script({
  variable: '--font-oleo-script',
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata: Metadata = {
  title: 'ValidateLens',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${roboto.className} ${oleo.variable} antialiased`}>
        <SidebarProvider>
          <SessionProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange>
              <div className='max-w-[1500px] mx-auto overflow-hidden p-2 w-full'>
                <div className='block md:hidden'>
                  <MobileSideBar />
                  <SidebarTrigger />
                </div>
                <div className='hidden md:block'>
                  <Navbar />
                </div>

                {children}
                <Toaster />
                <Footer />
                <GlobalDialog />
              </div>
            </ThemeProvider>
          </SessionProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
