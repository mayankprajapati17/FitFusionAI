
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Workout } from '@/types/workout';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import React, { useState, useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

interface ProgressChartProps {
  workouts: Workout[];
  completedWorkouts?: {[key: string]: boolean};
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workouts, completedWorkouts = {} }) => {
  const [progressValue, setProgressValue] = useState<number>(0);
  const categories = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  useEffect(() => {
    // Calculate progress based on completed workouts
    if (!workouts.length) {
      setProgressValue(0);
      return;
    }

    const completedCount = Object.values(completedWorkouts).filter(value => value).length;
    const totalWorkouts = workouts.length;
    const calculatedProgress = Math.round((completedCount / totalWorkouts) * 100);
    
    setProgressValue(calculatedProgress);
  }, [workouts, completedWorkouts]);

  // Generate chart data for the bar chart, with last day reflecting actual progress
  const chartData = categories.map((day, index) => {
    // Create a distribution that mimics weekly progress leading up to today's value
    const baseValues = [15, 25, 35, 45, 60, 75, progressValue]; 
    const value = index === 6 ? progressValue : baseValues[index];
    
    return {
      name: day,
      value: value,
    };
  });

  return (
    <div className="elegant-card animate-fade-up p-5 shadow-elegant rounded-xl bg-white">
      <h3 className="text-base font-semibold mb-4">Weekly Goal Progress</h3>

      {/* KendoReact ProgressBar Section */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1">
          <ProgressBar
            value={progressValue}
            max={100}
            style={{ height: '8px' }}
          />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-fitness-600">{progressValue}%</div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-28 mt-4">
        <ChartContainer
          config={{
            weeklyBar: {
              color: '#4338ca',
            },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10 }}
              />
              <ChartTooltip
                content={<ChartTooltipContent formatter={(value) => [`${value}%`, 'Progress']} />}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={22}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 6 ? '#4338ca' : '#818cf8'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Additional Info */}
      <p className="text-xs text-slate-500 mt-3">
        Goal: {Object.values(completedWorkouts).filter(v => v).length} / {workouts.length} workouts completed
      </p>
    </div>
  );
};

export default ProgressChart;
