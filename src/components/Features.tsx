import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Check, ArrowDownUp, Square, CheckCircle, Code, Globe, Wrench,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Check className="w-8 h-8" />,
    title: "Intent-Based Transactions",
    description: "Tell the network what you want, we handle the rest. No gas setup or chain selection required.",
  },
  {
    icon: <ArrowDownUp className="w-8 h-8" />,
    title: "One-Click Swaps",
    description: "Fast, slippage-free transactions that work seamlessly across protocols without complexity.",
  },
  {
    icon: <Square className="w-8 h-8" />,
    title: "Built on Substrate",
    description: "Modular, upgradable core infrastructure designed for the future of blockchain technology.",
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Fast PoS Consensus",
    description: "Secure & performant Proof-of-Stake consensus that's both lightning-fast and enterprise-grade.",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Dev Friendly",
    description: "EVM & Rust-ready VMs coming soon. Build with the tools and languages you already know.",
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Tools Included",
    description: "Complete ecosystem with built-in Explorer, Wallet, SDKs, and developer resources.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Scalable Design",
    description: "Privacy layers, governance systems, and AI integration phases planned for the roadmap ahead.",
  }
];

const Features = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-24 sm:py-28 md:py-32 relative overflow-hidden">
      {/* Background Animation or Overlay */}
      <div className="protocol-bg absolute inset-0 opacity-40 pointer-events-none z-0" />

      <div className="container mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block glass-effect p-3 rounded-xl mb-4 md:mb-6">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Core Features
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 md:mb-6 gradient-text">
            Why Choose Cruxchain?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionary features that make blockchain interaction as simple as speaking your intent.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="p-6 sm:p-7 md:p-8 rounded-2xl bg-[#0f172a] border border-white/5 group hover:shadow-xl hover:shadow-blue-500/10 transition duration-500 hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className="relative mb-4 md:mb-6">
                <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 inline-block relative z-10 group-hover:scale-110 transition">
                  <div className="text-blue-400">{feature.icon}</div>
                </div>
                <div className="absolute inset-0 blur-lg bg-blue-500/20 rounded-xl opacity-40 -z-10" />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Quote */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="inline-block glass-effect p-4 rounded-xl">
            <p className="text-gray-400 text-sm sm:text-base">
              Built for developers, designed for users, optimized for the future of Web3.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
