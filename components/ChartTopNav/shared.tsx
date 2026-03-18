import { useEffect } from 'react';

export function useOutsideClick(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onClose]);
}

export function Divider() {
  return <div style={{ width: '1px', height: '18px', background: '#181818', flexShrink: 0, margin: '0 6px' }} />;
}

export function ChevronDown({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 8 5" fill="none">
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
