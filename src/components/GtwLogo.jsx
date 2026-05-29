/**
 * GtwLogo — uses the real GTW wordmark extracted directly from gtwt.ge
 * viewBox: 0 0 111.618 39.962 (white GTW + cyan TBILISI + violet 20/26)
 *
 * size="large"   → 224×80px  (login page, centered)
 * size="sidebar" → 112×40px  (sidebar, pixel-perfect at native resolution)
 */
export function GtwLogo({ size = 'sidebar' }) {
  const isLarge = size === 'large'
  return (
    <img
      src="/gtw-logo.svg"
      alt="GTW Tbilisi 2026"
      width={isLarge ? 224 : 112}
      height={isLarge ? 80 : 40}
      style={{
        display: 'block',
        imageRendering: 'pixelated',
        ...(isLarge ? { margin: '0 auto 4px' } : {}),
      }}
    />
  )
}
