import React, { useState } from 'react';

export const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <div onClick={toggleMenu} className="cursor-pointer">
        {children[0]} {/* The Trigger */}
      </div>
      {isOpen && (
        <div className="absolute right-0 bg-white shadow-lg mt-2 w-56 rounded-lg">
          {children[1]} {/* The Menu */}
        </div>
      )}
    </div>
  );
};

export const DropdownMenuTrigger = ({ children }) => {
  return <div>{children}</div>;
};

export const DropdownMenuContent = ({ children, align = 'start' }) => {
  return <div className={`py-2 ${align === 'end' ? 'right-0' : ''}`}>{children}</div>;
};

export const DropdownMenuItem = ({ children, onClick }) => {
  return (
    <div
      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const DropdownMenuLabel = ({ children }) => {
  return (
    <div className="px-4 py-2 text-xs font-semibold text-gray-600">
      {children}
    </div>
  );
};

export const DropdownMenuSeparator = () => {
  return <div className="h-px bg-gray-200 my-1"></div>;
};
