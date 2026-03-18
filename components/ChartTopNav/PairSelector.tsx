'use client';

import { useState } from 'react';
import { PAIRS } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from './shared';

interface PairSelectorProps {
  openMenu:    MenuKey;
  onToggle:    () => void;
}

export default function PairSelector({ openMenu, onToggle }: PairSelectorProps) {
  const [selectedPair, setSelectedPair] = useState('SUI/USDC');
  const isOpen = openMenu === 'pair';

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          background: isOpen ? '#0e0e0e' : 'transparent',
          border: '1px solid', borderColor: isOpen ? '#e8a020' : '#1e1e1e',
          borderRadius: '2px', padding: '3px 8px',
          color: '#e8a020', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em',
          cursor: 'pointer', transition: 'all 0.12s',
        }}
      >
        <span className="live-indicator" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c97a', display: 'inline-block', flexShrink: 0 }} />
        {selectedPair}
        <ChevronDown />
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '130px' }}>
          {PAIRS.map((pair) => (
            <button
              key={pair}
              onClick={() => { setSelectedPair(pair); onToggle(); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px',
                background: pair === selectedPair ? '#0f0f0f' : 'transparent',
                color: pair === selectedPair ? '#e8a020' : '#555',
                borderLeft: pair === selectedPair ? '2px solid #e8a020' : '2px solid transparent',
                cursor: 'pointer', fontSize: '11px', letterSpacing: '0.04em', transition: 'color 0.1s',
              }}
              onMouseEnter={(e) => { if (pair !== selectedPair) (e.currentTarget as HTMLElement).style.color = '#888'; }}
              onMouseLeave={(e) => { if (pair !== selectedPair) (e.currentTarget as HTMLElement).style.color = '#555'; }}
            >
              {pair}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
