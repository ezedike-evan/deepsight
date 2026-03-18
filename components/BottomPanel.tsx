'use client';

import { useState } from 'react';
const TABS = ['FILLS', 'FUNDING', 'SESSION STATS'];
const FILLS = [
  {
    id: 1,
    time: '15:08:42',
    pair: 'SUI/USDC',
    side: 'BUY',
    type: 'LIMIT',
    price: '3.7420',
    qty: '1250',
    fee: '0.47',
    pnl: null,
    makerTaker: 'MAKER',
  },
  {
    id: 2,
    time: '14:51:17',
    pair: 'DEEP/USDC',
    side: 'SELL',
    type: 'MARKET',
    price: '0.2318',
    qty: '5000',
    fee: '1.16',
    pnl: null,
    makerTaker: 'TAKER',
  },
  {
    id: 3,
    time: '14:32:05',
    pair: 'SUI/USDC',
    side: 'SELL',
    type: 'LIMIT',
    price: '3.9100',
    qty: '800',
    fee: '0.31',
    pnl: '+$39.68',
    makerTaker: 'MAKER',
  },
  {
    id: 4,
    time: '13:44:28',
    pair: 'SUI/USDC',
    side: 'BUY',
    type: 'LIMIT',
    price: '3.8100',
    qty: '800',
    fee: '0.30',
    pnl: null,
    makerTaker: 'MAKER',
  },
  {
    id: 5,
    time: '12:21:03',
    pair: 'WETH/USDC',
    side: 'BUY',
    type: 'MARKET',
    price: '2841.20',
    qty: '0.5',
    fee: '0.71',
    pnl: null,
    makerTaker: 'TAKER',
  },
];

const FUNDING = [
  { time: '15:00:00', pair: 'SUI/USDC', rate: '0.0012%', payment: '+$0.15', positive: true },
  { time: '14:00:00', pair: 'SUI/USDC', rate: '0.0008%', payment: '+$0.10', positive: true },
  { time: '15:00:00', pair: 'DEEP/USDC', rate: '-0.0021%', payment: '-$0.24', positive: false },
  { time: '14:00:00', pair: 'DEEP/USDC', rate: '-0.0018%', payment: '-$0.21', positive: false },
];

const SESSION_STATS = {
  realized: '+$39.68',
  unrealized: '+$116.63',
  totalPnl: '+$156.31',
  totalPnlPositive: true,
  winRate: '67%',
  trades: 5,
  wins: 2,
  losses: 1,
  totalFees: '$2.95',
  volume: '$27,412.80',
  largestWin: '+$39.68',
  largestLoss: '—',
  avgWin: '+$39.68',
  avgLoss: '—',
};


const FILL_HEADERS = ['TIME', 'PAIR', 'SIDE', 'TYPE', 'PRICE', 'QTY', 'FEE', 'PNL', 'ROLE'];

