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
  // Analyze user responses to determine career matches
  const careerScores = new Map<string, number>();
  
  // Initialize all careers with base score
  careerDatabase.forEach(career => {
    careerScores.set(career.id, 0);
  });

  // Analyze each answer and update career scores
  answers.forEach((answer, questionIndex) => {
    const question = questions[questionIndex];
    if (!question) return;

    // Score based on interests
    if (question.category === 'interests') {
      if (typeof answer === 'string') {
        // Single choice answers
        if (answer.includes('technology') || answer.includes('technical') || answer.includes('programming')) {
          careerScores.set('software_developer', careerScores.get('software_developer')! + 25);
          careerScores.set('data_scientist', careerScores.get('data_scientist')! + 20);
          careerScores.set('cybersecurity_specialist', careerScores.get('cybersecurity_specialist')! + 15);
        }
        if (answer.includes('creative') || answer.includes('design') || answer.includes('visual')) {
          careerScores.set('ux_designer', careerScores.get('ux_designer')! + 25);
          careerScores.set('digital_marketer', careerScores.get('digital_marketer')! + 20);
          careerScores.set('content_creator', careerScores.get('content_creator')! + 15);
        }
        if (answer.includes('business') || answer.includes('management') || answer.includes('strategy')) {
          careerScores.set('product_manager', careerScores.get('product_manager')! + 25);
          careerScores.set('business_analyst', careerScores.get('business_analyst')! + 20);
        }
        if (answer.includes('data') || answer.includes('analysis') || answer.includes('research')) {
          careerScores.set('data_scientist', careerScores.get('data_scientist')! + 25);
          careerScores.set('business_analyst', careerScores.get('business_analyst')! + 20);
        }
      } else if (Array.isArray(answer)) {
        // Multi-select answers
        answer.forEach(selection => {
          if (selection.includes('technical') || selection.includes('programming') || selection.includes('technology')) {
            careerScores.set('software_developer', careerScores.get('software_developer')! + 15);
            careerScores.set('cybersecurity_specialist', careerScores.get('cybersecurity_specialist')! + 10);
          }
          if (selection.includes('creative') || selection.includes('design')) {
            careerScores.set('ux_designer', careerScores.get('ux_designer')! + 15);
            careerScores.set('digital_marketer', careerScores.get('digital_marketer')! + 10);
          }
          if (selection.includes('data') || selection.includes('analysis')) {
            careerScores.set('data_scientist', careerScores.get('data_scientist')! + 15);
            careerScores.set('business_analyst', careerScores.get('business_analyst')! + 10);
          }
        });
      }
    }

    // Score based on values
    if (question.category === 'values') {
      if (typeof answer === 'string') {
        if (answer.includes('financial') || answer.includes('salary')) {
          careerScores.set('product_manager', careerScores.get('product_manager')! + 20);
          careerScores.set('software_developer', careerScores.get('software_developer')! + 15);
        }
        if (answer.includes('creative') || answer.includes('freedom')) {
          careerScores.set('ux_designer', careerScores.get('ux_designer')! + 20);
          careerScores.set('content_creator', careerScores.get('content_creator')! + 25);
        }
        if (answer.includes('impact') || answer.includes('society')) {
          careerScores.set('product_manager', careerScores.get('product_manager')! + 15);
          careerScores.set('ux_designer', careerScores.get('ux_designer')! + 10);
        }
      }
    }

    // Score based on work environment preferences
    if (question.category === 'work-environment') {
      if (typeof answer === 'string') {
        if (answer.includes('remote') || answer.includes('flexible')) {
          careerScores.set('software_developer', careerScores.get('software_developer')! + 15);
          careerScores.set('digital_marketer', careerScores.get('digital_marketer')! + 20);
          careerScores.set('content_creator', careerScores.get('content_creator')! + 25);
        }
        if (answer.includes('collaborative') || answer.includes('team')) {
          careerScores.set('product_manager', careerScores.get('product_manager')! + 20);
          careerScores.set('ux_designer', careerScores.get('ux_designer')! + 15);
        }
        if (answer.includes('independent') || answer.includes('minimal')) {
          careerScores.set('software_developer', careerScores.get('software_developer')! + 15);
          careerScores.set('data_scientist', careerScores.get('data_scientist')! + 20);
        }
      }
    }

    // Score based on skills
    if (question.category === 'skills') {
      if (Array.isArray(answer)) {
        answer.forEach(skill => {
          if (skill.includes('analytical') || skill.includes('problem-solving')) {
            careerScores.set('software_developer', careerScores.get('software_developer')! + 20);
            careerScores.set('data_scientist', careerScores.get('data_scientist')! + 25);
            careerScores.set('business_analyst', careerScores.get('business_analyst')! + 15);
          }
          if (skill.includes('creative') || skill.includes('artistic')) {
            careerScores.set('ux_designer', careerScores.get('ux_designer')! + 25);
            careerScores.set('digital_marketer', careerScores.get('digital_marketer')! + 20);
            careerScores.set('content_creator', careerScores.get('content_creator')! + 20);
          }
          if (skill.includes('communication') || skill.includes('interpersonal')) {
            careerScores.set('product_manager', careerScores.get('product_manager')! + 20);
            careerScores.set('digital_marketer', careerScores.get('digital_marketer')! + 15);
            careerScores.set('business_analyst', careerScores.get('business_analyst')! + 10);
          }
          if (skill.includes('technical') || skill.includes('digital')) {
            careerScores.set('software_developer', careerScores.get('software_developer')! + 20);
            careerScores.set('cybersecurity_specialist', careerScores.get('cybersecurity_specialist')! + 25);
            careerScores.set('data_scientist', careerScores.get('data_scientist')! + 15);
          }
          if (skill.includes('leadership') || skill.includes('management')) {
            careerScores.set('product_manager', careerScores.get('product_manager')! + 25);
            careerScores.set('business_analyst', careerScores.get('business_analyst')! + 15);
          }
        });
      } else if (typeof answer === 'string') {
        if (answer.includes('technical') || answer.includes('programming')) {
          careerScores.set('software_developer', careerScores.get('software_developer')! + 20);
          careerScores.set('cybersecurity_specialist', careerScores.get('cybersecurity_specialist')! + 15);
        }
        if (answer.includes('creative') || answer.includes('design')) {
          careerScores.set('ux_designer', careerScores.get('ux_designer')! + 20);
          careerScores.set('digital_marketer', careerScores.get('digital_marketer')! + 15);
        }
      }
    }
  });

  // Add some randomization to prevent identical results
  careerScores.forEach((score, careerId) => {
    const randomBonus = Math.random() * 10; // 0-10 random bonus
    careerScores.set(careerId, score + randomBonus);
  });

  // Sort careers by score and get top matches
  const sortedCareers = Array.from(careerScores.entries())
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .slice(0, 3);

  // Create career matches with calculated scores
  const topMatches: CareerMatch[] = sortedCareers.map(([careerId, score], index) => {
    const career = careerDatabase.find(c => c.id === careerId)!;
    const maxPossibleScore = 100; // Approximate max score
    const matchPercentage = Math.min(Math.max(score / maxPossibleScore, 0.6), 0.98); // Ensure between 60-98%
    
    return {
      career,
      matchPercentage: Math.round(matchPercentage * 100),
      strengths: getStrengthsForCareer(career.id, answers, questions),
      growthAreas: getGrowthAreasForCareer(career.id, index)
    };
  });

  return {
    topMatches,
    overallProfile: {
      strengths: ['Analytical thinking', 'Problem solving', 'Attention to detail'],
      interests: ['Technology', 'Problem solving', 'Innovation'],
      workStyle: ['Independent work', 'Collaborative projects', 'Continuous learning']
    },
    recommendations: [
      'Focus on developing technical skills through online courses',
      'Build a portfolio of projects to showcase your abilities',
      'Network with professionals in your chosen field',
      'Consider pursuing relevant certifications'
    ]
  };
}