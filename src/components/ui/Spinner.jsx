import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`relative ${sizes[size]} ${className}`}>
      <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
      <div className="absolute inset-0 rounded-full border-2 border-accent border-t-transparent animate-spin"></div>
    </div>
  );
};

export default Spinner;
