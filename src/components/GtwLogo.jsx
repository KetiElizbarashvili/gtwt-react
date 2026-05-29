export function GtwLogo({ size = 'sidebar' }) {
  if (size === 'large') {
    return (
      <svg width="160" height="72" viewBox="0 0 160 72" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', margin: '0 auto 4px' }}>
        <rect x="0" y="0" width="10" height="10" rx="2" fill="#C13DFF"/>
        <rect x="12" y="0" width="10" height="10" rx="2" fill="#FF0040"/>
        <text x="0" y="22" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="13" letterSpacing="3" fill="#FFFFFF">GLOBAL</text>
        <text x="0" y="40" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="13" letterSpacing="3" fill="#FFFFFF">TECH</text>
        <text x="0" y="58" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="13" letterSpacing="3" fill="#FFFFFF">WEEKEND</text>
        <text x="0" y="72" fontFamily="'Space Mono',monospace" fontWeight="400" fontSize="10" letterSpacing="4" fill="#00FDFF">TBILISI</text>
        <rect x="74" y="62" width="34" height="13" rx="6" fill="#C3FB1A"/>
        <text x="91" y="72" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="9" fill="#000016" textAnchor="middle">2026</text>
      </svg>
    )
  }
  return (
    <svg width="110" height="44" viewBox="0 0 110 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="7" height="7" rx="1.5" fill="#C13DFF"/>
      <rect x="9" y="0" width="7" height="7" rx="1.5" fill="#FF0040"/>
      <text x="0" y="18" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="8.5" letterSpacing="2" fill="#FFFFFF">GLOBAL</text>
      <text x="0" y="28" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="8.5" letterSpacing="2" fill="#FFFFFF">TECH</text>
      <text x="0" y="38" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="8.5" letterSpacing="2" fill="#FFFFFF">WEEKEND</text>
      <text x="0" y="44" fontFamily="'Space Mono',monospace" fontSize="6.5" letterSpacing="3" fill="#00FDFF">TBILISI</text>
      <rect x="52" y="37" width="22" height="9" rx="4" fill="#C3FB1A"/>
      <text x="63" y="44" fontFamily="'Space Mono',monospace" fontWeight="700" fontSize="6" fill="#000016" textAnchor="middle">2026</text>
    </svg>
  )
}
