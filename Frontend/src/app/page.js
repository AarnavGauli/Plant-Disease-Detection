"use client";

import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowItWorks from "./components/HowItWorks";
import FeatureSection from "./components/FeatureSection";
import CtaSection from "./components/CtaSection";
import Footer from "./components/Footer";

const Index = () => {
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
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <HeroSection />
      <HowItWorks />
      <FeatureSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
