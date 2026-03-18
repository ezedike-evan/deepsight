export const PAIRS = ['SUI/USDC', 'DEEP/USDC', 'WETH/USDC', 'WBTC/USDC', 'NS/USDC'];

export const INTERVALS_PRIMARY = ['1m', '5m', '15m', '1h', '4h', '1D'];
export const INTERVALS_MORE    = ['30m', '2h', '3h', '12h', '1W'];

export const INTERVAL_GROUPS = [
  { label: 'SECONDS', intervals: ['1s', '5s', '10s', '15s', '30s', '45s'] },
  { label: 'MINUTES', intervals: ['1m', '2m', '3m', '5m', '10m', '15m', '30m', '45m'] },
  { label: 'HOURS',   intervals: ['1h', '2h', '3h', '4h', '6h', '8h', '12h'] },
  { label: 'DAYS',    intervals: ['1D', '1W', '1M', '3M', '6M'] },
];

export const INTERVAL_FULL_NAME: Record<string, string> = {
  '1s': '1 second',   '5s': '5 seconds',  '10s': '10 seconds',
  '15s': '15 seconds','30s': '30 seconds', '45s': '45 seconds',
  '1m': '1 minute',   '2m': '2 minutes',  '3m': '3 minutes',
  '5m': '5 minutes',  '10m': '10 minutes','15m': '15 minutes',
  '30m': '30 minutes','45m': '45 minutes',
  '1h': '1 hour',     '2h': '2 hours',    '3h': '3 hours',
  '4h': '4 hours',    '6h': '6 hours',    '8h': '8 hours',    '12h': '12 hours',
  '1D': '1 day',      '1W': '1 week',     '1M': '1 month',
  '3M': '3 months',   '6M': '6 months',
};

export const DEFAULT_STARRED = ['1m', '5m', '15m', '1h', '4h', '1D'];

export const CHART_TYPES = [
  {
    id: 'candle', label: 'Candles',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="3" y="4" width="3" height="6" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="4.5" y1="2" x2="4.5" y2="4" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="4.5" y1="10" x2="4.5" y2="12" stroke="currentColor" strokeWidth="1.2"/>
        <rect x="8" y="3" width="3" height="5" stroke="currentColor" strokeWidth="1.2" fill="none"/>
        <line x1="9.5" y1="1" x2="9.5" y2="3" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="9.5" y1="8" x2="9.5" y2="11" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'bar', label: 'Bars',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <line x1="4" y1="2" x2="4" y2="12" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="4" y1="5" x2="2" y2="5" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="4" y1="8" x2="6" y2="8" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="10" y1="3" x2="10" y2="11" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="10" y1="6" x2="8" y2="6" stroke="currentColor" strokeWidth="1.2"/>
        <line x1="10" y1="9" x2="12" y2="9" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    id: 'line', label: 'Line',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <polyline points="1,11 4,7 7,9 10,4 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export const INDICATORS       = ['VOL', 'EMA', 'MACD', 'RSI'];
export const ORDER_FLOW_TOOLS = ['FOOTPRINT', 'VOL PROFILE', 'DELTA', 'OPV', 'HEATMAP'];

export const USER = { initials: 'DA', name: 'd_alchemist_trader', plan: 'PRO' };
