import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Star, CheckCircle } from 'lucide-react';
import { quizQuestions } from '../data/quizQuestions';
import { analyzeCareerFit } from '../utils/careerAnalysis';

interface CareerQuizProps {
  onGoHome: () => void;
  onShowResult: (result: any) => void;
}

const CareerQuiz: React.FC<CareerQuizProps> = ({ onGoHome, onShowResult }) => {
  const [currentQuestion, setCurrentQuestion] = useState(-1); // Start with welcome screen
  const [answers, setAnswers] = useState<(string | string[] | number)[]>(new Array(quizQuestions.length).fill(''));
  const [selectedAnswers, setSelectedAnswers] = useState<string[] | number[]>([]);
  const [ratingAnswers, setRatingAnswers] = useState<{ [key: string]: number }>({});

  const handleWelcomeStart = () => {
    setCurrentQuestion(0);
  };

  const handleAnswerSelect = (answer: string) => {
    const question = quizQuestions[currentQuestion];
    
    if (question.type === 'multi-select') {
      const currentSelected = selectedAnswers as string[];
      const maxSelections = question.maxSelections || 3;
      const newSelected = currentSelected.includes(answer)
        ? currentSelected.filter(a => a !== answer)
        : currentSelected.length < maxSelections 
          ? [...currentSelected, answer]
          : currentSelected;
      setSelectedAnswers(newSelected);
    } else if (question.type === 'rating') {
      // For rating questions, we'll handle this differently
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answer;
      setAnswers(newAnswers);
      setSelectedAnswers([]);
    } else {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = answer;
      setAnswers(newAnswers);
      setSelectedAnswers([]);
    }
  };

  const handleRatingSelect = (value: number) => {
    const question = quizQuestions[currentQuestion];
    const optionIndex = (question.options as { value: number; label: string }[]).findIndex(opt => opt.value === value);
    const optionLabel = (question.options as { value: number; label: string }[])[optionIndex]?.label;
    
    if (optionLabel) {
      const newRatingAnswers = { ...ratingAnswers, [optionLabel]: value };
      setRatingAnswers(newRatingAnswers);
      
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = newRatingAnswers;
      setAnswers(newAnswers);
    }
  };

  const handleRatingSelectForFactor = (factorLabel: string, value: number) => {
    const newRatingAnswers = { ...ratingAnswers, [factorLabel]: value };
    setRatingAnswers(newRatingAnswers);
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = newRatingAnswers;
    setAnswers(newAnswers);
  };

  const goToNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      if (quizQuestions[currentQuestion].type === 'multi-select') {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = selectedAnswers as string[];
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
    if (quizQuestions[currentQuestion].type === 'multi-select') {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswers as string[];
      setAnswers(newAnswers);
    } else if (quizQuestions[currentQuestion].type === 'rating') {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = ratingAnswers;
      setAnswers(newAnswers);
    }

    // Use the AI analysis engine
    const analysisResult = analyzeCareerFit(quizQuestions, answers);
    onShowResult({ careers: analysisResult.topMatches, analysis: analysisResult });
  };

  const progress = currentQuestion === -1 ? 0 : ((currentQuestion + 1) / quizQuestions.length) * 100;
  const canProceed = currentQuestion === -1 ? true : (() => {
    const question = quizQuestions[currentQuestion];
    if (question?.type === 'multi-select') {
      return selectedAnswers.length > 0;
    } else if (question?.type === 'rating') {
      const ratingCount = Object.keys(ratingAnswers).length;
      const expectedCount = (question.options as { value: number; label: string }[]).length;
      return ratingCount === expectedCount;
    } else {
      return answers[currentQuestion] !== '';
    }
  })();

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
                    <span>{quizQuestions.length} Questions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#FFD700] rounded-full"></div>
                    <span>8-12 Minutes</span>
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
            {question.type === 'multi-select' && (
              <p className="text-[#2E8B57] font-medium mt-2">
                Choose up to {question.maxSelections || 3} options
              </p>
            )}
            {question.type === 'rating' && (
              <p className="text-[#2E8B57] font-medium mt-2">Rate each factor from 1 (not important) to 5 (extremely important)</p>
            )}
          </div>

          {/* Answer Options - Different rendering based on question type */}
          {question.type === 'rating' ? (
            <div className="space-y-6 mb-12">
              {(question.options as { value: number; label: string }[]).map((option, index) => {
                const currentRating = ratingAnswers[option.label] || 0;
                return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{option.label}</span>
                    <span className="text-sm text-gray-500">
                      {currentRating > 0 ? `Rating: ${currentRating}` : 'Not rated'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => handleRatingSelectForFactor(option.label, rating)}
                        className={`w-12 h-12 rounded-full border-2 font-bold transition-all duration-200 ${
                          currentRating === rating
                            ? 'border-[#2E8B57] bg-[#2E8B57] text-white'
                            : 'border-gray-300 hover:border-[#2E8B57]/50 text-gray-600'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4 mb-12">
              {(question.options as string[]).map((option, index) => {
                const isSelected = question.type === 'multi-select' 
                  ? (selectedAnswers as string[]).includes(option)
                  : answers[currentQuestion] === option;
                const maxSelections = question.maxSelections || 3;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={question.type === 'multi-select' && !isSelected && (selectedAnswers as string[]).length >= maxSelections}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-[#2E8B57] bg-[#2E8B57]/5 text-[#2E8B57]'
                        : question.type === 'multi-select' && (selectedAnswers as string[]).length >= maxSelections
                          ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                          : 'border-gray-200 hover:border-[#2E8B57]/50 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-5 h-5 ${question.type === 'multi-select' ? 'rounded-md' : 'rounded-full'} border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-[#2E8B57] bg-[#2E8B57]'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          question.type === 'multi-select' 
                            ? <CheckCircle className="w-3 h-3 text-white" />
                            : <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

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