'use client';

import { useState } from 'react';

const TABS = ['POSITIONS', 'ORDERS', 'HISTORY'];

const POSITIONS = [
  {
    id: 1,
    pair: 'SUI/USDC',
    side: 'LONG',
    size: '1,250',
    entryPrice: '3.7420',
    markPrice: '3.8241',
    pnl: '+$102.63',
    pnlPct: '+2.20%',
    positive: true,
    leverage: '5x',
    liqPrice: '3.2100',
  },
  {
    id: 2,
    pair: 'DEEP/USDC',
    side: 'SHORT',
    size: '5,000',
    entryPrice: '0.2318',
    markPrice: '0.2290',
    pnl: '+$14.00',
    pnlPct: '+1.21%',
    positive: true,
    leverage: '3x',
    liqPrice: '0.2800',
  },
];

const OPEN_ORDERS = [
  {
    id: 1,
    pair: 'SUI/USDC',
    side: 'BUY',
    type: 'LIMIT',
    price: '3.7500',
    size: '500',
    filled: '0',
    total: '500',
  },
  {
    id: 2,
    pair: 'SUI/USDC',
    side: 'SELL',
    type: 'LIMIT',
    price: '3.9200',
    size: '800',
    filled: '0',
    total: '800',
  },
  {
    id: 3,
    pair: 'SUI/USDC',
    side: 'BUY',
    type: 'STOP',
    price: '3.6800',
    size: '1000',
    filled: '0',
    total: '1000',
  },
];

interface RightPanelProps {
  onOpenModal: (side: 'BUY' | 'SELL') => void;
}

