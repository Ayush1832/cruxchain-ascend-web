
import { useState, useEffect, useRef } from 'react';
import { Check, ArrowDownUp, Square, CheckCircle, Code, Globe, Wrench } from 'lucide-react';

const features = [
  {
    icon: <Check className="w-8 h-8" />,
    title: "Intent-Based Transactions",
    description: "Tell the network what you want, we handle the rest. No gas setup or chain selection required."
  },
  {
    icon: <ArrowDownUp className="w-8 h-8" />,
    title: "One-Click Swaps",
    description: "Fast, slippage-free transactions that work seamlessly across protocols without complexity."
  },
  {
    icon: <Square className="w-8 h-8" />,
    title: "Built on Substrate",
    description: "Modular, upgradable core infrastructure designed for the future of blockchain technology."
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Fast PoS Consensus",
    description: "Secure & performant Proof-of-Stake consensus that's both lightning-fast and enterprise-grade."
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Dev Friendly",
    description: "EVM & Rust-ready VMs coming soon. Build with the tools and languages you already know."
  },
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Tools Included",
    description: "Complete ecosystem with built-in Explorer, Wallet, SDKs, and developer resources."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Scalable Design",
    description: "Privacy layers, governance systems, and AI integration phases planned for the roadmap ahead."
  }
];

const Features = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards one by one with staggered delay
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="py-32 relative">
      {/* Background Effects */}
      <div className="protocol-bg"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <div className="inline-block glass-effect p-3 rounded-xl mb-6">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
              Core Features
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">
            Why Choose Cruxchain?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Revolutionary features that make blockchain interaction as simple as speaking your intent
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card p-8 rounded-2xl transition-all duration-700 ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {/* Icon with glow effect */}
                <div className="text-blue-400 mb-6 relative">
                  <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 inline-block">
                    {feature.icon}
                  </div>
                  <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-xl opacity-50"></div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Decorative gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="mt-20 text-center">
          <div className="inline-block glass-effect p-4 rounded-xl">
            <p className="text-gray-400 text-sm">
              Built for developers, designed for users, optimized for the future
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
