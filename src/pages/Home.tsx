
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Heart, Calendar, Brain, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onAddWorkoutClick={() => {}} />

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438" 
            alt="Person lifting weights" 
            className="w-full h-full object-cover brightness-[0.85]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
        <div className="relative z-20 h-full fitness-container flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl animate-fade-up">
            AI-Powered Workout Planner
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-xl mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Your personalized fitness journey starts here
          </p>
          <Link to="/dashboard">
            <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Start Planning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="fitness-container">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our AI-powered workout planner creates personalized fitness programs based on your goals, preferences, and fitness level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8 text-fitness-600" />}
              title="AI-Generated Plans"
              description="Personalized workout routines created by our advanced AI algorithm based on your fitness goals."
            />
            <FeatureCard
              icon={<Dumbbell className="h-8 w-8 text-fitness-600" />}
              title="Customized Goals"
              description="Set your fitness goals - strength, cardio, flexibility - and get a tailored program."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-fitness-600" />}
              title="Weekly Scheduling"
              description="Organize your workouts with weekly schedules that adapt to your availability."
            />
            <FeatureCard
              icon={<Heart className="h-8 w-8 text-fitness-600" />}
              title="Progress Tracking"
              description="Track your progress, set personal records, and visualize your fitness journey."
            />
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-16 bg-fitness-900 text-white">
        <div className="fitness-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Fitness Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start using our AI-Powered Workout Planner today and achieve your fitness goals faster.
          </p>
          <Link to="/dashboard">
            <Button className="elegant-button bg-white text-fitness-900 hover:bg-white/90 px-8 py-6 text-lg font-semibold">
              Start Planning Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-white/80">
        <div className="fitness-container text-center">
          <p>Built with shadcn/ui by FitTrack AI</p>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <Card className="h-full elegant-card hover:translate-y-[-5px]">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default Home;
