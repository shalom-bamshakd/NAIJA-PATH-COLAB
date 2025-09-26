import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, Star, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
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
      const expectedCount = (question.options as string[]).length;
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
            <Button
              variant="ghost"
              onClick={onGoHome}
              className="absolute top-8 left-8 flex items-center space-x-2 text-gray-600 hover:text-[#2E8B57] transition-colors duration-200"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Button>

            <Card className="bg-white rounded-3xl shadow-2xl border border-gray-100">
              <CardHeader className="p-12">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2E8B57] to-[#FFD700] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star className="h-10 w-10 text-white" />
                  </div>
                  
                  <CardTitle className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                    Find Your Dream Career
                  </CardTitle>
                  <Badge variant="secondary" className="text-2xl font-semibold text-[#2E8B57] mb-4 px-4 py-2">
                    NaijaPath Quiz
                  </Badge>
                  
                  <CardDescription className="text-xl text-gray-600 leading-relaxed max-w-xl mx-auto">
                    Answer 6 simple questions to discover jobs that match your skills and interests. 
                    Get personalized career recommendations made for young Nigerians like you.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-12 pb-12">
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

                  <Button
                    onClick={handleWelcomeStart}
                    size="lg"
                    className="bg-[#FFD700] hover:bg-[#FFC700] text-gray-900 px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Begin Your Journey
                  </Button>
                </div>
              </CardContent>
            </Card>
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
          <Button
            variant="ghost"
            onClick={onGoHome}
            className="flex items-center space-x-2 text-gray-600 hover:text-[#2E8B57] transition-colors duration-200"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Button>
          
          <Badge variant="outline" className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </Badge>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="w-full h-3 mb-8" />
      </div>

      {/* Quiz Card */}
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white rounded-2xl shadow-xl border border-gray-100 transform transition-all duration-500">
          <CardHeader className="p-8 lg:p-12 pb-0">
            <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              {question.question}
            </CardTitle>
            {question.description && (
              <CardDescription className="text-gray-600">{question.description}</CardDescription>
            )}
            {question.type === 'multi-select' && (
              <Badge variant="secondary" className="text-[#2E8B57] font-medium mt-2 w-fit">
                Choose up to {question.maxSelections || 3} options
              </Badge>
            )}
            {question.type === 'rating' && (
              <Badge variant="secondary" className="text-[#2E8B57] font-medium mt-2 w-fit">
                Rate each factor from 1 (not important) to 5 (extremely important)
              </Badge>
            )}
          </CardHeader>
          <CardContent className="p-8 lg:p-12 pt-8">

          {/* Answer Options - Different rendering based on question type */}
          {question.type === 'rating' ? (
            <div className="space-y-6 mb-12">
              {(question.options as string[]).map((factor, index) => {
                const currentRating = ratingAnswers[factor] || 0;
                return (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{factor}</span>
                    <span className="text-sm text-gray-500">
                      {currentRating > 0 ? `Rating: ${currentRating}` : 'Not rated'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant={currentRating === rating ? "default" : "outline"}
                        onClick={() => {
                          const newRatingAnswers = { ...ratingAnswers, [factor]: rating };
                          setRatingAnswers(newRatingAnswers);
                          const newAnswers = [...answers];
                          newAnswers[currentQuestion] = newRatingAnswers;
                          setAnswers(newAnswers);
                        }}
                        className={`w-12 h-12 rounded-full font-bold transition-all duration-200 ${
                          currentRating === rating
                            ? 'bg-[#2E8B57] text-white border-[#2E8B57]'
                            : 'hover:border-[#2E8B57]/50'
                        }`}
                      >
                        {rating}
                      </Button>
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
                  <Button
                    key={index}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={question.type === 'multi-select' && !isSelected && (selectedAnswers as string[]).length >= maxSelections}
                    className={`w-full text-left p-6 rounded-xl transition-all duration-200 justify-start h-auto ${
                      isSelected
                        ? 'bg-[#2E8B57]/5 text-[#2E8B57] border-[#2E8B57]'
                        : question.type === 'multi-select' && (selectedAnswers as string[]).length >= maxSelections
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:border-[#2E8B57]/50 hover:bg-gray-50'
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
                  </Button>
                );
              })}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={goToPrevious}
              disabled={currentQuestion === 0}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Previous</span>
            </Button>

            {currentQuestion === quizQuestions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed}
                className="px-8 py-3 rounded-lg font-semibold bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get My Results
              </Button>
            ) : (
              <Button
                onClick={goToNext}
                disabled={!canProceed}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold bg-[#2E8B57] hover:bg-[#2E8B57]/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>Next</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            )}
          </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CareerQuiz;