'use client';

import { useState } from 'react';
import ChartTopNav from '@/components/ChartTopNav';
import ChartArea from '@/components/ChartArea';
import MarketStatusBar from '@/components/MarketStatusBar';

export default function Home() {
  const [activeInterval, setActiveInterval] = useState('1h');
  const [activeChartType, setActiveChartType] = useState('candle');
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['VOL']);
  const [activeOFTools, setActiveOFTools] = useState<string[]>([]);
  const [tapePanelOpen, setTapePanelOpen] = useState(false);

  const toggleIndicator = (ind: string) =>
    setActiveIndicators((prev) => prev.includes(ind) ? prev.filter((i) => i !== ind) : [...prev, ind]);

  const toggleOFTool = (tool: string) =>
    setActiveOFTools((prev) => prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]);

  return (
    <div className="h-dvh flex flex-col overflow-hidden bg-bg-base">
      <ChartTopNav
        activeInterval={activeInterval}
        onIntervalChange={setActiveInterval}
        activeChartType={activeChartType}
        onChartTypeChange={setActiveChartType}
        activeIndicators={activeIndicators}
        onToggleIndicator={toggleIndicator}
        activeOFTools={activeOFTools}
        onToggleOFTool={toggleOFTool}
        tapePanelOpen={tapePanelOpen}
        onToggleTape={() => setTapePanelOpen((v) => !v)}
      />
      <div className="flex-1 flex min-h-0 overflow-hidden">
        <ChartArea
          activeInterval={activeInterval}
          activeChartType={activeChartType}
          activeIndicators={activeIndicators}
          activeOFTools={activeOFTools}
          tapePanelOpen={tapePanelOpen}
          onCloseTape={() => setTapePanelOpen(false)}
        />
      </div>
      <MarketStatusBar />
    </div>
  );
}
