
import React, { useEffect } from 'react';
import { Workout } from '@/types/workout';
import { calculateWeeklyProgress } from '@/utils/mockData';
import { ProgressBar } from '@progress/kendo-react-progressbars';

interface ProgressChartProps {
  workouts: Workout[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workouts }) => {
  const progressValue = calculateWeeklyProgress(workouts);
  
  return (
    <div className="elegant-card animate-fade-up">
      <h3 className="text-base font-semibold mb-2">Weekly Goal Progress</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <ProgressBar
            value={progressValue}
            labelVisible={false}
            animation={{ 
              duration: 1000 
            }}
          />
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
      <p className="text-xs text-slate-500 mt-2">
        Goal: 1,000 reps this week
      </p>
    </div>
  );
};

export default ProgressChart;