export default function BottomPanel() {
  const [activeTab, setActiveTab] = useState('FILLS');

  return (
    <div className="h-[180px] border-t border-[#111] flex flex-col bg-[#020202] shrink-0">
      {/* Tab bar */}
      <div className="flex items-center border-b border-[#111] shrink-0 bg-[#030303]">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-[7px] px-[14px] bg-transparent border-none text-[9px] tracking-[0.08em] cursor-pointer border-b ${activeTab === tab ? 'text-amber border-amber font-bold' : 'text-text-muted border-transparent font-normal'}`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto px-3">
          <span className="text-[#222] text-[8px] tracking-[0.06em]">
            SESSION · {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto min-h-0">
        {activeTab === 'FILLS' && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#030303] sticky top-0">
                {FILL_HEADERS.map((h) => (
                  <th
                    key={h}
                    className="py-[5px] px-[10px] text-left text-[#2e2e2e] text-[8px] tracking-[0.08em] font-medium border-b border-[#0f0f0f] whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILLS.map((fill) => (
                <tr
                  key={fill.id}
                  className="border-b border-[#0a0a0a] hover:bg-bg-panel"
                >
                  <td className="py-[5px] px-[10px] text-[#3a3a3a] text-[10px] whitespace-nowrap">{fill.time}</td>
                  <td className="py-[5px] px-[10px] text-[#777] text-[10px] whitespace-nowrap">{fill.pair}</td>
                  <td className="py-[5px] px-[10px] text-[10px] whitespace-nowrap">
                    <span className={`font-bold ${fill.side === 'BUY' ? 'text-green' : 'text-red'}`}>{fill.side}</span>
                  </td>
                  <td className="py-[5px] px-[10px] text-text-muted text-[10px] whitespace-nowrap">{fill.type}</td>
                  <td className="py-[5px] px-[10px] text-text-secondary text-[10px] whitespace-nowrap">{fill.price}</td>
                  <td className="py-[5px] px-[10px] text-text-secondary text-[10px] whitespace-nowrap">{fill.qty}</td>
                  <td className="py-[5px] px-[10px] text-red text-[10px] whitespace-nowrap">${fill.fee}</td>
                  <td className="py-[5px] px-[10px] text-[10px] whitespace-nowrap">
                    {fill.pnl ? (
                      <span className="text-green font-bold">{fill.pnl}</span>
                    ) : (
                      <span className="text-[#2a2a2a]">—</span>
                    )}
                  </td>
                  <td className="py-[5px] px-[10px] whitespace-nowrap">
                    <span className={`py-[1px] px-1 rounded-[2px] text-[8px] border ${fill.makerTaker === 'MAKER' ? 'bg-[rgba(232,160,32,0.08)] text-amber border-[rgba(232,160,32,0.2)]' : 'bg-[rgba(100,100,100,0.08)] text-text-muted border-[#1e1e1e]'}`}>
                      {fill.makerTaker}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'FUNDING' && (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#030303] sticky top-0">
                {['TIME', 'PAIR', 'RATE', 'PAYMENT'].map((h) => (
                  <th
                    key={h}
                    className="py-[5px] px-[10px] text-left text-[#2e2e2e] text-[8px] tracking-[0.08em] font-medium border-b border-[#0f0f0f]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FUNDING.map((f, i) => (
                <tr key={i} className="border-b border-[#0a0a0a]">
                  <td className="py-[5px] px-[10px] text-[#3a3a3a] text-[10px]">{f.time}</td>
                  <td className="py-[5px] px-[10px] text-[#777] text-[10px]">{f.pair}</td>
                  <td className="py-[5px] px-[10px] text-[#666] text-[10px]">{f.rate}</td>
                  <td className={`py-[5px] px-[10px] text-[10px] font-bold ${f.positive ? 'text-green' : 'text-red'}`}>
                    {f.payment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'SESSION STATS' && (
          <div className="grid grid-cols-6 py-[10px] px-4">
            {[
              { label: 'REALIZED PNL', value: SESSION_STATS.realized, color: '#22c97a' },
              { label: 'UNREALIZED', value: SESSION_STATS.unrealized, color: '#22c97a' },
              { label: 'TOTAL PNL', value: SESSION_STATS.totalPnl, color: '#22c97a', bold: true },
              { label: 'WIN RATE', value: SESSION_STATS.winRate, color: '#e8a020' },
              { label: 'TRADES', value: `${SESSION_STATS.trades}`, color: '#888' },
              { label: 'TOTAL FEES', value: SESSION_STATS.totalFees, color: '#e83535' },
              { label: 'VOLUME', value: SESSION_STATS.volume, color: '#888' },
              { label: 'WINS', value: `${SESSION_STATS.wins}`, color: '#22c97a' },
              { label: 'LOSSES', value: `${SESSION_STATS.losses}`, color: '#e83535' },
              { label: 'AVG WIN', value: SESSION_STATS.avgWin, color: '#22c97a' },
              { label: 'AVG LOSS', value: SESSION_STATS.avgLoss, color: '#e83535' },
              { label: 'BEST TRADE', value: SESSION_STATS.largestWin, color: '#22c97a' },
            ].map(({ label, value, color, bold }) => (
              <div key={label} className="py-[6px] px-2 border-r border-[#0d0d0d]">
                <div className="text-[#2e2e2e] text-[8px] tracking-[0.08em] mb-1">{label}</div>
                <div style={{ color }} className={`text-xs ${bold ? 'font-bold' : 'font-medium'}`}>{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
