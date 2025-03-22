
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import {
  Dumbbell,
  Bike,
  Scale,
  Utensils,
  Timer,
  Waves,
  Flame
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
    if (lowerName.includes('run')) return <Timer size={16} />;
    if (lowerName.includes('push')) return <Dumbbell size={16} />;
    if (lowerName.includes('bench')) return <Dumbbell size={16} />;
    if (lowerName.includes('yoga') || lowerName.includes('stretch')) return <StretchingIcon size={16} />;
    if (lowerName.includes('cycle') || lowerName.includes('bike')) return <Bike size={16} />;
    if (lowerName.includes('swim')) return <Waves size={16} />;
    if (lowerName.includes('squat') || lowerName.includes('deadlift')) return <Scale size={16} />;
    return <Flame size={16} />; // Default icon
  };

  return (
    <div className="mb-6 flex flex-wrap gap-2 animate-fade-up">
      {exerciseNames.map((name) => (
        <Button
          key={name}
          onClick={() => onExerciseClick(name)}
          themeColor="primary"
          rounded="large"
          className="hover:bg-fitness-600 focus:bg-fitness-700 transition-colors"
        >
          {getExerciseIcon(name)}
          <span className="ml-2">{name}</span>
        </Button>
      ))}
    </div>
  );
};

export default ExerciseButtons;
