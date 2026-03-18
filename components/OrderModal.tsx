'use client';

import { useState, useEffect, useRef } from 'react';

type OrderSide = 'BUY' | 'SELL';
type OrderType = 'LIMIT' | 'MARKET' | 'STOP';

const SIZE_PRESETS = [
  { label: '25%', value: 0.25 },
  { label: '50%', value: 0.5 },
  { label: '75%', value: 0.75 },
  { label: 'MAX', value: 1 },
];

const AVAILABLE_BALANCE = 7843.12;
const CURRENT_PRICE = 3.8241;

interface OrderModalProps {
  side: OrderSide;
  onClose: () => void;
}

export default function OrderModal({ side, onClose }: OrderModalProps) {
  const [activeSide, setActiveSide] = useState<OrderSide>(side);
  const [orderType, setOrderType] = useState<OrderType>('LIMIT');
  const [price, setPrice] = useState(CURRENT_PRICE.toFixed(4));
  const [size, setSize] = useState('');
  const [stopPrice, setStopPrice] = useState('');
  const [leverage, setLeverage] = useState(5);
  const [reduceOnly, setReduceOnly] = useState(false);
  const [postOnly, setPostOnly] = useState(false);
  const [tif, setTif] = useState<'GTC' | 'IOC' | 'FOK'>('GTC');
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const applyPreset = (pct: number) => {
    const notional = AVAILABLE_BALANCE * leverage * pct;
    const qty = notional / parseFloat(price || String(CURRENT_PRICE));
    setSize(qty.toFixed(2));
  };

  const notional = parseFloat(size || '0') * parseFloat(price || String(CURRENT_PRICE));
  const fee = notional * (postOnly ? 0.0002 : 0.0006);
  const margin = notional / leverage;

  const isBuy = activeSide === 'BUY';
  const accentColor = isBuy ? '#22c97a' : '#e83535';
  const accentDim = isBuy ? 'rgba(34,201,122,0.1)' : 'rgba(232,53,53,0.1)';
  const accentBorder = isBuy ? 'rgba(34,201,122,0.3)' : 'rgba(232,53,53,0.3)';

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-[rgba(0,0,0,0.75)] backdrop-blur-sm flex items-center justify-center z-[1000]"
    >
      <div
        className="w-[420px] bg-bg-panel border border-[#222] rounded overflow-hidden"
        style={{ boxShadow: `0 0 40px rgba(0,0,0,0.8), 0 0 1px ${accentColor}22` }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between py-3 px-4 border-b border-[#1a1a1a] bg-[#050505]"
        >
          <div className="flex items-center gap-[10px]">
            <span className="text-amber text-[11px] tracking-[0.12em] font-bold">DEEPSIGHT</span>
            <span className="text-[#2a2a2a] text-[10px]">SUI/USDC</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#3a3a3a] text-[9px]">ESC to close</span>
            <button onClick={onClose} className="w-5 h-5 bg-transparent border-none text-text-muted cursor-pointer text-[16px] flex items-center justify-center leading-none">
              ×
            </button>
          </div>
        </div>

        <div className="py-[14px] px-4 flex flex-col gap-3">
          {/* Buy / Sell toggle */}
          <div className="grid grid-cols-2 border border-[#1a1a1a] rounded-[3px] overflow-hidden">
            {(['BUY', 'SELL'] as OrderSide[]).map((s) => (
              <button
                key={s}
                onClick={() => setActiveSide(s)}
                className={`p-[10px] border-none border-b-2 text-xs font-bold tracking-[0.1em] cursor-pointer transition-all duration-150 ${activeSide === s ? (s === 'BUY' ? 'bg-green-dim text-green border-green' : 'bg-red-dim text-red border-red') : 'bg-transparent text-[#333] border-transparent'}`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Order type */}
          <div className="flex gap-1">
            {(['LIMIT', 'MARKET', 'STOP'] as OrderType[]).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className="flex-1 py-[6px] rounded-[2px] text-[10px] tracking-[0.06em] cursor-pointer transition-all duration-150"
                style={{
                  background: orderType === t ? accentDim : 'transparent',
                  border: `1px solid ${orderType === t ? accentBorder : '#1a1a1a'}`,
                  color: orderType === t ? accentColor : '#444',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Leverage */}
          <div>
            <div className="flex justify-between mb-[6px]">
              <span className="text-text-muted text-[9px] tracking-[0.08em]">LEVERAGE</span>
              <span className="text-amber text-[11px] font-bold">{leverage}×</span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={1}
                max={20}
                value={leverage}
                onChange={(e) => setLeverage(parseInt(e.target.value))}
                className="w-full h-[3px] cursor-pointer"
                style={{ accentColor: '#e8a020' }}
              />
              <div className="flex justify-between mt-1">
                {[1, 5, 10, 15, 20].map((v) => (
                  <button
                    key={v}
                    onClick={() => setLeverage(v)}
                    className={`py-[2px] px-1 rounded-[2px] text-[8px] cursor-pointer ${leverage === v ? 'bg-amber-glow text-amber border border-amber' : 'bg-transparent text-[#333] border border-[#1a1a1a]'}`}
                  >
                    {v}×
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stop price (only for STOP orders) */}
          {orderType === 'STOP' && (
            <div>
              <label className="text-text-muted text-[9px] tracking-[0.08em] block mb-[5px]">
                TRIGGER PRICE
              </label>
              <div className="flex items-center border border-[#1e1e1e] rounded-[2px] bg-[#040404] overflow-hidden">
                <input
                  type="number"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  placeholder="0.0000"
                  className="flex-1 py-2 px-[10px] bg-transparent border-none text-text-secondary text-xs outline-none"
                />
                <span className="px-[10px] text-[#333] text-[10px]">USDC</span>
              </div>
            </div>
          )}

          {/* Price (not for MARKET) */}
          {orderType !== 'MARKET' && (
            <div>
              <label className="text-text-muted text-[9px] tracking-[0.08em] block mb-[5px]">
                {orderType === 'STOP' ? 'LIMIT PRICE' : 'PRICE'}
              </label>
              <div className="flex items-center border border-[#1e1e1e] rounded-[2px] bg-[#040404] overflow-hidden transition-[border-color] duration-150" onFocus={() => {}}>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="flex-1 py-2 px-[10px] bg-transparent border-none text-text-primary text-[14px] font-semibold outline-none"
                />
                <div className="flex flex-col mr-1 gap-[1px]">
                  <button onClick={() => setPrice((p) => (parseFloat(p) + 0.0001).toFixed(4))} className="w-[18px] h-3 bg-bg-elevated border border-[#1e1e1e] rounded-[1px] text-[#555] cursor-pointer text-[8px] flex items-center justify-center">▲</button>
                  <button onClick={() => setPrice((p) => Math.max(0, parseFloat(p) - 0.0001).toFixed(4))} className="w-[18px] h-3 bg-bg-elevated border border-[#1e1e1e] rounded-[1px] text-[#555] cursor-pointer text-[8px] flex items-center justify-center">▼</button>
                </div>
                <span className="px-[10px] text-[#333] text-[10px] border-l border-[#111]">USDC</span>
              </div>
            </div>
          )}

          {/* Size */}
          <div>
            <div className="flex justify-between mb-[5px]">
              <label className="text-text-muted text-[9px] tracking-[0.08em]">SIZE</label>
              <span className="text-[#2a2a2a] text-[9px]">
                AVAIL: <span className="text-text-muted">${AVAILABLE_BALANCE.toLocaleString()}</span>
              </span>
            </div>
            <div className="flex items-center border border-[#1e1e1e] rounded-[2px] bg-[#040404] overflow-hidden mb-[6px]">
              <input
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="0.00"
                className="flex-1 py-2 px-[10px] bg-transparent border-none text-text-primary text-[14px] font-semibold outline-none"
              />
              <span className="px-[10px] text-[#333] text-[10px] border-l border-[#111]">SUI</span>
            </div>

            {/* Size presets */}
            <div className="grid grid-cols-4 gap-1">
              {SIZE_PRESETS.map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => applyPreset(value)}
                  className={`py-[5px] bg-transparent border border-[#1e1e1e] rounded-[2px] text-[10px] cursor-pointer tracking-[0.04em] transition-all duration-100 ${label === 'MAX' ? 'text-amber' : 'text-[#555]'}`}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = accentBorder;
                    (e.currentTarget as HTMLElement).style.color = accentColor;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#1e1e1e';
                    (e.currentTarget as HTMLElement).style.color = label === 'MAX' ? '#e8a020' : '#555';
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Order options */}
          <div className="flex gap-3 items-center">
            {orderType === 'LIMIT' && (
              <>
                {/* TIF */}
                <div className="flex gap-[2px]">
                  {(['GTC', 'IOC', 'FOK'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTif(t)}
                      className={`py-[3px] px-[6px] rounded-[2px] text-[8px] cursor-pointer tracking-[0.05em] ${tif === t ? 'bg-[rgba(232,160,32,0.08)] text-amber border border-amber-border' : 'bg-transparent text-[#333] border border-[#1a1a1a]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="w-px h-[14px] bg-[#1a1a1a]" />
                {/* Post Only */}
                <button
                  onClick={() => setPostOnly(!postOnly)}
                  className={`flex items-center gap-[5px] py-[3px] px-[6px] rounded-[2px] text-[8px] cursor-pointer tracking-[0.05em] ${postOnly ? 'bg-[rgba(232,160,32,0.08)] text-amber border border-amber-border' : 'bg-transparent text-[#333] border border-[#1a1a1a]'}`}
                >
                  <div className={`w-2 h-2 rounded-[1px] ${postOnly ? 'bg-amber border border-amber' : 'bg-transparent border border-[#333]'}`} />
                  POST ONLY
                </button>
              </>
            )}

            {/* Reduce Only */}
            <button
              onClick={() => setReduceOnly(!reduceOnly)}
              className={`flex items-center gap-[5px] py-[3px] px-[6px] rounded-[2px] text-[8px] cursor-pointer tracking-[0.05em] ${reduceOnly ? 'bg-[rgba(232,160,32,0.08)] text-amber border border-amber-border' : 'bg-transparent text-[#333] border border-[#1a1a1a]'}`}
            >
              <div className={`w-2 h-2 rounded-[1px] ${reduceOnly ? 'bg-amber border border-amber' : 'bg-transparent border border-[#333]'}`} />
              REDUCE ONLY
            </button>
          </div>

          {/* Order Summary */}
          {parseFloat(size) > 0 && (
            <div className="bg-[#040404] border border-[#111] rounded-[2px] py-2 px-[10px] grid grid-cols-3 gap-2">
              {[
                { label: 'NOTIONAL', value: `$${notional.toFixed(2)}` },
                { label: 'MARGIN REQ.', value: `$${margin.toFixed(2)}` },
                { label: 'EST. FEE', value: `$${fee.toFixed(4)}` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[#2a2a2a] text-[8px] tracking-[0.06em] mb-[2px]">
                    {label}
                  </div>
                  <div className="text-[#666] text-[10px]">{value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            className="p-[13px] rounded-[3px] text-[13px] font-bold tracking-[0.14em] cursor-pointer transition-all duration-150"
            style={{
              background: isBuy
                ? 'linear-gradient(180deg, rgba(34,201,122,0.22) 0%, rgba(34,201,122,0.14) 100%)'
                : 'linear-gradient(180deg, rgba(232,53,53,0.22) 0%, rgba(232,53,53,0.14) 100%)',
              border: `1px solid ${accentBorder}`,
              color: accentColor,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)'; }}
          >
            {orderType === 'MARKET' ? `MARKET ${activeSide}` : `PLACE ${orderType} ${activeSide}`}
          </button>

          {/* Market info */}
          <div className="flex justify-between">
            <span className="text-[#1e1e1e] text-[8px]">DEEPBOOK V3 · POOL: 0x0bde...4f2c</span>
            <span className="text-[#1e1e1e] text-[8px]">SLIPPAGE: 0.3%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
