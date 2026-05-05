import React from 'react';

export function PricingComparison({
  competitorName,
  competitorMonthly,
  competitorAnnual,
  savings
}) {
  return (
    <div style={{
      background: '#F0FDF8',
      border: '1px solid #A7F3D0',
      borderRadius: '12px',
      padding: '24px',
      margin: '32px 0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h3 style={{
        color: '#065F46',
        marginBottom: '16px',
        fontSize: '18px',
        fontWeight: 700
      }}>
        The real annual cost comparison
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
          <thead>
            <tr>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #A7F3D0' }}></th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #A7F3D0', color: '#374151', fontSize: '14px' }}>{competitorName}</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #A7F3D0', color: '#00B67A', fontSize: '14px', fontWeight: 700 }}>
                HireNP
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>Monthly cost</td>
              <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: '#4B5563' }}>{competitorMonthly}/mo</td>
              <td style={{ padding: '12px', textAlign: 'center', color: '#00B67A', fontWeight: 700, fontSize: '14px' }}>
                $299/30 days
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>Months you actually pay</td>
              <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: '#4B5563' }}>12 (required)</td>
              <td style={{ padding: '12px', textAlign: 'center', color: '#00B67A', fontWeight: 700, fontSize: '14px' }}>
                4 (only when hiring)
              </td>
            </tr>
            <tr>
              <td style={{ padding: '12px', fontSize: '14px', color: '#374151' }}>Annual cost</td>
              <td style={{ padding: '12px', textAlign: 'center', fontSize: '14px', color: '#4B5563' }}>{competitorAnnual}</td>
              <td style={{ padding: '12px', textAlign: 'center', color: '#00B67A', fontWeight: 700, fontSize: '14px' }}>
                $1,196
              </td>
            </tr>
            <tr style={{ background: '#ECFDF5' }}>
              <td style={{ padding: '12px', fontWeight: 700, fontSize: '14px', color: '#065F46' }}>
                Annual savings with HireNP
              </td>
              <td style={{ padding: '12px', textAlign: 'center', color: '#6B7280' }}>—</td>
              <td style={{ padding: '12px', textAlign: 'center', color: '#00B67A', fontWeight: 700, fontSize: '18px' }}>
                {savings}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
