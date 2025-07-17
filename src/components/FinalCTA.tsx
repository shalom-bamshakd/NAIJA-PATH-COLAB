import React from 'react';
import { ArrowRight, Star, Shield, Users, Clock } from 'lucide-react';

interface FinalCTAProps {
  onStartQuiz: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onStartQuiz }) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background with Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1B4D3E] via-[#1B365D] to-[#1B4D3E]">
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-20 w-32 h-32 border-4 border-[#FFD700] rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#FFD700] rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-[#FFD700] rotate-45"></div>
            <div className="absolute top-1/3 right-1/3 w-20 h-20 border-2 border-[#FFD700] rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Headline */}
          <h2 className="text-5xl lg:text-7xl font-bold font-montserrat text-white mb-8 leading-tight">
            Your Success Story{' '}
            <span className="bg-gradient-to-r from-[#FFD700] to-[#FFC700] bg-clip-text text-transparent">
              Begins Here
            </span>
          </h2>

          {/* Sub-headline */}
          <p className="text-xl lg:text-2xl text-white/90 font-opensans max-w-4xl mx-auto mb-12 leading-relaxed">
            Join thousands of Nigerian youth building successful careers with personalized AI guidance, 
            expert mentorship, and proven career roadmaps
          </p>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-[#FFD700]" />
              </div>
              <div className="text-3xl font-bold font-montserrat text-[#FFD700] mb-2">50,000+</div>
              <div className="text-white/80 font-opensans">Youth Guided</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center mb-4">
                <Star className="h-8 w-8 text-[#FFD700]" />
              </div>
              <div className="text-3xl font-bold font-montserrat text-[#FFD700] mb-2">4.9/5</div>
              <div className="text-white/80 font-opensans">User Rating</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-[#FFD700]" />
              </div>
              <div className="text-3xl font-bold font-montserrat text-[#FFD700] mb-2">95%</div>
              <div className="text-white/80 font-opensans">Success Rate</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-[#FFD700]" />
              </div>
              <div className="text-3xl font-bold font-montserrat text-[#FFD700] mb-2">5 Min</div>
              <div className="text-white/80 font-opensans">Assessment Time</div>
            </div>
          </div>

          {/* Main CTA Button */}
          <div className="mb-12">
            <button
              onClick={onStartQuiz}
              className="group bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFB700] text-[#1B4D3E] px-12 py-6 rounded-2xl font-bold font-montserrat text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center mx-auto"
            >
              Find My Path Now
              <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Secondary Benefits */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 font-opensans">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
              <span>100% Free Assessment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
              <span>Instant Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
              <span>Nigerian Market Focus</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
              <span>Expert Guidance</span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 max-w-md mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold font-montserrat text-white mb-4">
                Stay Updated on Career Opportunities
              </h3>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#FFD700] font-opensans"
                />
                <button className="bg-[#FFD700] hover:bg-[#FFC700] text-[#1B4D3E] px-6 py-3 rounded-lg font-bold font-montserrat transition-colors duration-300">
                  Subscribe
                </button>
              </div>
              <p className="text-white/60 text-sm font-opensans mt-3">
                Get weekly career tips and job opportunities in Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;