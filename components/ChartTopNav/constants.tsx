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

export const CHART_TYPE_GROUPS: { id: string; label: string; icon: React.ReactNode }[][] = [
  [
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
      id: 'hollow-candle', label: 'Hollow candles',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="3" y="4" width="3" height="6" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="4.5" y1="2" x2="4.5" y2="4" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="4.5" y1="10" x2="4.5" y2="12" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="5" width="3" height="4" stroke="currentColor" strokeWidth="1.2" strokeDasharray="1.5 1"/>
          <line x1="9.5" y1="2" x2="9.5" y2="5" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="9.5" y1="9" x2="9.5" y2="12" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      ),
    },
    {
      id: 'volume-candle', label: 'Volume candles',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="3" y="3" width="3" height="5" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="4.5" y1="1.5" x2="4.5" y2="3" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="4.5" y1="8" x2="4.5" y2="9.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="3" y="10" width="3" height="2.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
          <rect x="8" y="4" width="3" height="4" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="9.5" y1="2" x2="9.5" y2="4" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="9.5" y1="8" x2="9.5" y2="9.5" stroke="currentColor" strokeWidth="1.2"/>
          <rect x="8" y="10" width="3" height="1.5" stroke="currentColor" strokeWidth="1" fill="currentColor" opacity="0.3"/>
        </svg>
      ),
    },
  ],
  [
    {
      id: 'line', label: 'Line',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <polyline points="1,11 4,7 7,9 10,4 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'line-markers', label: 'Line with markers',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <polyline points="1,11 4,7 7,9 10,4 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="1" cy="11" r="1.2" fill="currentColor"/>
          <circle cx="4" cy="7" r="1.2" fill="currentColor"/>
          <circle cx="7" cy="9" r="1.2" fill="currentColor"/>
          <circle cx="10" cy="4" r="1.2" fill="currentColor"/>
          <circle cx="13" cy="6" r="1.2" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'step-line', label: 'Step line',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <polyline points="1,11 4,11 4,7 7,7 7,9 10,9 10,4 13,4" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ],
  [
    {
      id: 'area', label: 'Area',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1,11 L4,7 L7,9 L10,4 L13,6 L13,13 L1,13 Z" fill="currentColor" opacity="0.25"/>
          <polyline points="1,11 4,7 7,9 10,4 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'hlc-area', label: 'HLC area',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1,4 L4,2 L7,5 L10,3 L13,5 L13,9 L10,11 L7,9 L4,8 L1,7 Z" fill="currentColor" opacity="0.25"/>
          <polyline points="1,4 4,2 7,5 10,3 13,5" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <polyline points="1,7 4,8 7,9 10,11 13,9" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'baseline', label: 'Baseline',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 1.5" opacity="0.5"/>
          <path d="M1,9 L5,5 L7,7 L1,7 Z" fill="currentColor" opacity="0.3"/>
          <path d="M7,7 L9,4 L13,6 L13,7 Z" fill="currentColor" opacity="0.3"/>
          <polyline points="1,9 5,5 7,7 9,4 13,6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ],
  [
    {
      id: 'columns', label: 'Columns',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="7" width="2.5" height="5.5" fill="currentColor" opacity="0.8"/>
          <rect x="5.75" y="4" width="2.5" height="8.5" fill="currentColor" opacity="0.8"/>
          <rect x="9.5" y="5.5" width="2.5" height="7" fill="currentColor" opacity="0.8"/>
        </svg>
      ),
    },
    {
      id: 'high-low', label: 'High-low',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="4" y1="3" x2="4" y2="11" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="2.5" y1="5" x2="5.5" y2="5" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="2.5" y1="9" x2="5.5" y2="9" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="10" y1="4" x2="10" y2="11" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="8.5" y1="6" x2="11.5" y2="6" stroke="currentColor" strokeWidth="1.2"/>
          <line x1="8.5" y1="10" x2="11.5" y2="10" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      ),
    },
  ],
  [
    {
      id: 'volume-footprint', label: 'Volume footprint',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="1.5" width="5.5" height="11" stroke="currentColor" strokeWidth="1" fill="none"/>
          <rect x="7.5" y="1.5" width="5.5" height="11" stroke="currentColor" strokeWidth="1" fill="none"/>
          <line x1="1" y1="5.5" x2="6.5" y2="5.5" stroke="currentColor" strokeWidth="0.8"/>
          <line x1="1" y1="9" x2="6.5" y2="9" stroke="currentColor" strokeWidth="0.8"/>
          <line x1="7.5" y1="5.5" x2="13" y2="5.5" stroke="currentColor" strokeWidth="0.8"/>
          <line x1="7.5" y1="9" x2="13" y2="9" stroke="currentColor" strokeWidth="0.8"/>
          <rect x="2" y="2.5" width="3.5" height="2" fill="currentColor" opacity="0.5"/>
          <rect x="9" y="6.5" width="3" height="1.5" fill="currentColor" opacity="0.5"/>
          <rect x="2" y="9.8" width="2.5" height="1.8" fill="currentColor" opacity="0.5"/>
        </svg>
      ),
    },
    {
      id: 'time-price', label: 'Time price opportunity',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="13" y1="2" x2="13" y2="12" stroke="currentColor" strokeWidth="1"/>
          <rect x="5" y="2.5" width="8" height="1.8" fill="currentColor" opacity="0.7"/>
          <rect x="3" y="5.3" width="10" height="1.8" fill="currentColor" opacity="0.7"/>
          <rect x="6" y="8" width="7" height="1.8" fill="currentColor" opacity="0.7"/>
          <rect x="8" y="10.8" width="5" height="1.2" fill="currentColor" opacity="0.7"/>
        </svg>
      ),
    },
    {
      id: 'session-volume', label: 'Session volume profile',
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="2" x2="1" y2="12" stroke="currentColor" strokeWidth="1"/>
          <rect x="1.5" y="2.5" width="6" height="1.8" fill="currentColor" opacity="0.7"/>
          <rect x="1.5" y="5.3" width="9" height="1.8" fill="currentColor" opacity="0.7"/>
          <rect x="1.5" y="8" width="7" height="1.8" fill="currentColor" opacity="0.7"/>
          <rect x="1.5" y="10.8" width="4" height="1.2" fill="currentColor" opacity="0.7"/>
        </svg>
      ),
    },
  ],
];

export const CHART_TYPES = CHART_TYPE_GROUPS.flat();

export const DEFAULT_STARRED_CHART_TYPES = ['candle', 'line'];

export const INDICATORS       = ['VOL', 'EMA', 'MACD', 'RSI'];
export const ORDER_FLOW_TOOLS = ['FOOTPRINT', 'VOL PROFILE', 'DELTA', 'OPV', 'HEATMAP'];

export const USER = { initials: 'DA', name: 'd_alchemist_trader', plan: 'PRO' };
