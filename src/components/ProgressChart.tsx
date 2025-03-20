
import React from 'react';
import { Workout } from '@/types/workout';
import { calculateWeeklyProgress } from '@/utils/mockData';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';
import 'hammerjs';

interface ProgressChartProps {
  workouts: Workout[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ workouts }) => {
  const progressValue = calculateWeeklyProgress(workouts);
  const categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  return (
    <div className="elegant-card animate-fade-up">
      <h3 className="text-base font-semibold mb-4">Weekly Goal Progress</h3>
      
      <div className="flex items-center gap-4 mb-3">
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
      
      <div className="h-28 mt-4">
        <Chart>
          <ChartCategoryAxis>
            <ChartCategoryAxisItem categories={categories} />
          </ChartCategoryAxis>
          <ChartSeries>
            <ChartSeriesItem
              type="column"
              data={[20, 40, 45, 30, 50, 60, progressValue]}
              color="#4338ca"
              labels={{
                visible: false
              }}
            />
          </ChartSeries>
        </Chart>
      </div>
      
      <p className="text-xs text-slate-500 mt-3">
        Goal: 1,000 reps this week
      </p>
    </div>
  );
};

export default ProgressChart;
