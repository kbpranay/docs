import { ImageResponse } from 'next/og'

export const alt = 'Enterprise Bot — Voice AI and quality assessment for contact centers'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Default share image for every page that has no image of its own. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#171547',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>Enterprise Bot</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 30, color: '#F87F22', fontWeight: 600, marginBottom: 18 }}>VOICE AI FOR CONTACT CENTERS</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Resolve the call.</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: '#F87F22' }}>Score the conversation.</div>
        </div>
        <div style={{ fontSize: 26, color: '#b8c4e0' }}>Added to Genesys, Microsoft Teams, Cisco, VIER and SIP telephony</div>
      </div>
    ),
    size,
  )
}
