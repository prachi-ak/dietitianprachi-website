import Navbar      from '@/components/Navbar';
import Hero        from '@/components/Hero';
import About       from '@/components/About';
import Services    from '@/components/Services';
import HowItWorks  from '@/components/HowItWorks';
import Blog        from '@/components/Blog';
import FAQ         from '@/components/FAQ';
import Contact     from '@/components/Contact';
import Footer      from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <Blog />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
