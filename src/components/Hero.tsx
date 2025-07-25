import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Cruxchain';
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
        // Start cursor blinking after typing is complete
        setTimeout(() => {
          const cursorTimer = setInterval(() => {
            setCursorVisible(prev => !prev);
          }, 500);
          return () => clearInterval(cursorTimer);
        }, 500);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Protocol Background Effects */}
      <div className="protocol-bg"></div>
      <div className="network-nodes"></div>
      <div className="floating-elements"></div>
      <div className="mesh-gradient"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Animated Logo/Title */}
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-display font-bold mb-6">
              <span className="gradient-text">
                {displayText}
                <span 
                  className={`inline-block w-1 h-16 md:h-24 bg-current ml-2 ${
                    cursorVisible ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-150`}
                >
                  |
                </span>
              </span>
            </h1>
            
            <div className="glass-effect-light dark:glass-effect p-4 rounded-2xl inline-block animate-fade-in-up animation-delay-400">
              <p className="text-xl md:text-3xl text-gray-800 dark:text-gray-200 font-medium">
                The Intent-Centric Blockchain
              </p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-2">
                Interact on-chain with a single action.
              </p>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="space-y-6 animate-fade-in-up animation-delay-800">
            <Button 
              onClick={scrollToWaitlist}
              className="glow-button-light dark:glow-button text-white px-12 py-6 rounded-2xl text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Join Waitlist
            </Button>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md mx-auto">
              Be the first to experience intent-driven blockchain interaction
            </p>
          </div>

          {/* Protocol Demo Hint */}
          <div className="mt-16 animate-fade-in-up animation-delay-1000">
            <div className="glass-effect-light dark:glass-effect p-6 rounded-xl max-w-md mx-auto flex flex-col items-center">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Example Intent:</p>
              <div className="font-mono text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-black/20 rounded-lg p-3 w-full text-center mb-4">
                "Swap 100 USDC → ETH"
              </div>
              {/* Arrow Button Below Intent Box */}
              <button
                type="button"
                aria-label="Scroll for more"
                className="mt-2 mb-2 flex items-center justify-center w-10 h-10 rounded-full bg-white/80 dark:bg-black/40 shadow border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                onClick={scrollToWaitlist}
              >
                <ChevronDown className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              </button>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                No gas setup, no chain selection needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
