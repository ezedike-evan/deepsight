'use client';

import { INTERVALS_PRIMARY, INTERVALS_MORE } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from './shared';

interface IntervalSelectorProps {
  activeInterval:   string;
  onIntervalChange: (iv: string) => void;
  openMenu:         MenuKey;
  onToggleMore:     () => void;
  onCloseMore:      () => void;
}

export default function IntervalSelector({
  activeInterval, onIntervalChange, openMenu, onToggleMore, onCloseMore,
}: IntervalSelectorProps) {
  const isMoreInterval = INTERVALS_MORE.includes(activeInterval);
  const moreOpen = openMenu === 'more-intervals';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1px', flexShrink: 0 }}>
      {INTERVALS_PRIMARY.map((iv) => (
        <button
          key={iv}
          onClick={() => onIntervalChange(iv)}
          style={{
            padding: '3px 7px', height: '28px',
            background: activeInterval === iv ? '#161616' : 'transparent',
            border: 'none', borderRadius: '2px',
            color: activeInterval === iv ? '#e8a020' : '#444',
            fontSize: '10px', cursor: 'pointer',
            letterSpacing: '0.03em', transition: 'color 0.1s',
            fontWeight: activeInterval === iv ? 700 : 400,
          }}
          onMouseEnter={(e) => { if (activeInterval !== iv) (e.currentTarget as HTMLElement).style.color = '#777'; }}
          onMouseLeave={(e) => { if (activeInterval !== iv) (e.currentTarget as HTMLElement).style.color = '#444'; }}
        >
          {iv}
        </button>
      ))}

      {/* More intervals dropdown */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={onToggleMore}
          style={{
            display: 'flex', alignItems: 'center', gap: '3px',
            padding: '3px 6px', height: '28px',
            background: isMoreInterval || moreOpen ? '#161616' : 'transparent',
            border: 'none', borderRadius: '2px',
            color: isMoreInterval ? '#e8a020' : '#444',
            fontSize: '10px', cursor: 'pointer', transition: 'color 0.1s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#777'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = isMoreInterval ? '#e8a020' : '#444'; }}
        >
          {isMoreInterval ? activeInterval : <ChevronDown />}
          {isMoreInterval && <ChevronDown />}
        </button>

        {moreOpen && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '80px' }}>
            {INTERVALS_MORE.map((iv) => (
              <button
                key={iv}
                onClick={() => { onIntervalChange(iv); onCloseMore(); }}
                style={{
                  display: 'block', width: '100%', textAlign: 'left', padding: '7px 12px',
                  background: activeInterval === iv ? '#161616' : 'transparent',
                  color: activeInterval === iv ? '#e8a020' : '#555',
                  cursor: 'pointer', fontSize: '11px', transition: 'color 0.1s',
                }}
                onMouseEnter={(e) => { if (activeInterval !== iv) (e.currentTarget as HTMLElement).style.color = '#888'; }}
                onMouseLeave={(e) => { if (activeInterval !== iv) (e.currentTarget as HTMLElement).style.color = '#555'; }}
              >
                {iv}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
