'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-white/[0.08]',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'backdrop-blur-[2px] border-2 border-white/[0.15]',
            'shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]'
          )}
        />
      </motion.div>
    </motion.div>
  );
}

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Cruxchain';
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typeWriterTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeWriterTimer);
      }
    }, 150);

    const cursorBlinkTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 600);

    return () => {
      clearInterval(typeWriterTimer);
      clearInterval(cursorBlinkTimer);
    };
  }, []);

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="h-screen md:h-[110vh] flex items-center justify-center relative overflow-hidden bg-[#030303]"
    >
      {/* Gradient and Noise Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />
      <div className="absolute inset-0 pointer-events-none bg-[url('/noise.png')] opacity-5 mix-blend-overlay z-0" />

      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape delay={0.3} width={300} height={100} rotate={12} gradient="from-indigo-500/[0.15]" className="left-[-15%] sm:left-[-5%] top-[10%]" />
        <ElegantShape delay={0.5} width={250} height={80} rotate={-15} gradient="from-rose-500/[0.15]" className="right-[-10%] top-[70%]" />
        <ElegantShape delay={0.4} width={200} height={60} rotate={-8} gradient="from-violet-500/[0.15]" className="left-[5%] bottom-[10%]" />
        <ElegantShape delay={0.6} width={180} height={50} rotate={20} gradient="from-amber-500/[0.15]" className="right-[10%] top-[15%]" />
        <ElegantShape delay={0.7} width={120} height={40} rotate={-25} gradient="from-cyan-500/[0.15]" className="left-[15%] top-[5%]" />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto px-2 sm:px-6">
          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-display font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-[length:200%] bg-clip-text text-transparent animate-[shine_4s_linear_infinite]">
            {displayText}
            {displayText !== fullText && (
              <span
                className={`inline-block w-1 h-10 sm:h-12 bg-current ml-2 ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
              >
                |
              </span>
            )}
          </h1>

          {/* Subtitle */}
          <div className="glass-effect p-4 sm:p-6 rounded-2xl inline-block animate-fade-in-up animation-delay-400">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-medium">The Intent-Centric Blockchain</p>
            <p className="text-sm sm:text-base md:text-lg text-gray-400 mt-1">Interact on-chain with a single action.</p>
          </div>

          {/* Button and Description */}
          <div className="space-y-6 mt-8 animate-fade-in-up animation-delay-800">
            <Button
              onClick={scrollToWaitlist}
              className="glow-button glow-pulse text-white px-8 sm:px-12 py-4 sm:py-6 rounded-2xl text-base sm:text-xl font-semibold transition-all duration-300 hover:scale-105"
            >
              Join Waitlist
            </Button>
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">Be the first to experience intent-driven blockchain interaction</p>
          </div>

          {/* Example Box */}
          <div className="mt-12 sm:mt-16 animate-fade-in-up animation-delay-1000">
            <div className="glass-effect p-4 sm:p-6 rounded-xl max-w-md mx-auto">
              <p className="text-sm text-gray-300 mb-2">Example Intent:</p>
              <div className="font-mono text-blue-300 bg-black/20 rounded-lg p-3 text-sm sm:text-base">"Swap 100 USDC → ETH"</div>
              <p className="text-xs text-gray-400 mt-2">No gas setup, no chain selection needed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Down Icon */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="absolute bottom-10 sm:bottom-16 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="glass-effect p-2 rounded-full">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none" />
    </section>
  );
};

export default Hero;
