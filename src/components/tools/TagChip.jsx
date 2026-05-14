import React from 'react';

const TagChip = ({ label }) => {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-default">
      {label}
    </span>
  );
};

export default TagChip;
