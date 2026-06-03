import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-sage-900 text-white py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <Image
              src="/logo.png"
              alt="Prachi — The Integrative Dietitian"
              width={110}
              height={55}
              className="h-14 w-auto object-contain mb-3 brightness-0 invert"
            />
            <p className="font-sans text-sage-300 text-sm leading-relaxed">
              Evidence-based, personalised nutrition care by Prachi Acharekar,
              HCPC Registered Dietitian.
            </p>
            <p className="font-sans text-sage-400 text-xs mt-3">
              HCPC Registered Dietitian &bull; BDA Full Member
            </p>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-sage-400 mb-4">Navigation</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { href: '#about',    label: 'About' },
                { href: '#services', label: 'Services' },
                { href: '/blog',     label: 'Blog' },
                { href: '#faq',      label: 'FAQ' },
                { href: '#contact',  label: 'Contact' },
                { href: '/book',     label: 'Book Now' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-sm text-sage-300 hover:text-white transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-xs uppercase tracking-widest text-sage-400 mb-4">Connect</p>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/in/prachi-acharekar-97a45133/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-sage-700 flex items-center justify-center hover:border-sage-400 hover:bg-sage-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://www.instagram.com/prachi.acharekar?igsh=czdjYTdkM3Qyb2R2"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-sage-700 flex items-center justify-center hover:border-sage-400 hover:bg-sage-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
            </div>

            <div className="mt-6">
              <Link
                href="/book"
                className="inline-block bg-sage-400 hover:bg-sage-500 text-white px-6 py-2.5 rounded text-sm font-sans transition-colors"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-sage-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-sage-500">
            &copy; {new Date().getFullYear()} Dietitian Prachi by Prachi Acharekar. All rights reserved.
          </p>
          <div className="flex items-center gap-4 font-sans text-xs text-sage-500">
            <Link href="/terms"   className="hover:text-sage-300 transition-colors">Terms & Conditions</Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-sage-300 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <span>Online worldwide &bull; In-person in London</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
