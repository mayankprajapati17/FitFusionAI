import { Icon } from '@progress/kendo-react-common';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white/80 pt-16 pb-8">
      <link rel="stylesheet" href="https://unpkg.com/@progress/kendo-font-icons/dist/index.css" />
      
      <div className="fitness-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">FitTrack AI</h3>
            <p className="mb-4 text-gray-300">
              Transforming fitness journeys with AI-powered workout planning and tracking.
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="#" className="social-icon facebook" aria-label="Facebook">
                <Icon name="facebook" />
              </a>
              <a href="#" className="social-icon twitter" aria-label="Twitter">
                <Icon name="twitter" />
              </a>
              <a href="#" className="social-icon linkedin" aria-label="LinkedIn">
                <Icon name="linkedin" />
              </a>
              <a href="#" className="social-icon youtube" aria-label="YouTube">
                <Icon name="youtube" />
              </a>
              <a href="#" className="social-icon instagram" aria-label="Instagram">
                <Icon name="instagram" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-fitness-400 transition-colors block">Home</a></li>
              <li><a href="/dashboard" className="text-gray-300 hover:text-fitness-400 transition-colors block">Dashboard</a></li>
              <li><a href="/profile" className="text-gray-300 hover:text-fitness-400 transition-colors block">Profile</a></li>
              <li><a href="/chatbot" className="text-gray-300 hover:text-fitness-400 transition-colors block">Gym Chatbot</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-gray-700 mb-8" />
        
        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2024 FitTrack AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-fitness-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-fitness-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-fitness-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
      
      <style>{`
        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .social-icon:before {
          content: '';
          position: absolute;
          width: 120%;
          height: 120%;
          top: 90%;
          left: -110%;
          transform: rotate(45deg);
          transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
        }
        
        .social-icon .k-icon {
          font-size: 24px;
          transform: scale(0.8);
          transition: all 0.35s cubic-bezier(0.31, -0.105, 0.43, 1.59);
        }
        
        .social-icon:hover:before {
          top: -10%;
          left: -10%;
        }
        
        .social-icon:hover .k-icon {
          color: white;
          transform: scale(1);
        }
        
        .social-icon.facebook:before { background-color: #3b5998; }
        .social-icon.facebook .k-icon { color: #3b5998; }
        
        .social-icon.twitter:before { background-color: #1DA1F2; }
        .social-icon.twitter .k-icon { color: #1DA1F2; }
        
        .social-icon.linkedin:before { background-color: #0177b5; }
        .social-icon.linkedin .k-icon { color: #0177b5; }
        
        .social-icon.youtube:before { background-color: #ff0000; }
        .social-icon.youtube .k-icon { color: #ff0000; }
        
        .social-icon.instagram:before { 
          background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); 
        }
        .social-icon.instagram .k-icon { 
          color: #e1306c; 
        }
      `}</style>
    </footer>
  );
};

export default Footer;
