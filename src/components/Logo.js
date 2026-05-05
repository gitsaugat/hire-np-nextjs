import React from 'react';
import Link from 'next/link';

const Logo = ({ className = "" }) => {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-[#00B67A] rounded-lg flex items-center justify-center font-bold text-white text-xl">H</div>
      <span className="text-xl font-bold text-[#0A0F1E] tracking-tight">HireNP</span>
    </Link>
  );
};

export default Logo;
