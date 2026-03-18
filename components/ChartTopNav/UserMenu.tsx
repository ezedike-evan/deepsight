'use client';

import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { USER } from './constants';

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

export default function UserMenu({ onClose }: { onClose: () => void }) {
  const { isDark, toggleTheme } = useTheme();
  const [drawingsPanel, setDrawingsPanel] = useState(false);

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
      <button className="w-full flex items-center gap-[10px] py-[10px] px-[14px] bg-transparent border-none cursor-pointer border-b border-bg-hover transition-colors duration-100 hover:bg-[#111]">
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
