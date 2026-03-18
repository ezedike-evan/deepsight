'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const PAIRS = ['SUI/USDC', 'DEEP/USDC', 'WETH/USDC', 'WBTC/USDC', 'NS/USDC'];

const INTERVALS_PRIMARY = ['1m', '5m', '15m', '1h', '4h', '1D'];
const INTERVALS_MORE   = ['30m', '2h', '3h', '12h', '1W'];

const CHART_TYPES = [
  {
    id: 'candle', label: 'Candles',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="3" y="4" width="3" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="4.5" y1="2" x2="4.5" y2="4" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="4.5" y1="10" x2="4.5" y2="12" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="8" y="3" width="3" height="5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="9.5" y1="1" x2="9.5" y2="3" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="9.5" y1="8" x2="9.5" y2="11" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'bar', label: 'Bars',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <line x1="4" y1="2" x2="4" y2="12" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="4" y1="5" x2="2" y2="5" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="4" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="10" y1="3" x2="10" y2="11" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="10" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="10" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'line', label: 'Line',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polyline points="1,11 4,7 7,9 10,4 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const INDICATORS   = ['VOL', 'EMA', 'MACD', 'RSI'];
const ORDER_FLOW_TOOLS = ['FOOTPRINT', 'VOL PROFILE', 'DELTA', 'OPV', 'HEATMAP'];

type MenuKey = 'user' | 'pair' | 'more-intervals' | 'chart-type' | 'indicators' | 'order-flow' | null;

const USER = { initials: 'DA', name: 'd_alchemist_trader', plan: 'PRO' };

function UserMenu({ onClose }: { onClose: () => void }) {
  const { isDark, toggleTheme } = useTheme();
  const [drawingsPanel, setDrawingsPanel] = useState(false);

  function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
    return (
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        style={{
          width: '34px', height: '18px', borderRadius: '9px', border: 'none', cursor: 'pointer',
          background: on ? '#e8a020' : '#2a2a2a', position: 'relative', transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <span style={{
          position: 'absolute', top: '2px', left: on ? '18px' : '2px',
          width: '14px', height: '14px', borderRadius: '50%', background: '#fff',
          transition: 'left 0.2s', display: 'block',
        }} />
      </button>
    );
  }

  const menuItems = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
      label: 'Dashboard',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
      label: 'Help Center',
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      ),
      label: "What's new",
      badge: '3',
    },
  ];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute top-[calc(100%+6px)] left-0 w-[240px] bg-[#0a0a0a] border border-[#1a1a1a] rounded z-[300] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
    >
      {/* Brand header */}
      <div className="pt-3 px-[14px] pb-[10px] border-b border-bg-hover">
        <span className="text-amber text-[11px] font-bold tracking-[0.16em]">DEEPSIGHT</span>
      </div>

      {/* User row */}
      <button
        className="w-full flex items-center gap-[10px] py-[10px] px-[14px] bg-transparent border-none cursor-pointer border-b border-bg-hover transition-colors duration-100 hover:bg-[#111]"
      >
        <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg, #e8a020, #a06010)' }}>
          <span className="text-black text-[11px] font-bold">{USER.initials}</span>
        </div>
        <div className="flex-1 text-left">
          <div className="text-text-primary text-[11px] font-semibold">{USER.name}</div>
          <div className="text-amber text-[8px] tracking-[0.1em] mt-[1px]">{USER.plan}</div>
        </div>
        <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
          <path d="M1 1l6 5-6 5" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Nav items */}
      <div className="py-1 border-b border-bg-hover">
        {menuItems.map(({ icon, label, badge }) => (
          <button
            key={label}
            className="w-full flex items-center gap-[10px] py-2 px-[14px] bg-transparent border-none text-text-secondary text-[11px] cursor-pointer transition-all duration-100 hover:bg-[#111] hover:text-[#ccc]"
          >
            <span className="text-text-muted shrink-0">{icon}</span>
            <span className="flex-1 text-left">{label}</span>
            {badge && (
              <span className="bg-red text-white text-[8px] font-bold py-[1px] px-[5px] rounded-lg">
                {badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Toggles + settings */}
      <div className="py-1 border-b border-bg-hover">
        {/* Dark theme */}
        <div className="flex items-center gap-[10px] py-2 px-[14px]">
          <span className="text-text-muted shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          </span>
          <span style={{ flex: 1, color: '#888', fontSize: '11px' }}>Dark theme</span>
          <Toggle on={isDark} onToggle={toggleTheme} />
        </div>
        {/* Drawings panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px' }}>
          <span style={{ color: '#444', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
            </svg>
          </span>
          <span style={{ flex: 1, color: '#888', fontSize: '11px' }}>Drawings panel</span>
          <Toggle on={drawingsPanel} onToggle={() => setDrawingsPanel((v) => !v)} />
        </div>
        {/* Keyboard shortcuts */}
        <button
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 14px', background: 'transparent', border: 'none',
            color: '#888', fontSize: '11px', cursor: 'pointer', transition: 'all 0.1s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#111'; (e.currentTarget as HTMLElement).style.color = '#ccc'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#888'; }}
        >
          <span style={{ color: '#444', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="10" x2="6" y2="10"/><line x1="10" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="14" y2="10"/><line x1="18" y1="10" x2="18" y2="10"/><line x1="6" y1="14" x2="18" y2="14"/>
            </svg>
          </span>
          <span style={{ flex: 1, textAlign: 'left' }}>Keyboard shortcuts</span>
          <span style={{ color: '#333', fontSize: '9px', letterSpacing: '0.04em' }}>Ctrl + /</span>
        </button>
      </div>

      {/* Sign out */}
      <div style={{ padding: '4px 0' }}>
        <button
          onClick={onClose}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
            padding: '9px 14px', background: 'transparent', border: 'none',
            color: '#e83535', fontSize: '11px', cursor: 'pointer', transition: 'background 0.1s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(232,53,53,0.06)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>
      </div>
    </div>
  );
}

interface TopNavProps {
  activeInterval:    string;
  onIntervalChange:  (iv: string) => void;
  activeChartType:   string;
  onChartTypeChange: (ct: string) => void;
  activeIndicators:  string[];
  onToggleIndicator: (ind: string) => void;
  activeOFTools:     string[];
  onToggleOFTool:    (tool: string) => void;
  tapePanelOpen:     boolean;
  onToggleTape:      () => void;
}

// Close dropdown when clicking outside
function useOutsideClick(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onClose]);
}

function Divider() {
  return <div style={{ width: '1px', height: '18px', background: '#181818', flexShrink: 0, margin: '0 6px' }} />;
}

function ChevronDown({ size = 8 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 8 5" fill="none">
      <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}

export default function TopNav({
  activeInterval, onIntervalChange,
  activeChartType, onChartTypeChange,
  activeIndicators, onToggleIndicator,
  activeOFTools, onToggleOFTool,
  tapePanelOpen, onToggleTape,
}: TopNavProps) {
  const [selectedPair, setSelectedPair] = useState('SUI/USDC');
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const navRef = useRef<HTMLElement>(null);

  useOutsideClick(navRef, () => setOpenMenu(null));

  const toggle = (key: MenuKey) => setOpenMenu((prev) => (prev === key ? null : key));

  const activeChartTypeObj = CHART_TYPES.find((ct) => ct.id === activeChartType) ?? CHART_TYPES[0];
  const allIntervals = [...INTERVALS_PRIMARY, ...INTERVALS_MORE];
  const isMoreInterval = INTERVALS_MORE.includes(activeInterval);

  return (
    <header
      ref={navRef}
      style={{
        height: '40px',
        borderBottom: '1px solid #111',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        flexShrink: 0,
        position: 'relative',
        zIndex: 50,
        gap: '0',
      }}
      className='bg-bg-base'
    >
      {/* User avatar → opens user menu */}
      <div style={{ position: 'relative', flexShrink: 0, marginRight: '4px' }}>
        <button
          onClick={() => toggle('user')}
          style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: openMenu === 'user'
              ? 'linear-gradient(135deg, #e8a020, #a06010)'
              : 'linear-gradient(135deg, #a06010, #6a3e08)',
            border: openMenu === 'user' ? '1px solid #e8a020' : '1px solid transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
          }}
        >
          <span style={{ color: '#000', fontSize: '10px', fontWeight: 700, letterSpacing: '0.02em' }}>
            {USER.initials}
          </span>
        </button>

        {openMenu === 'user' && <UserMenu onClose={() => setOpenMenu(null)} />}
      </div>

      <Divider />

      {/* Pair selector */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => toggle('pair')}
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            background: openMenu === 'pair' ? '#0e0e0e' : 'transparent',
            border: '1px solid', borderColor: openMenu === 'pair' ? '#e8a020' : '#1e1e1e',
            borderRadius: '2px', padding: '3px 8px',
            color: '#e8a020', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em',
            cursor: 'pointer', transition: 'all 0.12s',
          }}
        >
          <span className="live-indicator" style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c97a', display: 'inline-block', flexShrink: 0 }} />
          {selectedPair}
          <ChevronDown />
        </button>

        {openMenu === 'pair' && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '130px' }}>
            {PAIRS.map((pair) => (
              <button
                key={pair}
                onClick={() => { setSelectedPair(pair); setOpenMenu(null); }}
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

      <Divider />

      {/* Inline timeframes */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1px', flexShrink: 0 }}>
        {INTERVALS_PRIMARY.map((iv) => (
          <button
            key={iv}
            onClick={() => onIntervalChange(iv)}
            style={{
              padding: '3px 7px', height: '28px',
              background: activeInterval === iv ? '#161616' : 'transparent',
              border: 'none',
              borderRadius: '2px',
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
            onClick={() => toggle('more-intervals')}
            style={{
              display: 'flex', alignItems: 'center', gap: '3px',
              padding: '3px 6px', height: '28px',
              background: isMoreInterval || openMenu === 'more-intervals' ? '#161616' : 'transparent',
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

          {openMenu === 'more-intervals' && (
            <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '80px' }}>
              {INTERVALS_MORE.map((iv) => (
                <button
                  key={iv}
                  onClick={() => { onIntervalChange(iv); setOpenMenu(null); }}
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

      <Divider />

      {/* Chart type icon + dropdown */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => toggle('chart-type')}
          style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '4px 7px', height: '28px',
            background: openMenu === 'chart-type' ? '#161616' : 'transparent',
            border: 'none', borderRadius: '2px',
            color: '#888', cursor: 'pointer', transition: 'color 0.1s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#bbb'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#888'; }}
        >
          {activeChartTypeObj.icon}
          <ChevronDown />
        </button>

        {openMenu === 'chart-type' && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '110px' }}>
            {CHART_TYPES.map((ct) => (
              <button
                key={ct.id}
                onClick={() => { onChartTypeChange(ct.id); setOpenMenu(null); }}
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

      <Divider />

      {/* Indicators dropdown */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => toggle('indicators')}
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 8px', height: '28px',
            background: openMenu === 'indicators' ? '#161616' : 'transparent',
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

        {openMenu === 'indicators' && (
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

      {/* Order Flow dropdown */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <button
          onClick={() => toggle('order-flow')}
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '4px 8px', height: '28px',
            background: openMenu === 'order-flow' ? '#161616' : 'transparent',
            border: 'none', borderRadius: '2px',
            color: activeOFTools.length > 0 || tapePanelOpen ? '#ccc' : '#555',
            fontSize: '10px', cursor: 'pointer', transition: 'color 0.1s',
            letterSpacing: '0.04em',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#bbb'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = activeOFTools.length > 0 || tapePanelOpen ? '#ccc' : '#555'; }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="4" width="3" height="9" fill="currentColor" opacity="0.5"/>
            <rect x="5.5" y="2" width="3" height="11" fill="currentColor" opacity="0.7"/>
            <rect x="10" y="5" width="3" height="8" fill="currentColor" opacity="0.5"/>
          </svg>
          Order Flow
          {(activeOFTools.length > 0 || tapePanelOpen) && (
            <span style={{ background: '#e8a02033', color: '#e8a020', fontSize: '8px', padding: '0 4px', borderRadius: '2px', fontWeight: 700 }}>
              {activeOFTools.length + (tapePanelOpen ? 1 : 0)}
            </span>
          )}
          <ChevronDown />
        </button>

        {openMenu === 'order-flow' && (
          <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#080808', border: '1px solid #1e1e1e', borderRadius: '2px', overflow: 'hidden', zIndex: 200, minWidth: '160px' }}>
            {ORDER_FLOW_TOOLS.map((tool) => {
              const active = activeOFTools.includes(tool);
              return (
                <button
                  key={tool}
                  onClick={() => onToggleOFTool(tool)}
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
                  {tool}
                </button>
              );
            })}
            <div style={{ height: '1px', background: '#111', margin: '2px 0' }} />
            <button
              onClick={() => { onToggleTape(); setOpenMenu(null); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '7px 10px',
                background: tapePanelOpen ? 'rgba(232,160,32,0.06)' : 'transparent',
                color: tapePanelOpen ? '#e8a020' : '#555',
                cursor: 'pointer', fontSize: '11px', letterSpacing: '0.04em',
                transition: 'all 0.1s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#0f0f0f'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = tapePanelOpen ? 'rgba(232,160,32,0.06)' : 'transparent'; }}
            >
              READ THE TAPE
              <span style={{ color: tapePanelOpen ? '#e8a020' : '#333', fontSize: '10px' }}>→</span>
            </button>
          </div>
        )}
      </div>

      {/* Settings — pushed to right */}
      <button
        style={{
          marginLeft: 'auto',
          width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'transparent', border: 'none', borderRadius: '2px',
          color: '#333', cursor: 'pointer', transition: 'color 0.12s',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#666'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#333'; }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
        </svg>
      </button>
    </header>
  );
}
