import React from 'react';

const ApplicantsMockup = () => {
  const applicants = [
    { name: "Alex Morgan", initials: "AM", role: "Senior Product Designer", score: 94, status: "NEW", color: "#00B67A" },
    { name: "Jordan Kim", initials: "JK", role: "Senior Product Designer", score: 67, status: "REVIEW", color: "#F59E0B" },
    { name: "Sam Rivera", initials: "SR", role: "Senior Product Designer", score: 34, status: "WEAK", color: "#EF4444" }
  ];

  return (
    <svg width="580" height="360" viewBox="0 0 580 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      <rect width="580" height="360" rx="12" fill="white" />
      <rect x="0.5" y="0.5" width="579" height="359" rx="11.5" stroke="#E5E7EB" />

      {/* Header */}
      <text x="25" y="35" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="#0A0F1E">Applicants</text>
      
      {/* Filter Tabs Row */}
      <g transform="translate(25, 60)">
        {[
          { label: 'ALL', w: 50, active: true },
          { label: 'HIGH MATCH', w: 100 },
          { label: 'NEEDS SCHEDULING', w: 140 }
        ].map((item, i, arr) => {
          let xOffset = arr.slice(0, i).reduce((acc, curr) => acc + curr.w + 8, 0);
          return (
            <g key={i} transform={`translate(${xOffset}, 0)`}>
              <rect width={item.w} height="24" rx="12" fill={item.active ? "#0A0F1E" : "white"} stroke={item.active ? "none" : "#E5E7EB"} />
              <text x={item.w / 2} y="15" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill={item.active ? "white" : "#6B7280"} textAnchor="middle">{item.label}</text>
            </g>
          );
        })}
      </g>

      {/* Candidate Rows */}
      <g transform="translate(25, 105)">
        {applicants.map((app, i) => (
          <g key={i} transform={`translate(0, ${i * 75})`}>
            <rect width="530" height="65" rx="10" fill="white" stroke="#E5E7EB" />
            
            <circle cx="35" cy="32" r="18" fill={app.color} fillOpacity={app.initial === 'AM' ? 1 : 0.1} />
            <text x="35" y="37" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill={app.initial === 'AM' ? 'white' : app.color} textAnchor="middle">{app.initial}</text>
            
            <text x="65" y="28" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="bold" fill="#0A0F1E">{app.name}</text>
            <text x="65" y="42" fontFamily="system-ui, sans-serif" fontSize="9" fill="#9CA3AF">{app.role}</text>
            
            {/* Score Bar */}
            <g transform="translate(220, 28)">
              <rect width="120" height="6" rx="3" fill="#F3F4F6" />
              <rect width={1.2 * app.score} height="6" rx="3" fill={app.color} />
              <text x="130" y="7" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="#0A0F1E">{app.score}%</text>
            </g>

            <rect x="440" y="22" width="60" height="20" rx="10" fill={app.color} fillOpacity="0.1" />
            <text x="470" y="34" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill={app.color} textAnchor="middle">{app.status}</text>
          </g>
        ))}
      </g>
    </svg>
  );
};

export default ApplicantsMockup;
