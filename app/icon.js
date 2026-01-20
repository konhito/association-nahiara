import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Icon generation - simplified flower logo
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          style={{ display: 'flex' }}
        >
          {/* Flower petals - golden */}
          <circle cx="50" cy="30" r="18" fill="#D4AF34" />
          <circle cx="70" cy="50" r="18" fill="#D4AF34" />
          <circle cx="50" cy="70" r="18" fill="#D4AF34" />
          <circle cx="30" cy="50" r="18" fill="#D4AF34" />
          {/* Center - green */}
          <circle cx="50" cy="50" r="14" fill="#ffffff" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
