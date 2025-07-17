import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  feature: {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
  };
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="mb-6">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 group-hover:scale-110 transition-transform duration-300`}>
          <feature.icon className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">
        {feature.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;