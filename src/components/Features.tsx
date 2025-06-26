
import { useState, useEffect, useRef } from 'react';
import { Check, ArrowDownUp, Square, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <Check className="w-8 h-8" />,
    title: "Intent-Based Transactions",
    description: "No gas, no chains, just actions. Tell us what you want, and we'll handle the rest."
  },
  {
    icon: <ArrowDownUp className="w-8 h-8" />,
    title: "One-Click Swaps",
    description: "Fast, slippage-free transactions that work seamlessly across protocols."
  },
  {
    icon: <Square className="w-8 h-8" />,
    title: "Built on Substrate",
    description: "Fully modular and upgradable blockchain infrastructure for the future."
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "Fast + Secure PoS",
    description: "Proof-of-Stake consensus that's both lightning-fast and enterprise-secure."
  },
  {
    icon: <Check className="w-8 h-8" />,
    title: "Developer Friendly",
    description: "Rust/EVM support coming soon. Build with the tools you already know."
  },
  {
    icon: <ArrowDownUp className="w-8 h-8" />,
    title: "Real Use Case Focused",
    description: "Built for users, not speculators. Solving real problems in Web3."
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
            // Animate cards one by one
            features.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 200);
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
    <section id="features" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
            Why Choose Cruxchain?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Revolutionary features that make blockchain interaction as simple as speaking your intent
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card p-8 rounded-xl transition-all duration-500 ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="text-blue-400 mb-4 animate-float">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
