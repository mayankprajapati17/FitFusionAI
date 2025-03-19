import { useEffect } from 'react';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Activity, Dumbbell, Leaf } from 'lucide-react';
import { ExerciseType } from '@/types/workout';

interface CategoryTabsProps {
  activeTab: ExerciseType | 'All';
  onTabChange: (tab: ExerciseType | 'All') => void;
  workoutCounts: {
    All: number;
    Cardio: number;
    Strength: number;
    Flexibility: number;
  };
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeTab, 
  onTabChange,
  workoutCounts
}) => {
  
  const tabs = [
    { id: 'All', label: 'All Workouts', icon: null },
    { id: 'Cardio', label: 'Cardio', icon: <Activity className="h-4 w-4" /> },
    { id: 'Strength', label: 'Strength', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 'Flexibility', label: 'Flexibility', icon: <Leaf className="h-4 w-4" /> },
  ];

  const handleSelect = (e: any) => {
    onTabChange(tabs[e.selected].id as ExerciseType | 'All');
  };
  
  const selected = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className="w-full pb-2 elegant-section">
      <TabStrip
        selected={selected}
        onSelect={handleSelect}
        className="k-fitness-tabs"
      >
        {tabs.map((tab) => (
          <TabStripTab
            key={tab.id}
            title={
              <div className="flex items-center gap-1.5">
                {tab.icon}
                <span>{tab.label}</span>
                {workoutCounts[tab.id as keyof typeof workoutCounts] > 0 && (
                  <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {workoutCounts[tab.id as keyof typeof workoutCounts]}
                  </span>
                )}
              </div>
            }
          >
            {/* Tab content is rendered in the parent component */}
          </TabStripTab>
        ))}
      </TabStrip>
    </div>
  );
};

export default CategoryTabs;
