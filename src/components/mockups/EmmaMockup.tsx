import React from 'react';

const EmmaMockup = () => {
  return (
    <svg width="520" height="420" viewBox="0 0 520 420" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      {/* Outer Shell */}
      <rect width="520" height="420" rx="12" fill="#0A0F1E" />
      <rect x="0.5" y="0.5" width="519" height="419" rx="11.5" stroke="#1F2937" />

      {/* Header */}
      <g transform="translate(20, 20)">
        <circle cx="15" cy="15" r="15" fill="url(#emmaGradient)" />
        <text x="40" y="15" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="white">EMMA AI</text>
        <circle cx="40" cy="25" r="3" fill="#00B67A" />
        <text x="48" y="28" fontFamily="system-ui, sans-serif" fontSize="8" fill="#00B67A" fontWeight="bold">ACTIVE WORKSPACE</text>
      </g>

      {/* User Message Bubble */}
      <g transform="translate(140, 60)">
        <rect x="0" y="0" width="360" height="45" rx="12" fill="#1F2937" />
        <text x="20" y="26" fontFamily="system-ui, sans-serif" fontSize="12" fill="white">Summarize Alex Morgan's fit for Senior Product Designer role</text>
      </g>

      {/* Emma Response Bubble */}
      <g transform="translate(20, 120)">
        <circle cx="15" cy="15" r="15" fill="url(#emmaGradient)" />
        <g transform="translate(40, 0)">
          <rect width="440" height="230" rx="12" fill="#111827" stroke="#1F2937" />
          <text x="20" y="25" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="bold" fill="white">Candidate Summary — Alex Morgan</text>
          
          <text x="20" y="50" fontFamily="system-ui, sans-serif" fontSize="11" fill="#9CA3AF">Fit Score | </text>
          <text x="75" y="50" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#00B67A">94/100 — Strong match</text>
          
          <text x="20" y="75" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="white">Key Strengths</text>
          <text x="20" y="95" fontFamily="system-ui, sans-serif" fontSize="11" fill="#9CA3AF">• 7 years product design at SaaS companies</text>
          <text x="20" y="112" fontFamily="system-ui, sans-serif" fontSize="11" fill="#9CA3AF">• Strong Figma portfolio with B2C products</text>
          <text x="20" y="129" fontFamily="system-ui, sans-serif" fontSize="11" fill="#9CA3AF">• Excellent communication in cover letter</text>
          
          <text x="20" y="155" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="white">Areas for Development</text>
          <text x="20" y="175" fontFamily="system-ui, sans-serif" fontSize="11" fill="#9CA3AF">• Limited enterprise/B2B experience</text>
          <text x="20" y="192" fontFamily="system-ui, sans-serif" fontSize="11" fill="#9CA3AF">• No motion design in portfolio</text>
          
          <text x="20" y="215" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#00B67A">Recommendation: Schedule portfolio review</text>
        </g>
      </g>

      {/* Quick Action Chips */}
      <g transform="translate(60, 365)">
        {[
          { label: '📊 DAILY BRIEFING', w: 120 },
          { label: '📈 HIRING METRICS', w: 120 },
          { label: '🏆 TOP CANDIDATES', w: 120 }
        ].map((item, i) => (
          <g key={i} transform={`translate(${i * 130}, 0)`}>
            <rect width={item.w} height="28" rx="14" stroke="#00B67A" fill="transparent" />
            <text x={item.w / 2} y="18" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#00B67A" textAnchor="middle">{item.label}</text>
          </g>
        ))}
      </g>

      <defs>
        <linearGradient id="emmaGradient" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00B67A" />
          <stop offset="1" stopColor="#008F5E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default EmmaMockup;
