import Hero from '../components/Hero';
import Features from '../components/Features';
import Stats from '../components/Stats';
import Destinations from '../components/Destinations';
import Services from '../components/Services';
import Fleet from '../components/Fleet';
import Testimonials from '../components/Testimonials';
import Agencies from '../components/Agencies';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';
import WhatsAppButton from '../components/WhatsAppButton';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-navy flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow bg-white">
        <Hero />
        <Features />
        <Stats />
        <Destinations />
        <Services />
        <Fleet />
        <Testimonials />
        <Agencies />
        <FAQ />
        <Contact />
      </main>
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
