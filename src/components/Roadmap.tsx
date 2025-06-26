
import { useState, useEffect, useRef } from 'react';
import { Check, CheckCircle } from 'lucide-react';

const roadmapPhases = [
  {
    phase: "Phase 0",
    title: "Foundation",
    description: "Website, Branding, Community",
    icon: "🌐",
    status: "completed"
  },
  {
    phase: "Phase 1",
    title: "Intent-Based MVP",
    description: "Token Swaps, PoS Consensus",
    icon: "✅",
    status: "in-progress"
  },
  {
    phase: "Phase 2",
    title: "Multi-VM Support",
    description: "Proof-of-Utility + EVM/WASM",
    icon: "🚀",
    status: "upcoming"
  },
  {
    phase: "Phase 3",
    title: "Privacy Layer",
    description: "ZK Privacy Implementation",
    icon: "🔐",
    status: "upcoming"
  },
  {
    phase: "Phase 4",
    title: "Machine Economy",
    description: "AI Integration + Governance",
    icon: "🤖",
    status: "future"
  }
];

const Roadmap = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            roadmapPhases.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 300);
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
    <section id="roadmap" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
            Our Roadmap
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The journey to revolutionize blockchain interaction through intent-centric design
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            {roadmapPhases.map((phase, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-center mb-12 ${
                  visibleItems.includes(index) ? 'animate' : ''
                } ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 z-10 flex items-center justify-center">
                  {phase.status === 'completed' && (
                    <Check className="w-2 h-2 text-white" />
                  )}
                </div>
                
                {/* Content */}
                <div className={`glass-effect p-6 rounded-xl ml-16 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'
                }`}>
                  <div className="flex items-center mb-3">
                    <span className="text-2xl mr-3">{phase.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      phase.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      phase.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {phase.status === 'completed' ? 'Completed' :
                       phase.status === 'in-progress' ? 'In Progress' :
                       phase.status === 'upcoming' ? 'Upcoming' : 'Future'}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {phase.phase}: {phase.title}
                  </h3>
                  <p className="text-gray-300">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
