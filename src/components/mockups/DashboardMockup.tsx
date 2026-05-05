import React from 'react';

interface DashboardMockupProps {
  type?: 'full' | 'mini';
}

const DashboardMockup = ({ type = 'full' }: DashboardMockupProps) => {
  const isMini = type === 'mini';
  
  if (isMini) {
    return (
      <svg width="400" height="240" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect width="400" height="240" rx="12" fill="#0A0F1E" />
        {/* Stats row */}
        <g transform="translate(20, 30)">
          {[
            { label: 'JOBS', val: '3', color: '#00B67A' },
            { label: 'SAVED', val: '12h', color: '#F59E0B' },
            { label: 'EMAILS', val: '8', color: '#3B82F6' }
          ].map((item, i) => (
            <g key={i} transform={`translate(${i * 100}, 0)`}>
              <rect width="80" height="50" rx="8" fill="#111827" stroke="#1F2937" />
              <text x="40" y="25" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">{item.val}</text>
              <text x="40" y="40" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">{item.label}</text>
            </g>
          ))}
        </g>
        {/* ROI Badge */}
        <g transform="translate(20, 100)">
          <rect width="100" height="30" rx="15" fill="#00B67A" fillOpacity="0.1" />
          <text x="50" y="20" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#00B67A" textAnchor="middle">312% ROI</text>
        </g>
        {/* Candidate Row */}
        <g transform="translate(20, 150)">
          <rect width="360" height="60" rx="10" fill="#111827" stroke="#1F2937" />
          <circle cx="30" cy="30" r="15" fill="#00B67A" />
          <text x="30" y="35" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">AM</text>
          <text x="55" y="28" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="bold" fill="white">Alex Morgan</text>
          <text x="55" y="42" fontFamily="system-ui, sans-serif" fontSize="10" fill="#9CA3AF">94% Match</text>
          <rect x="260" y="20" width="80" height="20" rx="10" fill="#00B67A" fillOpacity="0.1" />
          <text x="300" y="33" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#00B67A" textAnchor="middle">● IN PROCESS</text>
        </g>
      </svg>
    );
  }

  return (
    <svg width="600" height="380" viewBox="0 0 600 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      {/* Outer Shell */}
      <rect width="600" height="380" rx="12" fill="#0A0F1E" />
      <rect x="0.5" y="0.5" width="599" height="379" rx="11.5" stroke="#1F2937" />

      {/* Browser Chrome */}
      <circle cx="20" cy="20" r="4" fill="#FF5F57" />
      <circle cx="36" cy="20" r="4" fill="#FFBD2E" />
      <circle cx="52" cy="20" r="4" fill="#28C840" />
      <rect x="76" y="10" width="448" height="20" rx="10" fill="#1F2937" />
      <text x="300" y="24" fontFamily="system-ui, sans-serif" fontSize="10" fill="#9CA3AF" textAnchor="middle">app.nexustech.com/dashboard</text>

      {/* Content Area */}
      <text x="30" y="60" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="bold" fill="white">Hiring Intelligence Overview</text>

      {/* Stat Cards Row */}
      <g transform="translate(30, 80)">
        {[
          { label: 'JOBS', val: '3', color: '#00B67A' },
          { label: 'POOL', val: '12', color: '#3B82F6' },
          { label: 'SAVED', val: '45h', color: '#F59E0B' },
          { label: 'EMAILS', val: '24', color: '#8B5CF6' },
          { label: 'OFFERS', val: '2', color: '#EC4899' }
        ].map((item, i) => (
          <g key={i} transform={`translate(${i * 110}, 0)`}>
            <rect width="100" height="60" rx="8" fill="white" />
            <text x="50" y="35" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="#0A0F1E" textAnchor="middle">{item.val}</text>
            <text x="50" y="50" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">{item.label}</text>
            <circle cx="15" cy="15" r="5" fill={item.color} fillOpacity="0.2" />
            <circle cx="15" cy="15" r="2" fill={item.color} />
          </g>
        ))}
      </g>

      {/* ROI Card */}
      <g transform="translate(30, 160)">
        <rect width="320" height="130" rx="12" fill="#111827" />
        <rect x="20" y="20" width="80" height="24" rx="12" fill="#00B67A" fillOpacity="0.1" />
        <text x="60" y="36" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#00B67A" textAnchor="middle">412% ROI</text>
        
        <text x="20" y="65" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="white">Recruitment ROI</text>
        <text x="20" y="80" fontFamily="system-ui, sans-serif" fontSize="9" fill="#9CA3AF">PLATFORM SAVINGS SUMMARY</text>
        
        <text x="20" y="105" fontFamily="system-ui, sans-serif" fontSize="10" fill="#9CA3AF">AGENCY FEES SAVED</text>
        <text x="300" y="105" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#00B67A" textAnchor="end">$12,400</text>
        
        <text x="20" y="120" fontFamily="system-ui, sans-serif" fontSize="10" fill="#9CA3AF">HOURS SAVED</text>
        <text x="300" y="120" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#00B67A" textAnchor="end">45h</text>
      </g>

      {/* Pipeline Funnel */}
      <g transform="translate(370, 160)">
        {[
          { label: 'Applied', w: 200 },
          { label: 'AI Analyzed', w: 180 },
          { label: 'Invited', w: 160 },
          { label: 'Accepted', w: 140 },
          { label: 'Interviewed', w: 120 }
        ].map((item, i) => (
          <g key={i} transform={`translate(${(200 - item.w) / 2}, ${i * 26})`}>
            <rect width={item.w} height="20" rx="4" fill="#00B67A" fillOpacity={1 - i * 0.15} />
            <text x={item.w / 2} y="13" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill={i > 2 ? "#0A0F1E" : "white"} textAnchor="middle">{item.label} 100%</text>
          </g>
        ))}
      </g>

      {/* Emma AI Widget */}
      <g transform="translate(30, 310)">
        <rect width="200" height="50" rx="12" fill="#111827" stroke="#1F2937" />
        <circle cx="25" cy="25" r="15" fill="#00B67A" fillOpacity="0.2" />
        <circle cx="25" cy="25" r="10" fill="#00B67A" />
        <circle cx="45" cy="15" r="3" fill="#00B67A" />
        <text x="50" y="22" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="white">EMMA AI • READY TO HELP!</text>
        <text x="50" y="36" fontFamily="system-ui, sans-serif" fontSize="8" fill="#9CA3AF">Ask me about Alex Morgan...</text>
      </g>
    </svg>
  );
};

export default DashboardMockup;
