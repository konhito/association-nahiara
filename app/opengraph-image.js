import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'International Association for the Defense of Flowers - Proveneya & Nahiara';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
        }}
      >
        {/* Logo placeholder - stylized flower */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '150px',
            height: '150px',
            marginBottom: '30px',
          }}
        >
          <svg
            width="150"
            height="150"
            viewBox="0 0 100 100"
            style={{ display: 'flex' }}
          >
            {/* Flower petals */}
            <circle cx="50" cy="30" r="15" fill="#D4AF34" />
            <circle cx="70" cy="50" r="15" fill="#D4AF34" />
            <circle cx="50" cy="70" r="15" fill="#D4AF34" />
            <circle cx="30" cy="50" r="15" fill="#D4AF34" />
            {/* Center */}
            <circle cx="50" cy="50" r="12" fill="#478B48" />
            {/* Leaf */}
            <ellipse cx="75" cy="80" rx="15" ry="8" fill="#478B48" transform="rotate(-45, 75, 80)" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: '#1f2937',
            textAlign: 'center',
            marginBottom: '15px',
            maxWidth: '900px',
            lineHeight: 1.2,
          }}
        >
          International Association for the Defense of Flowers
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            color: '#15803d',
            textAlign: 'center',
            marginBottom: '20px',
          }}
        >
          Proveneya & Nahiara
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 24,
            color: '#4b5563',
            textAlign: 'center',
            fontStyle: 'italic',
            maxWidth: '800px',
          }}
        >
          Where humanity blooms, nature is reborn.
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>🌍 195 National Flowers</span>
            <span>•</span>
            <span>📚 Literary Saga</span>
            <span>•</span>
            <span>🌸 Conservation</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
