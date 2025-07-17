import React from 'react';
import { CheckCircle, Circle, ExternalLink, Lock } from 'lucide-react';

interface TimelineStepProps {
  step: {
    title: string;
    duration: string;
    description: string;
    resources: Array<{
      name: string;
      url: string;
      type: 'free' | 'premium';
    }>;
    skills: string[];
  };
  stepNumber: number;
  isCompleted: boolean;
  onToggleComplete: () => void;
  isLast: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  step,
  stepNumber,
  isCompleted,
  onToggleComplete,
  isLast
}) => {
  return (
    <div className="flex gap-4 items-start">
      {/* Timeline Line */}
      <div className="flex flex-col items-center">
        <button
          onClick={onToggleComplete}
          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold text-lg transition-all duration-300 ${
            isCompleted
              ? 'bg-green-500 border-green-500 text-white'
              : 'bg-white border-gray-300 text-gray-600 hover:border-green-400'
          }`}
        >
          {isCompleted ? (
            <CheckCircle className="h-6 w-6" />
          ) : (
            stepNumber
          )}
        </button>
        
        {!isLast && (
          <div className={`w-1 h-24 mt-4 transition-colors duration-300 ${
            isCompleted ? 'bg-green-500' : 'bg-gray-300'
          }`} />
        )}
      </div>

      {/* Content Card */}
      <div className={`flex-1 bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ${
        isCompleted ? 'ring-2 ring-green-200' : ''
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">
              {step.title}
            </h3>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {step.duration}
            </span>
          </div>
        </div>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {step.description}
        </p>

        {/* Skills */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Skills You'll Learn:</h4>
          <div className="flex flex-wrap gap-2">
            {step.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Learning Resources:</h4>
          <div className="space-y-2">
            {step.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                  resource.type === 'free'
                    ? 'border-green-200 hover:bg-green-50 text-green-700'
                    : 'border-orange-200 hover:bg-orange-50 text-orange-700'
                }`}
              >
                <div className="flex items-center">
                  {resource.type === 'premium' && (
                    <Lock className="h-4 w-4 mr-2" />
                  )}
                  <span className="font-medium">{resource.name}</span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                    resource.type === 'free'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {resource.type}
                  </span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineStep;