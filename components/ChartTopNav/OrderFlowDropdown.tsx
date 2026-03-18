'use client';

import { ORDER_FLOW_TOOLS } from './constants';
import { MenuKey } from './types';
import { ChevronDown } from '@/components/ui/icons';

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
  const hasActive = activeCount > 0;

  return (
    <div className="relative flex-shrink-0">
      <button
        onClick={onToggle}
        className={`flex items-center gap-[5px] px-2 h-7 border-none rounded-[2px] text-[10px] tracking-[0.04em] cursor-pointer transition-colors duration-100 ${
          isOpen ? 'bg-bg-dim' : 'bg-transparent'
        } ${hasActive ? 'text-text-primary' : 'text-text-muted'} hover:text-text-secondary`}
      >
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="4" width="3" height="9" fill="currentColor" opacity="0.5"/>
          <rect x="5.5" y="2" width="3" height="11" fill="currentColor" opacity="0.7"/>
          <rect x="10" y="5" width="3" height="8" fill="currentColor" opacity="0.5"/>
        </svg>
        Order Flow
        {hasActive && (
          <span className="bg-primary/20 text-primary text-[8px] font-bold px-1 rounded-[2px]">
            {activeCount}
          </span>
        )}
        <ChevronDown />
      </button>

      {isOpen && (
        <div
          className="absolute top-[calc(100%+4px)] left-0 bg-bg-panel rounded-[7px] z-[200] overflow-hidden"
          style={{ minWidth: '160px', border: '1px solid #1a1a1a' }}
        >
          {ORDER_FLOW_TOOLS.map((tool) => {
            const active = activeOFTools.includes(tool);
            return (
              <button
                key={tool}
                onClick={() => onToggleOFTool(tool)}
                className={`flex items-center gap-2 w-full text-left py-[7px] px-3 bg-transparent border-none cursor-pointer text-[11px] transition-colors duration-100 hover:bg-bg-dim ${
                  active ? 'text-primary' : 'text-text-primary'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-[1px] flex-shrink-0 transition-all duration-100 ${
                    active ? 'bg-primary' : 'bg-transparent'
                  }`}
                  style={{ border: `1px solid ${active ? 'currentColor' : '#333'}` }}
                />
                {tool}
              </button>
            );
          })}

          <div className="h-px bg-bg-dim my-0.5" />

          <button
            onClick={() => { onToggleTape(); onClose(); }}
            className={`flex items-center justify-between w-full py-[7px] px-3 border-none cursor-pointer text-[11px] tracking-[0.04em] transition-colors duration-100 hover:bg-bg-dim ${
              tapePanelOpen ? 'bg-primary/5 text-primary' : 'bg-transparent text-text-primary'
            }`}
          >
            READ THE TAPE
            <span className={tapePanelOpen ? 'text-primary' : 'text-text-muted'}>→</span>
          </button>
        </div>
      )}
    </div>
  );
}
