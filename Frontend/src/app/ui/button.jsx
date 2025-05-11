import React from 'react';

export const Button = ({ children, className, variant = 'solid', ...props }) => {
  const buttonClass = variant === 'outline' 
    ? `border-2 border-plant-500 text-plant-700 ${className}` 
    : `bg-plant-500 text-white ${className}`;

  return (
    <button className={`${buttonClass} rounded-lg py-3 px-6`} {...props}>
      {children}
    </button>
  );
};
