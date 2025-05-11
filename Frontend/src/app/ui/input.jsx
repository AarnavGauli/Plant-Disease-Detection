import React from 'react';

const Input = React.forwardRef(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={`p-3 border border-gray-300 rounded-md ${className}`}
    {...props}
  />
));

Input.displayName = 'Input';  // This is to avoid the anonymous function warning in the console

export { Input };
