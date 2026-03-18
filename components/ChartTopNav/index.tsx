'use client';

import { useRef } from 'react';
import { useState } from 'react';
import { ChartTopNavProps, MenuKey } from './types';
import { useOutsideClick, Divider } from './shared';
import UserMenu from './UserMenu';
import PairSelector from './PairSelector';
import IntervalSelector from './IntervalSelector';
import ChartTypeSelector from './ChartTypeSelector';
import IndicatorsDropdown from './IndicatorsDropdown';
import OrderFlowDropdown from './OrderFlowDropdown';
import { USER } from './constants';

export default function ChartTopNav({
  activeInterval, onIntervalChange,
  activeChartType, onChartTypeChange,
  activeIndicators, onToggleIndicator,
  activeOFTools, onToggleOFTool,
  tapePanelOpen, onToggleTape,
}: ChartTopNavProps) {
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const navRef = useRef<HTMLElement>(null);

  useOutsideClick(navRef, () => setOpenMenu(null));

  const toggle = (key: MenuKey) => setOpenMenu((prev) => (prev === key ? null : key));

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
      className="bg-bg-base"
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

      <PairSelector
        openMenu={openMenu}
        onToggle={() => toggle('pair')}
      />

      <Divider />

      <IntervalSelector
        activeInterval={activeInterval}
        onIntervalChange={onIntervalChange}
        openMenu={openMenu}
        onToggleMore={() => toggle('more-intervals')}
        onCloseMore={() => setOpenMenu(null)}
      />

      <Divider />

      <ChartTypeSelector
        activeChartType={activeChartType}
        onChartTypeChange={onChartTypeChange}
        openMenu={openMenu}
        onToggle={() => toggle('chart-type')}
        onClose={() => setOpenMenu(null)}
      />

      <Divider />

      <IndicatorsDropdown
        activeIndicators={activeIndicators}
        onToggleIndicator={onToggleIndicator}
        openMenu={openMenu}
        onToggle={() => toggle('indicators')}
      />

      <OrderFlowDropdown
        activeOFTools={activeOFTools}
        onToggleOFTool={onToggleOFTool}
        tapePanelOpen={tapePanelOpen}
        onToggleTape={onToggleTape}
        openMenu={openMenu}
        onToggle={() => toggle('order-flow')}
        onClose={() => setOpenMenu(null)}
      />

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
