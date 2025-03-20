
import React from 'react';
import { Workout } from '@/types/workout';
import { calculateWeeklyProgress } from '@/utils/mockData';
import { BarChart, Bar, XAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';
import { Progress } from "@/components/ui/progress";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";

interface ProgressChartProps {
  workouts: Workout[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workouts }) => {
  const progressValue = calculateWeeklyProgress(workouts);
  const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const chartData = categories.map((day, index) => {
    // Use the existing data or generate placeholder values
    const values = [20, 40, 45, 30, 50, 60, progressValue];
    return {
      name: day,
      value: values[index]
    };
  });

  return (
    <div className="elegant-card animate-fade-up p-5 shadow-elegant rounded-xl bg-white">
      <h3 className="text-base font-semibold mb-4">Weekly Goal Progress</h3>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-fitness-600">
          {progressValue}%
        </div>
      </div>
      
      <div className="h-28 mt-4">
        <ChartContainer 
          config={{
            weeklyBar: {
              color: "#4338ca",
            }
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
                content={
                  <ChartTooltipContent formatter={(value) => [`${value}%`, 'Progress']} />
                } 
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
                barSize={20}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 6 ? "#4338ca" : "#818cf8"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <p className="text-xs text-slate-500 mt-3">
        Goal: 1,000 reps this week
      </p>
    </div>
  );
};

export default ProgressChart;
