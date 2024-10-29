"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IDashboardChartData } from "@/utils/interfaces/dashboard/IDashboardChartData";
import { format } from "date-fns";

const chartConfig = {
  incomes: {
    label: "Ingresos",
    color: "hsl(var(--chart-1))",
  },
  expenses: {
    label: "Gastos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type TDashboardChartProps = {
  chartData: IDashboardChartData[];
};
const DashboardChartComponent = ({ chartData }: TDashboardChartProps) => {
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
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => format(new Date(value), "d")}
        />
        <YAxis
          dataKey="maxAmount"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Area
          dataKey="expenses"
          type="natural"
          fill="var(--color-expenses)"
          fillOpacity={0.4}
          stroke="var(--color-expenses)"
          stackId="a"
        />
        <Area
          dataKey="incomes"
          type="natural"
          fill="var(--color-incomes)"
          fillOpacity={0.4}
          stroke="var(--color-incomes)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default DashboardChartComponent;
