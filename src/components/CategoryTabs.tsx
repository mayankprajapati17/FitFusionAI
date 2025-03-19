
import { useEffect, useRef } from 'react';
import { Activity, Dumbbell, Yoga } from 'lucide-react';
import { ExerciseType } from '@/types/workout';
import { cn } from '@/lib/utils';

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
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateIndicator = () => {
      const activeElement = tabsRef.current?.querySelector('[data-state="active"]');
      if (activeElement && indicatorRef.current) {
        const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
        indicatorRef.current.style.left = `${offsetLeft}px`;
        indicatorRef.current.style.width = `${offsetWidth}px`;
      }
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  const tabs = [
    { id: 'All', label: 'All Workouts', icon: null },
    { id: 'Cardio', label: 'Cardio', icon: <Activity className="h-4 w-4" /> },
    { id: 'Strength', label: 'Strength', icon: <Dumbbell className="h-4 w-4" /> },
    { id: 'Flexibility', label: 'Flexibility', icon: <Yoga className="h-4 w-4" /> },
  ];

  return (
    <div className="w-full overflow-x-auto pb-1 hide-scrollbar elegant-section">
      <div 
        className="flex relative border-b border-slate-200"
        ref={tabsRef}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-state={activeTab === tab.id ? "active" : "inactive"}
            onClick={() => onTabChange(tab.id as ExerciseType | 'All')}
            className={cn(
              "flex items-center gap-1.5 px-4 py-3 text-sm font-medium relative whitespace-nowrap transition-all duration-200",
              activeTab === tab.id
                ? "text-fitness-600" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {workoutCounts[tab.id as keyof typeof workoutCounts] > 0 && (
              <span className={cn(
                "ml-1.5 text-xs px-1.5 py-0.5 rounded-full transition-colors",
                activeTab === tab.id
                  ? "bg-fitness-100 text-fitness-600"
                  : "bg-slate-100 text-slate-500"
              )}>
                {workoutCounts[tab.id as keyof typeof workoutCounts]}
              </span>
            )}
          </button>
        ))}
        <div 
          ref={indicatorRef}
          className="absolute bottom-0 h-0.5 bg-fitness-600 transition-all duration-300"
          style={{ left: '0', width: '0' }}
        />
      </div>
    </div>
  );
};

export default CategoryTabs;
