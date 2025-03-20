
import React from 'react';
import { Dumbbell, Home, BarChart3, Plus, User } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { cn } from '@/lib/utils';

interface NavbarProps {
  onAddWorkoutClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onAddWorkoutClick }) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/60 border-b border-slate-200/80 animate-fade-in">
      <div className="fitness-container">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-fitness-600" />
            <span className="text-xl font-medium tracking-tight">FitTrack</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="#" icon={<Home className="h-4 w-4" />} active>Dashboard</NavLink>
            <NavLink href="#" icon={<BarChart3 className="h-4 w-4" />}>Stats</NavLink>
            <NavLink href="#" icon={<User className="h-4 w-4" />}>Profile</NavLink>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={onAddWorkoutClick}
              className="hidden sm:flex items-center gap-2 k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
            >
              <Plus className="h-4 w-4" />
              Log Workout
            </Button>
            
            <Button 
              onClick={onAddWorkoutClick}
              className="sm:hidden p-2 rounded-full bg-fitness-600 text-white k-button k-button-md k-button-solid k-button-solid-primary"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, children, active }) => {
  return (
    <a
      href={href}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium transition-colors py-2",
        active 
          ? "text-fitness-600" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
};

export default Navbar;
