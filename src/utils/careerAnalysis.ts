import { QuizQuestion, CareerOption, careerDatabase } from '../data/quizQuestions';

export interface QuizResponse {
  questionId: string;
  answer: string | string[] | number;
  category: string;
  weight: number;
}

export interface CareerMatch {
  career: CareerOption;
  confidenceScore: number;
  matchReasons: string[];
  skillGaps: string[];
  nextSteps: string[];
  personalityAlignment: number;
  skillsAlignment: number;
  valuesAlignment: number;
  environmentAlignment: number;
}

export interface AnalysisResult {
  topMatches: CareerMatch[];
  userProfile: UserProfile;
  recommendations: string[];
}

export interface UserProfile {
  interests: string[];
  values: string[];
  workEnvironment: string[];
  skills: string[];
  personality: string[];
  dominantCategories: { [key: string]: number };
}

export class CareerAnalysisEngine {
  private responses: QuizResponse[] = [];
  private userProfile: UserProfile = {
    interests: [],
    values: [],
    workEnvironment: [],
    skills: [],
    personality: [],
    dominantCategories: {}
  };

  constructor(responses: QuizResponse[]) {
    this.responses = responses;
    this.buildUserProfile();
  }

  private buildUserProfile(): void {
    const categoryScores: { [key: string]: number } = {};
    const profileData: { [key: string]: string[] } = {
      interests: [],
      values: [],
      'work-environment': [],
      skills: [],
      personality: []
    };

    this.responses.forEach(response => {
      const { category, answer, weight } = response;
      
      // Update category scores
      categoryScores[category] = (categoryScores[category] || 0) + weight;
      
      // Extract profile data based on response
      if (Array.isArray(answer)) {
        profileData[category].push(...answer);
      } else if (typeof answer === 'string') {
        profileData[category].push(answer);
      }
    });

    this.userProfile = {
      interests: this.extractKeywords(profileData.interests),
      values: this.extractKeywords(profileData.values),
      workEnvironment: this.extractKeywords(profileData['work-environment']),
      skills: this.extractKeywords(profileData.skills),
      personality: this.extractKeywords(profileData.personality),
      dominantCategories: categoryScores
    };
  }

  private extractKeywords(responses: string[]): string[] {
    // Extract key terms from responses for matching
    const keywords = new Set<string>();
    
    responses.forEach(response => {
      const words = response.toLowerCase().split(/[\s,.-]+/);
      words.forEach(word => {
        if (word.length > 3) {
          keywords.add(word);
        }
      });
    });

    return Array.from(keywords);
  }

  public analyzeCareerMatches(): AnalysisResult {
    const careerMatches: CareerMatch[] = [];

    careerDatabase.forEach(career => {
      const match = this.calculateCareerMatch(career);
      if (match.confidenceScore > 0.3) { // Only include matches above 30%
        careerMatches.push(match);
      }
    });

    // Sort by confidence score
    careerMatches.sort((a, b) => b.confidenceScore - a.confidenceScore);

    return {
      topMatches: careerMatches.slice(0, 5),
      userProfile: this.userProfile,
      recommendations: this.generateRecommendations(careerMatches.slice(0, 3))
    };
  }

  private calculateCareerMatch(career: CareerOption): CareerMatch {
    const skillsAlignment = this.calculateSkillsAlignment(career);
    const personalityAlignment = this.calculatePersonalityAlignment(career);
    const valuesAlignment = this.calculateValuesAlignment(career);
    const environmentAlignment = this.calculateEnvironmentAlignment(career);

    // Weighted average of different alignment factors
    const confidenceScore = (
      skillsAlignment * 0.3 +
      personalityAlignment * 0.25 +
      valuesAlignment * 0.25 +
      environmentAlignment * 0.2
    );

    const matchReasons = this.generateMatchReasons(career, {
      skills: skillsAlignment,
      personality: personalityAlignment,
      values: valuesAlignment,
      environment: environmentAlignment
    });

    const skillGaps = this.identifySkillGaps(career);
    const nextSteps = this.generateNextSteps(career, skillGaps);

    return {
      career,
      confidenceScore,
      matchReasons,
      skillGaps,
      nextSteps,
      personalityAlignment,
      skillsAlignment,
      valuesAlignment,
      environmentAlignment
    };
  }

  private calculateSkillsAlignment(career: CareerOption): number {
    const userSkillKeywords = this.userProfile.skills;
    const careerSkills = career.requiredSkills.map(skill => skill.toLowerCase());
    
    let matches = 0;
    careerSkills.forEach(skill => {
      const skillWords = skill.split(/[\s-]+/);
      skillWords.forEach(word => {
        if (userSkillKeywords.some(userSkill => 
          userSkill.includes(word) || word.includes(userSkill)
        )) {
          matches++;
        }
      });
    });

    return Math.min(matches / careerSkills.length, 1.0);
  }

  private calculatePersonalityAlignment(career: CareerOption): number {
    const userPersonality = this.userProfile.personality;
    const careerPersonality = career.personalityFit.map(trait => trait.toLowerCase());
    
    let matches = 0;
    careerPersonality.forEach(trait => {
      const traitWords = trait.split(/[\s-]+/);
      traitWords.forEach(word => {
        if (userPersonality.some(userTrait => 
          userTrait.includes(word) || word.includes(userTrait)
        )) {
          matches++;
        }
      });
    });

    return Math.min(matches / careerPersonality.length, 1.0);
  }

