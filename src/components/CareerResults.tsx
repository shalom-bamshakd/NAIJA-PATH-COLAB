import React, { useState } from 'react';
import { Home, Share2, Printer, MessageCircle, Facebook, Star, TrendingUp, BookOpen, Users } from 'lucide-react';

interface Career {
  title: string;
  description: string;
  skills: string[];
  howToStart: string[];
  successStory: {
    name: string;
    story: string;
  };
  earning: string;
  training: {
    online: string[];
    offline: string[];
  };
  match: number;
}

interface CareerResultsProps {
  careers: Career[];
  onGoHome: () => void;
}

const CareerResults: React.FC<CareerResultsProps> = ({ careers, onGoHome }) => {
  const [selectedCareer, setSelectedCareer] = useState(0);

  const handleShare = (platform: 'whatsapp' | 'facebook') => {
    const career = careers[selectedCareer];
    const text = `I just discovered my perfect career path! I'm ${career.match}% matched with ${career.title}. Check out NaijaPath to find yours!`;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } else {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/10 to-[#FFD700]/10 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onGoHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#2E8B57] transition-colors duration-200"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center space-x-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center space-x-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Facebook className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 border-2 border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <Printer className="h-4 w-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Results Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg mb-6">
            <Star className="h-6 w-6 text-[#FFD700] mr-2" />
            <span className="font-bold text-gray-900">Your Career Matches</span>
          </div>
          
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Perfect Careers for You!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on your answers, here are the top 3 careers that match your interests, skills, and goals.
          </p>
        </div>
      </div>

      {/* Career Cards */}
      <div className="max-w-4xl mx-auto">
        {/* Career Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {careers.map((career, index) => (
            <button
              key={index}
              onClick={() => setSelectedCareer(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedCareer === index
                  ? 'bg-[#2E8B57] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span>{career.title}</span>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  selectedCareer === index ? 'bg-white/20' : 'bg-[#2E8B57] text-white'
                }`}>
                  {career.match}%
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Career Details */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#2E8B57] to-[#FFD700] p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                {careers[selectedCareer].title}
              </h2>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold">{careers[selectedCareer].match}% Match</span>
              </div>
            </div>
            <p className="text-xl leading-relaxed opacity-90">
              {careers[selectedCareer].description}
            </p>
          </div>

          <div className="p-8 lg:p-12 space-y-12">
            {/* Skills Required */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-[#2E8B57]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Skills You'll Need</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {careers[selectedCareer].skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-[#2E8B57] rounded-full"></div>
                    <span className="font-medium text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Start */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#FFD700]/20 rounded-xl flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">How to Get Started</h3>
              </div>
              <div className="space-y-4">
                {careers[selectedCareer].howToStart.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-[#FFD700]/10 rounded-xl">
                    <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Story */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Success Story</h3>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2E8B57] to-[#FFD700] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {careers[selectedCareer].successStory.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">
                      {careers[selectedCareer].successStory.name}
                    </h4>
                    <p className="text-gray-700 leading-relaxed italic">
                      "{careers[selectedCareer].successStory.story}"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Earning Potential */}
            <div className="bg-[#2E8B57]/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💰 Earning Potential</h3>
              <p className="text-2xl font-bold text-[#2E8B57]">
                {careers[selectedCareer].earning}
              </p>
              <p className="text-gray-600 mt-2">
                Based on current Nigerian market rates for this profession
              </p>
            </div>

            {/* Training Resources */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📚 Where to Learn</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Online Resources
                  </h4>
                  <div className="space-y-3">
                    {careers[selectedCareer].training.online.map((resource, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg">
                        <span className="text-gray-700">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Offline/Local Options
                  </h4>
                  <div className="space-y-3">
                    {careers[selectedCareer].training.offline.map((resource, index) => (
                      <div key={index} className="p-3 bg-green-50 rounded-lg">
                        <span className="text-gray-700">{resource}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="bg-gradient-to-r from-[#2E8B57] to-[#FFD700] p-8 rounded-2xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
              <p className="text-lg mb-6 opacity-90">
                Take the first step towards your dream career today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors duration-200">
                  Find Training Near Me
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors duration-200">
                  Connect with Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerResults;