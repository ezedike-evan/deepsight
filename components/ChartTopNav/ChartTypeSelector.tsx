'use client';

import { CHART_TYPES } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from './shared';

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
  const isOpen = openMenu === 'chart-type';
  const activeObj = CHART_TYPES.find((ct) => ct.id === activeChartType) ?? CHART_TYPES[0];

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: '4px',
          padding: '4px 7px', height: '28px',
          background: isOpen ? '#161616' : 'transparent',
          border: 'none', borderRadius: '2px',
          color: '#888', cursor: 'pointer', transition: 'color 0.1s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#bbb'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#888'; }}
      >
        {activeObj.icon}
        <ChevronDown />
      </button>

      {isOpen && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '110px' }}>
          {CHART_TYPES.map((ct) => (
            <button
              key={ct.id}
              onClick={() => { onChartTypeChange(ct.id); onClose(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                width: '100%', textAlign: 'left', padding: '7px 10px',
                background: activeChartType === ct.id ? '#161616' : 'transparent',
                color: activeChartType === ct.id ? '#e8a020' : '#555',
                cursor: 'pointer', fontSize: '11px', transition: 'color 0.1s',
                borderLeft: activeChartType === ct.id ? '2px solid #e8a020' : '2px solid transparent',
              }}
              onMouseEnter={(e) => { if (activeChartType !== ct.id) (e.currentTarget as HTMLElement).style.color = '#888'; }}
              onMouseLeave={(e) => { if (activeChartType !== ct.id) (e.currentTarget as HTMLElement).style.color = '#555'; }}
            >
              <span style={{ opacity: 0.7 }}>{ct.icon}</span>
              {ct.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