  private calculateValuesAlignment(career: CareerOption): number {
    const userValues = this.userProfile.values;
    const careerContext = career.description.toLowerCase() + ' ' + 
                         career.industryTags.join(' ').toLowerCase();
    
    let matches = 0;
    userValues.forEach(value => {
      if (careerContext.includes(value)) {
        matches++;
      }
    });

    return Math.min(matches / Math.max(userValues.length, 1), 1.0);
  }

  private calculateEnvironmentAlignment(career: CareerOption): number {
    const userEnvironment = this.userProfile.workEnvironment;
    const careerEnvironment = career.workEnvironment.map(env => env.toLowerCase());
    
    let matches = 0;
    careerEnvironment.forEach(env => {
      const envWords = env.split(/[\s-]+/);
      envWords.forEach(word => {
        if (userEnvironment.some(userEnv => 
          userEnv.includes(word) || word.includes(userEnv)
        )) {
          matches++;
        }
      });
    });

    return Math.min(matches / careerEnvironment.length, 1.0);
  }

  private generateMatchReasons(career: CareerOption, alignments: any): string[] {
    const reasons: string[] = [];

    if (alignments.skills > 0.6) {
      reasons.push(`Strong alignment with your technical and analytical skills`);
    }
    if (alignments.personality > 0.6) {
      reasons.push(`Matches your personality traits and work style preferences`);
    }
    if (alignments.values > 0.5) {
      reasons.push(`Aligns with your career values and motivations`);
    }
    if (alignments.environment > 0.6) {
      reasons.push(`Fits your preferred work environment and setting`);
    }
    if (career.nigerianContext.demand === 'high') {
      reasons.push(`High demand in the Nigerian job market`);
    }
    if (career.growthOutlook === 'excellent') {
      reasons.push(`Excellent growth prospects and career advancement opportunities`);
    }

    return reasons.length > 0 ? reasons : ['General compatibility with your profile'];
  }

  private identifySkillGaps(career: CareerOption): string[] {
    const userSkills = this.userProfile.skills;
    const requiredSkills = career.requiredSkills;
    const gaps: string[] = [];

    requiredSkills.forEach(skill => {
      const skillWords = skill.toLowerCase().split(/[\s-]+/);
      const hasSkill = skillWords.some(word => 
        userSkills.some(userSkill => 
          userSkill.includes(word) || word.includes(userSkill)
        )
      );
      
      if (!hasSkill) {
        gaps.push(skill);
      }
    });

    return gaps;
  }

  private generateNextSteps(career: CareerOption, skillGaps: string[]): string[] {
    const steps: string[] = [];

    // Education recommendations
    if (career.educationRequirements.length > 0) {
      steps.push(`Consider pursuing: ${career.educationRequirements[0]}`);
    }

    // Skill development
    if (skillGaps.length > 0) {
      steps.push(`Develop skills in: ${skillGaps.slice(0, 3).join(', ')}`);
    }

    // Nigerian market specific advice
    if (career.nigerianContext.localOpportunities.length > 0) {
      steps.push(`Explore opportunities in: ${career.nigerianContext.localOpportunities.slice(0, 2).join(', ')}`);
    }

    // General advice
    steps.push(`Build a portfolio showcasing relevant projects and experience`);
    steps.push(`Network with professionals in ${career.title.toLowerCase()} roles`);

    return steps;
  }

  private generateRecommendations(topMatches: CareerMatch[]): string[] {
    const recommendations: string[] = [];

    if (topMatches.length > 0) {
      const topMatch = topMatches[0];
      recommendations.push(
        `Your top career match is ${topMatch.career.title} with ${Math.round(topMatch.confidenceScore * 100)}% confidence`
      );

      if (topMatch.skillGaps.length > 0) {
        recommendations.push(
          `Focus on developing skills in ${topMatch.skillGaps.slice(0, 2).join(' and ')} to strengthen your profile`
        );
      }

      if (topMatches.length > 1) {
        recommendations.push(
          `Also consider exploring ${topMatches[1].career.title} as an alternative path`
        );
      }
    }

    // Profile-based recommendations
    const dominantCategory = Object.keys(this.userProfile.dominantCategories)
      .reduce((a, b) => this.userProfile.dominantCategories[a] > this.userProfile.dominantCategories[b] ? a : b);

    if (dominantCategory === 'interests') {
      recommendations.push('Your strong interests suggest exploring passion-driven career paths');
    } else if (dominantCategory === 'skills') {
      recommendations.push('Leverage your existing skills while building complementary abilities');
    }

    return recommendations;
  }
}

// Helper function to process quiz responses
export function processQuizResponses(
  questions: QuizQuestion[],
  answers: (string | string[] | number)[]
): QuizResponse[] {
  return questions.map((question, index) => ({
    questionId: question.id,
    answer: answers[index],
    category: question.category,
    weight: question.weight
  }));
}

// Main analysis function
export function analyzeCareerFit(
  questions: QuizQuestion[],
  answers: (string | string[] | number)[]
): AnalysisResult {
  const responses = processQuizResponses(questions, answers);
  const engine = new CareerAnalysisEngine(responses);
  return engine.analyzeCareerMatches();
}