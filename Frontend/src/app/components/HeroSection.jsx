import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Leaf, Plant, Search } from "lucide-react";

const HeroSection = () => {
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
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-plant-50 pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-plant-900 reveal-animation">
                AI-Powered <span className="text-plant-500">Plant Disease</span> Detection
              </h1>
              <p className="text-lg md:text-xl text-plant-800/80 max-w-lg reveal-animation" style={{ transitionDelay: '100ms' }}>
                Identify plant diseases instantly with our advanced AI technology. Protect your crops and increase yields with early detection.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4 reveal-animation" style={{ transitionDelay: '200ms' }}>
                <Button className="bg-plant-500 hover:bg-plant-600 text-white p-6 text-lg rounded-lg">
                  Get Started
                </Button>
                <Button variant="outline" className="border-plant-500 text-plant-700 hover:bg-plant-100 p-6 text-lg rounded-lg">
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-8 reveal-animation" style={{ transitionDelay: '300ms' }}>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-plant-500" />
                  <span className="text-sm text-plant-700">99% Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-plant-500" />
                  <span className="text-sm text-plant-700">100+ Plant Species</span>
                </div>
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-plant-500" />
                  <span className="text-sm text-plant-700">Instant Results</span>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center reveal-animation">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-plant-200 rounded-full blur-2xl opacity-70"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-plant-300 rounded-full blur-3xl opacity-60"></div>
              <img 
                src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07" 
                alt="Plant Leaf with Disease Detection"
                className="w-full h-auto object-cover rounded-2xl shadow-xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg z-20 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-plant-100 flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-plant-500" />
                </div>
                <div>
                  <p className="font-medium text-plant-800">Disease Detected</p>
                  <p className="text-sm text-plant-600">Early Leaf Blight</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
