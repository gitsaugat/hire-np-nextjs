import React from 'react';

const OfferMockup = () => {
  return (
    <svg width="560" height="480" viewBox="0 0 560 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <rect width="560" height="480" rx="12" fill="white" />
      <rect x="0.5" y="0.5" width="559" height="479" rx="11.5" stroke="#E5E7EB" />

      {/* Left Panel - Form Side */}
      <g transform="translate(25, 30)">
        <text x="0" y="5" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="bold" fill="#0A0F1E">Create Offer</text>
        <text x="0" y="22" fontFamily="system-ui, sans-serif" fontSize="8" fill="#9CA3AF" fontWeight="bold">OFFERS / NEW OFFER</text>

        <g transform="translate(0, 50)">
          <circle cx="5" cy="5" r="4" fill="#00B67A" />
          <text x="15" y="8" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#0A0F1E">CANDIDATE INFO</text>
          <rect y="20" width="220" height="30" rx="4" fill="#F9FAFB" stroke="#E5E7EB" />
          <text x="10" y="40" fontFamily="system-ui, sans-serif" fontSize="10" fill="#0A0F1E">Alex Morgan</text>
          <rect y="60" width="220" height="30" rx="4" fill="#F9FAFB" stroke="#E5E7EB" />
          <text x="10" y="80" fontFamily="system-ui, sans-serif" fontSize="10" fill="#0A0F1E">alex@example.com</text>
        </g>

        <g transform="translate(0, 160)">
          <circle cx="5" cy="5" r="4" fill="#00B67A" />
          <text x="15" y="8" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#0A0F1E">ROLE DETAILS</text>
          <rect y="20" width="220" height="30" rx="4" fill="#F9FAFB" stroke="#E5E7EB" />
          <text x="10" y="40" fontFamily="system-ui, sans-serif" fontSize="10" fill="#0A0F1E">Senior Product Designer</text>
          <rect y="60" width="220" height="30" rx="4" fill="#F9FAFB" stroke="#E5E7EB" />
          <text x="10" y="80" fontFamily="system-ui, sans-serif" fontSize="10" fill="#0A0F1E">Remote</text>
        </g>

        <g transform="translate(0, 270)">
          <circle cx="5" cy="5" r="4" fill="#00B67A" />
          <text x="15" y="8" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#0A0F1E">COMPENSATION & DURATION</text>
          <rect y="20" width="220" height="30" rx="4" fill="#F9FAFB" stroke="#E5E7EB" />
          <text x="10" y="40" fontFamily="system-ui, sans-serif" fontSize="10" fill="#0A0F1E">$95,000</text>
          <rect y="60" width="220" height="30" rx="4" fill="#F9FAFB" stroke="#E5E7EB" />
          <text x="10" y="80" fontFamily="system-ui, sans-serif" fontSize="10" fill="#0A0F1E">June 1, 2026</text>
        </g>
      </g>

      <line x1="270" y1="30" x2="270" y2="450" stroke="#F3F4F6" />

      {/* Right Panel - Live Document */}
      <g transform="translate(295, 30)">
        <circle cx="5" cy="5" r="4" fill="#00B67A" />
        <text x="15" y="8" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#00B67A">LIVE DOCUMENT</text>
        <rect x="0" y="25" width="240" height="35" rx="17.5" fill="#00B67A" />
        <text x="120" y="47" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">SEND OFFER LETTER →</text>

        <g transform="translate(0, 75)">
          <rect width="240" height="345" fill="white" stroke="#E5E7EB" />
          <rect x="20" y="20" width="25" height="25" rx="4" fill="#00B67A" />
          <text x="20" y="37" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle" transform="translate(12.5, 0)">NX</text>
          <text x="50" y="35" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#0A0F1E">Nexus Technologies</text>
          
          <text x="20" y="75" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#0A0F1E">Dear Alex Morgan,</text>
          <text x="20" y="95" fontFamily="system-ui, sans-serif" fontSize="8" fill="#4B5563">We are delighted to extend an offer for the position of</text>
          <text x="20" y="107" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#0A0F1E">Senior Product Designer</text>
          
          <g transform="translate(20, 130)">
            <text x="0" y="0" fontFamily="system-ui, sans-serif" fontSize="7" fill="#9CA3AF">COMPENSATION</text>
            <text x="0" y="12" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#0A0F1E">$95,000 / year</text>
            
            <text x="0" y="35" fontFamily="system-ui, sans-serif" fontSize="7" fill="#9CA3AF">START DATE</text>
            <text x="0" y="47" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#0A0F1E">June 1, 2026</text>
          </g>

          <line x1="20" y1="280" x2="100" y2="280" stroke="#E5E7EB" />
          <text x="20" y="295" fontFamily="system-ui, sans-serif" fontSize="7" fill="#9CA3AF">Hiring Manager</text>
        </g>
      </g>
    </svg>
  );
};

export default OfferMockup;
