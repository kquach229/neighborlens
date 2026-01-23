import React from 'react';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { Newspaper, Sparkles, Flame } from 'lucide-react';

export interface IPost {
  title: string;
  date: string;
  slug: string;
  content: string;
}

// comment

const BlogPage = () => {
  const rawPosts = getAllPosts() as IPost[];
  const posts = [...rawPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className='px-4 py-10 min-h-[90vh] mb-20 w-full'>
      <h2 className='flex items-center gap-4 text-3xl font-bold mb-3 text-gray-900 dark:text-white'>
        ValidateLens Blog
        <Newspaper className='w-7 h-7 text-blue-300' />
      </h2>

      <p className='text-muted-foreground mb-6 text-base'>
        Updates, experiments, and behind-the-scenes thinking from the team at
        ValidateLens. Whether you're a first-time founder or validating your
        fifth idea, we’re building tools to help you move faster.
      </p>

      <section className='border border-border rounded-xl p-4 bg-muted/30'>
        <h3 className='text-xl font-semibold mb-2 flex items-center gap-2'>
          <Sparkles className='text-yellow-500' />
          Latest Post
        </h3>
        {posts[0] && (
          <Link
            href={`/blog/posts/${posts[0].slug}`}
            className='text-lg text-blue-400 hover:underline font-medium'>
            {posts[0].title} - {posts[0].date}
          </Link>
        )}
      </section>

      <h3 className='mt-10 mb-4 text-xl font-semibold'>All Posts</h3>
      <ul className='space-y-4'>
        {posts.slice(1).map((post) => (
          <li key={post.slug} className='flex flex-col'>
            <Link
              href={`/blog/posts/${post.slug}`}
              className='text-lg font-medium hover:underline text-blue-400'>
              {post.title}
            </Link>
            <span className='text-sm text-muted-foreground'>{post.date}</span>
          </li>
        ))}
      </ul>

      <div className='mt-16 border-t pt-8 text-center'>
        <h4 className='text-lg font-semibold flex items-center justify-center gap-2'>
          <Flame className='text-orange-500' />
          What’s Coming
        </h4>
        <p className='text-muted-foreground mt-2'>
          We’re working on guides for writing better startup pitches, how to
          frame user problems, and tips from top validators.
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
