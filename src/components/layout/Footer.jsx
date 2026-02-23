import React from 'react';
import { Briefcase } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center space-x-3 mb-4">
              <Briefcase className="w-8 h-8" />
              <span className="text-xl font-bold">Web Consultant Hub</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Connecting consultants with quality projects through admin-validated matching.
            </p>
          </div>
          
          <div className="text-center md:text-right">
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white">Contact</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2026 Web Consultant Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;