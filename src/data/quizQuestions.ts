export interface QuizQuestion {
  id: string;
  question: string;
  description?: string;
  type: 'multiple-choice' | 'rating' | 'scenario' | 'multi-select';
  options: string[] | { value: number; label: string }[];
  category: 'interests' | 'values' | 'work-environment' | 'skills' | 'personality';
  weight: number; // Importance weight for AI analysis
  multiSelect?: boolean;
  maxSelections?: number;
}

export const quizQuestions: QuizQuestion[] = [
  // INTERESTS (Questions 1-3)
  {
    id: 'interests_activities',
    question: "Which activities energize you the most?",
    description: "Select up to 3 activities that you find most engaging and fulfilling",
    type: 'multi-select',
    category: 'interests',
    weight: 1.0,
    multiSelect: true,
    maxSelections: 3,
    options: [
      "Analyzing data and finding patterns",
      "Creating visual designs or artwork",
      "Building or fixing things with my hands",
      "Teaching or mentoring others",
      "Writing or storytelling",
      "Solving complex technical problems",
      "Leading teams and projects",
      "Helping people with their problems",
      "Researching and discovering new information",
      "Performing or entertaining others"
    ]
  },
  {
    id: 'interests_subjects',
    question: "Which subjects or topics fascinate you most?",
    type: 'multiple-choice',
    category: 'interests',
    weight: 0.9,
    options: [
      "Technology and innovation",
      "Human behavior and psychology",
      "Business and economics",
      "Science and research",
      "Arts and creative expression",
      "Health and medicine",
      "Education and development",
      "Environment and sustainability",
      "Law and justice",
      "Media and communications"
    ]
  },
  {
    id: 'interests_learning',
    question: "How do you prefer to learn new skills?",
    type: 'multiple-choice',
    category: 'interests',
    weight: 0.7,
    options: [
      "Hands-on practice and experimentation",
      "Reading books and research papers",
      "Watching tutorials and demonstrations",
      "Learning from mentors and experts",
      "Group discussions and collaboration",
      "Online courses and structured programs",
      "Trial and error with real projects",
      "Attending workshops and seminars"
    ]
  },

  // VALUES (Questions 4-6)
  {
    id: 'values_motivation',
    question: "What motivates you most in your ideal career?",
    type: 'multiple-choice',
    category: 'values',
    weight: 1.0,
    options: [
      "Making a positive impact on society",
      "Achieving financial security and wealth",
      "Having creative freedom and autonomy",
      "Gaining recognition and status",
      "Continuous learning and growth",
      "Work-life balance and flexibility",
      "Building meaningful relationships",
      "Solving challenging problems",
      "Leading and inspiring others",
      "Contributing to innovation and progress"
    ]
  },
  {
    id: 'values_success',
    question: "How do you define career success?",
    type: 'multiple-choice',
    category: 'values',
    weight: 0.9,
    options: [
      "Reaching the top of my field",
      "Having a stable, secure job",
      "Making a difference in people's lives",
      "Earning a high salary",
      "Being my own boss",
      "Achieving work-life balance",
      "Being recognized as an expert",
      "Creating something lasting and meaningful",
      "Having diverse and interesting experiences",
      "Building a strong professional network"
    ]
  },
  {
    id: 'values_priorities',
    question: "Rate the importance of these factors in your career (1-5 scale)",
    description: "1 = Not important, 5 = Extremely important",
    type: 'rating',
    category: 'values',
    weight: 0.8,
    options: [
      "Job Security",
      "High Salary", 
      "Creative Expression",
      "Social Impact",
      "Career Growth"
    ]
  },

  // WORK ENVIRONMENT (Questions 7-9)
  {
    id: 'environment_setting',
    question: "In which work environment do you thrive best?",
    type: 'multiple-choice',
    category: 'work-environment',
    weight: 0.8,
    options: [
      "Quiet office with minimal distractions",
      "Collaborative open workspace",
      "Remote/home office setup",
      "Dynamic, fast-paced environment",
      "Outdoor or field-based work",
      "Laboratory or technical facility",
      "Creative studio or workshop",
      "Client-facing or public spaces",
      "Travel-based or multiple locations",
      "Structured, organized workplace"
    ]
  },
  {
    id: 'environment_interaction',
    question: "How much social interaction do you prefer at work?",
    type: 'multiple-choice',
    category: 'work-environment',
    weight: 0.7,
    options: [
      "Minimal - I prefer working independently",
      "Small team - Close collaboration with 2-5 people",
      "Medium group - Regular interaction with 6-15 people",
      "Large team - Working with many colleagues daily",
      "Public-facing - Constant interaction with clients/customers",
      "Mixed - Balance of solo work and team collaboration",
      "Leadership role - Managing and directing others",
      "Networking-focused - Building relationships across organizations"
    ]
  },
  {
    id: 'environment_schedule',
    question: "What work schedule appeals to you most?",
    type: 'multiple-choice',
    category: 'work-environment',
    weight: 0.6,
    options: [
      "Traditional 9-5 weekdays",
      "Flexible hours with core meeting times",
      "Project-based with deadline-driven intensity",
      "Shift work with rotating schedules",
      "Seasonal work with busy/slow periods",
      "Freelance with complete schedule control",
      "International schedule with global clients",
      "Part-time or reduced hours for work-life balance"
    ]
  },

  // SKILLS (Questions 10-12)
  {
    id: 'skills_strengths',
    question: "Which of these best describes your natural strengths?",
    description: "Select up to 2 areas where you excel naturally",
    type: 'multi-select',
    category: 'skills',
    weight: 1.0,
    multiSelect: true,
    maxSelections: 2,
    options: [
      "Analytical thinking and problem-solving",
      "Creative and artistic abilities",
      "Communication and interpersonal skills",
      "Technical and digital proficiency",
      "Leadership and management capabilities",
      "Attention to detail and organization",
      "Physical coordination and manual skills",
      "Mathematical and logical reasoning",
      "Emotional intelligence and empathy",
      "Innovation and entrepreneurial thinking"
    ]
  },
  {
    id: 'skills_development',
    question: "Which skills are you most excited to develop further?",
    type: 'multiple-choice',
    category: 'skills',
    weight: 0.8,
    options: [
      "Advanced technology and programming",
      "Public speaking and presentation",
      "Project management and organization",
      "Creative design and visual arts",
      "Data analysis and research methods",
      "Sales and negotiation techniques",
      "Teaching and training others",
      "Financial planning and analysis",
      "Writing and content creation",
      "Strategic thinking and planning"
    ]
  },
  {
    id: 'skills_challenge',
    question: "What type of challenges do you enjoy tackling?",
    type: 'multiple-choice',
    category: 'skills',
    weight: 0.9,
    options: [
      "Complex technical problems requiring deep analysis",
      "Creative projects with open-ended solutions",
      "People-related challenges and conflicts",
      "Strategic business decisions with high stakes",
      "Research questions with unknown answers",
      "Process improvements and optimization",
      "Crisis management and urgent situations",
      "Long-term planning and vision development",
      "Innovation and breakthrough thinking",
      "Detail-oriented tasks requiring precision"
    ]
  },

  // PERSONALITY (Questions 13-15)
  {
    id: 'personality_workstyle',
    question: "Which scenario describes your ideal workday?",
    type: 'scenario',
    category: 'personality',
    weight: 0.8,
    options: [
      "Deep focus on a complex project with minimal interruptions",
      "Multiple meetings collaborating with different teams",
      "Mix of independent work and client presentations",
      "Hands-on problem-solving with immediate results",
      "Creative brainstorming and innovative thinking",
      "Teaching or mentoring others throughout the day",
      "Analyzing data and presenting insights to leadership",
      "Managing multiple projects and coordinating resources",
      "Traveling to different locations for varied experiences",
      "Routine tasks with clear procedures and expectations"
    ]
  },
  {
    id: 'personality_decision',
    question: "How do you typically make important decisions?",
    type: 'multiple-choice',
    category: 'personality',
    weight: 0.7,
    options: [
      "Thorough research and data analysis",
      "Consulting with trusted advisors and experts",
      "Following my intuition and gut feelings",
      "Weighing pros and cons systematically",
      "Considering impact on all stakeholders",
      "Quick decisions based on experience",
      "Collaborative discussion with team members",
      "Testing small experiments before committing",
      "Following established procedures and guidelines",
      "Seeking creative and innovative alternatives"
    ]
  },
  {
    id: 'personality_stress',
    question: "How do you handle work pressure and stress?",
    type: 'multiple-choice',
    category: 'personality',
    weight: 0.6,
    options: [
      "I thrive under pressure and perform better",
      "I prefer steady, manageable workloads",
      "I need clear deadlines and structure to focus",
      "I work best with supportive team collaboration",
      "I handle stress by breaking tasks into smaller steps",
      "I need flexibility to manage stress effectively",
      "I perform well in crisis situations",
      "I prefer to avoid high-stress environments",
      "I use creative outlets to manage work stress",
      "I rely on planning and preparation to reduce stress"
    ]
  }
];

