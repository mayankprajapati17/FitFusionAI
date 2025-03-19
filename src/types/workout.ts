
export interface Workout {
  id: string;
  exerciseName: string;
  exerciseType: ExerciseType;
  date: string;
  reps: number;
  duration?: number; // in minutes, for cardio
  weight?: number; // in kg, for strength
  sets?: number; // for strength
  notes?: string;
}

export type ExerciseType = 'Cardio' | 'Strength' | 'Flexibility';

export interface WorkoutFormData {
  exerciseName: string;
  exerciseType: ExerciseType;
  date: string;
  reps: number;
  duration?: number;
  weight?: number;
  sets?: number;
  notes?: string;
}

export interface CategoryFilter {
  activeTab: ExerciseType | 'All';
}
