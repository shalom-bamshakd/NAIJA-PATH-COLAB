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
  responsePatterns: { [key: string]: string[] };
}

export class CareerAnalysisEngine {
  private responses: QuizResponse[] = [];
  private userProfile: UserProfile = {
    interests: [],
    values: [],
    workEnvironment: [],
    skills: [],
    personality: [],
    dominantCategories: {},
    responsePatterns: {}
  };

  constructor(responses: QuizResponse[]) {
    this.responses = responses;
    this.buildUserProfile();
  }

  private buildUserProfile(): void {
    const categoryScores: { [key: string]: number } = {};
    const responsePatterns: { [key: string]: string[] } = {
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
      
      // Store actual responses for better matching
      if (Array.isArray(answer)) {
        responsePatterns[category].push(...answer);
      } else if (typeof answer === 'string') {
        responsePatterns[category].push(answer);
      } else if (typeof answer === 'number') {
      if (typeof answer === 'object' && answer !== null && !Array.isArray(answer)) {
        // Handle rating object with multiple factors
        Object.entries(answer as { [key: string]: number }).forEach(([factor, rating]) => {
          if (rating >= 4) responsePatterns[category].push(`${factor}-high-priority`);
          else if (rating >= 3) responsePatterns[category].push(`${factor}-medium-priority`);
          else responsePatterns[category].push(`${factor}-low-priority`);
        });
      } else if (typeof answer === 'number') {
        if (answer >= 4) responsePatterns[category].push('high-priority');
        else if (answer >= 3) responsePatterns[category].push('medium-priority');
        else responsePatterns[category].push('low-priority');
      }
    });

    this.userProfile = {
      interests: this.extractKeywords(responsePatterns.interests),
      values: this.extractKeywords(responsePatterns.values),
      workEnvironment: this.extractKeywords(responsePatterns['work-environment']),
      skills: this.extractKeywords(responsePatterns.skills),
      personality: this.extractKeywords(responsePatterns.personality),
      dominantCategories: categoryScores,
      responsePatterns
    };
  }

