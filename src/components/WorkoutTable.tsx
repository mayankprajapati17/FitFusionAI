
import React, { useState } from 'react';
import { Workout, ExerciseType } from '@/types/workout';
import { ChevronDown, ChevronUp, Filter, MoreVertical, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkoutTableProps {
  workouts: Workout[];
  onSortChange: (column: keyof Workout) => void;
  sortColumn: keyof Workout;
  sortDirection: 'asc' | 'desc';
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ 
  workouts, 
  onSortChange,
  sortColumn,
  sortDirection 
}) => {
  
  const getTypeColor = (type: ExerciseType) => {
    switch (type) {
      case 'Cardio': return 'text-blue-600 bg-blue-50';
      case 'Strength': return 'text-orange-600 bg-orange-50';
      case 'Flexibility': return 'text-emerald-600 bg-emerald-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderSortIcon = (column: keyof Workout) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="ml-1 h-4 w-4 text-muted-foreground/50" />;
    }
    return sortDirection === 'asc' 
      ? <ChevronUp className="ml-1 h-4 w-4 text-fitness-600" /> 
      : <ChevronDown className="ml-1 h-4 w-4 text-fitness-600" />;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-elegant animate-fade-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80">
              <th className="p-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange('date')}
                >
                  Date
                  {renderSortIcon('date')}
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange('exerciseName')}
                >
                  Exercise
                  {renderSortIcon('exerciseName')}
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange('exerciseType')}
                >
                  Type
                  {renderSortIcon('exerciseType')}
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-slate-500">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => onSortChange('reps')}
                >
                  Reps/Sets
                  {renderSortIcon('reps')}
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-slate-500">Details</th>
              <th className="p-4 text-right text-sm font-medium text-slate-500"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {workouts.length > 0 ? (
              workouts.map((workout) => (
                <tr 
                  key={workout.id} 
                  className="transition-colors hover:bg-slate-50"
                >
                  <td className="p-4 text-sm text-slate-700">{formatDate(workout.date)}</td>
                  <td className="p-4 text-sm font-medium">{workout.exerciseName}</td>
                  <td className="p-4">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      getTypeColor(workout.exerciseType)
                    )}>
                      {workout.exerciseType}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    {workout.exerciseType === 'Strength' && workout.sets 
                      ? `${workout.reps} × ${workout.sets}` 
                      : workout.reps}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {workout.weight && `${workout.weight}kg`}
                    {workout.duration && `${workout.duration} min`}
                    {workout.notes && workout.notes.length > 25
                      ? `${workout.notes.substring(0, 25)}...`
                      : workout.notes}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-8 text-center text-slate-500">
                  No workouts found. Start by logging your first workout!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutTable;
