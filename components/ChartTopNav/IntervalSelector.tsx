'use client';

import { useState } from 'react';
import { INTERVAL_GROUPS, DEFAULT_STARRED, INTERVAL_FULL_NAME } from './constants';
import { MenuKey } from './types';
import { ChevronUp, ChevronDown, StarIcon } from '@/components/ui/icons';

const STARRED_KEY = 'deepsight:starred-intervals';

const CANONICAL_ORDER = INTERVAL_GROUPS.flatMap((g) => g.intervals);

function sortByCanonical(intervals: string[]): string[] {
  return [...intervals].sort(
    (a, b) => CANONICAL_ORDER.indexOf(a) - CANONICAL_ORDER.indexOf(b)
  );
}

function loadStarred(): string[] {
  if (typeof window === 'undefined') return DEFAULT_STARRED;
  try {
    const saved = localStorage.getItem(STARRED_KEY);
    return saved ? sortByCanonical(JSON.parse(saved)) : DEFAULT_STARRED;
  } catch {
    return DEFAULT_STARRED;
  }
}

function GridIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="7" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="7" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  );
}

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
  const [starred, setStarred] = useState<string[]>(loadStarred);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const panelOpen = openMenu === 'more-intervals';

  const toggleStar = (iv: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred((prev) => {
      const next = sortByCanonical(prev.includes(iv) ? prev.filter((s) => s !== iv) : [...prev, iv]);
      try { localStorage.setItem(STARRED_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggleCollapse = (label: string) => {
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const activeNotStarred = !starred.includes(activeInterval);

  return (
    <div className="flex items-center gap-px flex-shrink-0">
      {/* Starred intervals */}
      {starred.map((iv) => (
        <button
          key={iv}
          onClick={() => onIntervalChange(iv)}
          className={`py-[3px] px-[7px] h-7 border-none rounded-[2px] text-[10px] cursor-pointer tracking-[0.03em] transition-colors duration-100 ${
            activeInterval === iv
              ? 'bg-bg-dim text-primary font-bold'
              : 'bg-transparent text-text-primary font-normal hover:text-text-secondary'
          }`}
        >
          {iv}
        </button>
      ))}

      {/* Active interval if not starred */}
      {activeNotStarred && (
        <button
          onClick={() => {}}
          className="py-[3px] px-[7px] h-7 border-none rounded-[2px] text-[10px] cursor-default tracking-[0.03em] bg-bg-dim text-primary font-bold"
        >
          {activeInterval}
        </button>
      )}

      {/* Panel trigger */}
      <div className="relative">
        <button
          onClick={onToggleMore}
          className={`flex items-center justify-center w-7 h-7 border-none rounded-sm cursor-pointer transition-colors duration-100 ${
            panelOpen ? 'bg-bg-dim text-text-primary' : 'bg-transparent hover:bg-bg-dim text-text-primary'
          }`}
        >
          {panelOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {panelOpen && (
          <div
            className="absolute top-[calc(100%+4px)] left-0 bg-bg-panel rounded-[7px] z-[200] overflow-hidden"
            style={{ minWidth: '160px', border: '1px solid #1a1a1a' }}
          >
            {INTERVAL_GROUPS.map((group) => {
              const isCollapsed = !!collapsed[group.label];
              return (
                <div key={group.label}>
                  {/* Group header */}
                  <button
                    onClick={() => toggleCollapse(group.label)}
                    className="flex items-center justify-between w-full px-3 py-[2px] bg-transparent border-none cursor-pointer hover:bg-bg-dim transition-colors duration-100"
                  >
                    <span 
                    className='text-text-secondary font-normal uppercase tracking-wider text-[7px]'
                    >
                      {group.label}
                    </span>
                    <span className="text-text-primary">
                      {isCollapsed ? <ChevronDown /> : <ChevronUp />}
                    </span>
                  </button>

                  {/* Intervals */}
                  {!isCollapsed && group.intervals.map((iv) => {
                    const isActive  = activeInterval === iv;
                    const isStarred = starred.includes(iv);
                    return (
                      <div
                        key={iv}
                        className={`flex items-center justify-between px-3 transition-colors duration-100 ${
                          isActive ? 'bg-bg-dim' : 'hover:bg-bg-dim'
                        }`}
                        style={{ height: '30px' }}
                      >
                        <button
                          onClick={() => { onIntervalChange(iv); onCloseMore(); }}
                          className={`flex-1 text-left border-none bg-transparent cursor-pointer text-text-primary text-[11px] transition-colors duration-100 ${
                            isActive && 'font-bold'
                          }`}
                        >
                          {INTERVAL_FULL_NAME[iv] ?? iv}
                        </button>
                        <button
                          onClick={(e) => toggleStar(iv, e)}
                          className="flex items-center justify-center w-5 h-5 border-none bg-transparent cursor-pointer rounded-[2px] hover:bg-bg-base transition-colors duration-100"
                        >
                          <StarIcon filled={isStarred} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
