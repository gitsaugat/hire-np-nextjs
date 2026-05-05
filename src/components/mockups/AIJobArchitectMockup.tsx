import React from 'react';

const AIJobArchitectMockup = () => {
  return (
    <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      {/* Outer Shell */}
      <rect width="500" height="400" rx="12" fill="#0A0F1E" />
      <rect x="0.5" y="0.5" width="499" height="399" rx="11.5" stroke="#1F2937" />

      {/* Browser Chrome */}
      <g transform="translate(0, 0)">
        <rect width="500" height="30" rx="12" fill="#111827" />
        <rect y="15" width="500" height="15" fill="#111827" />
        <circle cx="20" cy="15" r="4" fill="#FF5F57" />
        <circle cx="36" cy="15" r="4" fill="#FFBD2E" />
        <circle cx="52" cy="15" r="4" fill="#28C840" />
      </g>

      {/* Modal */}
      <g transform="translate(40, 60)">
        <rect width="420" height="300" rx="12" fill="#111827" stroke="#1F2937" />
        
        <text x="20" y="30" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="bold" fill="white">Post New Position</text>
        
        <g transform="translate(280, 15)">
          <rect width="120" height="32" rx="16" fill="#00B67A" />
          <text x="60" y="21" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">+ AI BUILD</text>
        </g>

        <g transform="translate(20, 60)">
          <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#00B67A" letterSpacing="0.05em">AI JOB ARCHITECT</text>
          <rect y="20" width="380" height="45" rx="8" fill="#0A0F1E" stroke="#1F2937" />
          <text x="12" y="47" fontFamily="system-ui, sans-serif" fontSize="11" fill="#9CA3AF">Senior Product Designer at a fast-growing SaaS startup...</text>
        </g>

        <g transform="translate(20, 140)">
          <div className="grid grid-cols-2 gap-4">
            <g>
              <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="9" fill="#6B7280">Job Title</text>
              <rect y="18" width="180" height="30" rx="4" fill="#0A0F1E" stroke="#1F2937" />
              <text x="10" y="38" fontFamily="system-ui, sans-serif" fontSize="11" fill="white">Senior Product Designer</text>
            </g>
            <g transform="translate(200, 0)">
              <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="9" fill="#6B7280">Location</text>
              <rect y="18" width="180" height="30" rx="4" fill="#0A0F1E" stroke="#1F2937" />
              <text x="10" y="38" fontFamily="system-ui, sans-serif" fontSize="11" fill="white">Buffalo, NY</text>
            </g>
            <g transform="translate(0, 65)">
              <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="9" fill="#6B7280">Work Type</text>
              <rect y="18" width="180" height="30" rx="4" fill="#0A0F1E" stroke="#1F2937" />
              <text x="10" y="38" fontFamily="system-ui, sans-serif" fontSize="11" fill="white">Remote</text>
            </g>
            <g transform="translate(200, 65)">
              <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="9" fill="#6B7280">Employment</text>
              <rect y="18" width="180" height="30" rx="4" fill="#0A0F1E" stroke="#1F2937" />
              <text x="10" y="38" fontFamily="system-ui, sans-serif" fontSize="11" fill="white">Full-time</text>
            </g>
          </div>
        </g>
      </g>
    </svg>
  );
};

export default AIJobArchitectMockup;
