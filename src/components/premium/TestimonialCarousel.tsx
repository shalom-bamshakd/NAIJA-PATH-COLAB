import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Adebayo Ogundimu",
      role: "Software Developer at Paystack",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "NaijaPath completely changed my career trajectory. The AI matching was spot-on, and the mentorship program helped me land my dream job at Paystack within 6 months!",
      rating: 5
    },
    {
      name: "Fatima Abdullahi",
      role: "Data Scientist at Andela",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "The personalized learning roadmap was exactly what I needed. I went from knowing nothing about data science to getting hired at Andela. The support was incredible!",
      rating: 5
    },
    {
      name: "Chinedu Okwu",
      role: "Product Manager at Flutterwave",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Best investment I've made in my career. The mentors are industry experts who really care about your success. Now I'm leading product at one of Africa's biggest fintech companies.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Success Stories from Nigerian Youth
        </h2>
        <p className="text-lg text-gray-600">
          See how NaijaPath has transformed careers across Nigeria
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-lg text-gray-700 mb-6 italic">
                "{testimonials[currentIndex].content}"
              </blockquote>
              
              <div>
                <div className="font-bold text-gray-900 text-lg">
                  {testimonials[currentIndex].name}
                </div>
                <div className="text-green-600 font-medium">
                  {testimonials[currentIndex].role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevTestimonial}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-green-600"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={nextTestimonial}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-green-600"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;