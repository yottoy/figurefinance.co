import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FigureFinance - Free Financial Calculators';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#1e293b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            FigureFinance
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 400,
              color: '#94a3b8',
              letterSpacing: '0px',
              lineHeight: 1,
            }}
          >
            Free Financial Calculators
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
