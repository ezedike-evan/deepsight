'use client';

import { INDICATORS } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from '@/components/ui/icons';

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
  const hasActive = activeIndicators.length > 0;

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={onToggle}
        className={`flex items-center gap-[5px] px-2 h-7 border-none rounded-[2px] text-[10px] tracking-[0.04em] cursor-pointer transition-colors duration-100 ${
          isOpen ? 'bg-bg-dim' : 'bg-transparent'
        } ${hasActive ? 'text-text-primary' : 'text-text-muted'} hover:text-text-secondary`}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <polyline points="1,11 4,5 7,8 10,3 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="1" y1="13" x2="13" y2="13" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
        </svg>
        Indicators
        {hasActive && (
          <span className="bg-primary/20 text-primary text-[8px] font-bold px-1 rounded-[2px]">
            {activeIndicators.length}
          </span>
        )}
        <ChevronDown />
      </button>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 bg-bg-panel rounded-[7px] z-[200] overflow-hidden"
          style={{ minWidth: '140px', border: '1px solid #1a1a1a' }}
        >
          {INDICATORS.map((ind) => {
            const active = activeIndicators.includes(ind);
            return (
              <button
                key={ind}
                onClick={() => onToggleIndicator(ind)}
                className={`flex items-center gap-2 w-full text-left py-[7px] px-3 bg-transparent border-none cursor-pointer text-[11px] transition-colors duration-100 hover:bg-bg-dim ${
                  active ? 'text-primary' : 'text-text-primary'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-[1px] flex-shrink-0 transition-all duration-100 ${
                    active ? 'bg-primary border-primary' : 'bg-transparent border-[#333]'
                  }`}
                  style={{ border: `1px solid ${active ? 'currentColor' : '#333'}` }}
                />
                {ind}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
