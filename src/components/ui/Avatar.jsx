import React from 'react';

const Avatar = ({ url, name, size = 'md', className = '' }) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  return (
    <div className={`relative rounded-full overflow-hidden bg-card border border-[#262626] flex items-center justify-center flex-shrink-0 ${sizes[size]} ${className}`}>
      {url ? (
        <img src={url} alt={name || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-bold text-white/50">{name ? name.charAt(0).toUpperCase() : '?'}</span>
      )}
    </div>
  );
};

export default Avatar;
