'use client';

import { useState } from 'react';
import { CHART_TYPE_GROUPS, DEFAULT_STARRED_CHART_TYPES } from './constants';
import { MenuKey } from './types';
import { ChevronUp, ChevronDown, StarIcon } from '@/components/ui/icons';

const STARRED_KEY = 'deepsight:starred-chart-types';

const CANONICAL_CHART_ORDER = CHART_TYPE_GROUPS.flat().map((ct) => ct.id);

function sortByCanonical(ids: string[]): string[] {
  return [...ids].sort((a, b) => CANONICAL_CHART_ORDER.indexOf(a) - CANONICAL_CHART_ORDER.indexOf(b));
}

function loadStarred(): string[] {
  if (typeof window === 'undefined') return DEFAULT_STARRED_CHART_TYPES;
  try {
    const saved = localStorage.getItem(STARRED_KEY);
    return saved ? sortByCanonical(JSON.parse(saved)) : DEFAULT_STARRED_CHART_TYPES;
  } catch {
    return DEFAULT_STARRED_CHART_TYPES;
  }
}

function ListIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
      <line x1="0" y1="1" x2="12" y2="1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="0" y1="5" x2="12" y2="5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="0" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

interface ChartTypeSelectorProps {
  activeChartType:   string;
  onChartTypeChange: (ct: string) => void;
  openMenu:          MenuKey;
  onToggle:          () => void;
  onClose:           () => void;
}

export default function ChartTypeSelector({
  activeChartType, onChartTypeChange, openMenu, onToggle, onClose,
}: ChartTypeSelectorProps) {
  const [starred, setStarred] = useState<string[]>(loadStarred);
  const isOpen = openMenu === 'chart-type';

  const allTypes = CHART_TYPE_GROUPS.flat();
  const typeMap = Object.fromEntries(allTypes.map((ct) => [ct.id, ct]));

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarred((prev) => {
      const next = sortByCanonical(prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
      try { localStorage.setItem(STARRED_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const activeNotStarred = !starred.includes(activeChartType);
  const activeObj = typeMap[activeChartType];

  return (
    <div className="flex items-center gap-px flex-shrink-0">
      {/* Starred chart type buttons */}
      {starred.map((id) => {
        const ct = typeMap[id];
        if (!ct) return null;
        const isActive = activeChartType === id;
        return (
          <button
            key={id}
            onClick={() => onChartTypeChange(id)}
            title={ct.label}
            className={`flex items-center justify-center w-7 h-7 border-none rounded-[2px] cursor-pointer transition-colors duration-100 ${
              isActive
                ? 'bg-bg-dim text-primary'
                : 'bg-transparent text-text-primary hover:text-text-secondary'
            }`}
          >
            {ct.icon}
          </button>
        );
      })}

      {/* Active type if not starred */}
      {activeNotStarred && activeObj && (
        <button
          title={activeObj.label}
          className="flex items-center justify-center w-7 h-7 border-none rounded-[2px] cursor-default bg-bg-dim text-primary"
        >
          {activeObj.icon}
        </button>
      )}

      {/* Panel trigger */}
      <div className="relative">
        <button
          onClick={onToggle}
          className={`flex items-center justify-center w-7 h-7 border-none rounded-[2px] cursor-pointer transition-colors duration-100 ${
            isOpen ? 'bg-bg-dim text-text-primary' : 'bg-transparent text-text-primary hover:bg-bg-dim'
          }`}
        >
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {isOpen && (
          <div
            className="absolute top-[calc(100%+4px)] left-0 bg-bg-panel rounded-[7px] z-[200] overflow-hidden"
            style={{ minWidth: '200px', border: '1px solid #1a1a1a' }}
          >
            {CHART_TYPE_GROUPS.map((group, gi) => (
              <div key={gi}>
                {gi > 0 && <div className="h-px bg-bg-dim" />}
                {group.map((ct) => {
                  const isActive  = activeChartType === ct.id;
                  const isStarred = starred.includes(ct.id);
                  return (
                    <div
                      key={ct.id}
                      className={`flex items-center justify-between px-3 transition-colors duration-100 ${
                        isActive ? 'bg-bg-dim' : 'hover:bg-bg-dim'
                      }`}
                      style={{ height: '32px' }}
                    >
                      <button
                        onClick={() => { onChartTypeChange(ct.id); onClose(); }}
                        className={`flex items-center gap-2 flex-1 text-left border-none bg-transparent cursor-pointer text-[11px] transition-colors duration-100 ${
                          isActive ? 'text-primary font-bold' : 'text-text-primary hover:text-text-secondary'
                        }`}
                      >
                        <span className={isActive ? 'text-primary' : 'text-text-primary'}>{ct.icon}</span>
                        {ct.label}
                      </button>
                      <button
                        onClick={(e) => toggleStar(ct.id, e)}
                        className="flex items-center justify-center w-5 h-5 border-none bg-transparent cursor-pointer rounded-[2px] hover:bg-bg-base transition-colors duration-100"
                      >
                        <StarIcon filled={isStarred} />
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
