import React from 'react';

const InterviewHubMockup = () => {
  return (
    <svg width="520" height="460" viewBox="0 0 520 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]">
      {/* Outer Shell */}
      <rect width="520" height="460" rx="12" fill="white" />
      <rect x="0.5" y="0.5" width="519" height="459" rx="11.5" stroke="#E5E7EB" />

      {/* Browser Chrome */}
      <g transform="translate(0, 0)">
        <rect width="520" height="30" rx="12" fill="#111827" />
        <rect y="15" width="520" height="15" fill="#111827" />
        <circle cx="20" cy="15" r="4" fill="#FF5F57" />
        <circle cx="36" cy="15" r="4" fill="#FFBD2E" />
        <circle cx="52" cy="15" r="4" fill="#28C840" />
        <rect x="76" y="8" width="368" height="14" rx="7" fill="#1F2937" />
        <text x="260" y="18" fontFamily="system-ui, sans-serif" fontSize="8" fill="#9CA3AF" textAnchor="middle">app.hire-np.com/interviews</text>
      </g>

      {/* Header Row */}
      <g transform="translate(25, 55)">
        <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="#0A0F1E">Interview Hub</text>
        <text x="0" y="25" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#9CA3AF" letterSpacing="0.05em">SCHEDULED SESSIONS & HISTORY</text>
        
        <g transform="translate(230, -5)">
          <rect width="115" height="28" rx="14" stroke="#E5E7EB" fill="white" />
          <text x="57.5" y="17" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280" textAnchor="middle">INTERVIEW SETTINGS</text>
          
          <rect x="125" y="0" width="140" height="28" rx="14" fill="#00B67A" />
          <text x="195" y="17" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">MANAGE AVAILABILITY</text>
        </g>
      </g>

      {/* Stats Row */}
      <g transform="translate(25, 100)">
        <rect width="130" height="50" rx="8" fill="white" stroke="#E5E7EB" />
        <text x="15" y="20" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#9CA3AF">TOTAL INTERVIEWS</text>
        <text x="15" y="40" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="#0A0F1E">3</text>
      </g>

      {/* Table Area */}
      <g transform="translate(25, 165)">
        {/* Row 1 - Completed */}
        <g transform="translate(0, 0)">
          <rect width="470" height="60" rx="10" fill="#F9FAFB" stroke="#E5E7EB" />
          <text x="15" y="25" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#0A0F1E">Senior Product Designer — Alex Morgan</text>
          <text x="15" y="42" fontFamily="system-ui, sans-serif" fontSize="9" fill="#6B7280">May 10, 2026 | 10:00-11:00 AM</text>
          
          <g transform="translate(260, 20)">
            <rect width="30" height="16" rx="8" fill="#00B67A" />
            <circle cx="22" cy="8" r="5" fill="white" />
            <text x="35" y="11" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280">AI BOT</text>
          </g>

          <g transform="translate(340, 20)">
            <rect width="65" height="16" rx="8" fill="#00B67A" fillOpacity="0.1" />
            <text x="32.5" y="11" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#00B67A" textAnchor="middle">● COMPLETED</text>
          </g>
          
          <text x="455" y="34" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#00B67A" textAnchor="end">VIEW AI REPORT</text>
        </g>

        {/* Row 2 - Upcoming */}
        <g transform="translate(0, 70)">
          <rect width="470" height="60" rx="10" fill="white" stroke="#E5E7EB" />
          <text x="15" y="25" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#0A0F1E">Senior Product Designer — Jordan Kim</text>
          <text x="15" y="42" fontFamily="system-ui, sans-serif" fontSize="9" fill="#6B7280">May 14, 2026 | 2:00-3:00 PM</text>
          
          <g transform="translate(260, 20)">
            <rect width="30" height="16" rx="8" fill="#00B67A" />
            <circle cx="22" cy="8" r="5" fill="white" />
            <text x="35" y="11" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280">AI BOT</text>
          </g>

          <g transform="translate(340, 20)">
            <rect width="70" height="16" rx="8" fill="#3B82F6" fillOpacity="0.1" />
            <text x="35" y="11" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#3B82F6" textAnchor="middle">● SCHEDULED</text>
          </g>
          
          <circle cx="445" cy="30" r="2" fill="#9CA3AF" /><circle cx="451" cy="30" r="2" fill="#9CA3AF" /><circle cx="457" cy="30" r="2" fill="#9CA3AF" />
        </g>

        {/* Row 3 - Pending */}
        <g transform="translate(0, 140)">
          <rect width="470" height="60" rx="10" fill="white" stroke="#E5E7EB" />
          <text x="15" y="25" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#0A0F1E">Senior Product Designer — Sam Rivera</text>
          <text x="15" y="42" fontFamily="system-ui, sans-serif" fontSize="9" fill="#6B7280">May 16, 2026 | 11:00-12:00 PM</text>
          
          <g transform="translate(260, 20)">
            <rect width="30" height="16" rx="8" fill="#9CA3AF" />
            <circle cx="8" cy="8" r="5" fill="white" />
            <text x="35" y="11" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280">AI BOT</text>
          </g>

          <g transform="translate(340, 20)">
            <rect width="60" height="16" rx="8" fill="#9CA3AF" fillOpacity="0.1" />
            <text x="30" y="11" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280" textAnchor="middle">⏳ PENDING</text>
          </g>
          
          <circle cx="445" cy="30" r="2" fill="#9CA3AF" /><circle cx="451" cy="30" r="2" fill="#9CA3AF" /><circle cx="457" cy="30" r="2" fill="#9CA3AF" />
        </g>
      </g>

      {/* Multi-step indicator */}
      <g transform="translate(25, 390)">
        <text x="0" y="0" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#6B7280">Interview Pipeline — Senior Product Designer</text>
        <g transform="translate(0, 15)">
          <rect width="80" height="20" rx="10" fill="#00B67A" />
          <text x="40" y="13" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">● SCREENING</text>
          
          <line x1="85" y1="10" x2="100" y2="10" stroke="#E5E7EB" strokeWidth="1.5" />
          
          <rect x="105" y="0" width="80" height="20" rx="10" fill="#00B67A" />
          <text x="145" y="13" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="bold" fill="white" textAnchor="middle">● TECHNICAL</text>

          <line x1="190" y1="10" x2="205" y2="10" stroke="#E5E7EB" strokeWidth="1.5" />

          <rect x="210" y="0" width="70" height="20" rx="10" fill="white" stroke="#E5E7EB" />
          <text x="245" y="13" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">○ CULTURE</text>

          <line x1="285" y1="10" x2="300" y2="10" stroke="#E5E7EB" strokeWidth="1.5" />

          <rect x="305" y="0" width="60" height="20" rx="10" fill="white" stroke="#E5E7EB" />
          <text x="335" y="13" fontFamily="system-ui, sans-serif" fontSize="7" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">○ FINAL</text>
        </g>
      </g>
    </svg>
  );
};

export default InterviewHubMockup;
