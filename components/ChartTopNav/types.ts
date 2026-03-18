export type MenuKey = 'user' | 'pair' | 'more-intervals' | 'chart-type' | 'indicators' | 'order-flow' | null;

export interface ChartTopNavProps {
  activeInterval:    string;
  onIntervalChange:  (iv: string) => void;
  activeChartType:   string;
  onChartTypeChange: (ct: string) => void;
  activeIndicators:  string[];
  onToggleIndicator: (ind: string) => void;
  activeOFTools:     string[];
  onToggleOFTool:    (tool: string) => void;
  tapePanelOpen:     boolean;
  onToggleTape:      () => void;
}
