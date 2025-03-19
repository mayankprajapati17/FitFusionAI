
import React from 'react';
import { Trophy } from 'lucide-react';
import { Workout } from '@/types/workout';
import { findPersonalBest } from '@/utils/mockData';

interface PersonalBestCardProps {
  workouts: Workout[];
}

const PersonalBestCard: React.FC<PersonalBestCardProps> = ({ workouts }) => {
  const personalBest = findPersonalBest(workouts);
  
  if (!personalBest) {
    return null;
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  const renderAchievement = () => {
    if (personalBest.exerciseType === 'Strength' && personalBest.weight) {
      return (
        <div className="mt-2">
          <div className="text-3xl font-bold text-fitness-600">
            {personalBest.weight} kg
          </div>
          <div className="text-sm text-slate-500">
            {personalBest.reps} reps × {personalBest.sets || 1} sets
          </div>
        </div>
      );
    }
    
    if (personalBest.exerciseType === 'Cardio' && personalBest.duration) {
      return (
        <div className="mt-2">
          <div className="text-3xl font-bold text-fitness-600">
            {personalBest.duration} min
          </div>
          <div className="text-sm text-slate-500">
            {personalBest.exerciseName}
          </div>
        </div>
      );
    }
    
    return (
      <div className="mt-2">
        <div className="text-3xl font-bold text-fitness-600">
          {personalBest.reps} reps
        </div>
        <div className="text-sm text-slate-500">
          {personalBest.exerciseName}
        </div>
      </div>
    );
  };
  
  return (
    <div className="elegant-card animate-fade-up">
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-600 mb-2">
            <Trophy className="h-3.5 w-3.5" />
            Personal Best
          </span>
          <h3 className="text-base font-semibold">
            {personalBest.exerciseName}
          </h3>
          {renderAchievement()}
        </div>
        <div className="text-sm text-slate-400">
          {formatDate(personalBest.date)}
        </div>
      </div>
    </div>
  );
};

export default PersonalBestCard;
