
import { Workout, ExerciseType } from '../types/workout';

// Generate a date string for a specific number of days ago
const getDateString = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Generate mock workout data
export const generateMockWorkouts = (): Workout[] => {
  return [
    {
      id: '1',
      exerciseName: 'Running',
      exerciseType: 'Cardio',
      date: getDateString(0),
      reps: 1,
      duration: 30,
      notes: 'Morning run in the park'
    },
    {
      id: '2',
      exerciseName: 'Push-ups',
      exerciseType: 'Strength',
      date: getDateString(1),
      reps: 50,
      sets: 5,
      notes: 'Increased reps from last session'
    },
    {
      id: '3',
      exerciseName: 'Bench Press',
      exerciseType: 'Strength',
      date: getDateString(2),
      reps: 40,
      sets: 4,
      weight: 60,
      notes: 'Felt strong today'
    },
    {
      id: '4',
      exerciseName: 'Yoga',
      exerciseType: 'Flexibility',
      date: getDateString(3),
      reps: 1,
      duration: 45,
      notes: 'Focus on lower back flexibility'
    },
    {
      id: '5',
      exerciseName: 'Cycling',
      exerciseType: 'Cardio',
      date: getDateString(4),
      reps: 1,
      duration: 60,
      notes: 'Long ride on the coastal route'
    },
    {
      id: '6',
      exerciseName: 'Squats',
      exerciseType: 'Strength',
      date: getDateString(5),
      reps: 60,
      sets: 3,
      weight: 80,
      notes: 'Working on form'
    },
    {
      id: '7',
      exerciseName: 'Deadlift',
      exerciseType: 'Strength',
      date: getDateString(1),
      reps: 30,
      sets: 3,
      weight: 100,
      notes: 'Personal best on weight'
    },
    {
      id: '8',
      exerciseName: 'Swimming',
      exerciseType: 'Cardio',
      date: getDateString(6),
      reps: 1,
      duration: 45,
      notes: 'Practiced freestyle technique'
    },
  ];
};

// Calculate total workout stats
export const calculateTotalReps = (workouts: Workout[]): number => {
  return workouts.reduce((total, workout) => {
    // For strength exercises, multiply reps by sets
    if (workout.exerciseType === 'Strength' && workout.sets) {
      return total + (workout.reps * workout.sets);
    }
    return total + workout.reps;
  }, 0);
};

export const calculateTotalDuration = (workouts: Workout[]): number => {
  return workouts.reduce((total, workout) => {
    return total + (workout.duration || 0);
  }, 0);
};

// Find the personal best workout
export const findPersonalBest = (workouts: Workout[]): Workout | null => {
  if (workouts.length === 0) return null;
  
  // For strength workouts, find the one with highest weight * reps * sets
  const strengthWorkouts = workouts.filter(w => w.exerciseType === 'Strength' && w.weight);
  if (strengthWorkouts.length > 0) {
    return strengthWorkouts.reduce((best, current) => {
      const bestScore = (best.weight || 0) * best.reps * (best.sets || 1);
      const currentScore = (current.weight || 0) * current.reps * (current.sets || 1);
      return currentScore > bestScore ? current : best;
    }, strengthWorkouts[0]);
  }
  
  // If no strength workouts, return the cardio workout with longest duration
  const cardioWorkouts = workouts.filter(w => w.exerciseType === 'Cardio');
  if (cardioWorkouts.length > 0) {
    return cardioWorkouts.reduce((longest, current) => {
      return (current.duration || 0) > (longest.duration || 0) ? current : longest;
    }, cardioWorkouts[0]);
  }
  
  // If no cardio either, just return the first workout
  return workouts[0];
};

// Filter workouts by type
export const filterWorkoutsByType = (workouts: Workout[], type: ExerciseType | 'All'): Workout[] => {
  if (type === 'All') return workouts;
  return workouts.filter(workout => workout.exerciseType === type);
};

// Sort workouts by date (newest first)
export const sortWorkoutsByDate = (workouts: Workout[]): Workout[] => {
  return [...workouts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get weekly progress percentage (simplified)
export const calculateWeeklyProgress = (workouts: Workout[]): number => {
  const weeklyGoal = 1000; // Arbitrary goal of 1000 reps per week
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  
  const thisWeeksWorkouts = workouts.filter(workout => {
    const workoutDate = new Date(workout.date);
    return workoutDate >= weekStart;
  });
  
  const totalReps = calculateTotalReps(thisWeeksWorkouts);
  return Math.min(Math.round((totalReps / weeklyGoal) * 100), 100);
};
