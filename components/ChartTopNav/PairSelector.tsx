'use client';

import { useState } from 'react';
import { PAIRS } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from './shared';

interface PairSelectorProps {
  openMenu: MenuKey;
  onToggle: () => void;
}

export default function PairSelector({ openMenu, onToggle }: PairSelectorProps) {
  const [selectedPair, setSelectedPair] = useState('SUI/USDC');
  const isOpen = openMenu === 'pair';

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={onToggle}
        className='flex items-center gap-[5px] rounded-[5px] py-[3px] px-2 text-text-primary text-[12px] font-bold tracking-[0.04em] cursor-pointer transition-all duration-[120ms] bg-bg-dim'
      >
        {selectedPair}
        <ChevronDown />
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 bg-[#080808] border border-[#1e1e1e] rounded-[2px] overflow-hidden z-[200] min-w-[130px]">
          {PAIRS.map((pair) => (
            <button
              key={pair}
              onClick={() => { setSelectedPair(pair); onToggle(); }}
              className={`block w-full text-left py-[7px] px-[10px] cursor-pointer text-[11px] tracking-[0.04em] transition-colors duration-100 border-l-2 ${
                pair === selectedPair
                  ? 'bg-[#0f0f0f] text-[#e8a020] border-l-[#e8a020]'
                  : 'bg-transparent text-[#555] border-l-transparent hover:text-[#888]'
              }`}
            >
              {pair}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
