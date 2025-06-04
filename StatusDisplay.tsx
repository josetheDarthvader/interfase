"use client";

import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatusDisplayProps {
  title: string;
  value: number | string;
  unit: string;
  Icon: LucideIcon;
  isLoading?: boolean;
  trend?: 'up' | 'down' | 'stable'; // Optional: for an arrow indicator
  alert?: boolean; // Optional: for highlighting critical values
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ title, value, unit, Icon, isLoading = false, alert = false }) => {
  return (
    <Card className={`shadow-md rounded-lg ${alert ? 'border-destructive bg-destructive/10' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={`h-5 w-5 ${alert ? 'text-destructive' : 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-8 w-3/4 animate-pulse bg-muted rounded-md"></div>
        ) : (
          <div className={`text-xl md:text-2xl font-bold ${alert ? 'text-destructive' : 'text-foreground'}`}>
            {value} <span className="text-xs font-normal">{unit}</span>
          </div>
        )}
        {/* Optional: Add a description or trend indicator here */}
        {/* <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
};
