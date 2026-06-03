import Link from 'next/link';
import { blogs } from '@/data/content';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-sage-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label">Insights</p>
            <h2 className="section-heading text-4xl">From the Blog</h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 font-sans text-base text-sage-500 hover:text-sage-700 transition-colors"
          >
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-6 max-w-2xl mx-auto w-full">
          {blogs.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-sage-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-2 bg-sage-200" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 font-sans text-sm text-sage-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-sage-800 text-2xl mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="font-sans text-sage-600 text-base leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-sans text-base text-sage-500 hover:text-sage-700 transition-colors flex items-center gap-1.5"
                >
                  Read article <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog" className="btn-outline text-sm py-2.5 px-6">
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
}
