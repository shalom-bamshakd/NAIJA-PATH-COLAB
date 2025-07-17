import React, { useState } from 'react';
import { Code, Heart, Palette, Briefcase, TrendingUp, Users, DollarSign, GraduationCap } from 'lucide-react';

const CareerPaths: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const careerPaths = [
    {
      icon: Code,
      title: "Technology",
      description: "Software development, cybersecurity, data science, and emerging tech roles",
      salaryRange: "₦2.5M - ₦15M",
      qualifications: "BSc Computer Science, Coding Bootcamp, or Self-taught",
      demand: "Very High",
      demandColor: "text-green-600",
      demandBg: "bg-green-100",
      growth: "+45%",
      color: "from-[#1B4D3E] to-[#1B365D]",
      bgPattern: "tech"
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "Medical practice, nursing, pharmacy, medical technology, and health administration",
      salaryRange: "₦1.8M - ₦12M",
      qualifications: "Medical degree, Nursing certification, or Health Tech diploma",
      demand: "High",
      demandColor: "text-blue-600",
      demandBg: "bg-blue-100",
      growth: "+35%",
      color: "from-[#1B365D] to-[#FFD700]",
      bgPattern: "healthcare"
    },
    {
      icon: Palette,
      title: "Creative Arts",
      description: "Graphic design, filmmaking, music production, content creation, and digital marketing",
      salaryRange: "₦1.2M - ₦8M",
      qualifications: "Art degree, Portfolio, or Creative certification",
      demand: "Growing",
      demandColor: "text-purple-600",
      demandBg: "bg-purple-100",
      growth: "+28%",
      color: "from-[#FFD700] to-[#1B4D3E]",
      bgPattern: "creative"
    },
    {
      icon: Briefcase,
      title: "Business & Finance",
      description: "Banking, consulting, entrepreneurship, project management, and financial analysis",
      salaryRange: "₦2M - ₦20M",
      qualifications: "Business degree, Professional certifications, or MBA",
      demand: "Stable",
      demandColor: "text-orange-600",
      demandBg: "bg-orange-100",
      growth: "+22%",
      color: "from-[#1B365D] to-[#1B4D3E]",
      bgPattern: "business"
    }
  ];

  return (
    <section id="careers" className="py-20 lg:py-32 bg-gradient-to-b from-[#1B4D3E]/5 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-[#2C3E50] mb-6">
            Explore{' '}
            <span className="bg-gradient-to-r from-[#1B4D3E] to-[#FFD700] bg-clip-text text-transparent">
              Career Paths
            </span>{' '}
            in Nigeria
          </h2>
          <p className="text-xl text-[#2C3E50]/80 font-opensans max-w-3xl mx-auto leading-relaxed">
            Discover high-growth career opportunities tailored to Nigeria's evolving job market and economic landscape
          </p>
        </div>

        {/* Career Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {careerPaths.map((path, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-[#1B4D3E]/10"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className={`w-full h-full bg-gradient-to-br ${path.color}`}></div>
              </div>

              {/* Card Content */}
              <div className="relative p-8 h-full flex flex-col">
                {/* Icon and Demand Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} p-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <path.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className={`${path.demandBg} ${path.demandColor} px-3 py-1 rounded-full text-sm font-semibold font-opensans`}>
                    {path.demand}
                  </div>
                </div>

                {/* Title and Description */}
                <div className="flex-grow space-y-4">
                  <h3 className="text-2xl font-bold font-montserrat text-[#2C3E50] group-hover:text-[#1B4D3E] transition-colors duration-300">
                    {path.title}
                  </h3>
                  
                  <p className="text-[#2C3E50]/80 font-opensans leading-relaxed">
                    {path.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-[#1B4D3E]" />
                      <span className="text-sm font-semibold font-opensans text-[#2C3E50]">Salary Range</span>
                    </div>
                    <span className="font-bold font-montserrat text-[#1B4D3E]">{path.salaryRange}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-[#1B4D3E]" />
                      <span className="text-sm font-semibold font-opensans text-[#2C3E50]">Growth</span>
                    </div>
                    <span className="font-bold font-montserrat text-green-600">{path.growth}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-[#1B4D3E]/10">
                    <div className="flex items-start space-x-2">
                      <GraduationCap className="h-4 w-4 text-[#1B4D3E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#2C3E50]/80 font-opensans leading-relaxed">
                        {path.qualifications}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Action */}
                <div className={`mt-6 transform transition-all duration-300 ${
                  hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFC700] hover:from-[#FFC700] hover:to-[#FFB700] text-[#1B4D3E] py-3 rounded-xl font-bold font-montserrat transition-all duration-300 shadow-lg">
                    Explore Path
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 bg-gradient-to-r from-[#1B4D3E] to-[#1B365D] rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2 text-[#FFD700]">500+</div>
              <div className="text-white/80 font-opensans">Career Options</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2 text-[#FFD700]">36</div>
              <div className="text-white/80 font-opensans">States Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2 text-[#FFD700]">85%</div>
              <div className="text-white/80 font-opensans">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-montserrat mb-2 text-[#FFD700]">₦3.2M</div>
              <div className="text-white/80 font-opensans">Average Starting Salary</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerPaths;