import React from 'react';

interface CandidateMockupProps {
  type?: 'full' | 'mini';
}

const CandidateMockup = ({ type = 'full' }: CandidateMockupProps) => {
  const isMini = type === 'mini';

  if (isMini) {
    return (
      <svg width="400" height="240" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <rect width="400" height="240" rx="12" fill="#F9FAFB" />
        <text x="20" y="30" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#0A0F1E">My Journey</text>
        <g transform="translate(20, 50)">
          {[
            { label: 'JOBS APPLIED', val: '3' },
            { label: 'INTERVIEWS', val: '1' }
          ].map((item, i) => (
            <g key={i} transform={`translate(${i * 120}, 0)`}>
              <rect width="100" height="50" rx="8" fill="white" stroke="#E5E7EB" />
              <text x="50" y="25" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#0A0F1E" textAnchor="middle">{item.val}</text>
              <text x="50" y="40" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">{item.label}</text>
            </g>
          ))}
        </g>
        <g transform="translate(20, 120)">
          <rect width="360" height="60" rx="10" fill="white" stroke="#E5E7EB" />
          <rect x="10" y="15" width="30" height="30" rx="6" fill="#00B67A" />
          <text x="25" y="35" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">NX</text>
          <text x="50" y="28" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#0A0F1E">Senior Product Designer</text>
          <text x="50" y="42" fontFamily="system-ui, sans-serif" fontSize="9" fill="#9CA3AF">Nexus Technologies</text>
          <rect x="230" y="20" width="120" height="20" rx="10" fill="#00B67A" fillOpacity="0.1" />
          <text x="290" y="33" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#00B67A" textAnchor="middle">● INTERVIEW SCHEDULED</text>
        </g>
      </svg>
    );
  }

  return (
    <svg width="580" height="380" viewBox="0 0 580 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <rect width="580" height="380" rx="12" fill="#F9FAFB" />
      <rect x="0.5" y="0.5" width="579" height="379" rx="11.5" stroke="#E5E7EB" />

      <g transform="translate(25, 20)">
        <text x="0" y="15" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#00B67A">HireNP</text>
        <g transform="translate(300, 15)">
          <text x="0" y="0" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280">FIND JOBS</text>
          <text x="60" y="0" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#0A0F1E">MY APPLICATIONS</text>
          <text x="145" y="0" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280">MY PROFILE</text>
        </g>
      </g>

      <g transform="translate(25, 60)">
        <text x="0" y="20" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="bold" fill="#0A0F1E">My Journey</text>
        <text x="0" y="40" fontFamily="system-ui, sans-serif" fontSize="10" fill="#6B7280">Tracking your progress toward your next career milestone.</text>
        
        <g transform="translate(430, 0)">
          <circle cx="50" cy="20" r="30" stroke="#E5E7EB" strokeWidth="6" fill="transparent" />
          <path d="M50 20 m -30, 0 a 30,30 0 1,1 51.96,30" stroke="#00B67A" strokeWidth="6" fill="transparent" strokeLinecap="round" transform="rotate(-90, 50, 20)" />
          <text x="50" y="25" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="bold" fill="#0A0F1E" textAnchor="middle">85%</text>
          <text x="50" y="65" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="bold" fill="#6B7280" textAnchor="middle">PROFILE COMPLETION</text>
        </g>
      </g>

      <g transform="translate(25, 140)">
        {[
          { label: 'JOBS APPLIED', val: '3', chip: 'Active tracking', chipCol: '#00B67A' },
          { label: 'INTERVIEWS', val: '1', chip: 'Scheduled', chipCol: '#F59E0B' },
          { label: 'SAVED JOBS', val: '12', chip: 'Review later', chipCol: '#6B7280' },
          { label: 'RESUME VAULT', val: '1', chip: 'In vault', chipCol: '#00B67A' }
        ].map((item, i) => (
          <g key={i} transform={`translate(${i * 135}, 0)`}>
            <rect width="125" height="70" rx="8" fill="white" stroke="#E5E7EB" />
            <text x="15" y="30" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="#0A0F1E">{item.val}</text>
            <text x="15" y="45" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="bold" fill="#9CA3AF">{item.label}</text>
            <rect x="15" y="52" width="60" height="12" rx="6" fill={item.chipCol} fillOpacity="0.1" />
            <text x="45" y="61" fontFamily="system-ui, sans-serif" fontSize="6" fontWeight="bold" fill={item.chipCol} textAnchor="middle">{item.chip}</text>
          </g>
        ))}
      </g>

      <g transform="translate(25, 230)">
        <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#0A0F1E">Current Applications</text>
        <g transform="translate(0, 25)">
          <rect width="530" height="50" rx="8" fill="white" stroke="#E5E7EB" />
          <rect x="10" y="10" width="30" height="30" rx="6" fill="#00B67A" />
          <text x="25" y="30" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">NX</text>
          <text x="50" y="22" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#0A0F1E">Senior Product Designer</text>
          <text x="50" y="36" fontFamily="system-ui, sans-serif" fontSize="8" fill="#9CA3AF">Nexus Technologies</text>
          <rect x="400" y="15" width="120" height="20" rx="10" fill="#00B67A" fillOpacity="0.1" />
          <text x="460" y="28" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#00B67A" textAnchor="middle">● INTERVIEW SCHEDULED</text>
        </g>
      </g>
    </svg>
  );
};

export default CandidateMockup;
