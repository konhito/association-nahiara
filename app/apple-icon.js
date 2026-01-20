import { ImageResponse } from 'next/og';

// Apple touch icon metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Apple icon generation - larger flower logo for iOS home screen
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '36px',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          style={{ display: 'flex' }}
        >
          {/* Flower petals - golden */}
          <circle cx="50" cy="28" r="16" fill="#D4AF34" />
          <circle cx="72" cy="50" r="16" fill="#D4AF34" />
          <circle cx="50" cy="72" r="16" fill="#D4AF34" />
          <circle cx="28" cy="50" r="16" fill="#D4AF34" />
          {/* Center - green */}
          <circle cx="50" cy="50" r="12" fill="#478B48" />
          {/* Leaf */}
          <ellipse cx="78" cy="78" rx="12" ry="6" fill="#478B48" transform="rotate(-45, 78, 78)" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
