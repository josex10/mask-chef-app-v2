"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { day: "Lunes", actualWeek: 186, lastWeek: 80 },
  { day: "Martes", actualWeek: 305, lastWeek: 200 },
  { day: "Miércoles", actualWeek: 237, lastWeek: 120 },
  { day: "Jueves", actualWeek: 73, lastWeek: 190 },
  { day: "Viernes", actualWeek: 209, lastWeek: 130 },
  { day: "Sábado", actualWeek: 214, lastWeek: 140 },
  { day: "Domingo", actualWeek: 214, lastWeek: 140 },
];

const chartConfig = {
  actualWeek: {
    label: "Semana Actual",
    color: "hsl(var(--chart-1))",
  },
  lastWeek: {
    label: "Semana Anterior",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const DashboardChartComponent = () => {
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        {/* <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        /> */}
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="lastWeek"
          type="natural"
          fill="var(--color-lastWeek)"
          fillOpacity={0.4}
          stroke="var(--color-lastWeek)"
          stackId="a"
        />
        <Area
          dataKey="actualWeek"
          type="natural"
          fill="var(--color-actualWeek)"
          fillOpacity={0.4}
          stroke="var(--color-actualWeek)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default DashboardChartComponent;
