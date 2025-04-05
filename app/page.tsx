import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';

import { AlertCircle, Gem, MessageCircle, StarIcon } from 'lucide-react';
import Image from 'next/image';
import { auth } from '../auth';
import SignInButton from '@/components/SignInButton';

export default async function Home() {
  return (
    <div className='min-h-screen p-5'>
      <div className='flex justify-between items-center h-full gap-10'>
        <div className='flex flex-col justify-center md:w-[800px] gap-6'>
          <h1 className='font-bold'>
            Unlock Insights from Real World Users. No AI, just Humans
          </h1>
          <span>
            Get real validation for your startup idea—before you waste time and
            money.
          </span>
          <span>
            <SignInButton />
          </span>
        </div>

        <Image
          className='h-[600px] w-[600px]'
          src={'/neighborhood-hero-image.jpg'}
          alt='hero-image'
          objectFit='cover'
          height={600}
          width={600}
        />
      </div>

      {/* {discover} */}

      <div className='mt-52'>
        <div className='w-3/4'>
          <h2 className='mb-5'>Explore Your Neighborhood Like Never Before</h2>
          <span>
            Stay connected with your community through our Vicinity Feed, where
            local updates and posts from your neighbors come alive. Dive deeper
            into neighborhood insights and make informed decisions about where
            you live.
          </span>
          <span className='mt-10'>
            Stay connected with your community through our Vicinity Feed, where
            local updates and posts from your neighbors come alive. Dive deeper
            into neighborhood insights and make informed decisions about where
            you live.
          </span>
        </div>
        <div className='grid grid-cols-3 gap-5 w-full place-items-center mt-24 text-center'>
          <div>
            <Gem className='place-self-center mb-5 h-[3rem] w-[3rem]' />
            <h6>Uncover Hidden Gems in Your Area</h6>

            <span>
              Our Neighborhood Deep Dive feature provides detailed scores and
              insights tailored to your ZIP code.
            </span>
          </div>
          <div className='self-center items-center'>
            <AlertCircle className='place-self-center mb-5 h-[3rem] w-[3rem]' />
            <h6>Stay Informed with Real-Time Alerts</h6>
            <span>
              Receive instant notifications about crime, development, and rental
              opportunities in your vicinity.
            </span>
          </div>
          <div className='self-center items-center'>
            <MessageCircle className='place-self-center mb-5 h-[3rem] w-[3rem]' />
            <h6>Join the Conversation with Polls & Surveys</h6>
            <span>
              Engage with your neighbors through fun and informative polls that
              shape your community.
            </span>
          </div>
        </div>
      </div>

      <div className='mt-52 flex justify-around items-center gap-10'>
        <Image
          className='h-[600px] w-[600px]'
          src={'/neighborhood-hero-image.jpg'}
          alt='hero-image'
          height={600}
          width={600}
          objectFit='cover'
          objectPosition='center'
          loading='lazy'
        />

        <div className='gap-10 flex flex-col w-1/2'>
          <h2>
            Discover Your Neighborhood: Stay Connected and Informed with
            AreaVibe
          </h2>
          <span>
            With AreaVibe, you can easily stay informed about local happenings
            and trends. Compare neighborhoods effortlessly to make the best
            decisions for your lifestyle.
          </span>
          <div className='flex justify-start gap-5'>
            <span className='w-80'>
              <h6>Stay Informed</h6>
              <span>
                Receive updates on community events, safety alerts, and local
                news in real-time.
              </span>
            </span>
            <span className='w-80'>
              <h6>Easy Comparisons</h6>
              <span>
                Effortlessly compare neighborhoods to find the perfect fit for
                your needs.
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className='mt-52 mx-auto text-center'>
        <h2 className='mb-10'>Uncover Your Neighborhood Like Never Before</h2>
        <span className=''>
          With AreaVibe, simply enter your ZIP code or allow GPS access to
          unlock a world of local insights. Stay informed and connected with
          real-time updates tailored to your specific area.
        </span>
        <div className='grid grid-cols-3 place-items-center mt-10'>
          <div>
            <Image
              className='place-self-center'
              src={'/neighborhood-image.jpg'}
              alt='image'
              height={300}
              width={300}
            />
            <h4 className='mt-5'>Stay Updated with Vicinity Feed</h4>
          </div>
          <div>
            <Image
              className='place-self-center'
              src={'/neighborhood-image.jpg'}
              alt='image'
              height={300}
              width={300}
            />
            <h4 className='mt-5'>Stay Updated with Vicinity Feed</h4>
          </div>
          <div>
            <Image
              className='place-self-center'
              src={'/neighborhood-image.jpg'}
              alt='image'
              height={300}
              width={300}
            />
            <h4 className='mt-5'>Stay Updated with Vicinity Feed</h4>
          </div>
        </div>
      </div>

      {/* User Testimonials */}
      <div className='mt-52'>
        <h2 className='mb-5'>User Testimonials</h2>
        <span>See what users are saying</span>
        <div className='flex gap-5 mt-5 mb-28'>
          <Card className='p-5'>
            <div className='flex'>
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
            </div>

            <span>
              "AreaVibe has made me feel more at home in my area. I love staying
              updated on local happenings!"
            </span>
            <CardFooter className='flex gap-5'>
              <div>
                <Avatar>
                  <AvatarImage src='/lily.jpeg' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className='font-semibold'>Lily James</div>
                <div className='text-sm'>Local Resident</div>
              </div>
            </CardFooter>
          </Card>
          <Card className='p-5'>
            <div className='flex'>
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
              <StarIcon color='ffee8c' fill='ffee8c' />
            </div>
            <span>
              "I never knew my neighbors cared so much until I joined! The
              alerts keep me informed and engaged."
            </span>
            <CardFooter className='flex gap-5'>
              <div>
                <Avatar>
                  <AvatarImage src='/lily.jpeg' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div className='font-semibold'>Lily James</div>
                <div className='text-sm'>Local Resident</div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className='mt-52 mb-52'>
        <div className='flex border border-foreground items-center justify-between pl-10 pr-10 h-32'>
          <div>
            <h2>Discover Your Neighborhood Today</h2>
            <div className='mt-2'>
              Get local insights right at your fingertips!
            </div>
          </div>
          <div>
            <Button>Learn More</Button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className='flex justify-around items-center'>
        <div>
          <h2>Stay Updated with AreaVibe</h2>
          <div className='mt-5'>
            Join our community for the latest neighborhood insights and updates
            delivered right to your inbox.
          </div>
          <div className='flex gap-2 mt-10'>
            <input className='flex-1 bg-muted' type='text' />
            <Button>Submit</Button>
          </div>
          <div className='mt-5 text-xs'>
            By clicking Sign Up, you agree to our Terms and Conditions.
          </div>
        </div>
        <div>
          <div>
            <Image
              className='h-[600px] w-[600px]'
              src={'/neighborhood-hero-image.jpg'}
              alt='hero-image'
              height={600}
              width={600}
              objectFit='cover'
              objectPosition='center'
              loading='lazy'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
