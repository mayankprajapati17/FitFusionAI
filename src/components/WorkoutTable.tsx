
import React from 'react';
import { Workout, ExerciseType } from '@/types/workout';
import { MoreVertical } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  
  const getTypeColor = (type: ExerciseType): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case 'Cardio': return "default";
      case 'Strength': return "secondary";
      case 'Flexibility': return "outline";
      default: return "default";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  // Sort workouts based on current sortColumn and sortDirection
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortColumn === 'date') {
      return sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleHeaderClick = (column: keyof Workout) => {
    onSortChange(column);
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm animate-fade-up">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              onClick={() => handleHeaderClick('date')}
              className="cursor-pointer hover:bg-slate-50"
            >
              Date {sortColumn === 'date' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              onClick={() => handleHeaderClick('exerciseName')}
              className="cursor-pointer hover:bg-slate-50"
            >
              Exercise {sortColumn === 'exerciseName' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              onClick={() => handleHeaderClick('exerciseType')}
              className="cursor-pointer hover:bg-slate-50"
            >
              Type {sortColumn === 'exerciseType' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead 
              onClick={() => handleHeaderClick('reps')}
              className="cursor-pointer hover:bg-slate-50"
            >
              Reps/Sets {sortColumn === 'reps' && (sortDirection === 'asc' ? '↑' : '↓')}
            </TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedWorkouts.map((workout, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(workout.date)}</TableCell>
              <TableCell>{workout.exerciseName}</TableCell>
              <TableCell>
                <Badge variant={getTypeColor(workout.exerciseType)}>
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
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkoutTable;
