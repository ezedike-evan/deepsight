'use client';

import { ORDER_FLOW_TOOLS } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from './shared';

interface OrderFlowDropdownProps {
  activeOFTools:  string[];
  onToggleOFTool: (tool: string) => void;
  tapePanelOpen:  boolean;
  onToggleTape:   () => void;
  openMenu:       MenuKey;
  onToggle:       () => void;
  onClose:        () => void;
}

export default function OrderFlowDropdown({
  activeOFTools, onToggleOFTool, tapePanelOpen, onToggleTape,
  openMenu, onToggle, onClose,
}: OrderFlowDropdownProps) {
  const isOpen = openMenu === 'order-flow';
  const activeCount = activeOFTools.length + (tapePanelOpen ? 1 : 0);

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '4px 8px', height: '28px',
          background: isOpen ? '#161616' : 'transparent',
          border: 'none', borderRadius: '2px',
          color: activeCount > 0 ? '#ccc' : '#555',
          fontSize: '10px', cursor: 'pointer', transition: 'color 0.1s',
          letterSpacing: '0.04em',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#bbb'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = activeCount > 0 ? '#ccc' : '#555'; }}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="4" width="3" height="9" fill="currentColor" opacity="0.5"/>
          <rect x="5.5" y="2" width="3" height="11" fill="currentColor" opacity="0.7"/>
          <rect x="10" y="5" width="3" height="8" fill="currentColor" opacity="0.5"/>
        </svg>
        Order Flow
        {activeCount > 0 && (
          <span style={{ background: '#e8a02033', color: '#e8a020', fontSize: '8px', padding: '0 4px', borderRadius: '2px', fontWeight: 700 }}>
            {activeCount}
          </span>
        )}
        <ChevronDown />
      </button>

      {isOpen && (
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
            onClick={() => { onToggleTape(); onClose(); }}
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
  );
}
