import React from 'react'

export function ComparisonTable({ competitorName, categories }) {
  if (!categories || !Array.isArray(categories)) {
    return null;
  }
  // Flatten all rows to calculate wins
  const allRows = categories.flatMap(cat => cat.rows || []);
  const winsCount = allRows.filter(row => row.hirenp_wins).length;
  const totalCount = allRows.length;
  const competitorAdvantages = allRows.filter(row => row.competitor && (row.competitor.includes('✓') || row.competitor.includes('Massive')) && !row.hirenp_wins).length;

  return (
    <div style={{ margin: '32px 0' }}>
      {/* Wins Summary */}
      <div style={{
        background: '#ECFDF5',
        border: '1px solid #A7F3D0',
        borderRadius: '12px',
        padding: '16px 20px',
        marginBottom: '24px',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#00B67A' }}>
            {winsCount}/{totalCount}
          </span>
          <span style={{ fontSize: '13px', color: '#6B7280', marginLeft: '8px' }}>
            features where HireNP wins
          </span>
        </div>
        <div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#0A0F1E' }}>
            {competitorAdvantages}
          </span>
          <span style={{ fontSize: '13px', color: '#6B7280', marginLeft: '8px' }}>
            features where {competitorName} wins
          </span>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          minWidth: '600px'
        }}>
          <thead>
            <tr>
              <th style={{
                background: '#F9FAFB',
                padding: '14px 16px',
                textAlign: 'left',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#6B7280',
                borderBottom: '2px solid #E5E7EB',
                width: '35%'
              }}>
                Feature
              </th>
              <th style={{
                background: '#00B67A',
                padding: '14px 16px',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: 'white',
                borderBottom: '2px solid #00B67A',
                width: '32.5%'
              }}>
                HireNP ✦
              </th>
              <th style={{
                background: '#F9FAFB',
                padding: '14px 16px',
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: '#374151',
                borderBottom: '2px solid #E5E7EB',
                width: '32.5%'
              }}>
                {competitorName}
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, catIdx) => (
              <React.Fragment key={catIdx}>
                <tr style={{ background: '#0A0F1E' }}>
                  <td 
                    colSpan={3}
                    style={{
                      color: '#00B67A',
                      padding: '8px 16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    {category.category}
                  </td>
                </tr>
                {category.rows.map((row, i) => (
                  <tr key={i} style={{
                    background: row.hirenp_wins ? '#F0FDF8' : 'white',
                    borderBottom: '1px solid #F3F4F6'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#374151',
                      borderRight: '1px solid #F3F4F6'
                    }}>
                      {row.feature}
                      {row.note && (
                        <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 400, marginTop: '2px' }}>
                          {row.note}
                        </div>
                      )}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      background: row.hirenp_wins ? '#ECFDF5' : '#F9FAFB',
                      borderLeft: '2px solid #00B67A',
                      borderRight: '2px solid #00B67A',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#00B67A'
                    }}>
                      {row.hirenp}
                      {row.hirenp_wins && (
                        <span style={{
                          display: 'inline-block',
                          background: '#00B67A',
                          color: 'white',
                          fontSize: '9px',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '10px',
                          marginLeft: '6px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          verticalAlign: 'middle'
                        }}>
                          wins
                        </span>
                      )}
                    </td>
                    <td style={{
                      padding: '12px 16px',
                      textAlign: 'center',
                      fontSize: '13px',
                      color: '#6B7280'
                    }}>
                      {row.competitor}
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ background: '#00B67A', padding: '16px', textAlign: 'center' }}>
                <a 
                  href="https://app.hire-np.com/auth/login"
                  style={{
                    display: 'inline-block',
                    background: 'white',
                    color: '#00B67A',
                    fontWeight: 700,
                    fontSize: '14px',
                    padding: '10px 28px',
                    borderRadius: '24px',
                    textDecoration: 'none'
                  }}
                >
                  Try HireNP Free for 15 Days →
                </a>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
