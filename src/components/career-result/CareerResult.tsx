import React, { useEffect, useState } from 'react';
import { Home, ArrowRight, CheckCircle, Star, TrendingUp, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CareerResultProps {
  result: {
    career: string;
    emoji: string;
    summary: string;
    match: number;
    skills: string[];
    growth: string;
    salary: string;
  };
  onGoHome: () => void;
  onViewRoadmap: () => void;
  onUpgradePremium: () => void;
}

const CareerResult: React.FC<CareerResultProps> = ({ 
  result, 
  onGoHome, 
  onViewRoadmap, 
  onUpgradePremium 
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger confetti animation
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        }
      });
      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        }
      });
    }, 250);

    // Show content with delay
    setTimeout(() => setShowContent(true), 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <button
          onClick={onGoHome}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors duration-200"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      {/* Main Result Card */}
      <div className={`max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 lg:p-12 transform transition-all duration-700 ${
        showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 Career Match Found!
          </h2>
          <p className="text-gray-600">
            We've analyzed your responses and found your perfect career path
          </p>
        </div>

        {/* Career Display */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">{result.emoji}</div>
          <h1 className="text-4xl font-bold text-green-500 mb-4">
            {result.career}
          </h1>
          <div className="flex items-center justify-center mb-6">
            <Star className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-lg font-semibold text-gray-700">
              {result.match}% Match
            </span>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            {result.summary}
          </p>
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-blue-50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Growth Potential</h3>
            </div>
            <p className="text-gray-600">{result.growth}</p>
          </div>
          
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <DollarSign className="h-6 w-6 text-green-600 mr-2" />
              <h3 className="font-semibold text-gray-900">Salary Range</h3>
            </div>
            <p className="text-gray-600">{result.salary}</p>
          </div>
        </div>

        {/* Skills Match */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Key Strengths</h3>
          <div className="flex flex-wrap gap-3">
            {result.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onViewRoadmap}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
          >
            View Learning Roadmap
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <button
            onClick={onUpgradePremium}
            className="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200"
          >
            Unlock Premium Features
          </button>
        </div>

        {/* Encouragement Message */}
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
          <p className="text-center text-gray-700 font-medium">
            🚀 You're on the right path! This career aligns perfectly with your interests and Nigeria's growing job market.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerResult;