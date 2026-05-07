import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Section } from '@/components/layout/Section';
import { BlogPostBody } from '@/components/blog/BlogPostBody';
import { BLOG_POSTS } from '@/content/blog';

const NotFound = () => (
  <Section>
    <div className="mx-auto max-w-[720px] px-5">
      <p className="text-text-mute mb-4">Post not found.</p>
      <Link to="/" className="text-text border-b border-line hover:border-text pb-px">
        ← Back to portfolio
      </Link>
    </div>
  </Section>
);

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? BLOG_POSTS[slug] : undefined;

  if (!post) return <NotFound />;

  return (
    <Section id="post" className="!pt-[120px] sm:!pt-[140px]">
      <article className="mx-auto max-w-[720px] px-5">
        <header className="mb-10">
          <span
            className="inline-block text-[11px] font-semibold uppercase px-2 py-0.5 bg-accent-soft text-accent-ink"
            style={{ letterSpacing: '0.06em' }}
          >
            {post.category}
          </span>
          <h1
            className="text-3xl sm:text-4xl font-semibold mt-4 text-text leading-[1.1]"
            style={{ letterSpacing: '-0.32px' }}
          >
            {post.title}
          </h1>
          <div
            className="flex items-center gap-3 mt-4 text-[13px] text-text-mute"
            style={{ letterSpacing: '-0.32px' }}
          >
            <span>{post.date}</span>
            <span aria-hidden="true" className="opacity-40">
              ·
            </span>
            <span>{post.readTime}</span>
          </div>
        </header>

        <BlogPostBody content={post.content} />

        <div className="mt-16 pt-8 border-t border-line">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text text-sm font-medium hover:gap-3 transition-[gap] duration-200 ease-brand"
            style={{ letterSpacing: '-0.32px' }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to portfolio
          </Link>
        </div>
      </article>
    </Section>
  );
};
