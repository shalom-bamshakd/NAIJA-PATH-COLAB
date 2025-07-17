export interface QuizQuestion {
  question: string;
  description?: string;
  options: string[];
  multiSelect?: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "What activities make you happiest?",
    description: "Choose your top two options that excite you most",
    multiSelect: true,
    options: [
      "Creating things with my hands",
      "Working with technology",
      "Helping and talking to people",
      "Solving problems and puzzles",
      "Making things look beautiful",
      "Running my own business"
    ]
  },
  {
    question: "How do you best learn new things?",
    options: [
      "By watching videos",
      "By practicing hands-on",
      "By reading and studying",
      "By learning from others"
    ]
  },
  {
    question: "Where would you prefer to work most days?",
    options: [
      "In an office with computers",
      "In my own shop or space",
      "Moving around different places",
      "From home",
      "In a creative studio"
    ]
  },
  {
    question: "What's your current tech comfort level?",
    options: [
      "I use smartphones and computers daily",
      "I can manage basic tech stuff",
      "I prefer working without much tech",
      "I want to learn more about tech"
    ]
  },
  {
    question: "What's most important to you in a career?",
    options: [
      "Making good money",
      "Being my own boss",
      "Helping others",
      "Learning new skills",
      "Creating things",
      "Job security"
    ]
  },
  {
    question: "What's your education background?",
    options: [
      "Secondary school or less",
      "Some tertiary education",
      "Completed tertiary education",
      "Self-taught/informal education"
    ]
  }
];