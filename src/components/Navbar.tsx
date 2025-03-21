
import { cn } from '@/lib/utils';
import { BarChart3, Dumbbell, Home, User, Wand2 } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
            <NavLink href="/" icon={<Home className="h-4 w-4" />}>Home</NavLink>
            <NavLink href="/dashboard" icon={<BarChart3 className="h-4 w-4" />}>Dashboard</NavLink>
            <NavLink href="/profile" icon={<User className="h-4 w-4" />}>Profile</NavLink>
            <NavLink href="#" icon={<Wand2 className="h-4 w-4" />}>Make Your Own Plan</NavLink>
          </nav>
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
  const location = useLocation();
  const isCurrentPage = location.pathname === href;
  
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
