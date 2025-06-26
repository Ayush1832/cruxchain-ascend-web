
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail, Users, Zap } from 'lucide-react';

const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Welcome to Cruxchain!",
        description: "You've been added to the waitlist. We'll notify you when the testnet is ready!",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="waitlist" className="py-32 relative">
      {/* Background Effects */}
      <div className="protocol-bg"></div>
      <div className="network-nodes"></div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Waitlist Card */}
          <div className="gradient-border p-12 rounded-3xl relative">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-block glass-effect p-3 rounded-xl mb-4">
                  <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
                    Join the Movement
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl font-display font-bold gradient-text">
                  Join the Revolution
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Be the first to test Cruxchain and experience the future of intent-centric blockchain interaction.
                </p>
              </div>
              
              {/* Email Form */}
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-14 text-lg glass-effect border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-xl"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 glow-button text-white text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Joining...</span>
                    </div>
                  ) : (
                    'Notify Me'
                  )}
                </Button>
              </form>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="glass-effect p-6 rounded-xl">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">1000+</div>
                  <div className="text-gray-400">Developers</div>
                </div>
                
                <div className="glass-effect p-6 rounded-xl">
                  <Zap className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">Early</div>
                  <div className="text-gray-400">Access</div>
                </div>
                
                <div className="glass-effect p-6 rounded-xl">
                  <Mail className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white">Updates</div>
                  <div className="text-gray-400">First</div>
                </div>
              </div>
              
              {/* Benefits */}
              <div className="text-center mt-8">
                <p className="text-gray-400 text-sm mb-4">
                  Join 1000+ developers and Web3 enthusiasts already on the waitlist
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 text-sm">
                  <span className="glass-effect px-4 py-2 rounded-full text-gray-300">
                    ✨ Testnet early access
                  </span>
                  <span className="glass-effect px-4 py-2 rounded-full text-gray-300">
                    📚 Developer resources
                  </span>
                  <span className="glass-effect px-4 py-2 rounded-full text-gray-300">
                    🎯 Intent examples
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 text-sm">
              Be the first to test the Cruxchain Testnet and experience the future of intent-centric blockchain interaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
