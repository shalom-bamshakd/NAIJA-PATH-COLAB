import React, { useState } from 'react';
import { Home, Star, Check, ArrowRight, Shield, Zap, Users, BookOpen, Video, MessageCircle } from 'lucide-react';
import TestimonialCarousel from './TestimonialCarousel';
import FeatureCard from './FeatureCard';

interface PremiumProps {
  onGoHome: () => void;
}

const Premium: React.FC<PremiumProps> = ({ onGoHome }) => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Career Matching",
      description: "Advanced algorithms analyze 50+ data points to find your perfect career match with 95% accuracy.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: BookOpen,
      title: "Personalized Learning Paths",
      description: "Custom roadmaps tailored to your learning style, schedule, and career goals in the Nigerian market.",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: Video,
      title: "Expert Video Courses",
      description: "Access 200+ hours of premium content from Nigerian tech leaders and industry experts.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Users,
      title: "Mentorship Network",
      description: "Connect with successful professionals in your field for guidance and career advice.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: MessageCircle,
      title: "24/7 AI Career Coach",
      description: "Get instant answers to career questions and personalized advice anytime, anywhere.",
      color: "from-red-400 to-pink-500"
    },
    {
      icon: Shield,
      title: "Job Guarantee Program",
      description: "Complete our program and get a job within 6 months, or get your money back.",
      color: "from-green-500 to-teal-500"
    }
  ];

  const plans = {
    monthly: {
      price: "₦15,000",
      period: "per month",
      savings: null
    },
    yearly: {
      price: "₦120,000",
      period: "per year",
      savings: "Save ₦60,000"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={onGoHome}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors duration-200 mb-8"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Back to Home</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Star className="h-4 w-4 mr-2" />
            Trusted by 10,000+ Nigerian Youth
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Unlock Your{' '}
            <span className="bg-gradient-to-r from-green-500 to-indigo-600 bg-clip-text text-transparent">
              Full Potential
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join Nigeria's premier career guidance platform and accelerate your journey to a successful tech career with personalized AI coaching, expert mentorship, and guaranteed job placement.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium">95% Success Rate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium">Money-Back Guarantee</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-gray-700 font-medium">Expert Mentors</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Pricing Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600">
              Start your journey to a successful tech career today
            </p>
          </div>

          {/* Plan Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  selectedPlan === 'monthly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  selectedPlan === 'yearly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-green-500 to-indigo-600 rounded-2xl p-8 text-white text-center relative overflow-hidden">
              {selectedPlan === 'yearly' && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                  Best Value
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-4">Premium Access</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">{plans[selectedPlan].price}</span>
                <span className="text-lg opacity-80 ml-2">{plans[selectedPlan].period}</span>
                {plans[selectedPlan].savings && (
                  <div className="text-yellow-300 font-semibold mt-2">
                    {plans[selectedPlan].savings}
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-8 text-left">
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-3 text-green-300" />
                  <span>AI-Powered Career Matching</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-3 text-green-300" />
                  <span>Personalized Learning Roadmaps</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-3 text-green-300" />
                  <span>Expert Video Courses</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-3 text-green-300" />
                  <span>1-on-1 Mentorship</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-3 text-green-300" />
                  <span>Job Guarantee Program</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 mr-3 text-green-300" />
                  <span>24/7 AI Career Coach</span>
                </li>
              </ul>

              <button className="w-full bg-white text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Money-back guarantee */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Shield className="h-4 w-4 mr-2" />
              <span className="font-semibold">30-day money-back guarantee</span>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <TestimonialCarousel />

        {/* Final CTA */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerian youth who have successfully launched their tech careers with NaijaPath.
          </p>
          <button className="bg-gradient-to-r from-green-500 to-indigo-600 hover:from-green-600 hover:to-indigo-700 text-white px-12 py-4 rounded-lg font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;