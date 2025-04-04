
import React, { useState, useEffect } from 'react';
import { Workout, ExerciseType } from '@/types/workout';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from '@progress/kendo-react-inputs';

interface WorkoutTableProps {
  workouts: Workout[];
  onSortChange: (column: keyof Workout) => void;
  sortColumn: keyof Workout;
  sortDirection: 'asc' | 'desc';
  onWorkoutStatusChange?: (completedWorkouts: {[key: string]: boolean}) => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ 
  workouts, 
  onSortChange,
  sortColumn,
  sortDirection,
  onWorkoutStatusChange
}) => {
  const [selectedWorkouts, setSelectedWorkouts] = useState<{[key: string]: boolean}>({});
  
  useEffect(() => {
    // Call the callback whenever selected workouts change
    if (onWorkoutStatusChange) {
      onWorkoutStatusChange(selectedWorkouts);
    }
  }, [selectedWorkouts, onWorkoutStatusChange]);

  const getTypeColor = (type: ExerciseType) => {
    switch (type) {
      case 'Cardio': return 'blue';
      case 'Strength': return 'yellow';
      case 'Flexibility': return 'green';
      default: return 'secondary';
    }
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  const renderSortIndicator = (column: keyof Workout) => {
    if (sortColumn !== column) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  const handleHeaderClick = (column: keyof Workout) => {
    onSortChange(column);
  };

  const handleCheckboxChange = (workoutId: string) => {
    setSelectedWorkouts(prev => ({
      ...prev,
      [workoutId]: !prev[workoutId]
    }));
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-elegant animate-fade-up">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50" 
              onClick={() => handleHeaderClick('date')}
            >
              <div className="flex items-center">
                Date
                {renderSortIndicator('date')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50" 
              onClick={() => handleHeaderClick('exerciseName')}
            >
              <div className="flex items-center">
                Exercise
                {renderSortIndicator('exerciseName')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50" 
              onClick={() => handleHeaderClick('exerciseType')}
            >
              <div className="flex items-center">
                Type
                {renderSortIndicator('exerciseType')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-slate-50" 
              onClick={() => handleHeaderClick('reps')}
            >
              <div className="flex items-center">
                Reps/Sets
                {renderSortIndicator('reps')}
              </div>
            </TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="w-[90px] text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workouts.map((workout) => (
            <TableRow key={workout.id}>
              <TableCell>{formatDate(workout.date)}</TableCell>
              <TableCell>{workout.exerciseName}</TableCell>
              <TableCell>
                <Badge variant={getTypeColor(workout.exerciseType) as any}>
                  {workout.exerciseType}
                </Badge>
              </TableCell>
              <TableCell>
                {workout.exerciseType === 'Strength' && workout.sets 
                  ? `${workout.reps} × ${workout.sets}` 
                  : workout.reps}
              </TableCell>
              <TableCell>
                {workout.weight && `${workout.weight}kg`}
                {workout.duration && `${workout.duration} min`}
                {workout.notes && workout.notes.length > 25
                  ? `${workout.notes.substring(0, 25)}...`
                  : workout.notes}
              </TableCell>
              <TableCell className="text-center">
                <Checkbox
                  checked={!!selectedWorkouts[workout.id]}
                  onChange={() => handleCheckboxChange(workout.id)}
                  label=""
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkoutTable;
