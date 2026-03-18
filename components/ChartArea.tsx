'use client';

import { useRef, useEffect, useState } from 'react';

type IChartApi = import('lightweight-charts').IChartApi;
type ISeriesApi<T extends import('lightweight-charts').SeriesType> = import('lightweight-charts').ISeriesApi<T>;

type OHLCBar = { time: number; open: number; high: number; low: number; close: number };
type VolBar  = { time: number; value: number; color: string };

function generateBars(count: number): { candles: OHLCBar[]; volumes: VolBar[] } {
  const candles: OHLCBar[] = [];
  const volumes: VolBar[]  = [];
  const now = Math.floor(Date.now() / 1000);
  let close = 3.72;

  for (let i = count - 1; i >= 0; i--) {
    const time  = now - i * 3600;
    const open  = close;
    const move  = (Math.random() - 0.48) * 0.04;
    close = Math.max(3.5, Math.min(4.1, open + move));
    const high  = Math.max(open, close) + Math.random() * 0.015;
    const low   = Math.min(open, close) - Math.random() * 0.015;
    const volume = 50000 + Math.random() * 300000;

    candles.push({ time, open, high, low, close });
    volumes.push({ time, value: volume, color: close >= open ? 'rgba(34,201,122,0.45)' : 'rgba(232,53,53,0.35)' });
  }
  return { candles, volumes };
}

const TAPE_TRADES = [
  { time: '15:10:42', side: 'BUY',  price: '3.8243', size: '12,400' },
  { time: '15:10:41', side: 'SELL', price: '3.8239', size: '8,200'  },
  { time: '15:10:40', side: 'BUY',  price: '3.8241', size: '3,100'  },
  { time: '15:10:38', side: 'SELL', price: '3.8238', size: '22,000' },
  { time: '15:10:37', side: 'BUY',  price: '3.8240', size: '5,800'  },
  { time: '15:10:35', side: 'SELL', price: '3.8237', size: '1,200'  },
  { time: '15:10:34', side: 'BUY',  price: '3.8242', size: '9,700'  },
  { time: '15:10:33', side: 'SELL', price: '3.8239', size: '4,400'  },
  { time: '15:10:31', side: 'BUY',  price: '3.8241', size: '16,300' },
  { time: '15:10:30', side: 'SELL', price: '3.8238', size: '2,900'  },
  { time: '15:10:28', side: 'BUY',  price: '3.8240', size: '7,600'  },
  { time: '15:10:27', side: 'SELL', price: '3.8236', size: '31,000' },
  { time: '15:10:25', side: 'BUY',  price: '3.8239', size: '4,100'  },
  { time: '15:10:24', side: 'SELL', price: '3.8237', size: '8,800'  },
  { time: '15:10:22', side: 'BUY',  price: '3.8241', size: '6,500'  },
  { time: '15:10:21', side: 'SELL', price: '3.8238', size: '11,200' },
  { time: '15:10:19', side: 'BUY',  price: '3.8243', size: '3,300'  },
  { time: '15:10:18', side: 'SELL', price: '3.8239', size: '18,700' },
  { time: '15:10:16', side: 'BUY',  price: '3.8242', size: '2,600'  },
  { time: '15:10:15', side: 'SELL', price: '3.8237', size: '5,100'  },
];

function TapePanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute top-0 right-0 bottom-0 w-[260px] bg-[#060606] border-l border-[#1a1a1a] flex flex-col z-20">
      <div className="py-2 px-[10px] border-b border-[#1a1a1a] flex justify-between items-center shrink-0 bg-[#050505]">
        <div className="flex items-center gap-2">
          <span className="text-amber text-[10px] tracking-[0.12em] font-bold">READ THE TAPE</span>
          <span className="w-[5px] h-[5px] rounded-full bg-green inline-block" />
        </div>
        <button onClick={onClose} className="w-[18px] h-[18px] bg-transparent border-none text-text-muted cursor-pointer text-[16px] flex items-center justify-center p-0">×</button>
      </div>

      <div className="py-[6px] px-[10px] border-b border-[#111] flex gap-4 shrink-0">
        {[
          { label: 'BUY VOL',  value: '142.3K',  color: '#22c97a' },
          { label: 'SELL VOL', value: '98.7K',   color: '#e83535' },
          { label: 'DELTA',    value: '+43.6K',  color: '#22c97a' },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div className="text-[#2a2a2a] text-[8px] tracking-[0.06em] mb-[2px]">{label}</div>
            <div style={{ color }} className="text-[10px] font-bold">{value}</div>
          </div>
        ))}
      </div>

      <div className="grid py-[5px] px-[10px] border-b border-[#0e0e0e] shrink-0" style={{ gridTemplateColumns: '48px 36px 52px 64px' }}>
        {['TIME', 'SIDE', 'PRICE', 'SIZE'].map((h) => (
          <span key={h} className="text-[#2a2a2a] text-[8px] tracking-[0.06em]">{h}</span>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        {TAPE_TRADES.map((trade, i) => {
          const isBuy    = trade.side === 'BUY';
          const isLarge  = parseInt(trade.size.replace(/,/g, '')) > 15000;
          return (
            <div
              key={i}
              className={`grid py-1 px-[10px] border-b border-[#0a0a0a] items-center ${isLarge ? (isBuy ? 'bg-[rgba(34,201,122,0.05)]' : 'bg-[rgba(232,53,53,0.05)]') : 'bg-transparent'}`}
              style={{ gridTemplateColumns: '48px 36px 52px 64px' }}
            >
              <span className="text-[#2e2e2e] text-[9px]">{trade.time}</span>
              <span className={`text-[9px] font-bold ${isBuy ? 'text-green' : 'text-red'}`}>{trade.side}</span>
              <span className={`text-[9px] ${isBuy ? 'text-[#22c97a88]' : 'text-[#e8353588]'}`}>{trade.price}</span>
              <span className={`text-[9px] ${isLarge ? (isBuy ? 'text-green font-bold' : 'text-red font-bold') : 'text-text-muted font-normal'}`}>{trade.size}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ChartAreaProps {
  activeInterval:   string;
  activeChartType:  string;
  activeIndicators: string[];
  activeOFTools:    string[];
  tapePanelOpen:    boolean;
  onCloseTape:      () => void;
}

export default function ChartArea({
  activeInterval,
  tapePanelOpen,
  onCloseTape,
}: ChartAreaProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef          = useRef<IChartApi | null>(null);
  const candleSeriesRef   = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const [ohlc, setOhlc]   = useState({ o: '3.7912', h: '3.9180', l: '3.7633', c: '3.8241' });

  useEffect(() => {
    if (!chartContainerRef.current) return;

    let chart: IChartApi | null = null;
    let ro: ResizeObserver | null = null;

    const init = async () => {
      const lc = await import('lightweight-charts');
      const { createChart, CrosshairMode, LineStyle, ColorType } = lc;
      if (!chartContainerRef.current) return;
      const container = chartContainerRef.current;

      chart = createChart(container, {
        width:  container.offsetWidth,
        height: container.offsetHeight,
        layout: {
          background: { type: ColorType.Solid, color: '#000000' },
          textColor: '#555',
          fontFamily: "'Courier New', monospace",
          fontSize: 10,
        },
        grid: {
          vertLines: { color: 'rgba(255,255,255,0.02)' },
          horzLines: { color: 'rgba(255,255,255,0.02)' },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
          vertLine: { color: '#2a2a2a', style: LineStyle.Dashed, labelBackgroundColor: '#111' },
          horzLine: { color: '#2a2a2a', style: LineStyle.Dashed, labelBackgroundColor: '#111' },
        },
        rightPriceScale: {
          borderColor: '#111',
          textColor: '#555',
          scaleMargins: { top: 0.05, bottom: 0.15 },
        },
        timeScale: {
          borderColor: '#111',
          timeVisible: true,
          secondsVisible: false,
          rightOffset: 10,
          barSpacing: 8,
        },
        watermark: {
          visible: true,
          fontSize: 56,
          horzAlign: 'center',
          vertAlign: 'center',
          color: 'rgba(232,160,32,0.03)',
          text: 'SUI/USDC',
        },
      });

      chartRef.current = chart;
      const { candles, volumes } = generateBars(120);

      const candleSeries = chart.addCandlestickSeries({
        upColor: '#22c97a', downColor: '#e83535',
        borderUpColor: '#22c97a', borderDownColor: '#e83535',
        wickUpColor: 'rgba(34,201,122,0.5)', wickDownColor: 'rgba(232,53,53,0.5)',
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      candleSeries.setData(candles as any);
      candleSeriesRef.current = candleSeries;

      const volumeSeries = chart.addHistogramSeries({ priceFormat: { type: 'volume' }, priceScaleId: 'volume' });
      volumeSeries.priceScale().applyOptions({ scaleMargins: { top: 0.82, bottom: 0 } });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      volumeSeries.setData(volumes as any);

      chart.timeScale().fitContent();

      chart.subscribeCrosshairMove((param) => {
        if (!param.seriesData || !param.point) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bar = param.seriesData.get(candleSeries) as any;
        if (bar && 'open' in bar) {
          setOhlc({ o: bar.open.toFixed(4), h: bar.high.toFixed(4), l: bar.low.toFixed(4), c: bar.close.toFixed(4) });
        }
      });

      ro = new ResizeObserver(() => {
        chart?.applyOptions({ width: container.offsetWidth, height: container.offsetHeight });
      });
      ro.observe(container);
    };

    init();

    return () => {
      ro?.disconnect();
      chart?.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
    };
  }, []);

  const cChange      = parseFloat(ohlc.c) - parseFloat(ohlc.o);
  const cChangePct   = (cChange / parseFloat(ohlc.o)) * 100;
  const changePos    = cChange >= 0;

  return (
    <div className="flex-1 flex flex-col bg-black overflow-hidden min-w-0">
      <div className="flex-1 relative overflow-hidden">

        {/* Instrument label + BID/ASK + OHLCV overlay */}
        <div className="absolute top-[10px] left-3 z-10 pointer-events-none flex flex-col gap-[5px]">

          <span className="text-text-dim text-[10px] tracking-[0.04em]">
            SUI/USDC · {activeInterval} · DEEPBOOK V3
          </span>

          <div className="flex items-center gap-1">
            <div className="bg-[rgba(232,53,53,0.85)] pt-[3px] px-2 pb-[2px] rounded-[2px] text-center min-w-[60px]">
              <div className="text-white text-xs font-bold tracking-[-0.01em] leading-[1.2]">3.8238</div>
              <div className="text-[rgba(255,255,255,0.55)] text-[7px] tracking-[0.12em] leading-none">SELL</div>
            </div>
            <span className="text-[#2a2a2a] text-[8px]">0.0006</span>
            <div className="bg-[rgba(34,201,122,0.85)] pt-[3px] px-2 pb-[2px] rounded-[2px] text-center min-w-[60px]">
              <div className="text-black text-xs font-bold tracking-[-0.01em] leading-[1.2]">3.8244</div>
              <div className="text-[rgba(0,0,0,0.55)] text-[7px] tracking-[0.12em] leading-none">BUY</div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {[
              { label: 'O', value: ohlc.o, color: '#555' },
              { label: 'H', value: ohlc.h, color: '#22c97a' },
              { label: 'L', value: ohlc.l, color: '#e83535' },
              { label: 'C', value: ohlc.c, color: changePos ? '#22c97a' : '#e83535' },
            ].map(({ label, value, color }) => (
              <span key={label} className="text-[10px]">
                <span className="text-[#222]">{label} </span>
                <span style={{ color }}>{value}</span>
              </span>
            ))}
            <span className={`text-[10px] ${changePos ? 'text-green' : 'text-red'}`}>
              {changePos ? '+' : ''}{cChange.toFixed(4)} ({changePos ? '+' : ''}{cChangePct.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div ref={chartContainerRef} className="w-full h-full" />

        {tapePanelOpen && <TapePanel onClose={onCloseTape} />}
      </div>
    </div>
  );
}
