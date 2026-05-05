import React from 'react';

interface InterviewMockupProps {
  status?: 'reject' | 'advance';
}

const InterviewMockup = ({ status = 'advance' }: InterviewMockupProps) => {
  const isReject = status === 'reject';
  
  // Data based on Fix 2 and Fix 3
  const candidateName = "Alex Morgan";
  const jobTitle = "Senior Product Designer";
  const resumeScore = isReject ? 72 : 72;
  const interviewScore = isReject ? 28 : 61;
  const combinedScore = isReject ? 45 : 67;
  
  const communication = isReject ? 20 : 75;
  const technical = isReject ? 10 : 58;
  const cultureFit = isReject ? 15 : 70;
  const jobMatch = isReject ? "45%" : "85%";

  return (
    <svg width="500" height="520" viewBox="0 0 500 520" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto drop-shadow-2xl">
      {/* Outer Shell */}
      <rect width="500" height="520" rx="12" fill="white" />
      <rect x="0.5" y="0.5" width="499" height="519" rx="11.5" stroke="#E5E7EB" />

      {/* Header */}
      <text x="30" y="45" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="bold" fill="#0A0F1E">Candidate Profile</text>
      <text x="30" y="65" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#9CA3AF" letterSpacing="0.05em">APPLICATION DEEP-DIVE</text>

      {/* Name and Job */}
      <text x="30" y="95" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="bold" fill="#0A0F1E">{candidateName}</text>
      <text x="30" y="110" fontFamily="system-ui, sans-serif" fontSize="10" fill="#6B7280">{jobTitle}</text>

      {/* Score Section */}
      <g transform="translate(30, 130)">
        <rect width="130" height="70" rx="8" stroke="#E5E7EB" fill="white" />
        <text x="65" y="25" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">RESUME</text>
        <text x="65" y="55" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="bold" fill="#0A0F1E" textAnchor="middle">{resumeScore}</text>

        <rect x="150" y="0" width="130" height="70" rx="8" stroke="#E5E7EB" fill="white" />
        <text x="215" y="25" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#9CA3AF" textAnchor="middle">INTERVIEW</text>
        <text x="215" y="55" fontFamily="system-ui, sans-serif" fontSize="24" fontWeight="bold" fill="#0A0F1E" textAnchor="middle">{interviewScore}</text>

        <rect x="300" y="0" width="140" height="70" rx="8" fill={isReject ? "#EF4444" : "#00B67A"} />
        <text x="370" y="25" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="white" fillOpacity="0.8" textAnchor="middle">COMBINED</text>
        <text x="370" y="55" fontFamily="system-ui, sans-serif" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle">{combinedScore}</text>
      </g>

      {/* Sub Scores Row */}
      <g transform="translate(30, 220)">
        {[
          { label: 'COMMUNICATION', val: communication },
          { label: 'TECHNICAL', val: technical },
          { label: 'CULTURE FIT', val: cultureFit }
        ].map((item, i) => (
          <g key={i} transform={`translate(${i * 150}, 0)`}>
            <rect width="140" height="40" rx="6" fill="#F9FAFB" stroke="#E5E7EB" />
            <text x="10" y="25" fontFamily="system-ui, sans-serif" fontSize="8" fontWeight="bold" fill="#6B7280">{item.label}</text>
            <text x="130" y="25" fontFamily="system-ui, sans-serif" fontSize="12" fontWeight="bold" fill="#0A0F1E" textAnchor="end">{item.val}</text>
          </g>
        ))}
      </g>

      {/* Job Match Bar */}
      <g transform="translate(30, 280)">
        <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill="#0A0F1E">JOB MATCH</text>
        <text x="440" y="10" fontFamily="system-ui, sans-serif" fontSize="10" fontWeight="bold" fill={isReject ? "#EF4444" : "#00B67A"} textAnchor="end">{jobMatch}</text>
        <rect y="20" width="440" height="8" rx="4" fill="#F3F4F6" />
        <rect y="20" width={isReject ? 198 : 374} height="8" rx="4" fill={isReject ? "#EF4444" : "#00B67A"} />
      </g>

      {/* Requirements */}
      <g transform="translate(30, 325)">
        <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#00B67A" letterSpacing="0.05em">REQUIREMENTS MET</text>
        <g transform="translate(0, 25)">
          <text x="0" y="0" fontFamily="system-ui, sans-serif" fontSize="10" fill="#4B5563">✓ 5+ years product design experience</text>
          <text x="0" y="20" fontFamily="system-ui, sans-serif" fontSize="10" fill="#4B5563">✓ SaaS product portfolio</text>
          <text x="0" y="40" fontFamily="system-ui, sans-serif" fontSize="10" fill="#4B5563">✓ Figma proficiency</text>
        </g>

        <text x="240" y="10" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#EF4444" letterSpacing="0.05em">MISSING</text>
        <g transform="translate(240, 25)">
          <text x="0" y="0" fontFamily="system-ui, sans-serif" fontSize="10" fill="#4B5563">✗ Motion design experience</text>
          <text x="0" y="20" fontFamily="system-ui, sans-serif" fontSize="10" fill="#4B5563">✗ B2B enterprise background</text>
        </g>
      </g>

      {/* Action Button */}
      <g transform="translate(250, 405)">
        <rect x="-60" y="0" width="120" height="32" rx="16" fill={isReject ? "#D00000" : "#00B67A"} />
        <text x="0" y="20" fontFamily="system-ui, sans-serif" fontSize="11" fontWeight="bold" fill="white" textAnchor="middle">{isReject ? "REJECT" : "ADVANCE"}</text>
        <text x="0" y="50" fontFamily="system-ui, sans-serif" fontSize="9" fill="#9CA3AF" textAnchor="middle">
          {isReject 
            ? "Combined score is below hiring threshold and interview revealed critical red flags." 
            : "AI Recommendation: Candidate exceeds target threshold for technical and culture fit."}
        </text>
      </g>

      {/* AI Reasoning Section */}
      <g transform="translate(30, 465)">
        <text x="0" y="10" fontFamily="system-ui, sans-serif" fontSize="9" fontWeight="bold" fill="#00B67A" letterSpacing="0.05em">INTERVIEW INTELLIGENCE</text>
        <rect y="20" width="440" height="35" rx="6" fill="#F9FAFB" stroke="#E5E7EB" />
        <text x="10" y="42" fontFamily="system-ui, sans-serif" fontSize="9" fill="#4B5563">
          {isReject 
            ? "Alex lacks relevant SaaS experience and failed the technical assessment on design systems."
            : "Alex demonstrates deep expertise in Figma and has a proven track record of building SaaS products."}
        </text>
      </g>
    </svg>
  );
};

export default InterviewMockup;
