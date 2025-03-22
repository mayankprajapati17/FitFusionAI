
import React from 'react';
import {
  Dumbbell,
  Timer,
  Waves,
  Scale,
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
    if (lowerName.includes('cycle') || lowerName.includes('bike')) return <Waves size={16} />;
    if (lowerName.includes('swim')) return <Waves size={16} />;
    if (lowerName.includes('squat') || lowerName.includes('deadlift')) return <Scale size={16} />;
    return <Dumbbell size={16} />; // Default icon
  };

  return (
    <div className="mb-6 flex flex-col border rounded-md animate-fade-up">
      <div className="px-4 py-3 font-medium text-gray-600 border-b">
        Exercise
      </div>
      {exerciseNames.map((name) => (
        <button
          key={name}
          onClick={() => onExerciseClick(name)}
          className="flex items-center px-4 py-3 text-left hover:bg-slate-50 border-b last:border-b-0 transition-colors"
        >
          <span className="mr-2">{getExerciseIcon(name)}</span>
          <span className="text-gray-800">{name}</span>
        </button>
      ))}
    </div>
  );
};

export default ExerciseButtons;
