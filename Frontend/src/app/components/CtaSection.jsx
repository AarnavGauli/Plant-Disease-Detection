import React from 'react';
import { Button } from "../ui/button";
import { ArrowRight, Calendar } from "lucide-react"; 

const CtaSection = () => {
  return (
    <section
      id="get-started"
      className="section-padding bg-gradient-to-br from-green-700 via-green-600 to-green-800 py-20 relative overflow-hidden"
    >
      {/* Optional: background shape or pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/leaf-pattern.png')] bg-cover bg-center pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-4xl font-bold text-white mb-6 animate-fade-in">
            Ready to Protect Your Plants?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ transitionDelay: '100ms' }}>
            Join thousands of farmers and gardeners using our AI to detect diseases early and save their crops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ transitionDelay: '200ms' }}>
            <Button className="text-green-700 hover:bg-green-100 p-6 text-lg rounded-lg shadow-md flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Get Started for Free
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-green-600 p-6 text-lg rounded-lg flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 text-white/90">
  <div>
    <h3 className="text-xl font-semibold">🌿 Early Detection</h3>
    <p className="text-sm mt-2">Catch plant diseases before they spread and reduce crop loss.</p>
  </div>
  <div>
    <h3 className="text-xl font-semibold">📸 Image-Based Diagnosis</h3>
    <p className="text-sm mt-2">Simply upload a photo and let our AI analyze it instantly.</p>
  </div>
  <div>
    <h3 className="text-xl font-semibold">📊 Smart Reports</h3>
    <p className="text-sm mt-2">Get actionable insights with real-time disease stats and trends.</p>
  </div>
</div>
<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 text-white/90 text-center gap-6">
  <div>
    <p className="text-4xl font-bold">12K+</p>
    <p className="text-sm">Plants Scanned</p>
  </div>
  <div>
    <p className="text-4xl font-bold">98%</p>
    <p className="text-sm">Accuracy Rate</p>
  </div>
  <div>
    <p className="text-4xl font-bold">5K+</p>
    <p className="text-sm">Farmers Helped</p>
  </div>
</div>

    </section>
  );
};

export default CtaSection;

