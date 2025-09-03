// app/about/page.tsx

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className='mx-auto px-4 py-12 space-y-10'>
      <section>
        <div className='h-[15vh] w-full'>
          <Image
            className='w-full object-cover h-[15vh] duration-500 grayscale hover:grayscale-0 rounded-md'
            alt='banner'
            height={'800'}
            width={'800'}
            src={'/banner.png'}
          />
        </div>
      </section>
      <section>
        <h1 className='text-4xl font-bold mb-4'>About ValidateLens</h1>
        <p className='text-lg'>
          ValidateLens helps startup founders quickly validate ideas by getting
          honest feedback from real humans — not just AI. We connect founders
          with experienced validators who’ve built, invested in, or operated
          startups.
        </p>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-2'>Who it's for</h2>
        <ul className='list-disc pl-6 space-y-1'>
          <li>First-time founders looking to stress-test ideas</li>
          <li>Startup builders validating multiple ideas</li>
          <li>Investors or operators offering early-stage feedback</li>
        </ul>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-2'>How it works</h2>
        <ol className='list-decimal pl-6 space-y-1'>
          <li>Submit your startup idea through a short form</li>
          <li>Get feedback and scores from real validators</li>
          <li>Use that insight to pivot, refine, or go build</li>
        </ol>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-2'>Why we built this</h2>
        <p className='text-lg leading-relaxed'>
          Too many founders waste months building products no one truly needs.
          ValidateLens was born from the belief that validation should happen
          before you go all-in.
        </p>
        <p className='mt-3 text-lg leading-relaxed'>
          By creating a simple way to get unbiased, structured feedback, we're
          helping founders build products that solve real problems, faster.
        </p>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-2'>Our Mission</h2>
        <p className='text-lg leading-relaxed'>
          Our mission is to help founders spend less time guessing and more time
          building. We want to empower entrepreneurs to:
        </p>
        <ul className='list-disc pl-6 mt-3 space-y-2 text-lg'>
          <li>Validate ideas quickly and affordably</li>
          <li>Access diverse perspectives and insights</li>
          <li>Avoid costly mistakes caused by lack of early feedback</li>
          <li>Build a strong foundation for future growth</li>
        </ul>
      </section>

      <div className='mt-32 text-center mx-auto w-full'>
        <h2>Meet The Team</h2>
        <div className='mt-5 text-md text-foreground opacity-70 max-w-[700px] w-full mx-auto'>
          <span className='text-center'>
            We are still growing and look to add more members as the
            ValidateLens community grows. That being said, we appreciate your
            support!
          </span>
        </div>

        <div className='grid grid-cols-1 mx-auto w-full place-items-center mt-20'>
          <div className='text-center space-y-2'>
            <Image
              className='rounded-full place-self-center'
              src={'/kenny-quach-profile.jpeg'}
              alt='tech lead'
              height={100}
              width={100}
            />
            <span>Head of Engineering</span>
            <div className='font-bold'>Kenny Quach</div>
          </div>
        </div>
      </div>

      <div className='pt-6'>
        <Link
          href='/'
          className='inline-block bg-black text-white px-5 py-3 rounded-lg hover:bg-gray-900 transition'>
          Back to Home
        </Link>
      </div>
    </main>
  );
}
