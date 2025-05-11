import React, { useEffect } from 'react';
import { Camera, Search, Leaf } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Take a Photo",
    description: "Capture a clear image of the affected plant leaf or area using your smartphone or upload an existing image."
  },
  {
    icon: Search,
    title: "AI Analysis",
    description: "Our advanced machine learning algorithms analyze the image, detecting patterns and identifying potential diseases."
  },
  {
    icon: Leaf,
    title: "Get Results",
    description: "Receive instant diagnosis with detailed information about the disease and recommended treatment options."
  }
];

const HowItWorks = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-animation');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      elements.forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal-animation">
          <h2 className="text-3xl md:text-4xl font-bold text-plant-800 mb-4">How It Works</h2>
          <p className="text-lg text-plant-600 max-w-2xl mx-auto">
            Our plant disease detection system is simple to use and provides accurate results in seconds.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-plant-50 p-8 rounded-xl shadow-sm reveal-animation"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-16 w-16 bg-plant-100 rounded-full flex items-center justify-center mb-6">
                <step.icon className="h-8 w-8 text-plant-600" />
              </div>
              <h3 className="text-xl font-semibold text-plant-800 mb-3">{step.title}</h3>
              <p className="text-plant-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal-animation" style={{ transitionDelay: '300ms' }}>
          <div className="p-6 bg-plant-100 rounded-lg inline-block">
            <p className="text-plant-700 font-medium">
              "Our AI model is trained on over 100,000 plant images across 50+ diseases."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
