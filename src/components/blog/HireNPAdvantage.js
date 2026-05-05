import React from 'react'

export function HireNPAdvantage({ children }) {
  return (
    <div style={{
      background: '#ECFDF5',
      borderLeft: '4px solid #00B67A',
      borderRadius: '0 12px 12px 0',
      padding: '16px 20px',
      margin: '24px 0',
      fontSize: '14px',
      color: '#065F46',
      fontWeight: 500
    }}>
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#00B67A',
        marginBottom: '6px'
      }}>
        ✦ HireNP Advantage
      </div>
      {children}
    </div>
  )
}
