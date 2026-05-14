import React from 'react';

const Divider = ({ className = '', ...props }) => {
  return (
    <div
      className={`w-full h-px bg-white/10 ${className}`}
      {...props}
    />
  );
};

export default Divider;
