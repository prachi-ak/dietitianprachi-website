import Link from 'next/link';
import { blogs } from '@/data/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog | Dietitian Prachi',
  description: 'Nutrition insights and evidence-based articles from Prachi Acharekar, HCPC Registered Dietitian.',
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-14">
            <p className="section-label">Insights</p>
            <h1 className="section-heading text-4xl">The Dietitian Prachi Blog</h1>
          </div>

          <div className="flex flex-col gap-8">
            {blogs.map((post) => (
              <article
                key={post.slug}
                className="border-b border-sage-100 pb-8 last:border-none"
              >
                <div className="flex items-center gap-3 mb-3 font-sans text-xs text-sage-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="font-serif text-2xl text-sage-800 mb-3 hover:text-sage-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="font-sans text-sage-600 text-sm leading-relaxed mb-4 max-w-2xl">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-sans text-sm text-sage-500 hover:text-sage-700 transition-colors inline-flex items-center gap-1.5"
                >
                  Read article <ArrowRight size={13} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
