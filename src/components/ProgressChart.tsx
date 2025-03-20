
import React from 'react';
import { Workout } from '@/types/workout';
import { calculateWeeklyProgress } from '@/utils/mockData';
import { Progress } from "@/components/ui/progress";

interface ProgressChartProps {
  workouts: Workout[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workouts }) => {
  const progressValue = calculateWeeklyProgress(workouts);
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyData = [20, 40, 45, 30, 50, 60, progressValue];
  
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm animate-fade-up">
      <h3 className="text-base font-semibold mb-4">Weekly Goal Progress</h3>
      
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-1">
          <Progress value={progressValue} className="h-2 w-full" />
          <div className="flex justify-between mt-2 text-xs text-slate-500">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        <div className="text-2xl font-bold text-indigo-600">
          {progressValue}%
        </div>
      </div>
      
      <div className="h-28 mt-4">
        <div className="flex items-end h-full gap-1">
          {weeklyData.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-indigo-600 rounded-t"
                style={{ height: `${value}%` }}
              />
              <span className="text-xs text-slate-500 mt-1">{weekDays[index]}</span>
            </div>
          ))}
        </div>
      </div>
      
      <p className="text-xs text-slate-500 mt-3">
        Goal: 1,000 reps this week
      </p>
    </div>
  );
};

export default ProgressChart;
