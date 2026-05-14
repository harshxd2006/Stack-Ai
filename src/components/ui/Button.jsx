import React from 'react';

const Button = React.forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent hover:bg-accent-hover text-white shadow-[0_0_15px_rgba(108,99,255,0.3)] hover:shadow-[0_0_20px_rgba(108,99,255,0.5)]',
    secondary: 'bg-teal hover:bg-teal/80 text-bg shadow-[0_0_15px_rgba(0,212,170,0.3)]',
    outline: 'bg-transparent border border-white/20 hover:border-white/50 text-white hover:bg-white/5',
    ghost: 'bg-transparent hover:bg-white/10 text-white',
    danger: 'bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    icon: 'p-3'
  };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
