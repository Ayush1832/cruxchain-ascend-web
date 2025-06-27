import { Github, Twitter } from 'lucide-react';
import { FaTelegramPlane, FaDiscord } from 'react-icons/fa';

const Footer = () => {
  const quickLinks = [
    { label: 'Documentation', href: '#', soon: true },
    { label: 'GitHub', href: '#', soon: false },
    { label: 'Explorer', href: '#', soon: true },
    { label: 'Whitepaper', href: '#', soon: true },
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <FaDiscord className="w-5 h-5" />, href: '#', label: 'Discord' },
    { icon: <FaTelegramPlane className="w-5 h-5" />, href: '#', label: 'Telegram' },
  ];

  return (
    <footer className="relative py-20 border-t border-white/10 z-10 bg-transparent">
      {/* Background Effects */}
      <div className="protocol-bg absolute inset-0 opacity-50 -z-10" />

      <div className="container mx-auto px-6 sm:px-8">
        {/* Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h2 className="font-display font-bold text-3xl gradient-text mb-6">
              Cruxchain
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-md">
              The Intent-Centric Blockchain – shaping seamless Web3 interaction with powerful intent-driven architecture.
            </p>
            <button
              onClick={() =>
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="mt-8 glow-button px-6 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105"
            >
              Join Waitlist
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-xl">Resources</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center"
                  >
                    {link.label}
                    {link.soon && (
                      <span className="ml-2 px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                        Soon
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-xl">Community</h3>
            <div className="space-y-4">
              {socialLinks.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  className="flex items-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 group"
                >
                  <div className="p-2 glass-effect rounded-lg mr-3 group-hover:bg-white/10">
                    {item.icon}
                  </div>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 text-sm text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <span>© 2025 Cruxchain. All Rights Reserved.</span>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Legal</a>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-block glass-effect p-4 rounded-xl max-w-lg w-full">
              <p className="text-xs text-gray-400">
                Built for developers, designed for users — powering the future of Web3.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
