import React, { useEffect } from 'react';
import { Leaf, Globe, Info, Settings } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Multi-Species Detection",
    description: "Our system can identify diseases across hundreds of plant species, from common crops to rare ornamentals."
  },
  {
    icon: Globe,
    title: "Global Disease Database",
    description: "Access information on plant diseases from around the world, with region-specific recommendations."
  },
  {
    icon: Info,
    title: "Detailed Reports",
    description: "Get comprehensive reports with disease information, severity assessment, and treatment options."
  },
  {
    icon: Settings,
    title: "Smart Recommendations",
    description: "Receive personalized treatment recommendations based on the specific disease, plant type, and severity."
  }
];

const FeatureSection = () => {
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
    <section id="features" className="section-padding bg-plant-50">
      <div className="container mx-auto">
        <div className="text-center mb-16 reveal-animation">
          <h2 className="text-3xl md:text-4xl font-bold text-plant-800 mb-4">Key Features</h2>
          <p className="text-lg text-plant-600 max-w-2xl mx-auto">
            Our AI-powered system offers a comprehensive solution for plant disease detection and management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-sm reveal-animation"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-14 w-14 flex-shrink-0 bg-plant-100 rounded-lg flex items-center justify-center">
                <feature.icon className="h-7 w-7 text-plant-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-plant-800 mb-2">{feature.title}</h3>
                <p className="text-plant-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="relative reveal-animation">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-plant-200 rounded-full blur-2xl opacity-50"></div>
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475" 
              alt="AI Analysis"
              className="w-full h-auto rounded-xl shadow-lg relative z-10"
            />
          </div>
          <div className="space-y-6 reveal-animation" style={{ transitionDelay: '100ms' }}>
            <h2 className="text-3xl font-bold text-plant-800">Advanced AI Technology</h2>
            <p className="text-plant-600">
              Our machine learning models have been trained on over 100,000 images of plant diseases, achieving a remarkable 99% accuracy rate in disease identification.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-plant-100 flex items-center justify-center">
                  <span className="text-plant-600 text-sm">✓</span>
                </div>
                <span className="text-plant-700">Deep learning neural networks</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-plant-100 flex items-center justify-center">
                  <span className="text-plant-600 text-sm">✓</span>
                </div>
                <span className="text-plant-700">Continuous model improvement</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-plant-100 flex items-center justify-center">
                  <span className="text-plant-600 text-sm">✓</span>
                </div>
                <span className="text-plant-700">Real-time processing capabilities</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
