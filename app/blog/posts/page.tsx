import React from 'react';
import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';

export interface IPost {
  title: string;
  date: string;
  slug: string;
  content: string;
}

const BlogPage = () => {
  const rawPosts = getAllPosts() as IPost[];
  const posts = [...rawPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className='max-w-3xl px-4 py-10 min-h-[90vh]'>
      <h2 className='flex items-center gap-5 text-3xl font-bold mb-6 text-gray-900 dark:text-white'>
        ValidateLens Blog
        <Newspaper />
      </h2>
      <ul className='space-y-4'>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/posts/${post.slug}`}
              className='underline text-lg font-medium hover:underline text-blue-400'>
              {post.title} - {post.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
