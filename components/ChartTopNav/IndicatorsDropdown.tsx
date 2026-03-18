'use client';

import { INDICATORS } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from './shared';

interface IndicatorsDropdownProps {
  activeIndicators:  string[];
  onToggleIndicator: (ind: string) => void;
  openMenu:          MenuKey;
  onToggle:          () => void;
}

export default function IndicatorsDropdown({
  activeIndicators, onToggleIndicator, openMenu, onToggle,
}: IndicatorsDropdownProps) {
  const isOpen = openMenu === 'indicators';

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 8px', height: '28px',
          background: isOpen ? '#161616' : 'transparent',
          border: 'none', borderRadius: '2px',
          color: activeIndicators.length > 0 ? '#ccc' : '#555',
          fontSize: '10px', cursor: 'pointer', transition: 'color 0.1s',
          letterSpacing: '0.04em',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#bbb'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = activeIndicators.length > 0 ? '#ccc' : '#555'; }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <polyline points="1,11 4,5 7,8 10,3 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="1" y1="13" x2="13" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        </svg>
        Indicators
        {activeIndicators.length > 0 && (
          <span style={{ background: '#e8a02033', color: '#e8a020', fontSize: '8px', padding: '0 4px', borderRadius: '2px', fontWeight: 700 }}>
            {activeIndicators.length}
          </span>
        )}
        <ChevronDown />
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '140px' }}>
          {INDICATORS.map((ind) => {
            const active = activeIndicators.includes(ind);
            return (
              <button
                key={ind}
                onClick={() => onToggleIndicator(ind)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  width: '100%', textAlign: 'left', padding: '7px 10px',
                  background: 'transparent', color: active ? '#e8a020' : '#555',
                  cursor: 'pointer', fontSize: '11px', transition: 'color 0.1s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0f0f0f'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                <span style={{ width: '8px', height: '8px', borderRadius: '1px', border: `1px solid ${active ? '#e8a020' : '#333'}`, background: active ? '#e8a020' : 'transparent', display: 'inline-block', flexShrink: 0, transition: 'all 0.1s' }} />
                {ind}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
