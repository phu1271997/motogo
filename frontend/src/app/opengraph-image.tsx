import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MotoGo — motorbike insurance that pays out in 90 seconds';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Rendered at request time by Satori, which supports only a subset of CSS —
 * every element needs an explicit display, and gradients go on backgroundImage.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#080b14',
          // Satori supports only the plain linear-gradient syntax — the sized,
          // positioned radial-gradient the site CSS uses fails to parse here.
          backgroundImage:
            'linear-gradient(135deg, rgba(74,222,128,0.16) 0%, rgba(8,11,20,0) 48%, rgba(56,189,248,0.10) 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '44px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://motogo-insurance.vercel.app/logo.png" width="84" height="84" alt="" />
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color: '#f1f5f9' }}>
            MotoGo
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 68,
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            maxWidth: '900px',
          }}
        >
          Motorbike insurance that pays out in 90 seconds
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: '#94a3b8', marginTop: '28px' }}>
          Four AI agents verify, estimate and judge — payout settles on-chain.
        </div>

        <div style={{ display: 'flex', gap: '14px', marginTop: '52px' }}>
          {['Ethereum Sepolia', 'Chainlink', 'Claude Vision'].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#4ade80',
                border: '1px solid rgba(74,222,128,0.35)',
                borderRadius: '999px',
                padding: '10px 22px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
