
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
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';

const Index = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState<Workout[]>([]);
  const [activeTab, setActiveTab] = useState<ExerciseType | 'All'>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState<keyof Workout>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [completedWorkouts, setCompletedWorkouts] = useState<{[key: string]: boolean}>({});
  const [notification, setNotification] = useState<{ show: boolean, exercise: string } | null>(null);

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

  const handleExerciseClick = (exerciseName: string) => {
    const filtered = workouts.filter(w => w.exerciseName === exerciseName);
    if (filtered.length > 0) {
      setActiveTab(filtered[0].exerciseType);
      
      // Show notification
      setNotification({ show: true, exercise: exerciseName });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
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
          <div className="w-full lg:w-1/5">
            <ExerciseButtons
              exerciseNames={exerciseNames}
              onExerciseClick={handleExerciseClick}
            />
          </div>

          <div className="w-full lg:w-3/5">
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

          <div className="w-full lg:w-1/5 space-y-6 mt-6 lg:mt-0">
            <div className="flex flex-col gap-4 mb-4">
              <Button 
                onClick={() => setIsFormOpen(true)} 
                className="bg-red-500 hover:bg-red-600 flex items-center gap-2 text-white"
              >
                <Plus className="h-4 w-4" />
                Log Workout
              </Button>
              
              <ProgressChart workouts={workouts} completedWorkouts={completedWorkouts} />
            </div>
            <PersonalBestCard workouts={workouts} />
          </div>
        </div>
      </main>

      <WorkoutForm
        isOpen={isFormOpen}
        onSubmit={handleAddWorkout}
        onCancel={() => setIsFormOpen(false)}
      />

      {/* Kendo React Notification */}
      <NotificationGroup style={{ position: 'fixed', right: 16, top: 16 }}>
        {notification && notification.show && (
          <Notification
            type={{ style: 'success', icon: true }}
            closable={true}
            onClose={() => setNotification(null)}
          >
            <div>
              <h3 className="font-semibold">{notification.exercise} Workouts</h3>
              <p>Filtering workouts for {notification.exercise}</p>
            </div>
          </Notification>
        )}
      </NotificationGroup>
    </div>
  );
};

export default Index;
