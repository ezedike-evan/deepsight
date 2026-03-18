'use client';

const STATUS_ITEMS = [
  { label: '24H HIGH',   value: '3.9180',    color: '#22c97a' },
  { label: '24H LOW',    value: '3.6520',    color: '#e83535' },
  { label: '24H VOL',    value: '14.2M',     color: '#22c97a' },
  { label: 'MARK',       value: '3.8238',    color: '#22c97a' },
  { label: 'FUNDING',    value: '+0.0120%',  color: '#22c97a' },
  { label: 'CUM. DELTA', value: '+142.3K',   color: '#22c97aff' },
];

export default function MarketStatusBar() {
  return (
    <div className="h-fit py-2 px-4 bg-bg-base border-t border-[#0e0e0e] flex items-center shrink-0 overflow-hidden">
      {STATUS_ITEMS.map(({ label, value, color }, i) => (
        <div
          key={label}
          className={`flex items-center gap-[5px] px-3 ${i < STATUS_ITEMS.length - 1 && 'border-r border-border'}`}
        >
          <span className="text-text-primary text-[8px] tracking-[0.08em] font-medium">
            {label}
          </span>
          <span style={{ color }} className="text-[9px] font-semibold tracking-[0.02em]">
            {value}
          </span>
        </div>
      ))}

      <div className="ml-auto flex items-center gap-[6px]">
        <span className="inline-block w-1 h-1 rounded-full bg-green" />
        <span className="text-text-primary text-[8px] tracking-[0.08em]">
          DEEPBOOK V3 LIVE
        </span>
      </div>
    </div>
  );
}
