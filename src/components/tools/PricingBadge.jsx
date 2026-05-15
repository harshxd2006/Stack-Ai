import React from 'react';
import { formatCurrency } from '../../utils/formatters';

const PricingBadge = ({ pricing, price }) => {
  if (!pricing) return null;

  let colorClass = 'bg-white/10 text-white';
  
  if (pricing.toLowerCase() === 'free') {
    colorClass = 'bg-accent/20 text-accent border border-accent/20';
  } else if (pricing.toLowerCase() === 'freemium') {
    colorClass = 'bg-accent/20 text-accent border border-accent/20';
  } else if (pricing.toLowerCase() === 'paid') {
    colorClass = 'bg-white/10 text-white border border-[#262626]';
  }

  return (
    <div className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${colorClass}`}>
      <span className="capitalize">{pricing}</span>
      {price !== undefined && price !== null && price > 0 && (
        <>
          <span className="opacity-50">•</span>
          <span>From {formatCurrency(price)}</span>
        </>
      )}
    </div>
  );
};

export default PricingBadge;
