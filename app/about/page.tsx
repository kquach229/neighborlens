// app/about/page.tsx

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className='mx-auto px-4 py-12 space-y-10'>
      <section>
        <h1 className='text-4xl font-bold mb-4'>About ValidatorLens</h1>
        <p className='text-lg'>
          ValidatorLens helps startup founders quickly validate ideas by getting
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
        <p className=''>
          Too many founders waste time building things no one wants. We built
          ValidatorLens to make it easier to test ideas before going all-in —
          with insights from people who’ve been there before.
        </p>
      </section>

      <div className='mt-32'>
        <h2 className='text-center'>Meet The Team</h2>

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
