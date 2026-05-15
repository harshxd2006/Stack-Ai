import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label className="text-sm font-medium text-text-muted">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`bg-card border ${error ? 'border-red-500' : 'border-[#262626]'} rounded-xl px-4 py-3 text-white outline-none focus:border-accent transition-colors w-full`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
