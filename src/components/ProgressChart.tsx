
import React, { useEffect, useRef } from 'react';
import { Workout } from '@/types/workout';
import { calculateWeeklyProgress } from '@/utils/mockData';

interface ProgressChartProps {
  workouts: Workout[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workouts }) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const progressValue = calculateWeeklyProgress(workouts);
  
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = `${progressValue}%`;
    }
  }, [progressValue]);
  
  return (
    <div className="elegant-card animate-fade-up">
      <h3 className="text-base font-semibold mb-2">Weekly Goal Progress</h3>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-fitness-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: '0%' }}
            />
          </div>
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
