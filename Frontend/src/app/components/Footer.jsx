import React from 'react';
import { Leaf, Mail, Phone, Globe } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-plant-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-plant-400" />
              <span className="text-xl font-semibold text-white">PlantGuard AI</span>
            </div>
            <p className="text-plant-300 mb-6">
              Advanced AI technology for early detection of plant diseases to help farmers and gardeners protect their plants.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="text-plant-300 hover:text-plant-200 transition-colors">How It Works</a></li>
              <li><a href="#features" className="text-plant-300 hover:text-plant-200 transition-colors">Features</a></li>
              <li><a href="#get-started" className="text-plant-300 hover:text-plant-200 transition-colors">Get Started</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-plant-300 hover:text-plant-200 transition-colors">Plant Disease Library</a></li>
              <li><a href="#" className="text-plant-300 hover:text-plant-200 transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-plant-300 hover:text-plant-200 transition-colors">Help Center</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-plant-400" />
                <a href="mailto:info@plantguardai.com" className="text-plant-300 hover:text-plant-200 transition-colors">
                  info@plantguardai.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-plant-400" />
                <a href="tel:+1234567890" className="text-plant-300 hover:text-plant-200 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-plant-400" />
                <a href="https://plantguardai.com" className="text-plant-300 hover:text-plant-200 transition-colors">
                  www.plantguardai.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-plant-800 pt-6 text-center text-plant-400 text-sm">
          <p>© {new Date().getFullYear()} PlantGuard AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
