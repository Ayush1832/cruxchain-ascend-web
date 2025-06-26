
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Roadmap from '@/components/Roadmap';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Roadmap />
      <Waitlist />
      <Footer />
    </div>
  );
};

export default Index;