// Career database for AI matching
export interface CareerOption {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  educationRequirements: string[];
  salaryRange: {
    min: number;
    max: number;
    currency: string;
  };
  growthOutlook: 'excellent' | 'good' | 'average' | 'limited';
  workEnvironment: string[];
  personalityFit: string[];
  industryTags: string[];
  nigerianContext: {
    demand: 'high' | 'medium' | 'low';
    localOpportunities: string[];
    averageSalary: string;
  };
}

export const careerDatabase: CareerOption[] = [
  {
    id: 'software_developer',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications and systems. Work with programming languages, frameworks, and tools to create digital solutions.',
    requiredSkills: ['Programming', 'Problem-solving', 'Logical thinking', 'Attention to detail', 'Continuous learning'],
    educationRequirements: ['Computer Science degree', 'Coding bootcamp', 'Self-taught with portfolio', 'Technical certifications'],
    salaryRange: { min: 2500000, max: 15000000, currency: 'NGN' },
    growthOutlook: 'excellent',
    workEnvironment: ['Office-based', 'Remote work', 'Collaborative teams', 'Tech-focused'],
    personalityFit: ['Analytical', 'Detail-oriented', 'Independent worker', 'Problem solver'],
    industryTags: ['Technology', 'Software', 'Digital', 'Innovation'],
    nigerianContext: {
      demand: 'high',
      localOpportunities: ['Fintech companies', 'E-commerce platforms', 'Banking sector', 'Startups'],
      averageSalary: '₦4.5M - ₦12M annually'
    }
  },
  {
    id: 'data_scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to extract insights and drive business decisions. Use statistical methods, machine learning, and data visualization.',
    requiredSkills: ['Statistical analysis', 'Programming (Python/R)', 'Data visualization', 'Machine learning', 'Business acumen'],
    educationRequirements: ['Statistics/Mathematics degree', 'Data science certification', 'Computer Science background', 'Analytics training'],
    salaryRange: { min: 3000000, max: 18000000, currency: 'NGN' },
    growthOutlook: 'excellent',
    workEnvironment: ['Office-based', 'Remote work', 'Cross-functional teams', 'Data-driven culture'],
    personalityFit: ['Analytical', 'Curious', 'Detail-oriented', 'Strategic thinker'],
    industryTags: ['Technology', 'Analytics', 'Business Intelligence', 'AI/ML'],
    nigerianContext: {
      demand: 'high',
      localOpportunities: ['Banks', 'Telecoms', 'E-commerce', 'Consulting firms'],
      averageSalary: '₦5M - ₦15M annually'
    }
  },
  {
    id: 'digital_marketer',
    title: 'Digital Marketing Specialist',
    description: 'Develop and execute online marketing strategies across digital channels. Manage social media, content, SEO, and digital advertising campaigns.',
    requiredSkills: ['Content creation', 'Social media management', 'Analytics', 'SEO/SEM', 'Creative thinking'],
    educationRequirements: ['Marketing degree', 'Digital marketing certification', 'Communications background', 'Self-taught with portfolio'],
    salaryRange: { min: 1500000, max: 8000000, currency: 'NGN' },
    growthOutlook: 'excellent',
    workEnvironment: ['Creative workspace', 'Client-facing', 'Fast-paced', 'Digital-first'],
    personalityFit: ['Creative', 'Communicative', 'Adaptable', 'Results-oriented'],
    industryTags: ['Marketing', 'Digital', 'Creative', 'Communications'],
    nigerianContext: {
      demand: 'high',
      localOpportunities: ['Advertising agencies', 'E-commerce companies', 'Media houses', 'Freelance'],
      averageSalary: '₦2.5M - ₦6M annually'
    }
  },
  {
    id: 'product_manager',
    title: 'Product Manager',
    description: 'Lead product development from conception to launch. Work with cross-functional teams to define product strategy and ensure successful delivery.',
    requiredSkills: ['Strategic thinking', 'Project management', 'Communication', 'Market analysis', 'Leadership'],
    educationRequirements: ['Business degree', 'Product management certification', 'Technical background', 'MBA preferred'],
    salaryRange: { min: 4000000, max: 20000000, currency: 'NGN' },
    growthOutlook: 'excellent',
    workEnvironment: ['Collaborative', 'Cross-functional teams', 'Strategic planning', 'Customer-focused'],
    personalityFit: ['Strategic', 'Leadership-oriented', 'Communicative', 'Analytical'],
    industryTags: ['Product', 'Strategy', 'Technology', 'Business'],
    nigerianContext: {
      demand: 'high',
      localOpportunities: ['Tech companies', 'Fintech', 'E-commerce', 'Consulting'],
      averageSalary: '₦6M - ₦15M annually'
    }
  },
  {
    id: 'ux_designer',
    title: 'UX/UI Designer',
    description: 'Design user experiences and interfaces for digital products. Research user needs and create intuitive, visually appealing designs.',
    requiredSkills: ['Design thinking', 'User research', 'Prototyping', 'Visual design', 'Empathy'],
    educationRequirements: ['Design degree', 'UX certification', 'Portfolio-based', 'Self-taught with strong portfolio'],
    salaryRange: { min: 2000000, max: 12000000, currency: 'NGN' },
    growthOutlook: 'excellent',
    workEnvironment: ['Creative studio', 'Collaborative', 'User-focused', 'Design-thinking culture'],
    personalityFit: ['Creative', 'Empathetic', 'Detail-oriented', 'User-focused'],
    industryTags: ['Design', 'Technology', 'User Experience', 'Creative'],
    nigerianContext: {
      demand: 'high',
      localOpportunities: ['Tech startups', 'Design agencies', 'Banks', 'E-commerce'],
      averageSalary: '₦3M - ₦8M annually'
    }
  },
  {
    id: 'business_analyst',
    title: 'Business Analyst',
    description: 'Analyze business processes and requirements to improve efficiency and drive growth. Bridge the gap between business needs and technical solutions.',
    requiredSkills: ['Analytical thinking', 'Process mapping', 'Requirements gathering', 'Communication', 'Problem-solving'],
    educationRequirements: ['Business degree', 'Analytics certification', 'Economics background', 'MBA preferred'],
    salaryRange: { min: 2500000, max: 10000000, currency: 'NGN' },
    growthOutlook: 'good',
    workEnvironment: ['Office-based', 'Cross-functional teams', 'Process-focused', 'Data-driven'],
    personalityFit: ['Analytical', 'Detail-oriented', 'Communicative', 'Process-oriented'],
    industryTags: ['Business', 'Analytics', 'Process Improvement', 'Strategy'],
    nigerianContext: {
      demand: 'medium',
      localOpportunities: ['Banks', 'Consulting firms', 'Telecoms', 'Government'],
      averageSalary: '₦3.5M - ₦8M annually'
    }
  },
  {
    id: 'cybersecurity_specialist',
    title: 'Cybersecurity Specialist',
    description: 'Protect organizations from cyber threats by implementing security measures, monitoring systems, and responding to incidents.',
    requiredSkills: ['Security frameworks', 'Risk assessment', 'Incident response', 'Technical expertise', 'Attention to detail'],
    educationRequirements: ['Cybersecurity degree', 'Security certifications', 'IT background', 'Specialized training'],
    salaryRange: { min: 3500000, max: 16000000, currency: 'NGN' },
    growthOutlook: 'excellent',
    workEnvironment: ['Secure facilities', 'High-pressure situations', 'Technical focus', '24/7 monitoring'],
    personalityFit: ['Detail-oriented', 'Analytical', 'Security-minded', 'Problem solver'],
    industryTags: ['Cybersecurity', 'Technology', 'Risk Management', 'IT'],
    nigerianContext: {
      demand: 'high',
      localOpportunities: ['Banks', 'Government', 'Telecoms', 'Consulting'],
      averageSalary: '₦5M - ₦12M annually'
    }
  },
  {
    id: 'content_creator',
    title: 'Content Creator/Influencer',
    description: 'Create engaging content across digital platforms to build audiences and drive engagement. Develop brand partnerships and monetize content.',
    requiredSkills: ['Content creation', 'Social media expertise', 'Video/photo editing', 'Brand building', 'Audience engagement'],
    educationRequirements: ['Communications degree', 'Self-taught', 'Media studies', 'Portfolio-based'],
    salaryRange: { min: 1000000, max: 10000000, currency: 'NGN' },
    growthOutlook: 'good',
    workEnvironment: ['Home studio', 'Flexible schedule', 'Creative freedom', 'Social media focused'],
    personalityFit: ['Creative', 'Outgoing', 'Adaptable', 'Self-motivated'],
    industryTags: ['Content', 'Social Media', 'Creative', 'Digital Marketing'],
    nigerianContext: {
      demand: 'medium',
      localOpportunities: ['Social media platforms', 'Brand partnerships', 'Media companies', 'Freelance'],
      averageSalary: '₦1.5M - ₦6M annually'
    }
  }
];