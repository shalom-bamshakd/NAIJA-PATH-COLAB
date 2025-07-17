import React, { useState } from 'react';
import { Star, Play, Quote, MapPin, Briefcase } from 'lucide-react';

const SuccessStories: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);

  const successStories = [
    {
      name: "Adebayo Ogundimu",
      role: "Senior Software Engineer",
      company: "Paystack",
      location: "Lagos, Nigeria",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      story: "NaijaPath helped me transition from accounting to tech. The personalized roadmap and mentorship program were game-changers. Now I'm building fintech solutions that impact millions of Nigerians.",
      previousRole: "Accountant",
      timeToTransition: "8 months",
      salaryIncrease: "300%",
      videoThumbnail: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Fatima Abdullahi",
      role: "Data Scientist",
      company: "Andela",
      location: "Abuja, Nigeria",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300",
      story: "From teaching mathematics to analyzing data for global companies. NaijaPath's AI assessment revealed my analytical strengths and provided the perfect learning path. The support community was incredible.",
      previousRole: "Mathematics Teacher",
      timeToTransition: "6 months",
      salaryIncrease: "250%",
      videoThumbnail: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Chinedu Okwu",
      role: "Product Manager",
      company: "Flutterwave",
      location: "Lagos, Nigeria",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      story: "NaijaPath identified my leadership potential and guided me into product management. The career coaching and industry connections were invaluable. I now lead product strategy for Africa's payment infrastructure.",
      previousRole: "Marketing Executive",
      timeToTransition: "10 months",
      salaryIncrease: "400%",
      videoThumbnail: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-[#FFD700]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold font-montserrat text-[#2C3E50] mb-6">
            Success{' '}
            <span className="bg-gradient-to-r from-[#1B4D3E] to-[#FFD700] bg-clip-text text-transparent">
              Stories
            </span>{' '}
            from Nigerian Youth
          </h2>
          <p className="text-xl text-[#2C3E50]/80 font-opensans max-w-3xl mx-auto leading-relaxed">
            Real stories from young Nigerians who transformed their careers with NaijaPath's guidance
          </p>
        </div>

        {/* Success Stories Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#1B4D3E]/10"
            >
              {/* Image with Video Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Video Play Button */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setSelectedStory(index)}
                    className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-300"
                  >
                    <Play className="h-6 w-6 text-[#1B4D3E] ml-1" />
                  </button>
                </div>

                {/* Career Transition Badge */}
                <div className="absolute top-4 left-4 bg-[#FFD700] text-[#1B4D3E] px-3 py-1 rounded-full text-sm font-bold font-opensans">
                  +{story.salaryIncrease} salary
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-[#FFD700] fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="absolute -top-2 -left-2 h-8 w-8 text-[#1B4D3E]/20" />
                  <p className="text-[#2C3E50]/80 font-opensans leading-relaxed italic pl-6">
                    "{story.story}"
                  </p>
                </div>

                {/* Profile */}
                <div className="space-y-3">
                  <div>
                    <h3 className="font-bold font-montserrat text-[#2C3E50] text-lg">{story.name}</h3>
                    <div className="flex items-center space-x-2 text-[#1B4D3E]">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-semibold font-opensans">{story.role}</span>
                    </div>
                    <div className="text-[#2C3E50]/60 font-opensans">{story.company}</div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[#2C3E50]/60">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-opensans">{story.location}</span>
                  </div>

                  {/* Transition Stats */}
                  <div className="pt-4 border-t border-[#1B4D3E]/10">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold font-montserrat text-[#1B4D3E]">{story.timeToTransition}</div>
                        <div className="text-xs text-[#2C3E50]/60 font-opensans">Transition Time</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold font-montserrat text-[#1B4D3E]">{story.previousRole}</div>
                        <div className="text-xs text-[#2C3E50]/60 font-opensans">Previous Role</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedStory !== null && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full">
              <div className="relative">
                <img
                  src={successStories[selectedStory].videoThumbnail}
                  alt="Video thumbnail"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Video testimonial coming soon</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-[#1B4D3E]/10 to-[#FFD700]/10 backdrop-blur-sm border border-[#1B4D3E]/20 px-8 py-4 rounded-2xl">
            <span className="text-[#2C3E50] font-semibold font-opensans mr-4">
              Ready to write your success story?
            </span>
            <button className="bg-[#FFD700] hover:bg-[#FFC700] text-[#1B4D3E] px-6 py-2 rounded-lg font-bold font-montserrat transition-all duration-300">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;