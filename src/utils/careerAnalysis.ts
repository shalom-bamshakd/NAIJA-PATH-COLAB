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
  answers: (string | string[] | { [key: string]: number })[]
): AnalysisResult {
  // Placeholder implementation - this would contain the actual career analysis logic
  const topMatches: CareerMatch[] = careerDatabase.slice(0, 3).map((career, index) => ({
    career,
    matchPercentage: 85 - (index * 10),
    strengths: ['Problem solving', 'Analytical thinking', 'Communication'],
    growthAreas: ['Leadership', 'Public speaking']
  }));

  return {
    topMatches,
    overallProfile: {
      strengths: ['Analytical thinking', 'Problem solving'],
      interests: ['Technology', 'Innovation'],
      workStyle: ['Independent', 'Detail-oriented']
    },
    recommendations: [
      'Consider pursuing additional certifications in your field',
      'Develop leadership skills through mentoring opportunities',
      'Explore cross-functional projects to broaden your experience'
    ]
  };
}