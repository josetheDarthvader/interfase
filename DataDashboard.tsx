"use client";

import { useState, useEffect } from 'react';
import { Thermometer, Waves, Activity, TrendingUp } from 'lucide-react';
import { StatusDisplay } from './StatusDisplay';
import { RealTimeChart } from './RealTimeChart'
import { EmergencyShutOff } from './EmergencyShutOff';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SensorDataPoint {
  time: string;
  value: number;
}

const MAX_DATA_POINTS = 30; // Keep last 30 data points for charts

export const DataDashboard: React.FC = () => {
  const [temperature, setTemperature] = useState<number>(25);
  const [vibration, setVibration] = useState<number>(0.5);
  const [temperatureData, setTemperatureData] = useState<SensorDataPoint[]>([]);
  const [vibrationData, setVibrationData] = useState<SensorDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialTimestamp = Date.now();
    const initialTempData: SensorDataPoint[] = [];
    const initialVibData: SensorDataPoint[] = [];

    for (let i = MAX_DATA_POINTS -1; i >= 0; i--) {
        const time = new Date(initialTimestamp - i * 2000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        initialTempData.push({ time, value: 20 + Math.random() * 10 }); // Random temp between 20-30
        initialVibData.push({ time, value: Math.random() * 1.0 }); // Random vibration between 0-1
    }
    setTemperatureData(initialTempData);
    setVibrationData(initialVibData);
    setTemperature(initialTempData[initialTempData.length-1].value);
    setVibration(initialVibData[initialVibData.length-1].value);
    setIsLoading(false);


    const intervalId = setInterval(() => {
      const newTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      const newTemp = 20 + Math.random() * 15; // Simulate temperature between 20-35°C
      setTemperature(newTemp);
      setTemperatureData(prevData => [...prevData.slice(-MAX_DATA_POINTS + 1), { time: newTime, value: newTemp }]);
      
      const newVib = Math.random() * 1.5; // Simulate vibration between 0-1.5 mm/s
      setVibration(newVib);
      setVibrationData(prevData => [...prevData.slice(-MAX_DATA_POINTS + 1), { time: newTime, value: newVib }]);
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <StatusDisplay
            title="Current Temperature"
            value={temperature.toFixed(1)}
            unit="°C"
            Icon={Thermometer}
            isLoading={isLoading}
            alert={temperature > 50} // Example alert condition
          />
          <StatusDisplay
            title="Current Vibration"
            value={vibration.toFixed(2)}
            unit="mm/s"
            Icon={Waves}
            isLoading={isLoading}
            alert={vibration > 1.2} // Example alert condition
          />
        </div>

        <RealTimeChart
          title="Temperature Trend"
          description="Real-time motor temperature readings over time."
          data={temperatureData}
          dataKey="temperature"
          color="hsl(var(--chart-1))" // Using chart theme variable
          Icon={Activity}
          unit="°C"
          isLoading={isLoading && temperatureData.length === 0}
        />

        <RealTimeChart
          title="Vibration Levels"
          description="Real-time motor vibration analysis."
          data={vibrationData}
          dataKey="vibration"
          color="hsl(var(--chart-2))" // Using chart theme variable
          Icon={TrendingUp}
          unit="mm/s"
          isLoading={isLoading && vibrationData.length === 0}
        />
        
  
        
        <EmergencyShutOff />
      </div>
    </ScrollArea>
  );
};
