import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Star } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';

interface CareerQuizProps {
  onGoHome: () => void;
  onShowResult: (result: any) => void;
}

const CareerQuiz: React.FC<CareerQuizProps> = ({ onGoHome, onShowResult }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // Start with welcome screen
  const [answers, setAnswers] = useState<string[]>(new Array(quizQuestions.length).fill(''));
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleWelcomeStart = () => {
    setCurrentQuestion(0);
  };

  const handleAnswerSelect = (answer: string) => {
    const question = quizQuestions[currentQuestion];
    
    if (question.multiSelect) {
      const newSelected = selectedAnswers.includes(answer)
        ? selectedAnswers.filter(a => a !== answer)
        : selectedAnswers.length < 2 
          ? [...selectedAnswers, answer]
          : selectedAnswers;
      setSelectedAnswers(newSelected);
    } else {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answer;
      setAnswers(newAnswers);
      setSelectedAnswers([]);
    }
  };

  const goToNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      if (quizQuestions[currentQuestion].multiSelect) {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = selectedAnswers.join(', ');
        setAnswers(newAnswers);
        setSelectedAnswers([]);
      }
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const goToPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswers([]);
    }
  };

  const handleSubmit = () => {
    // Process final multi-select answer
    if (quizQuestions[currentQuestion].multiSelect) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswers.join(', ');
      setAnswers(newAnswers);
    }

    // Import and use CareerResults component
    import('../components/CareerResults').then(({ default: CareerResults }) => {
      const careerMatches = calculateCareerMatches(answers);
      onShowResult({ careers: careerMatches });
    });
  };

  const calculateCareerMatches = (userAnswers: string[]) => {
    // Simplified career matching algorithm
    const careers = [
      {
        title: "Software Developer",
        description: "Build websites, mobile apps, and software solutions that millions of Nigerians use daily. Work with companies like Paystack, Flutterwave, or start your own tech business.",
        skills: ["Programming (Python, JavaScript)", "Problem-solving", "Logical thinking", "Attention to detail", "Continuous learning"],
        howToStart: [
          "Start with free coding courses on FreeCodeCamp or Codecademy",
          "Practice building simple projects like a personal website",
          "Join Nigerian tech communities like DevCenter Lagos or Forloop Africa"
        ],
        successStory: {
          name: "Adebayo Ogundimu",
          story: "Started learning to code in university. Now works as a Senior Developer at Paystack, earning ₦8M annually and building payment solutions for African businesses."
        },
        earning: "₦2.5M - ₦15M per year",
        training: {
          online: ["FreeCodeCamp", "Udemy Web Development", "YouTube coding tutorials"],
          offline: ["Decagon Institute", "New Horizons Computer Learning", "Local coding bootcamps"]
        },
        match: 95
      },
      {
        title: "Digital Marketing Specialist",
        description: "Help Nigerian businesses grow online through social media, content creation, and digital advertising. Perfect for creative minds who understand social trends.",
        skills: ["Social media management", "Content creation", "Data analysis", "Communication", "Creativity"],
        howToStart: [
          "Learn digital marketing basics through Google Digital Skills",
          "Practice by managing social media for local businesses",
          "Get certified in Facebook Ads and Google Analytics"
        ],
        successStory: {
          name: "Funmi Adebayo",
          story: "Started by managing Instagram for her friend's fashion brand. Now runs a digital agency with 15 clients, earning ₦5M annually while working from home."
        },
        earning: "₦1.5M - ₦8M per year",
        training: {
          online: ["Google Digital Skills", "HubSpot Academy", "Facebook Blueprint"],
          offline: ["NIIT Digital Marketing", "Jobberman Soft Skills", "Local marketing workshops"]
        },
        match: 88
      },
      {
        title: "Graphic Designer",
        description: "Create visual content for brands, websites, and marketing materials. High demand in Nigeria's growing creative industry and entertainment sector.",
        skills: ["Adobe Creative Suite", "Visual communication", "Creativity", "Brand understanding", "Client management"],
        howToStart: [
          "Learn design basics using free tools like Canva and GIMP",
          "Practice by creating designs for local businesses",
          "Build a portfolio on Behance or Instagram"
        ],
        successStory: {
          name: "Kemi Oladele",
          story: "Self-taught designer who started with free YouTube tutorials. Now works with major Nollywood productions and earns ₦4M annually as a freelance brand designer."
        },
        earning: "₁M - ₦6M per year",
        training: {
          online: ["YouTube design tutorials", "Skillshare", "Adobe tutorials"],
          offline: ["Pencil and Pixel Academy", "Design workshops", "Art schools"]
        },
        match: 82
      }
    ];

    // Simple scoring based on answers
    return careers.sort((a, b) => b.match - a.match).slice(0, 3);
  };

  const progress = currentQuestion === -1 ? 0 : ((currentQuestion + 1) / quizQuestions.length) * 100;
  const canProceed = currentQuestion === -1 ? true : 
    quizQuestions[currentQuestion]?.multiSelect ? selectedAnswers.length > 0 : answers[currentQuestion];

  // Welcome Screen
  if (currentQuestion === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/10 to-[#FFD700]/10 relative overflow-hidden">
        {/* African Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border-4 border-[#2E8B57] rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-[#FFD700] rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-[#2E8B57] rotate-45"></div>
        </div>

        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            <button
              onClick={onGoHome}
              className="absolute top-8 left-8 flex items-center space-x-2 text-gray-600 hover:text-[#2E8B57] transition-colors duration-200"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>

            <div className="bg-white rounded-3xl shadow-2xl p-12 border border-gray-100">
              <div className="mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E8B57] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="h-10 w-10 text-white" />
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  Find Your Dream Career
                </h1>
                <div className="text-2xl font-semibold text-[#2E8B57] mb-4">
                  NaijaPath Quiz
                </div>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
                  Answer 6 simple questions to discover jobs that match your skills and interests. 
                  Get personalized career recommendations made for young Nigerians like you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#2E8B57] rounded-full"></div>
                    <span>6 Questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                    <span>5 Minutes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#2E8B57] rounded-full"></div>
                    <span>Free Results</span>
                  </div>
                </div>

                <button
                  onClick={handleWelcomeStart}
                  className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Begin Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E8B57]/10 to-[#FFD700]/10 py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onGoHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#2E8B57] transition-colors duration-200"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
          <div
            className="bg-gradient-to-r from-[#2E8B57] to-[#FFD700] h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-100 transform transition-all duration-500">
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {question.question}
            </h2>
            {question.description && (
              <p className="text-gray-600">{question.description}</p>
            )}
            {question.multiSelect && (
              <p className="text-[#2E8B57] font-medium mt-2">Choose up to 2 options</p>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-4 mb-12">
            {question.options.map((option, index) => {
              const isSelected = question.multiSelect 
                ? selectedAnswers.includes(option)
                : answers[currentQuestion] === option;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={question.multiSelect && !isSelected && selectedAnswers.length >= 2}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                    isSelected
                      ? 'border-[#2E8B57] bg-[#2E8B57]/5 text-[#2E8B57]'
                      : question.multiSelect && selectedAnswers.length >= 2
                        ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                        : 'border-gray-200 hover:border-[#2E8B57]/50 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-[#2E8B57] bg-[#2E8B57]'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'border-2 border-[#2E8B57] text-[#2E8B57] hover:bg-[#2E8B57] hover:text-white'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Previous</span>
            </button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed}
                className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  canProceed
                    ? 'bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Get My Results
              </button>
            ) : (
              <button
                onClick={goToNext}
                disabled={!canProceed}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  canProceed
                    ? 'bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerQuiz;