export function ChevronUp({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.625} viewBox="0 0 8 5" fill="none">
      <path d="M7 4L4 1L1 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function ChevronDown({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.625} viewBox="0 0 8 5" fill="none">
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill={filled ? '#e8a020' : 'none'} stroke={filled ? '#e8a020' : '#444'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
