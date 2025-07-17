import React from 'react';
import { MapPin, Mail, Phone, Twitter, Linkedin, Instagram, Facebook, MessageCircle, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2C3E50] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-gradient-to-br from-[#1B4D3E] to-[#FFD700] p-3 rounded-xl shadow-lg">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold font-montserrat bg-gradient-to-r from-[#FFD700] to-[#FFC700] bg-clip-text text-transparent">
                  NaijaPath
                </span>
                <div className="text-sm text-white/60 font-opensans">Nigeria's Premier Career Platform</div>
              </div>
            </div>
            
            <p className="text-white/80 font-opensans mb-8 max-w-md leading-relaxed">
              Empowering Nigerian youth to discover their career paths through AI-powered guidance, 
              expert mentorship, and localized market insights. Building the future workforce of Nigeria.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1B4D3E] p-3 rounded-xl transition-colors duration-300 group"
              >
                <Twitter className="h-5 w-5 group-hover:text-[#FFD700]" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1B4D3E] p-3 rounded-xl transition-colors duration-300 group"
              >
                <Linkedin className="h-5 w-5 group-hover:text-[#FFD700]" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1B4D3E] p-3 rounded-xl transition-colors duration-300 group"
              >
                <Instagram className="h-5 w-5 group-hover:text-[#FFD700]" />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-[#1B4D3E] p-3 rounded-xl transition-colors duration-300 group"
              >
                <Facebook className="h-5 w-5 group-hover:text-[#FFD700]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-8 text-[#FFD700]">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                  Career Assessment
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                  Career Paths
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold font-montserrat mb-8 text-[#FFD700]">Get in Touch</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white/80 font-opensans">hello@naijapath.ng</div>
                  <div className="text-white/60 text-sm font-opensans">General inquiries</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white/80 font-opensans">+234 801 234 5678</div>
                  <div className="text-white/60 text-sm font-opensans">Support hotline</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MessageCircle className="h-5 w-5 text-[#25D366] mt-1 flex-shrink-0" />
                <div>
                  <a 
                    href="https://wa.me/2348012345678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-[#25D366] transition-colors duration-300 font-opensans"
                  >
                    WhatsApp Support
                  </a>
                  <div className="text-white/60 text-sm font-opensans">24/7 available</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-[#FFD700] mt-1 flex-shrink-0" />
                <div>
                  <div className="text-white/80 font-opensans">Lagos, Nigeria</div>
                  <div className="text-white/60 text-sm font-opensans">Serving all 36 states</div>
                </div>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center space-x-4 pt-4 border-t border-white/20">
                <Globe className="h-5 w-5 text-[#FFD700]" />
                <div className="flex space-x-3">
                  <button className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans text-sm">
                    English
                  </button>
                  <span className="text-white/40">|</span>
                  <button className="text-white/80 hover:text-[#FFD700] transition-colors duration-300 font-opensans text-sm">
                    Pidgin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white/60 font-opensans text-center md:text-left">
              © 2025 NaijaPath. All rights reserved. Empowering Nigerian youth with AI-powered career guidance.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-white/60 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-[#FFD700] transition-colors duration-300 font-opensans">
                Cookie Policy
              </a>
            </div>
          </div>
          
          {/* Made in Nigeria Badge */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center bg-gradient-to-r from-[#1B4D3E]/20 to-[#FFD700]/20 backdrop-blur-sm border border-[#FFD700]/30 px-6 py-3 rounded-full">
              <span className="text-[#FFD700] font-semibold font-opensans mr-2">🇳🇬</span>
              <span className="text-white/80 font-opensans">Proudly Made in Nigeria</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;