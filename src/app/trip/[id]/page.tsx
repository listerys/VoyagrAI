import Link from 'next/link';
import { TripPreferencesForm } from '@/components/TripPreferencesForm';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Map, 
  CalendarDays, 
  CircleDollarSign, 
  PlaneTakeoff, 
  Hotel 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Plan Your Perfect Trip with AI</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our intelligent travel planner creates personalized itineraries tailored to your 
          preferences, interests, and budget.
        </p>
      </section>
      
      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Globe className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold">Personalized Itineraries</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Tailored travel plans based on your interests, preferences, and travel style.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Map className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold">Interactive Maps</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Visualize your journey with detailed maps showing all your destinations.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <CalendarDays className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold">Day-by-Day Planning</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Comprehensive daily schedules optimized for your time and preferences.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <CircleDollarSign className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold">Budget Management</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Cost estimates and budget breakdowns to help you plan financially.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <PlaneTakeoff className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold">Travel Recommendations</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Insider tips on attractions, restaurants, and hidden gems.
          </p>
        </div>
        
        <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
          <Hotel className="h-10 w-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold">Accommodation Suggestions</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Lodging options that match your preferences and budget.
          </p>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Start Planning Your Trip</h2>
        <TripPreferencesForm />
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-muted py-8 px-4 rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-8">What Travelers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <p className="italic text-muted-foreground">
              "The AI created a perfect itinerary for our family trip to Japan. We discovered places we would have never found on our own!"
            </p>
            <p className="font-semibold mt-4">- Sarah T.</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <p className="italic text-muted-foreground">
              "I was skeptical at first, but this tool saved me hours of research. The budget breakdown was especially helpful."
            </p>
            <p className="font-semibold mt-4">- Michael R.</p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <p className="italic text-muted-foreground">
              "As a solo traveler, I appreciated how the planner balanced tourist attractions with authentic local experiences."
            </p>
            <p className="font-semibold mt-4">- Elena K.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Ready to explore the world?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Start with your destination and preferences, and let our AI handle the rest.
        </p>
        <div className="pt-4">
          <Button size="lg" asChild>
            <a href="#plan">Plan My Trip Now</a>
          </Button>
        </div>
      </section>
    </div>
  );
}