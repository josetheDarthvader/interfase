"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import type { LucideIcon } from 'lucide-react';

interface RealTimeChartProps {
  title: string;
  description?: string;
  data: { time: string; value: number }[];
  dataKey: string;
  color: string; // HSL color string for the line
  Icon?: LucideIcon;
  unit: string;
  isLoading?: boolean;
}

export const RealTimeChart: React.FC<RealTimeChartProps> = ({ title, description, data, dataKey, color, Icon, unit, isLoading = false }) => {
  const chartConfig = {
    [dataKey]: {
      label: title,
      color: color,
      icon: Icon,
    },
  } satisfies ChartConfig;

  return (
    <Card className="shadow-md rounded-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-primary" />}
          <CardTitle>{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {isLoading && data.length === 0 ? (
           <div className="h-[300px] w-full flex items-center justify-center">
            <p>Loading chart data...</p>
          </div>
        ) : (
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: 0, // Adjusted for better Y-axis label visibility on mobile
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}${unit}`} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" labelKey="time" nameKey="value" hideLabel />}
              />
              <Line
                dataKey="value"
                type="monotone"
                stroke={`hsl(var(--${dataKey === 'temperature' ? 'chart-1' : 'chart-2'}))`} // Using chart theme colors
                strokeWidth={2}
                dot={false}
                name={title}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};
