
import type { BarSeriesOption } from "echarts/charts";
import { BarChart } from "echarts/charts";
import type {
  GridComponentOption,
  TitleComponentOption,
  TooltipComponentOption
} from "echarts/components";
import {
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent
} from "echarts/components";
import type { ComposeOption, ECharts, SetOptionOpts } from "echarts/core";
import { getInstanceByDom, init, use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { CSSProperties, useEffect, useRef, useState } from "react";

use([
  LegendComponent,
  BarChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  ToolboxComponent,
  DataZoomComponent,
  CanvasRenderer
]);

export type EChartsOption = ComposeOption<
  | BarSeriesOption
  | TitleComponentOption
  | GridComponentOption
  | TooltipComponentOption
>;

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
}

let currentIndex = -1;

export default function CustBarChart({
  option,
  style
}: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chartInitialized, setChartInitialized] = useState(false);

  useEffect(() => {
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current as HTMLDivElement);
      setChartInitialized(true);
    }
    function resizeChart() {
      chart?.resize();
    }
    window.addEventListener("resize", resizeChart);
    return () => {
      chart?.dispose();
      window.removeEventListener("resize", resizeChart);
    };
  }, []);


  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current as HTMLDivElement);
      chart!.setOption(option);
    }
  }, [option]);

  return (
    <div ref={chartRef} style={{ width: "100%", height: "250px", ...style }} />
  );
}
