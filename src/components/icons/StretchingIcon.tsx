
import React from 'react';

interface StretchingIconProps {
  size?: number;
  color?: string;
  className?: string;
}

const StretchingIcon: React.FC<StretchingIconProps> = ({ 
  size = 24, 
  color = "currentColor",
  className = ""
}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="17" cy="4" r="2" />
      <path d="M15.2 22a3 3 0 0 0 2.4-6" />
      <path d="M16 8a2 2 0 0 0-2-2" />
      <path d="M12 15.5a2 2 0 0 0-2 2" />
      <path d="M20 13.5c-.3-1.5-1.5-3-3.5-2.5-2.3.5-3.5 3.5-3.5 4.5" />
      <path d="M15.5 13.5c-1.5-1.5-3-3-5.5-1.5-1.5.9-2.5 2.5-2.5 4.5 0 4.5 2.5 5.5 5 6" />
      <path d="M7.5 13C9 11 10 9 7 7.5 5.5 6.7 4 7 3 9c-1.5 3 .5 9 3 10" />
    </svg>
  );
};

export default StretchingIcon;
