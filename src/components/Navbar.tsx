import { cn } from '@/lib/utils';
import { Button as KendoButton } from '@progress/kendo-react-buttons'; // KendoReact Button
import { BarChart3, Dumbbell, Home, Plus, User, Wand2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

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
            <NavLink href="/" icon={<Home className="h-4 w-4" />}>Dashboard</NavLink>
            <NavLink href="#" icon={<BarChart3 className="h-4 w-4" />}>Stats</NavLink>
            <NavLink href="/profile" icon={<User className="h-4 w-4" />}>Profile</NavLink>
            <NavLink href="#" icon={<Wand2 className="h-4 w-4" />}>Make Your Own Plan</NavLink>
          </nav>
          
          <div className="flex items-center gap-4">
            <KendoButton
              onClick={onAddWorkoutClick}
              className="hidden sm:flex items-center gap-2"
              themeColor="primary"
            >
              <Plus className="h-4 w-4" />
              Log Workout
            </KendoButton>
            
            <KendoButton
              onClick={onAddWorkoutClick}
              fillMode="outline"
              className="sm:hidden"
              style={{ width: '40px', height: '40px' }} // Matches size="icon"
            >
              <Plus className="h-5 w-5" />
            </KendoButton>
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
  const isCurrentPage = window.location.pathname === href;
  
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium transition-colors py-2",
        isCurrentPage || active
          ? "text-fitness-600" 
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};

export default Navbar;