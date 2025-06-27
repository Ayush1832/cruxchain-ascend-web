'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Users, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);

  // 🚀 Animate on scroll
  useEffect(() => {
    const items = gsap.utils.toArray('.fade-up');
    items.forEach((item: any, index: number) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: index * 0.1,
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: 'Welcome to Cruxchain!',
        description:
          "You've been added to the waitlist. We'll notify you when the testnet is ready!",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
<section
  id="waitlist"
  ref={sectionRef}
  className="py-20 sm:py-32 relative overflow-hidden bg-black/60"
>
  {/* 🔮 Background FX */}
  <div className="absolute inset-0 z-0">
    <div className="absolute top-1/3 left-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-green-500/10 blur-[120px] sm:blur-[150px] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
    <div className="absolute bottom-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-purple-500/10 blur-[80px] sm:blur-[100px] rounded-full" />
  </div>

  <div className="container relative z-10 mx-auto px-4 sm:px-6">
    <div className="max-w-4xl mx-auto text-center">
      <div className="gradient-border p-6 sm:p-12 rounded-3xl backdrop-blur-md bg-white/5 border-white/10 border">
        <div className="space-y-10 sm:space-y-12">
          {/* 🧠 Header */}
          <div className="space-y-4 fade-up">
            <div className="inline-block glass-effect p-2 sm:p-3 rounded-xl mb-2">
              <span className="text-green-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Join the Movement
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text">
              Join the Revolution
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Be the first to test Cruxchain and experience the future of intent-centric blockchain interaction.
            </p>
          </div>

          {/* 📩 Email Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto space-y-4 fade-up px-2"
          >
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-12 sm:h-14 text-base sm:text-lg glass-effect border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 sm:h-14 glow-button text-white text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Joining...</span>
                </div>
              ) : (
                'Notify Me'
              )}
            </Button>
          </form>

          {/* 📊 Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 sm:mt-8 fade-up">
            {[
              {
                icon: <Users className="w-7 sm:w-8 h-7 sm:h-8 text-blue-400 mx-auto mb-3" />,
                value: '1000+',
                label: 'Developers',
              },
              {
                icon: <Zap className="w-7 sm:w-8 h-7 sm:h-8 text-purple-400 mx-auto mb-3" />,
                value: 'Early',
                label: 'Access',
              },
              {
                icon: <Mail className="w-7 sm:w-8 h-7 sm:h-8 text-green-400 mx-auto mb-3" />,
                value: 'Updates',
                label: 'First',
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="glass-effect p-4 sm:p-6 rounded-xl hover:scale-105 transition-transform duration-300 text-center"
              >
                {stat.icon}
                <div className="text-xl sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* 🧾 Benefits */}
          <div className="text-center mt-6 sm:mt-8 space-y-4 fade-up px-2">
            <p className="text-gray-400 text-xs sm:text-sm">
              Join 1000+ developers and Web3 enthusiasts already on the waitlist
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
              {[
                '✨ Testnet early access',
                '📚 Developer resources',
                '🎯 Intent examples',
              ].map((benefit, i) => (
                <span
                  key={i}
                  className="glass-effect px-3 sm:px-4 py-1.5 rounded-full text-gray-300"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📣 Footer Note */}
      <div className="mt-12 sm:mt-16 text-center fade-up px-2">
        <p className="text-gray-400 text-xs sm:text-sm">
          Be the first to test the Cruxchain Testnet and experience the future of intent-centric blockchain interaction.
        </p>
      </div>
    </div>
  </div>
</section>

  );
};

export default Waitlist;
