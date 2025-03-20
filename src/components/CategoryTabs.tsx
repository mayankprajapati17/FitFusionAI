
import React from 'react';
import { Activity, Dumbbell, Leaf } from 'lucide-react';
import { ExerciseType } from '@/types/workout';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

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

  return (
    <div className="w-full pb-2">
      <Tabs defaultValue={activeTab} onValueChange={(value) => onTabChange(value as ExerciseType | 'All')}>
        <TabsList className="w-full justify-start">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2",
                activeTab === tab.id ? "bg-indigo-50 text-indigo-600" : ""
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {workoutCounts[tab.id as keyof typeof workoutCounts] > 0 && (
                <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                  {workoutCounts[tab.id as keyof typeof workoutCounts]}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default CategoryTabs;
