'use client';

const STATUS_ITEMS = [
  { label: '24H HIGH',   value: '3.9180',    color: '#22c97a' },
  { label: '24H LOW',    value: '3.6520',    color: '#e83535' },
  { label: '24H VOL',    value: '14.2M',     color: '#555' },
  { label: 'MARK',       value: '3.8238',    color: '#555' },
  { label: 'FUNDING',    value: '+0.0120%',  color: '#22c97a' },
  { label: 'TRADES',     value: '8,432',     color: '#444' },
  { label: 'CUM. DELTA', value: '+142.3K',   color: '#22c97a' },
  { label: 'POOL',       value: '0x0bde...4f2c', color: '#2a2a2a' },
  { label: 'NETWORK',    value: 'SUI MAINNET',   color: '#2a2a2a' },
];

export default function MarketStatusBar() {
  return (
    <div className="h-6 bg-[#020202] border-t border-[#0e0e0e] flex items-center px-3 shrink-0 overflow-hidden">
      {STATUS_ITEMS.map(({ label, value, color }, i) => (
        <div
          key={label}
          className={`flex items-center gap-[5px] px-3 ${i < STATUS_ITEMS.length - 1 ? 'border-r border-[#111]' : ''}`}
        >
          <span className="text-text-dim text-[8px] tracking-[0.08em] font-medium">
            {label}
          </span>
          <span style={{ color }} className="text-[9px] font-semibold tracking-[0.02em]">
            {value}
          </span>
        </div>
      ))}

      <div className="ml-auto flex items-center gap-[6px]">
        <span className="inline-block w-1 h-1 rounded-full bg-green" />
        <span className="text-white text-[8px] tracking-[0.08em]">
          DEEPBOOK V3 LIVE
        </span>
      </div>
    </div>
  );
}
