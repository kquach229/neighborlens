import { getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import MarkdownIt from 'markdown-it';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { IPost } from '../page';

const md = new MarkdownIt();

async function fetchPost(slug: string) {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug);
}

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post = (await fetchPost(params.slug)) as IPost;

  if (!post) {
    notFound();
  }

  const htmlConverter = md.render(post.content);

  return (
    <div className='p-5'>
      <Link className='mb-10 mt-10 inline-block' href={'/blog/posts'}>
        <Button>
          <ArrowLeft className='mr-2 h-4 w-4' /> Back to Blogs
        </Button>
      </Link>
      <article className='mt-10'>
        <h1 className='text-5xl'>{post.title}</h1>
        <p className='mt-3 text-muted-foreground'>{post.date}</p>
        <div
          className='mt-5 prose dark:prose-invert
            prose-h1:font-bold prose-h1:text-xl
            prose-a:text-blue-300 prose-p:text-justify prose-img:rounded-xl'
          dangerouslySetInnerHTML={{ __html: htmlConverter }}
        />
      </article>
    </div>
  );
}
