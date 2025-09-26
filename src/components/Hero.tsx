import React from 'react';
import { ArrowRight, Star, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeroProps {
  onStartQuiz: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartQuiz }) => {
  return (
    <section className="relative bg-gradient-to-br from-[#1B4D3E]/5 via-white to-[#FFD700]/10 py-20 lg:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#1B4D3E] rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-[#FFD700] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#1B365D] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Social Proof Badge */}
            <Badge variant="secondary" className="inline-flex items-center bg-white/80 backdrop-blur-sm border border-[#1B4D3E]/20 text-[#1B4D3E] px-6 py-3 rounded-full shadow-lg">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-semibold font-opensans">Trusted by 50,000+ Nigerian Youth</span>
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold font-montserrat text-[#2C3E50] leading-tight">
                Discover Your{' '}
                <span className="bg-gradient-to-r from-[#1B4D3E] to-[#FFD700] bg-clip-text text-transparent">
                  Perfect Career Path
                </span>{' '}
                in Nigeria
              </h1>
              
              <p className="text-xl lg:text-2xl text-[#2C3E50]/80 leading-relaxed font-opensans max-w-2xl">
                Join 50,000+ Nigerian youth who found their dream careers through our AI-powered platform. 
                Get personalized guidance tailored to Nigeria's job market.
              </p>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Button
                onClick={onStartQuiz}
                size="lg"
                className="group bg-[#FFD700] hover:bg-[#FFC700] text-[#1B4D3E] px-10 py-5 rounded-xl font-bold font-montserrat text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                Start Free Career Assessment
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              
              <div className="flex items-center space-x-4 text-[#2C3E50]/70">
                <div className="flex -space-x-2">
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100" alt="User" />
                  <img className="w-10 h-10 rounded-full border-2 border-white" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100" alt="User" />
                </div>
                <div className="text-sm font-opensans">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-[#FFD700] fill-current mr-1" />
                    <span className="font-semibold">4.9/5</span>
                  </div>
                  <div>from 2,500+ reviews</div>
                </div>
              </div>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold font-montserrat text-[#1B4D3E]">50K+</div>
                <div className="text-sm text-[#2C3E50]/70 font-opensans">Youth Guided</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold font-montserrat text-[#1B4D3E]">500+</div>
                <div className="text-sm text-[#2C3E50]/70 font-opensans">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold font-montserrat text-[#1B4D3E]">95%</div>
                <div className="text-sm text-[#2C3E50]/70 font-opensans">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-[#1B4D3E]/10 to-[#FFD700]/10 rounded-3xl p-8 lg:p-12">
              <img
                src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Diverse Nigerian youth in professional and academic settings"
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
              
              {/* Floating Achievement Badges */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-[#1B4D3E]/10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#1B4D3E] to-[#FFD700] rounded-xl flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold font-montserrat text-[#1B4D3E]">AI Match</div>
                    <div className="text-sm text-[#2C3E50]/70 font-opensans">95% Accuracy</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-[#1B4D3E]/10">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#1B365D] rounded-xl flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold font-montserrat text-[#1B4D3E]">Career Growth</div>
                    <div className="text-sm text-[#2C3E50]/70 font-opensans">Guaranteed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Logos */}
            <div className="mt-12 text-center">
              <p className="text-sm text-[#2C3E50]/60 font-opensans mb-6">Trusted by leading Nigerian institutions</p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                <div className="w-16 h-8 bg-[#2C3E50]/20 rounded"></div>
                <div className="w-20 h-8 bg-[#2C3E50]/20 rounded"></div>
                <div className="w-18 h-8 bg-[#2C3E50]/20 rounded"></div>
                <div className="w-16 h-8 bg-[#2C3E50]/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;