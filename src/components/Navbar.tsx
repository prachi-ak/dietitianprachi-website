'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const anchors = [
  { anchor: '#about',    label: 'About' },
  { anchor: '#services', label: 'Services' },
  { anchor: '#blog',     label: 'Blog' },
  { anchor: '#faq',      label: 'FAQ' },
  { anchor: '#contact',  label: 'Contact' },
];

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const pathname = usePathname();
  const isHome   = pathname === '/';
  const links    = anchors.map((l) => ({ href: isHome ? l.anchor : `/${l.anchor}`, label: l.label }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-sage-100' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-28 flex items-center justify-between">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Prachi — The Integrative Dietitian"
            width={240}
            height={120}
            className="h-24 w-auto object-contain"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-sans text-sm text-sage-700 hover:text-sage-500 transition-colors tracking-wide"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <Link href="/book" className="hidden md:inline-block btn-primary text-sm py-2 px-5">
          Book Now
        </Link>

        <button
          className="md:hidden text-sage-700 hover:text-sage-500 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white border-t border-sage-100 px-6 py-4 shadow-md">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-sans text-sm text-sage-700 hover:text-sage-500 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link href="/book" className="btn-primary text-sm py-2 px-5" onClick={() => setOpen(false)}>
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
