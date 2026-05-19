import { ImageResponse } from 'next/og';

export const alt = 'HireNP — AI Hiring Software for Nepal & USA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FFFFFF',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '999px',
              background: '#00B67A',
            }}
          />
          <div
            style={{
              color: '#0F172A',
              fontSize: '22px',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            HireNP
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              color: '#00B67A',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
            }}
          >
            AI-native hiring intelligence
          </div>
          <div
            style={{
              color: '#0F172A',
              fontSize: '68px',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
              maxWidth: '960px',
            }}
          >
            AI Hiring Software for Nepal &amp; USA
          </div>
          <div
            style={{
              color: '#475569',
              fontSize: '24px',
              lineHeight: 1.4,
              maxWidth: '880px',
            }}
          >
            Screen candidates instantly. Analyze interviews with AI. Generate offer letters in one system.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #E2E8F0',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                background: '#00B67A',
                color: 'white',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Nepal · NPR 19,900/mo
            </div>
            <div
              style={{
                background: '#0F172A',
                color: 'white',
                padding: '10px 18px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              USA · $299/mo
            </div>
          </div>
          <div style={{ color: '#64748B', fontSize: '16px' }}>
            hire-np.com · 15-day free trial
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
