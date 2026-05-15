import React from 'react';
import { checkPasswordStrength } from '../../utils/validators';

const PasswordStrength = ({ password }) => {
  const strength = checkPasswordStrength(password);
  
  let color = 'bg-white/20';
  let label = 'Weak';
  
  if (strength >= 4) {
    color = 'bg-accent';
    label = 'Strong';
  } else if (strength >= 2) {
    color = 'bg-yellow-500';
    label = 'Fair';
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-text-muted">Password Strength:</span>
        <span className={`text-xs font-medium ${strength >= 4 ? 'text-accent' : strength >= 2 ? 'text-yellow-500' : 'text-text-muted'}`}>
          {label}
        </span>
      </div>
      <div className="flex gap-1 h-1.5">
        {[1, 2, 3, 4, 5].map((level) => (
          <div 
            key={level} 
            className={`flex-1 rounded-full ${level <= strength ? color : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;
