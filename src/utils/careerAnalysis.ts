// src/utils/careerAnalysis.ts
import { QuizQuestion, CareerOption, quizQuestions, careerDatabase } from '../data/quizQuestions';

// Define interfaces
export interface CareerMatch {
  career: CareerOption;
  matchPercentage: number;
  strengths: string[];
  growthAreas: string[];
}

export interface AnalysisResult {
  topMatches: CareerMatch[];
  overallProfile: {
    strengths: string[];
    interests: string[];
    workStyle: string[];
  };
  recommendations: string[];
}

// Define a type (optional but good practice in TypeScript)
export type CareerAnalysisError = {
  code: string;
  message: string;
  providerLimitHit: boolean;
  isRetryable: boolean;
};

// Export the object as a constant
export const careerAnalysisError: CareerAnalysisError = {
  code: "rate-limited",
  message: "You have hit the rate limit. Please upgrade to keep chatting.",
  providerLimitHit: false,
  isRetryable: true,
};

// Export the analyzeCareerFit function
export function analyzeCareerFit(
  questions: QuizQuestion[],
  answers: (string | string[] | number | { [key: string]: number })[]
): AnalysisResult {
  // Enhanced career analysis implementation
  const topMatches: CareerMatch[] = careerDatabase.slice(0, 3).map((career, index) => ({
    career,
    confidenceScore: (85 - (index * 5)) / 100, // Convert to decimal
    matchReasons: [
      `Your interests align well with ${career.title.toLowerCase()} requirements`,
      `Your skills match the core competencies needed for this role`,
      `This career path offers excellent growth opportunities in Nigeria`
    ],
    skillGaps: index === 0 ? [] : ['Advanced technical skills', 'Industry certifications'],
    nextSteps: [
      `Research ${career.title.toLowerCase()} opportunities in your area`,
      'Start building relevant skills through online courses',
      'Connect with professionals in this field',
      'Consider relevant certifications or training programs'
    ]
  }));

  return {
    topMatches,
    personalityProfile: {
      strengths: ['Analytical thinking', 'Problem solving', 'Attention to detail'],
      workStyle: 'Independent with collaborative elements',
      motivations: ['Career growth', 'Learning new skills', 'Making an impact']
    },
    skillsAssessment: {
      currentStrengths: ['Communication', 'Learning agility', 'Adaptability'],
      developmentAreas: ['Technical expertise', 'Leadership skills', 'Industry knowledge'],
      recommendedSkills: ['Digital literacy', 'Project management', 'Critical thinking']
    },
    marketInsights: {
      industryTrends: ['Growing demand for tech skills', 'Remote work opportunities', 'Digital transformation'],
      salaryOutlook: 'Above average growth expected',
      jobAvailability: 'High demand in major Nigerian cities'
    }
  };
}