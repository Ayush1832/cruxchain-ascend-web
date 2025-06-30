'use client';
import { useRef, useEffect, useState } from 'react';
import { Check, ArrowDownUp, Square, CheckCircle, Code, Globe, Wrench } from 'lucide-react';

const features = [
  { icon: <Check className="w-8 h-8" />, title: "Intent-Based Transactions", description: "Tell the network what you want, we handle the rest. No gas setup or chain selection required." },
  { icon: <ArrowDownUp className="w-8 h-8" />, title: "One-Click Swaps", description: "Fast, slippage-free transactions that work seamlessly across protocols without complexity." },
  { icon: <Square className="w-8 h-8" />, title: "Built on Substrate", description: "Modular, upgradable core infrastructure designed for the future of blockchain technology." },
  { icon: <CheckCircle className="w-8 h-8" />, title: "Fast PoS Consensus", description: "Secure & performant Proof-of-Stake consensus that's both lightning-fast and enterprise-grade." },
  { icon: <Code className="w-8 h-8" />, title: "Dev Friendly", description: "EVM & Rust-ready VMs coming soon. Build with the tools and languages you already know." },
  { icon: <Wrench className="w-8 h-8" />, title: "Tools Included", description: "Complete ecosystem with built-in Explorer, Wallet, SDKs, and developer resources." },
  { icon: <Globe className="w-8 h-8" />, title: "Scalable Design", description: "Privacy layers, governance systems, and AI integration phases planned for the roadmap ahead." }
];

const Features = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = containerRef.current;
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollPos = window.scrollY - sectionTop;

        if (scrollPos >= 0 && scrollPos <= sectionHeight) {
          setScrollY(scrollPos);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalSlides = features.length;
  const slideWidth = 100; // percent per slide
  const maxScroll = (totalSlides - 1) * slideWidth;
  const progress = scrollY / (window.innerHeight * (totalSlides - 1));
  const translateX = Math.min(progress * maxScroll, maxScroll);

  return (
    <section
      id="features"
      className="relative w-full h-[700vh] bg-transparent"
      ref={containerRef}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="fixed z-0 w-full h-full object-cover top-0 left-0"
        src="/4a004822-44e1-41a9-8b08-0fed15712bad.mp4"
      />

      {/* Sticky Horizontal Slide Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-10">
        <div
          className="flex h-full w-[700vw] transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${translateX}vw)` }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-screen flex items-center justify-center p-6 flex-shrink-0"
            >
              <div className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-2xl p-10 max-w-xl text-center shadow-lg">
                <div className="mb-6 text-blue-500">{feature.icon}</div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 text-lg">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features
