import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-white/10 text-white border border-white/10',
    primary: 'bg-accent/20 text-accent border border-accent/20',
    success: 'bg-teal/20 text-teal border border-teal/20',
    warning: 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/20',
    danger: 'bg-red-500/20 text-red-500 border border-red-500/20'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
