import React from 'react';
import { Brain, Target, Rocket, ArrowRight } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Brain,
      title: "Take our AI-powered assessment",
      description: "Complete our comprehensive 5-minute assessment that analyzes your interests, skills, and personality traits using advanced AI algorithms.",
      duration: "5 minutes",
      color: "from-[#1B4D3E] to-[#FFD700]"
    },
    {
      icon: Target,
      title: "Get personalized career matches",
      description: "Receive tailored career recommendations based on Nigeria's job market, salary data, and growth opportunities in your region.",
      duration: "Instant results",
      color: "from-[#FFD700] to-[#1B365D]"
    },
    {
      icon: Rocket,
      title: "Access roadmaps & resources",
      description: "Get detailed learning paths, skill requirements, and local resources to help you achieve your career goals in Nigeria.",
      duration: "Lifetime access",
      color: "from-[#1B365D] to-[#1B4D3E]"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-[#1B4D3E]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-[#2C3E50] mb-6">
            How{' '}
            <span className="bg-gradient-to-r from-[#1B4D3E] to-[#FFD700] bg-clip-text text-transparent">
              NaijaPath
            </span>{' '}
            Works
          </h2>
          <p className="text-xl text-[#2C3E50]/80 font-opensans max-w-3xl mx-auto leading-relaxed">
            Our proven 3-step process has helped thousands of Nigerian youth discover and pursue their ideal careers
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1B4D3E] via-[#FFD700] to-[#1B365D] transform -translate-y-1/2 z-0"></div>
          
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Step Card */}
                <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#1B4D3E]/10">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-white rounded-full border-4 border-[#FFD700] flex items-center justify-center shadow-lg">
                      <span className="text-xl font-bold font-montserrat text-[#1B4D3E]">{index + 1}</span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-8 mt-4">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-5 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="inline-block bg-[#FFD700]/20 text-[#1B4D3E] px-4 py-2 rounded-full text-sm font-semibold font-opensans">
                      {step.duration}
                    </div>
                    
                    <h3 className="text-2xl font-bold font-montserrat text-[#2C3E50] group-hover:text-[#1B4D3E] transition-colors duration-300">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#2C3E50]/80 font-opensans leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Hover Arrow */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center text-[#1B4D3E] font-semibold font-opensans">
                      <span>Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>

                {/* Mobile Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 mb-4">
                    <ArrowRight className="h-8 w-8 text-[#FFD700]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center bg-gradient-to-r from-[#1B4D3E]/10 to-[#FFD700]/10 backdrop-blur-sm border border-[#1B4D3E]/20 px-8 py-4 rounded-2xl">
            <div className="flex -space-x-2 mr-4">
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Success story" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Success story" />
              <img className="w-8 h-8 rounded-full border-2 border-white" src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100" alt="Success story" />
            </div>
            <span className="text-[#2C3E50] font-semibold font-opensans">
              Join 50,000+ youth who've found their path
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;