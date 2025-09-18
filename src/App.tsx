import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import CareerPaths from './components/CareerPaths';
import SuccessStories from './components/SuccessStories';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import CareerQuiz from './components/CareerQuiz';
import CareerResults from './components/CareerResults';
import LearningRoadmap from './components/learning-roadmap/LearningRoadmap';
import Premium from './components/premium/Premium';
import { CareerMatch, AnalysisResult } from './utils/careerAnalysis';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'quiz' | 'result' | 'roadmap' | 'premium'>('home');
  const [careerResult, setCareerResult] = useState<{ careers: CareerMatch[]; analysis: AnalysisResult } | null>(null);

  const startQuiz = () => {
    setCurrentView('quiz');
  };

  const goHome = () => {
    setCurrentView('home');
  };

  const showResult = (result: any) => {
    setCareerResult(result);
    setCurrentView('result');
  };

  const showRoadmap = () => {
    setCurrentView('roadmap');
  };

  const showPremium = () => {
    setCurrentView('premium');
  };

  return (
    <div className="min-h-screen bg-white">
      {currentView === 'home' && (
        <>
          <Navbar onStartQuiz={startQuiz} />
          <Hero onStartQuiz={startQuiz} />
          <HowItWorks />
          <CareerPaths />
          <SuccessStories />
          <FinalCTA onStartQuiz={startQuiz} />
          <Footer />
        </>
      )}
      
      {currentView === 'quiz' && (
        <CareerQuiz onGoHome={goHome} onShowResult={showResult} />
      )}
      
      {currentView === 'result' && (
        <CareerResults 
          careers={careerResult?.careers || []}
          analysis={careerResult?.analysis}
          onGoHome={goHome} 
        />
      )}
      
      {currentView === 'roadmap' && (
        <LearningRoadmap 
          career={careerResult?.careers[0]?.career.title || 'Software Developer'}
          onGoHome={goHome}
          onUpgradePremium={showPremium}
        />
      )}
      
      {currentView === 'premium' && (
        <Premium onGoHome={goHome} />
      )}
    </div>
  );
}

export default App;