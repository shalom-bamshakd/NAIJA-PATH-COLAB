import React, { useState } from 'react';
import { Home, Share2, Printer, MessageCircle, Facebook, Star, TrendingUp, BookOpen, Users } from 'lucide-react';
import { CareerMatch, AnalysisResult } from '../utils/careerAnalysis';

interface CareerResultsProps {
  careers: CareerMatch[];
  analysis?: AnalysisResult;
  onGoHome: () => void;
}

const CareerResults: React.FC<CareerResultsProps> = ({ careers, analysis, onGoHome }) => {
  const [selectedCareer, setSelectedCareer] = useState(0);

  const handleShare = (platform: 'whatsapp' | 'facebook') => {
    const career = careers[selectedCareer].career;
    const confidence = Math.round(careers[selectedCareer].confidenceScore * 100);
    const text = `I just discovered my perfect career path! I'm ${confidence}% matched with ${career.title}. Check out NaijaPath to find yours!`;
    
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
          {careers.slice(0, 3).map((careerMatch, index) => (
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
                <span>{careerMatch.career.title}</span>
                <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                  selectedCareer === index ? 'bg-white/20' : 'bg-[#2E8B57] text-white'
                }`}>
                  {Math.round(careerMatch.confidenceScore * 100)}%
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Career Details */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#2E8B57] to-[#FFD700] p-8 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                {careers[selectedCareer].career.title}
              </h2>
              <div className="bg-white/20 px-4 py-2 rounded-full">
                <span className="text-2xl font-bold">
                  {Math.round(careers[selectedCareer].confidenceScore * 100)}% Match
                </span>
              </div>
            </div>
            <p className="text-xl leading-relaxed opacity-90">
              {careers[selectedCareer].career.description}
            </p>
          </div>

          <div className="p-8 lg:p-12 space-y-12">
            {/* Match Reasons */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Why This Career Matches You</h3>
              </div>
              <div className="space-y-3">
                {careers[selectedCareer].matchReasons.map((reason, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Required */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#2E8B57]/10 rounded-xl flex items-center justify-center mr-4">
                  <TrendingUp className="h-6 w-6 text-[#2E8B57]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Skills You'll Need</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {careers[selectedCareer].career.requiredSkills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-2 h-2 bg-[#2E8B57] rounded-full"></div>
                    <span className="font-medium text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-[#FFD700]/20 rounded-xl flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-[#FFD700]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Your Next Steps</h3>
              </div>
              <div className="space-y-4">
                {careers[selectedCareer].nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-[#FFD700]/10 rounded-xl">
                    <div className="w-8 h-8 bg-[#FFD700] rounded-full flex items-center justify-center text-gray-900 font-bold text-sm flex-shrink-0 mt-1">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Gaps */}
            {careers[selectedCareer].skillGaps.length > 0 && (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Skills to Develop</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {careers[selectedCareer].skillGaps.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="font-medium text-gray-700">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nigerian Market Context */}
            <div className="bg-[#2E8B57]/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🇳🇬 Nigerian Market Insights</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Salary Range</h4>
                  <p className="text-2xl font-bold text-[#2E8B57]">
                    {careers[selectedCareer].career.nigerianContext.averageSalary}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Market Demand</h4>
                  <p className={`text-lg font-bold capitalize ${
                    careers[selectedCareer].career.nigerianContext.demand === 'high' ? 'text-green-600' :
                    careers[selectedCareer].career.nigerianContext.demand === 'medium' ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {careers[selectedCareer].career.nigerianContext.demand} Demand
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Top Opportunities</h4>
                <div className="flex flex-wrap gap-2">
                  {careers[selectedCareer].career.nigerianContext.localOpportunities.map((opportunity, index) => (
                    <span key={index} className="bg-[#2E8B57]/10 text-[#2E8B57] px-3 py-1 rounded-full text-sm font-medium">
                      {opportunity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Education Requirements */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎓 Education Pathways</h3>
              <div className="space-y-3">
                {careers[selectedCareer].career.educationRequirements.map((requirement, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="font-medium text-gray-700">{requirement}</span>
                  </div>
                ))}
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

        {/* Other Recommendations */}
        {careers.length > 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Other Great Matches for You</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {careers.slice(1, 3).map((careerMatch, index) => (
                <div key={index + 1} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{careerMatch.career.title}</h3>
                    <div className="bg-[#2E8B57]/10 text-[#2E8B57] px-3 py-1 rounded-full text-sm font-bold">
                      {Math.round(careerMatch.confidenceScore * 100)}% Match
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{careerMatch.career.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Salary Range:</span>
                      <span className="font-semibold text-gray-900">{careerMatch.career.nigerianContext.averageSalary}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Market Demand:</span>
                      <span className={`font-semibold capitalize ${
                        careerMatch.career.nigerianContext.demand === 'high' ? 'text-green-600' :
                        careerMatch.career.nigerianContext.demand === 'medium' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {careerMatch.career.nigerianContext.demand}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedCareer(index + 1)}
                      className="w-full mt-4 bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white py-2 rounded-lg font-semibold transition-colors duration-200"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerResults;