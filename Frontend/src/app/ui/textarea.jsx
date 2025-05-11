import React from 'react';

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={`p-3 border border-gray-300 rounded-md ${className}`}
    {...props}
  />
));

Textarea.displayName = 'Textarea'; // This is to avoid the anonymous function warning in the console

export { Textarea };