export default function RightPanel({ onOpenModal }: RightPanelProps) {
  const [activeTab, setActiveTab] = useState('POSITIONS');

  return (
    <div className="w-[280px] shrink-0 border-l border-[#111] flex flex-col bg-[#020202] overflow-hidden">
      {/* Account Summary */}
      <div className="py-[10px] px-3 border-b border-[#111] bg-[#040404]">
        <div className="flex justify-between items-center mb-2">
          <span className="text-text-muted text-[9px] tracking-[0.1em]">ACCOUNT</span>
          <span className="text-amber text-[9px] tracking-[0.05em]">PAPER</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'EQUITY', value: '$10,247.38', color: '#d4d4d4' },
            { label: 'AVAIL.', value: '$7,843.12', color: '#d4d4d4' },
            { label: 'MARGIN', value: '$2,404.26', color: '#e8a020' },
            { label: 'UNREAL. PNL', value: '+$116.63', color: '#22c97a' },
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="text-[#333] text-[8px] tracking-[0.08em] mb-[2px]">{label}</div>
              <div style={{ color }} className="text-[11px] font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#111] bg-[#040404] shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-1 bg-transparent border-none text-[9px] tracking-[0.08em] cursor-pointer border-b ${activeTab === tab ? 'text-amber border-amber font-bold' : 'text-text-muted border-transparent font-normal'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-auto min-h-0">
        {activeTab === 'POSITIONS' && (
          <div>
            {POSITIONS.map((pos) => (
              <div
                key={pos.id}
                className="py-[10px] px-3 border-b border-[#111]"
              >
                <div className="flex justify-between mb-[6px]">
                  <div className="flex items-center gap-[6px]">
                    <span className="text-text-primary text-[11px] font-semibold">{pos.pair}</span>
                    <span className={`py-[1px] px-[5px] rounded-[2px] text-[8px] font-bold tracking-[0.05em] ${pos.side === 'LONG' ? 'bg-green-dim text-green' : 'bg-red-dim text-red'}`}>
                      {pos.side}
                    </span>
                    <span className="py-[1px] px-1 rounded-[2px] text-[8px] bg-amber-glow text-amber border border-amber-border">
                      {pos.leverage}
                    </span>
                  </div>
                  <span className={`text-xs font-bold ${pos.positive ? 'text-green' : 'text-red'}`}>
                    {pos.pnl}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1">
                  {[
                    { label: 'SIZE', value: pos.size },
                    { label: 'ENTRY', value: pos.entryPrice },
                    { label: 'MARK', value: pos.markPrice },
                    { label: 'LIQ.', value: pos.liqPrice, warn: true },
                    { label: 'PNL%', value: pos.pnlPct, colored: true, positive: pos.positive },
                  ].map(({ label, value, warn, colored, positive }) => (
                    <div key={label}>
                      <div className="text-[#333] text-[8px] tracking-[0.06em]">{label}</div>
                      <div className={`text-[10px] ${warn ? 'text-[#e8a02088]' : colored ? (positive ? 'text-green' : 'text-red') : 'text-text-secondary'}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-1 mt-2">
                  <button
                    className="flex-1 p-1 bg-transparent border border-[#222] rounded-[2px] text-[#555] text-[8px] cursor-pointer tracking-[0.05em]"
                  >
                    TP/SL
                  </button>
                  <button
                    className="flex-1 p-1 bg-red-dim border border-[rgba(232,53,53,0.2)] rounded-[2px] text-red text-[8px] cursor-pointer tracking-[0.05em]"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ORDERS' && (
          <div>
            <div className="grid grid-cols-4 py-[6px] px-3 border-b border-[#111]">
              {['SIDE', 'TYPE', 'PRICE', 'QTY'].map((h) => (
                <span key={h} className="text-[#333] text-[8px] tracking-[0.08em]">{h}</span>
              ))}
            </div>
            {OPEN_ORDERS.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-4 py-[7px] px-3 border-b border-[#0d0d0d] items-center"
              >
                <span className={`text-[9px] font-bold ${order.side === 'BUY' ? 'text-green' : 'text-red'}`}>
                  {order.side}
                </span>
                <span className="text-[#555] text-[9px]">{order.type}</span>
                <span className="text-[#999] text-[9px]">{order.price}</span>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary text-[9px]">{order.size}</span>
                  <button className="w-[14px] h-[14px] bg-transparent border-none text-[#333] cursor-pointer text-[10px] flex items-center justify-center p-0">
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="py-2 px-3 border-b border-[#111]">
              <button className="w-full py-[5px] bg-transparent border border-[#222] rounded-[2px] text-red text-[8px] tracking-[0.08em] cursor-pointer">
                CANCEL ALL ORDERS
              </button>
            </div>
          </div>
        )}

        {activeTab === 'HISTORY' && (
          <div className="py-5 px-3 text-center">
            <span className="text-[#333] text-[10px] tracking-[0.08em]">
              NO HISTORY IN SESSION
            </span>
          </div>
        )}
      </div>

      {/* BUY / SELL buttons */}
      <div className="p-[10px] border-t border-[#111] grid grid-cols-2 gap-[6px] bg-[#040404] shrink-0">
        <button
          onClick={() => onOpenModal('BUY')}
          className="p-3 border border-[rgba(34,201,122,0.4)] rounded-[3px] text-green text-[13px] font-bold tracking-[0.12em] cursor-pointer transition-all duration-150"
          style={{ background: 'linear-gradient(180deg, rgba(34,201,122,0.18) 0%, rgba(34,201,122,0.10) 100%)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(180deg, rgba(34,201,122,0.28) 0%, rgba(34,201,122,0.18) 100%)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(180deg, rgba(34,201,122,0.18) 0%, rgba(34,201,122,0.10) 100%)'; }}
        >
          BUY
        </button>
        <button
          onClick={() => onOpenModal('SELL')}
          className="p-3 border border-[rgba(232,53,53,0.4)] rounded-[3px] text-red text-[13px] font-bold tracking-[0.12em] cursor-pointer transition-all duration-150"
          style={{ background: 'linear-gradient(180deg, rgba(232,53,53,0.18) 0%, rgba(232,53,53,0.10) 100%)' }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(180deg, rgba(232,53,53,0.28) 0%, rgba(232,53,53,0.18) 100%)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(180deg, rgba(232,53,53,0.18) 0%, rgba(232,53,53,0.10) 100%)'; }}
        >
          SELL
        </button>
      </div>
    </div>
  );
}
