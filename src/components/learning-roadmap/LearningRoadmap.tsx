import React, { useState } from 'react';
import { Home, Clock, BookOpen, ExternalLink, Play, CheckCircle } from 'lucide-react';
import TimelineStep from './TimelineStep';

interface LearningRoadmapProps {
  career: string;
  onGoHome: () => void;
  onUpgradePremium: () => void;
}

const LearningRoadmap: React.FC<LearningRoadmapProps> = ({ 
  career, 
  onGoHome, 
  onUpgradePremium 
}) => {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStepCompletion = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const roadmapSteps = [
    {
      title: "Foundation Programming",
      duration: "2-3 months",
      description: "Learn the basics of programming with Python or JavaScript. Master variables, functions, loops, and basic data structures.",
      resources: [
        { name: "FreeCodeCamp Python Course", url: "#", type: "free" },
        { name: "Codecademy JavaScript", url: "#", type: "premium" }
      ],
      skills: ["Variables & Data Types", "Functions", "Control Flow", "Basic Algorithms"]
    },
    {
      title: "Web Development Fundamentals",
      duration: "3-4 months", 
      description: "Build your first websites using HTML, CSS, and JavaScript. Learn responsive design and modern CSS frameworks.",
      resources: [
        { name: "MDN Web Docs", url: "#", type: "free" },
        { name: "Tailwind CSS Course", url: "#", type: "premium" }
      ],
      skills: ["HTML5 & CSS3", "JavaScript DOM", "Responsive Design", "CSS Frameworks"]
    },
    {
      title: "Frontend Framework",
      duration: "2-3 months",
      description: "Master React.js to build interactive user interfaces. Learn component-based architecture and state management.",
      resources: [
        { name: "React Official Tutorial", url: "#", type: "free" },
        { name: "Advanced React Patterns", url: "#", type: "premium" }
      ],
      skills: ["React Components", "State Management", "Hooks", "React Router"]
    },
    {
      title: "Backend Development",
      duration: "3-4 months",
      description: "Learn server-side programming with Node.js and Express. Understand databases, APIs, and authentication.",
      resources: [
        { name: "Node.js Documentation", url: "#", type: "free" },
        { name: "Full-Stack Bootcamp", url: "#", type: "premium" }
      ],
      skills: ["Node.js & Express", "Database Design", "REST APIs", "Authentication"]
    },
    {
      title: "Portfolio & Job Preparation",
      duration: "1-2 months",
      description: "Build impressive projects for your portfolio. Practice coding interviews and learn about the Nigerian tech job market.",
      resources: [
        { name: "GitHub Portfolio Guide", url: "#", type: "free" },
        { name: "Interview Prep Course", url: "#", type: "premium" }
      ],
      skills: ["Portfolio Projects", "Git & GitHub", "Interview Skills", "Job Applications"]
    }
  ];

  const totalDuration = "11-16 months";
  const progressPercentage = (completedSteps.length / roadmapSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <button
          onClick={onGoHome}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#22C55E] transition-colors duration-200 mb-6"
        >
          <Home className="h-5 w-5" />
          <span className="font-medium">Back to Home</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Your {career} Learning Roadmap
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            A structured path to becoming a professional {career.toLowerCase()} in Nigeria's tech industry.
          </p>
          
          {/* Progress Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Clock className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-gray-900">Duration</span>
              </div>
              <p className="text-blue-600 font-bold">{totalDuration}</p>
            </div>
            
            <div className="bg-green-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-gray-900">Steps</span>
              </div>
              <p className="text-green-600 font-bold">{roadmapSteps.length} Learning Phases</p>
            </div>
            
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
                <span className="font-semibold text-gray-900">Progress</span>
              </div>
              <p className="text-purple-600 font-bold">{Math.round(progressPercentage)}% Complete</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-8">
          {roadmapSteps.map((step, index) => (
            <TimelineStep
              key={index}
              step={step}
              stepNumber={index + 1}
              isCompleted={completedSteps.includes(index)}
              onToggleComplete={() => toggleStepCompletion(index)}
              isLast={index === roadmapSteps.length - 1}
            />
          ))}
        </div>

        {/* Action Section */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of Nigerian youth who have successfully transitioned into tech careers using our structured learning approach.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onUpgradePremium}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Your Learning Journey
            </button>
            
            <button className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
              Download Roadmap PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;