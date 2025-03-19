
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import WorkoutTable from '@/components/WorkoutTable';
import WorkoutForm from '@/components/WorkoutForm';
import CategoryTabs from '@/components/CategoryTabs';
import ProgressChart from '@/components/ProgressChart';
import PersonalBestCard from '@/components/PersonalBestCard';
import { Workout, WorkoutFormData, ExerciseType } from '@/types/workout';
import { generateMockWorkouts, filterWorkoutsByType, sortWorkoutsByDate } from '@/utils/mockData';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<ExerciseType | 'All'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof Workout>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  // Load mock data
  useEffect(() => {
    const initialWorkouts = generateMockWorkouts();
    setWorkouts(initialWorkouts);
  }, []);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = filterWorkoutsByType(workouts, activeTab);
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      
      // Handle date comparison
      if (sortColumn === 'date') {
        return sortDirection === 'asc'
          ? new Date(aValue as string).getTime() - new Date(bValue as string).getTime()
          : new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
      }
      
      // Handle number comparison
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Handle string comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });
    
    setFilteredWorkouts(filtered);
  }, [workouts, activeTab, sortColumn, sortDirection]);
  
  const handleAddWorkout = (data: WorkoutFormData) => {
    const newWorkout: Workout = {
      id: uuidv4(),
      ...data,
    };
    
    setWorkouts([newWorkout, ...workouts]);
    setIsFormOpen(false);
    
    toast({
      title: "Workout added",
      description: `${data.exerciseName} has been added to your workouts.`,
    });
  };
  
  const handleSortChange = (column: keyof Workout) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc'); // Default to descending for new column
    }
  };
  
  // Count workouts by type
  const workoutCounts = {
    All: workouts.length,
    Cardio: workouts.filter(w => w.exerciseType === 'Cardio').length,
    Strength: workouts.filter(w => w.exerciseType === 'Strength').length,
    Flexibility: workouts.filter(w => w.exerciseType === 'Flexibility').length,
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddWorkoutClick={() => setIsFormOpen(true)} />
      
      <main className="fitness-container py-8">
        <div className="flex justify-between items-start gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-3/4">
            <h1 className="text-3xl font-bold mb-6 fade-up">Your Fitness Journey</h1>
            
            <CategoryTabs 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
              workoutCounts={workoutCounts}
            />
            
            <WorkoutTable 
              workouts={filteredWorkouts}
              onSortChange={handleSortChange}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
            />
          </div>
          
          <div className="w-full lg:w-1/4 space-y-6 mt-6 lg:mt-0">
            <ProgressChart workouts={workouts} />
            <PersonalBestCard workouts={workouts} />
          </div>
        </div>
      </main>
      
      <WorkoutForm 
        isOpen={isFormOpen}
        onSubmit={handleAddWorkout}
        onCancel={() => setIsFormOpen(false)}
      />
    </div>
  );
};

export default Index;
