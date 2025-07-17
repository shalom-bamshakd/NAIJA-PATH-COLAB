import React from 'react';
import { Bot, Users, MapPin } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'AI-Powered',
      description: 'Advanced AI algorithms analyze your interests, skills, and personality to provide personalized career recommendations.',
      color: 'from-[#22C55E] to-[#4338CA]'
    },
    {
      icon: Users,
      title: 'Tailored for Naija Youth',
      description: 'Specifically designed for Nigerian youth with local job market insights and cultural understanding.',
      color: 'from-[#FACC15] to-[#22C55E]'
    },
    {
      icon: MapPin,
      title: 'Built by Locals',
      description: 'Created by Nigerians who understand the unique challenges and opportunities in our job market.',
      color: 'from-[#4338CA] to-[#FACC15]'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-[#22C55E] to-[#4338CA] bg-clip-text text-transparent">
              NaijaPath?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We combine cutting-edge AI technology with deep understanding of the Nigerian job market 
            to provide you with the most relevant career guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#22C55E] transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-20 bg-gradient-to-r from-[#22C55E] to-[#4338CA] rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-green-100">Students Guided</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-green-100">Career Paths</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">36</div>
              <div className="text-green-100">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-green-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;