  private extractKeywords(responses: string[]): string[] {
    const keywords = new Set<string>();
    
    responses.forEach(response => {
      const words = response.toLowerCase().split(/[\s,.-]+/);
      words.forEach(word => {
        if (word.length > 2) {
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
      careerMatches.push(match);
    });

    // Sort by confidence score and ensure we have variety
    careerMatches.sort((a, b) => b.confidenceScore - a.confidenceScore);

    // Ensure we have at least 3 diverse recommendations
    const diverseMatches = this.ensureDiverseRecommendations(careerMatches);

    return {
      topMatches: diverseMatches.slice(0, 5),
      userProfile: this.userProfile,
      recommendations: this.generateRecommendations(diverseMatches.slice(0, 3))
    };
  }

  private ensureDiverseRecommendations(matches: CareerMatch[]): CareerMatch[] {
    const diverseMatches: CareerMatch[] = [];
    const usedIndustries = new Set<string>();

    // First, add the top match
    if (matches.length > 0) {
      diverseMatches.push(matches[0]);
      usedIndustries.add(matches[0].career.industryTags[0]);
    }

    // Then add matches from different industries
    for (const match of matches.slice(1)) {
      const primaryIndustry = match.career.industryTags[0];
      if (!usedIndustries.has(primaryIndustry) || diverseMatches.length < 3) {
        diverseMatches.push(match);
        usedIndustries.add(primaryIndustry);
        
        if (diverseMatches.length >= 5) break;
      }
    }

    // If we still don't have enough, add remaining matches
    if (diverseMatches.length < 3) {
      for (const match of matches) {
        if (!diverseMatches.includes(match)) {
          diverseMatches.push(match);
          if (diverseMatches.length >= 5) break;
        }
      }
    }

    return diverseMatches;
  }

  private calculateCareerMatch(career: CareerOption): CareerMatch {
    const skillsAlignment = this.calculateSkillsAlignment(career);
    const personalityAlignment = this.calculatePersonalityAlignment(career);
    const valuesAlignment = this.calculateValuesAlignment(career);
    const environmentAlignment = this.calculateEnvironmentAlignment(career);
    const interestsAlignment = this.calculateInterestsAlignment(career);

    // Enhanced weighted calculation with interests
    const confidenceScore = Math.min(
      (skillsAlignment * 0.25 +
       personalityAlignment * 0.20 +
       valuesAlignment * 0.20 +
       environmentAlignment * 0.15 +
       interestsAlignment * 0.20) + 
      this.getBaselineScore(career), // Add baseline to ensure variety
      1.0
    );

    const matchReasons = this.generateMatchReasons(career, {
      skills: skillsAlignment,
      personality: personalityAlignment,
      values: valuesAlignment,
      environment: environmentAlignment,
      interests: interestsAlignment
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

  private getBaselineScore(career: CareerOption): number {
    // Give each career a baseline score to ensure variety
    const baselines: { [key: string]: number } = {
      'software_developer': 0.1,
      'data_scientist': 0.15,
      'digital_marketer': 0.2,
      'product_manager': 0.12,
      'ux_designer': 0.18,
      'business_analyst': 0.14,
      'cybersecurity_specialist': 0.13,
      'content_creator': 0.16
    };
    return baselines[career.id] || 0.1;
  }

  private calculateInterestsAlignment(career: CareerOption): number {
    const userInterests = this.userProfile.responsePatterns.interests || [];
    const careerKeywords = [
      ...career.description.toLowerCase().split(' '),
      ...career.industryTags.map(tag => tag.toLowerCase()),
      ...career.requiredSkills.map(skill => skill.toLowerCase())
    ];

    let matches = 0;
    let totalChecks = 0;

    userInterests.forEach(interest => {
      totalChecks++;
      const interestWords = interest.toLowerCase().split(/[\s-]+/);
      
      interestWords.forEach(word => {
        if (careerKeywords.some(keyword => keyword.includes(word) || word.includes(keyword))) {
          matches += 0.5;
        }
      });
    });

    return totalChecks > 0 ? Math.min(matches / totalChecks, 1.0) : 0.3;
  }

  private calculateSkillsAlignment(career: CareerOption): number {
    const userSkills = this.userProfile.responsePatterns.skills || [];
    const careerSkills = career.requiredSkills.map(skill => skill.toLowerCase());
    
    let matches = 0;
    let totalChecks = careerSkills.length;

    careerSkills.forEach(skill => {
      const skillWords = skill.split(/[\s-]+/);
      skillWords.forEach(word => {
        if (userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(word) || word.includes(userSkill.toLowerCase())
        )) {
          matches += 0.3;
        }
      });
    });

    // Add bonus for general skill categories
    const skillCategories = this.categorizeUserSkills(userSkills);
    const careerCategories = this.categorizeCareerSkills(career);
    
    skillCategories.forEach(category => {
      if (careerCategories.includes(category)) {
        matches += 0.4;
      }
    });

    return Math.min(matches / Math.max(totalChecks, 1), 1.0);
  }

  private categorizeUserSkills(skills: string[]): string[] {
    const categories: string[] = [];
    const skillText = skills.join(' ').toLowerCase();

    if (skillText.includes('technical') || skillText.includes('programming') || skillText.includes('analytical')) {
      categories.push('technical');
    }
    if (skillText.includes('creative') || skillText.includes('design') || skillText.includes('artistic')) {
      categories.push('creative');
    }
    if (skillText.includes('communication') || skillText.includes('interpersonal') || skillText.includes('people')) {
      categories.push('communication');
    }
    if (skillText.includes('leadership') || skillText.includes('management') || skillText.includes('leading')) {
      categories.push('leadership');
    }
    if (skillText.includes('business') || skillText.includes('strategic') || skillText.includes('planning')) {
      categories.push('business');
    }

    return categories;
  }

  private categorizeCareerSkills(career: CareerOption): string[] {
    const categories: string[] = [];
    const careerText = (career.description + ' ' + career.requiredSkills.join(' ')).toLowerCase();

    if (careerText.includes('technical') || careerText.includes('programming') || careerText.includes('data')) {
      categories.push('technical');
    }
    if (careerText.includes('creative') || careerText.includes('design') || careerText.includes('visual')) {
      categories.push('creative');
    }
    if (careerText.includes('communication') || careerText.includes('marketing') || careerText.includes('content')) {
      categories.push('communication');
    }
    if (careerText.includes('leadership') || careerText.includes('management') || careerText.includes('strategy')) {
      categories.push('leadership');
    }
    if (careerText.includes('business') || careerText.includes('analysis') || careerText.includes('consulting')) {
      categories.push('business');
    }

    return categories;
  }

  private calculatePersonalityAlignment(career: CareerOption): number {
    const userPersonality = this.userProfile.responsePatterns.personality || [];
    const careerPersonality = career.personalityFit.map(trait => trait.toLowerCase());
    
    let matches = 0;
    let totalChecks = 0;

    userPersonality.forEach(trait => {
      totalChecks++;
      const traitWords = trait.toLowerCase().split(/[\s-]+/);
      
      traitWords.forEach(word => {
        if (careerPersonality.some(careerTrait => 
          careerTrait.includes(word) || word.includes(careerTrait)
        )) {
          matches += 0.4;
        }
      });
    });

    return totalChecks > 0 ? Math.min(matches / totalChecks, 1.0) : 0.4;
  }

  private calculateValuesAlignment(career: CareerOption): number {
    const userValues = this.userProfile.responsePatterns.values || [];
    const careerContext = (career.description + ' ' + career.industryTags.join(' ')).toLowerCase();
    
    let matches = 0;
    let totalChecks = 0;

    userValues.forEach(value => {
      totalChecks++;
      const valueWords = value.toLowerCase().split(/[\s-]+/);
      
      valueWords.forEach(word => {
        if (word.length > 3 && careerContext.includes(word)) {
          matches += 0.3;
        }
      });
    });

    // Add specific value matching
    const valueKeywords = userValues.join(' ').toLowerCase();
    if (valueKeywords.includes('impact') && career.description.toLowerCase().includes('impact')) matches += 0.5;
    if (valueKeywords.includes('creative') && career.industryTags.some(tag => tag.toLowerCase().includes('creative'))) matches += 0.5;
    if (valueKeywords.includes('financial') && career.salaryRange.max > 8000000) matches += 0.3;
    if (valueKeywords.includes('growth') && career.growthOutlook === 'excellent') matches += 0.4;

    return Math.min(matches / Math.max(totalChecks, 1), 1.0);
  }

  private calculateEnvironmentAlignment(career: CareerOption): number {
    const userEnvironment = this.userProfile.responsePatterns['work-environment'] || [];
    const careerEnvironment = career.workEnvironment.map(env => env.toLowerCase());
    
    let matches = 0;
    let totalChecks = 0;

    userEnvironment.forEach(env => {
      totalChecks++;
      const envWords = env.toLowerCase().split(/[\s-]+/);
      
      envWords.forEach(word => {
        if (careerEnvironment.some(careerEnv => 
          careerEnv.includes(word) || word.includes(careerEnv)
        )) {
          matches += 0.4;
        }
      });
    });

    return totalChecks > 0 ? Math.min(matches / totalChecks, 1.0) : 0.5;
  }

  private generateMatchReasons(career: CareerOption, alignments: any): string[] {
    const reasons: string[] = [];

    if (alignments.skills > 0.4) {
      reasons.push(`Strong alignment with your technical and analytical skills`);
    }
    if (alignments.personality > 0.4) {
      reasons.push(`Matches your personality traits and work style preferences`);
    }
    if (alignments.values > 0.3) {
      reasons.push(`Aligns with your career values and motivations`);
    }
    if (alignments.environment > 0.4) {
      reasons.push(`Fits your preferred work environment and setting`);
    }
    if (alignments.interests > 0.4) {
      reasons.push(`Matches your interests and passion areas`);
    }
    if (career.nigerianContext.demand === 'high') {
      reasons.push(`High demand in the Nigerian job market`);
    }
    if (career.growthOutlook === 'excellent') {
      reasons.push(`Excellent growth prospects and career advancement opportunities`);
    }

    return reasons.length > 0 ? reasons : ['Shows potential compatibility with your profile'];
  }

  private identifySkillGaps(career: CareerOption): string[] {
    const userSkills = this.userProfile.responsePatterns.skills || [];
    const requiredSkills = career.requiredSkills;
    const gaps: string[] = [];

    requiredSkills.forEach(skill => {
      const skillWords = skill.toLowerCase().split(/[\s-]+/);
      const hasSkill = skillWords.some(word => 
        userSkills.some(userSkill => 
          userSkill.toLowerCase().includes(word) || word.includes(userSkill.toLowerCase())
        )
      );
      
      if (!hasSkill) {
        gaps.push(skill);
      }
    });

    return gaps.slice(0, 4); // Limit to top 4 gaps
  }

  private generateNextSteps(career: CareerOption, skillGaps: string[]): string[] {
    const steps: string[] = [];

    // Education recommendations
    if (career.educationRequirements.length > 0) {
      steps.push(`Consider pursuing: ${career.educationRequirements[0]}`);
    }

    // Skill development
    if (skillGaps.length > 0) {
      steps.push(`Develop skills in: ${skillGaps.slice(0, 2).join(', ')}`);
    }

    // Nigerian market specific advice
    if (career.nigerianContext.localOpportunities.length > 0) {
      steps.push(`Explore opportunities in: ${career.nigerianContext.localOpportunities.slice(0, 2).join(', ')}`);
    }

    // General advice
    steps.push(`Build a portfolio showcasing relevant projects and experience`);
    if (steps.length < 4) {
      steps.push(`Network with professionals in ${career.title.toLowerCase()} roles`);
    }

    return steps.slice(0, 4);
  }

  private generateRecommendations(topMatches: CareerMatch[]): string[] {
    const recommendations: string[] = [];

    if (topMatches.length > 0) {
      const topMatch = topMatches[0];
      recommendations.push(
        `Your top career match is ${topMatch.career.title} with ${Math.round(topMatch.confidenceScore * 100)}% compatibility`
      );

      if (topMatch.skillGaps.length > 0) {
        recommendations.push(
          `Focus on developing skills in ${topMatch.skillGaps.slice(0, 2).join(' and ')} to strengthen your profile`
        );
      }

      if (topMatches.length > 1) {
        recommendations.push(
          `Also consider exploring ${topMatches[1].career.title} (${Math.round(topMatches[1].confidenceScore * 100)}% match) as an alternative path`
        );
      }

      if (topMatches.length > 2) {
        recommendations.push(
          `${topMatches[2].career.title} (${Math.round(topMatches[2].confidenceScore * 100)}% match) could also be a great fit based on your interests`
        );
      }
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