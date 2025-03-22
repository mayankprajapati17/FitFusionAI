import CategoryTabs from '@/components/CategoryTabs';
import Navbar from '@/components/Navbar';
import PersonalBestCard from '@/components/PersonalBestCard';
import ProgressChart from '@/components/ProgressChart';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import WorkoutForm from '@/components/WorkoutForm';
import WorkoutTable from '@/components/WorkoutTable';
import ExerciseButtons from '@/components/ExerciseButtons';
import { ExerciseType, Workout, WorkoutFormData } from '@/types/workout';
import { filterWorkoutsByType, generateMockWorkouts } from '@/utils/mockData';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<ExerciseType | 'All'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof Workout>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [completedWorkouts, setCompletedWorkouts] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const initialWorkouts = generateMockWorkouts();
    setWorkouts(initialWorkouts);
  }, []);

  useEffect(() => {
    let filtered = filterWorkoutsByType(workouts, activeTab);

    filtered = [...filtered].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (sortColumn === 'date') {
        return sortDirection === 'asc'
          ? new Date(aValue as string).getTime() - new Date(bValue as string).getTime()
          : new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }

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
      setSortDirection('desc');
    }
  };

  const handleWorkoutStatusChange = (updatedWorkouts: {[key: string]: boolean}) => {
    setCompletedWorkouts(updatedWorkouts);
  };

  const workoutCounts = {
    All: workouts.length,
    Cardio: workouts.filter(w => w.exerciseType === 'Cardio').length,
    Strength: workouts.filter(w => w.exerciseType === 'Strength').length,
    Flexibility: workouts.filter(w => w.exerciseType === 'Flexibility').length,
  };

  const exerciseNames = [...new Set(workouts.map(w => w.exerciseName))];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddWorkoutClick={() => setIsFormOpen(true)} />

      <main className="fitness-container py-8">
        <div className="flex justify-between items-start gap-6 flex-col lg:flex-row">
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-elegant">
              <h2 className="text-lg font-semibold mb-4">Exercises</h2>
              <ExerciseButtons
                exerciseNames={exerciseNames}
                onExerciseClick={(exerciseName) => {
                  const filtered = workouts.filter(w => w.exerciseName === exerciseName);
                  if (filtered.length > 0) {
                    setActiveTab(filtered[0].exerciseType);
                    toast({
                      title: `${exerciseName} workouts`,
                      description: `Showing ${filtered.length} ${exerciseName} workouts.`,
                    });
                  }
                }}
              />
              
              <Button 
                onClick={() => setIsFormOpen(true)} 
                className="w-full mt-4 bg-red-500 hover:bg-red-600 flex items-center gap-2 text-white"
              >
                <Plus className="h-4 w-4" />
                Log Workout
              </Button>
            </div>
            
            <ProgressChart workouts={workouts} completedWorkouts={completedWorkouts} />
            <PersonalBestCard workouts={workouts} />
          </div>

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
              onWorkoutStatusChange={handleWorkoutStatusChange}
            />
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
