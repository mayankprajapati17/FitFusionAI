
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import {
  Dumbbell,
  Running,
  Bike,
  Pool,
  Scale,
  Utensils
} from 'lucide-react';
import StretchingIcon from './icons/StretchingIcon';

interface ExerciseButtonsProps {
  exerciseNames: string[];
  onExerciseClick: (exerciseName: string) => void;
}

const ExerciseButtons: React.FC<ExerciseButtonsProps> = ({ exerciseNames, onExerciseClick }) => {
  // Map exercise names to icons
  const getExerciseIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('run')) return <Running size={16} />;
    if (lowerName.includes('push')) return <Dumbbell size={16} />;
    if (lowerName.includes('bench')) return <Dumbbell size={16} />;
    if (lowerName.includes('yoga') || lowerName.includes('stretch')) return <StretchingIcon size={16} />;
    if (lowerName.includes('cycle') || lowerName.includes('bike')) return <Bike size={16} />;
    if (lowerName.includes('swim')) return <Pool size={16} />;
    if (lowerName.includes('squat') || lowerName.includes('deadlift')) return <Scale size={16} />;
    return <Dumbbell size={16} />;
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2 animate-fade-up">
      {exerciseNames.map((name) => (
        <Button
          key={name}
          onClick={() => onExerciseClick(name)}
          icon={getExerciseIcon(name)}
          themeColor="primary"
          rounded="large"
          className="hover:bg-fitness-600 focus:bg-fitness-700 transition-colors"
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default ExerciseButtons;
