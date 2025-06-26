
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

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
        title: "Success!",
        description: "You've been added to the Cruxchain waitlist. We'll notify you when the testnet is ready!",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="waitlist" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="glass-effect p-12 rounded-2xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 gradient-text">
              Join the Revolution
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Be the first to test the Cruxchain Testnet and experience the future of intent-centric blockchain interaction.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 whitespace-nowrap"
              >
                {isSubmitting ? 'Joining...' : 'Notify Me'}
              </Button>
            </form>
            
            <p className="text-sm text-gray-400 mt-4">
              Join 1000+ developers and Web3 enthusiasts already on the waitlist
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Waitlist;
