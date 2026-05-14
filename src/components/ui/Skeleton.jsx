import React from 'react';

const Skeleton = ({ className = '', variant = 'rectangular', ...props }) => {
  const baseClasses = 'bg-white/5 animate-pulse overflow-hidden relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent';
  
  const variants = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4 w-3/4',
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

export default Skeleton;
