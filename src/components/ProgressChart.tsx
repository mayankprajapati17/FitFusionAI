
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Workout } from '@/types/workout';
import { calculateWeeklyProgress } from '@/utils/mockData';
import { ProgressBar } from '@progress/kendo-react-progressbars'; // KendoReact ProgressBars
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
  const chunkCount = 7; // One chunk per day of the week

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

  // Generate chart data for the bar chart
  const chartData = categories.map((day, index) => {
    const values = [20, 40, 45, 30, 50, 60, progressValue]; // Placeholder values for days, keep last day as our calculated progress
    return {
      name: day,
      value: values[index],
    };
  });

  return (
    <div className="elegant-card animate-fade-up p-5 shadow-elegant rounded-xl bg-white">
      <h3 className="text-base font-semibold mb-4">Weekly Goal Progress</h3>

      {/* KendoReact ProgressBar Section */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1">
          {/* Standard ProgressBar */}
          <ProgressBar
            value={progressValue}
            max={100}
            style={{ height: '8px' }} // Matches original h-2 (~8px)
          />
          {/* Optional ChunkProgressBar */}
          {/* Uncomment the following block to include ChunkProgressBar */}
          {/*
          <div className="mt-2">
            <ChunkProgressBar
              value={progressValue}
              max={100}
              chunkCount={chunkCount}
              style={{ height: '8px' }}
            />
          </div>
          */}
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
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={20}>
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
