import React from 'react';

export const Avatar = ({ children }) => {
  return <div className="inline-block rounded-full overflow-hidden">{children}</div>;
};

export const AvatarImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-full object-cover" />;
};

export const AvatarFallback = ({ children, className }) => {
  return (
    <div className={`${className} w-full h-full flex items-center justify-center`}>
      {children}
    </div>
  );
};
