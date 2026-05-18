import { notFound } from 'next/navigation';
import Link from 'next/link';
import { blogs } from '@/data/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft } from 'lucide-react';

export async function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogs.find((b) => b.slug === params.slug);
  if (!post) return {};
  return {
    title:       `${post.title} | Dietitian Prachi`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogs.find((b) => b.slug === params.slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 font-sans text-sm text-sage-500 hover:text-sage-700 mb-8 transition-colors"
          >
            <ChevronLeft size={14} /> All articles
          </Link>

          <div className="flex items-center gap-3 mb-4 font-sans text-xs text-sage-400">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>

          <h1 className="font-serif text-4xl text-sage-900 mb-10 leading-snug">
            {post.title}
          </h1>

          <div
            className="prose prose-sage font-sans text-sage-700 leading-relaxed max-w-none
              [&_p]:mb-5 [&_p]:text-base
              [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-sage-800 [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-sage-800 [&_h3]:mt-8 [&_h3]:mb-3"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-14 pt-10 border-t border-sage-100">
            <p className="font-sans text-sm text-sage-500 mb-4">
              Written by Prachi Acharekar, HCPC Registered Dietitian
            </p>
            <Link href="/book" className="btn-primary text-sm py-2.5 px-6">
              Book a Consultation
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
