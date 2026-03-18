'use client';

import { useState } from 'react';

const DELTA_MODES = ['VOLUME DELTA', 'CUMULATIVE', 'FOOTPRINT'];

// Fake delta data for static display
const DELTA_BARS = [
  { time: '14:15', buyVol: 142300, sellVol: 98700, delta: 43600, positive: true },
  { time: '14:20', buyVol: 87200, sellVol: 134500, delta: -47300, positive: false },
  { time: '14:25', buyVol: 201000, sellVol: 165000, delta: 36000, positive: true },
  { time: '14:30', buyVol: 95400, sellVol: 112800, delta: -17400, positive: false },
  { time: '14:35', buyVol: 178900, sellVol: 145200, delta: 33700, positive: true },
  { time: '14:40', buyVol: 312000, sellVol: 289000, delta: 23000, positive: true },
  { time: '14:45', buyVol: 134700, sellVol: 198000, delta: -63300, positive: false },
  { time: '14:50', buyVol: 224500, sellVol: 189000, delta: 35500, positive: true },
  { time: '14:55', buyVol: 189200, sellVol: 245000, delta: -55800, positive: false },
  { time: '15:00', buyVol: 267000, sellVol: 198000, delta: 69000, positive: true },
  { time: '15:05', buyVol: 342000, sellVol: 287000, delta: 55000, positive: true },
  { time: '15:10', buyVol: 156000, sellVol: 221000, delta: -65000, positive: false },
];

const formatVol = (v: number) => {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return v.toString();
};

const maxAbsDelta = Math.max(...DELTA_BARS.map((b) => Math.abs(b.delta)));

export default function DeltaPanel() {
  const [activeMode, setActiveMode] = useState('VOLUME DELTA');

  const totalBuyVol = DELTA_BARS.reduce((s, b) => s + b.buyVol, 0);
  const totalSellVol = DELTA_BARS.reduce((s, b) => s + b.sellVol, 0);
  const netDelta = totalBuyVol - totalSellVol;
  const deltaPositive = netDelta >= 0;

  return (
    <div className="h-[120px] border-t border-[#111] flex flex-col bg-[#020202] shrink-0">
      {/* Header */}
      <div className="h-[26px] flex items-center px-[10px] border-b border-[#111] gap-4 shrink-0">
        <div className="flex gap-[2px]">
          {DELTA_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveMode(mode)}
              className={`py-[2px] px-[7px] bg-transparent border-none text-[9px] tracking-[0.06em] cursor-pointer border-b ${activeMode === mode ? 'text-amber border-amber' : 'text-[#333] border-transparent'}`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-4 items-center">
          <span className="text-[9px]">
            <span className="text-[#333]">BUY </span>
            <span className="text-green">{formatVol(totalBuyVol)}</span>
          </span>
          <span className="text-[9px]">
            <span className="text-[#333]">SELL </span>
            <span className="text-red">{formatVol(totalSellVol)}</span>
          </span>
          <span className="text-[9px]">
            <span className="text-[#333]">DELTA </span>
            <span className={`font-bold ${deltaPositive ? 'text-green' : 'text-red'}`}>
              {deltaPositive ? '+' : ''}{formatVol(netDelta)}
            </span>
          </span>
        </div>
      </div>

      {/* Delta bars */}
      <div className="flex-1 flex items-end py-1 px-[10px] gap-[3px] overflow-hidden">
        {DELTA_BARS.map((bar, i) => {
          const ratio = Math.abs(bar.delta) / maxAbsDelta;
          const maxBarHeight = 72;
          const barHeight = Math.max(4, ratio * maxBarHeight);
          const isLast = i === DELTA_BARS.length - 1;

          return (
            <div
              key={bar.time}
              className="flex-1 flex flex-col items-center gap-[2px] h-full justify-end"
            >
              {/* Delta bar */}
              <div
                className="w-full rounded-t-[1px] relative transition-[height] duration-300 ease-in-out"
                style={{
                  height: `${barHeight}px`,
                  background: bar.positive
                    ? `rgba(34,201,122,${isLast ? 0.9 : 0.35})`
                    : `rgba(232,53,53,${isLast ? 0.9 : 0.35})`,
                  borderTop: `1px solid ${bar.positive ? '#22c97a' : '#e83535'}`,
                }}
              >
                {isLast && (
                  <div
                    className={`absolute -top-[14px] left-1/2 -translate-x-1/2 text-[8px] whitespace-nowrap font-bold ${bar.positive ? 'text-green' : 'text-red'}`}
                  >
                    {bar.positive ? '+' : ''}{formatVol(bar.delta)}
                  </div>
                )}
              </div>

              {/* Time label */}
              <span className={`text-[7px] tracking-[0] shrink-0 ${isLast ? 'text-[#666]' : 'text-[#282828]'}`}>
                {bar.time.split(':')[1]}
              </span>
            </div>
          );
        })}

        {/* Cumulative delta line overlay (simplified) */}
        <svg
          className="absolute bottom-5 left-[10px] right-[10px] h-[60px] pointer-events-none opacity-40"
          preserveAspectRatio="none"
        >
          <polyline
            points={DELTA_BARS.map((bar, i) => {
              const x = (i / (DELTA_BARS.length - 1)) * 100;
              const cumulativeSum = DELTA_BARS.slice(0, i + 1).reduce((s, b) => s + b.delta, 0);
              const maxCum = 200000;
              const y = 50 - (cumulativeSum / maxCum) * 40;
              return `${x}%,${Math.max(5, Math.min(55, y))}`;
            }).join(' ')}
            fill="none"
            stroke="#e8a020"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
