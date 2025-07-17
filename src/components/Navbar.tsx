import React, { useState } from 'react';
import { Menu, X, MapPin, MessageCircle, Globe } from 'lucide-react';

interface NavbarProps {
  onStartQuiz: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartQuiz }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'pidgin'>('en');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'pidgin' : 'en');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-[#1B4D3E] to-[#FFD700] p-3 rounded-xl shadow-lg">
              <MapPin className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold font-montserrat bg-gradient-to-r from-[#1B4D3E] to-[#1B365D] bg-clip-text text-transparent">
                NaijaPath
              </span>
              <div className="text-xs text-gray-500 font-medium">Nigeria's Premier Career Platform</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans">
              Home
            </a>
            <a href="#about" className="text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans">
              About
            </a>
            <a href="#careers" className="text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans">
              Career Paths
            </a>
            <a href="#contact" className="text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans">
              Contact
            </a>
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'PID'}</span>
            </button>

            {/* WhatsApp Chat */}
            <a
              href="https://wa.me/2348012345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[#25D366] hover:text-[#128C7E] transition-colors duration-300"
            >
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Chat</span>
            </a>

            <button
              onClick={onStartQuiz}
              className="bg-[#FFD700] hover:bg-[#FFC700] text-[#1B4D3E] px-8 py-3 rounded-xl font-bold font-montserrat transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Free Assessment
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-6 space-y-6">
            <a
              href="#home"
              className="block text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="block text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#careers"
              className="block text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Career Paths
            </a>
            <a
              href="#contact"
              className="block text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300 font-semibold font-opensans px-4 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            
            <div className="px-4 space-y-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 text-[#2C3E50] hover:text-[#1B4D3E] transition-colors duration-300"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language === 'en' ? 'Switch to Pidgin' : 'Switch to English'}</span>
              </button>
              
              <a
                href="https://wa.me/2348012345678"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-[#25D366] hover:text-[#128C7E] transition-colors duration-300"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm font-medium">WhatsApp Chat</span>
              </a>
              
              <button
                onClick={() => {
                  onStartQuiz();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-[#FFD700] hover:bg-[#FFC700] text-[#1B4D3E] px-8 py-4 rounded-xl font-bold font-montserrat transition-all duration-300 shadow-lg"
              >
                Start Free Assessment
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;