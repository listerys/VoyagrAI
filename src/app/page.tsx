'use client';

import Link from 'next/link';
import { TripPreferencesForm } from '@/components/TripPreferencesForm';
import { Button } from '@/components/ui/button';
import { 
  Globe, 
  Map, 
  CalendarDays, 
  CircleDollarSign, 
  PlaneTakeoff, 
  Hotel,
  ChevronRight,
  Sparkles,
  Compass,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Home() {
  return (
    <div className="bg-black text-zinc-100">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/40 to-black"></div>
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-[0.04]"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        
        <motion.div 
          className="relative container max-w-5xl mx-auto px-4 z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <Badge className="px-3 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-300 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
              AI-Powered Travel Planning
            </Badge>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-6xl sm:text-7xl font-bold tracking-tight text-center bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-zinc-400 leading-none mb-6"
          >
            Discover Your <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              Perfect Journey
            </span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-zinc-400 text-center max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Create personalized itineraries tailored to your preferences, 
            interests, and budget with our intelligent travel planner.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button size="lg" className="rounded-full px-8 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-0 text-white">
              <span className="font-medium">Start Planning</span>
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 py-6 bg-zinc-900/30 border border-zinc-800 text-zinc-300 hover:bg-zinc-800/50 hover:border-zinc-700 backdrop-blur-sm">
              Explore Destinations
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--tw-gradient-stops))] from-zinc-900/80 via-black to-black z-0"></div>
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Reimagine Your Travel Experience</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Our AI-powered platform analyzes thousands of options to create the perfect trip based on your unique preferences.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={slideInRight} className="group">
              <Card className="relative bg-transparent border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 to-transparent rounded-xl"></div>
                <div className="absolute inset-0 border border-cyan-900/20 rounded-xl"></div>
                <CardContent className="p-8 relative">
                  <div className="h-12 w-12 rounded-full bg-cyan-950/60 border border-cyan-900/40 flex items-center justify-center mb-6">
                    <Globe className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors mb-3">Personalized Itineraries</h3>
                  <p className="text-zinc-400">
                    Tailored travel plans based on your interests, preferences, and travel style.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={slideInRight} className="group">
              <Card className="relative bg-transparent border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 to-transparent rounded-xl"></div>
                <div className="absolute inset-0 border border-amber-900/20 rounded-xl"></div>
                <CardContent className="p-8 relative">
                  <div className="h-12 w-12 rounded-full bg-amber-950/60 border border-amber-900/40 flex items-center justify-center mb-6">
                    <Map className="h-6 w-6 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-amber-300 transition-colors mb-3">Interactive Maps</h3>
                  <p className="text-zinc-400">
                    Visualize your journey with detailed maps showing all your destinations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={slideInRight} className="group">
              <Card className="relative bg-transparent border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-950/30 to-transparent rounded-xl"></div>
                <div className="absolute inset-0 border border-violet-900/20 rounded-xl"></div>
                <CardContent className="p-8 relative">
                  <div className="h-12 w-12 rounded-full bg-violet-950/60 border border-violet-900/40 flex items-center justify-center mb-6">
                    <CalendarDays className="h-6 w-6 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors mb-3">Day-by-Day Planning</h3>
                  <p className="text-zinc-400">
                    Comprehensive daily schedules optimized for your time and preferences.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={slideInRight} className="group">
              <Card className="relative bg-transparent border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 to-transparent rounded-xl"></div>
                <div className="absolute inset-0 border border-emerald-900/20 rounded-xl"></div>
                <CardContent className="p-8 relative">
                  <div className="h-12 w-12 rounded-full bg-emerald-950/60 border border-emerald-900/40 flex items-center justify-center mb-6">
                    <CircleDollarSign className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors mb-3">Budget Management</h3>
                  <p className="text-zinc-400">
                    Cost estimates and budget breakdowns to help you plan financially.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={slideInRight} className="group">
              <Card className="relative bg-transparent border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-950/30 to-transparent rounded-xl"></div>
                <div className="absolute inset-0 border border-pink-900/20 rounded-xl"></div>
                <CardContent className="p-8 relative">
                  <div className="h-12 w-12 rounded-full bg-pink-950/60 border border-pink-900/40 flex items-center justify-center mb-6">
                    <PlaneTakeoff className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-pink-300 transition-colors mb-3">Travel Recommendations</h3>
                  <p className="text-zinc-400">
                    Insider tips on attractions, restaurants, and hidden gems.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={slideInRight} className="group">
              <Card className="relative bg-transparent border-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 to-transparent rounded-xl"></div>
                <div className="absolute inset-0 border border-blue-900/20 rounded-xl"></div>
                <CardContent className="p-8 relative">
                  <div className="h-12 w-12 rounded-full bg-blue-950/60 border border-blue-900/40 flex items-center justify-center mb-6">
                    <Hotel className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors mb-3">Accommodation Suggestions</h3>
                  <p className="text-zinc-400">
                    Lodging options that match your preferences and budget.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">How It Works</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
              Create your perfect travel itinerary in just a few simple steps
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute top-0 right-1/2 h-full w-px bg-gradient-to-b from-indigo-900/0 via-indigo-900/50 to-indigo-900/0 md:hidden"></div>
              <div className="flex flex-col items-center text-center relative">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 relative">
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <Compass className="h-8 w-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Share Your Preferences</h3>
                <p className="text-zinc-400 max-w-xs">
                  Tell us where you want to go, your travel dates, budget, and what you enjoy.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="absolute top-0 right-1/2 h-full w-px bg-gradient-to-b from-violet-900/0 via-violet-900/50 to-violet-900/0 md:hidden"></div>
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 relative">
                  <span className="absolute -top-2 -right-2 bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <Sparkles className="h-8 w-8 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">AI Creates Your Plan</h3>
                <p className="text-zinc-400 max-w-xs">
                  Our AI analyzes thousands of options to create a personalized itinerary.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 relative">
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <Globe className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Enjoy Your Journey</h3>
                <p className="text-zinc-400 max-w-xs">
                  Review, refine, and take your perfectly planned trip with you.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Form Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black"></div>
        <motion.div 
          className="container max-w-4xl mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-zinc-950/30 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                <div className="lg:col-span-2 bg-gradient-to-br from-indigo-900/30 to-violet-900/20 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="mb-6">
                    <Badge className="px-3 py-1 bg-zinc-900/80 border border-zinc-800 text-zinc-300 backdrop-blur-sm">
                      <Sparkles className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
                      AI-Powered
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Start Planning Your Trip</h2>
                  <p className="text-zinc-400 mb-8">
                    Fill in your preferences and let our AI create your perfect itinerary. We'll handle all the details so you can focus on the excitement of your upcoming adventure.
                  </p>
                  <div className="hidden lg:block">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mr-4">
                        <Compass className="h-5 w-5 text-indigo-400" />
                      </div>
                      <p className="text-zinc-300">Personalized destinations</p>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mr-4">
                        <CalendarDays className="h-5 w-5 text-violet-400" />
                      </div>
                      <p className="text-zinc-300">Optimized itineraries</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mr-4">
                        <CircleDollarSign className="h-5 w-5 text-purple-400" />
                      </div>
                      <p className="text-zinc-300">Smart budget allocation</p>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3 p-8 lg:p-10">
                  <TripPreferencesForm />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        
        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            className="text-center mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="px-3 py-1 mb-4 bg-zinc-900/80 border border-zinc-800 text-zinc-300 backdrop-blur-sm inline-flex items-center">
              <Star className="h-3.5 w-3.5 mr-1.5 text-amber-400" />
              Trusted by Travelers
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">What Travelers Say</h2>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <Card className="bg-transparent border-0 relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-zinc-950 rounded-xl"></div>
                <div className="absolute inset-0 border border-zinc-800/50 rounded-xl"></div>
                <CardContent className="p-8 relative space-y-6">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    "The AI created a perfect itinerary for our family trip to Japan. We discovered places we would have never found on our own!"
                  </p>
                  <div className="pt-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-800 to-violet-700 flex items-center justify-center text-white font-semibold text-lg mr-4">S</div>
                    <div>
                      <p className="font-semibold text-zinc-200">Sarah T.</p>
                      <p className="text-xs text-zinc-500">Tokyo, Japan Trip</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="bg-transparent border-0 relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-zinc-950 rounded-xl"></div>
                <div className="absolute inset-0 border border-zinc-800/50 rounded-xl"></div>
                <CardContent className="p-8 relative space-y-6">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    "I was skeptical at first, but this tool saved me hours of research. The budget breakdown was especially helpful."
                  </p>
                  <div className="pt-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-800 to-purple-700 flex items-center justify-center text-white font-semibold text-lg mr-4">M</div>
                    <div>
                      <p className="font-semibold text-zinc-200">Michael R.</p>
                      <p className="text-xs text-zinc-500">Barcelona, Spain Trip</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="bg-transparent border-0 relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 to-zinc-950 rounded-xl"></div>
                <div className="absolute inset-0 border border-zinc-800/50 rounded-xl"></div>
                <CardContent className="p-8 relative space-y-6">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-zinc-300 leading-relaxed">
                    "As a solo traveler, I appreciated how the planner balanced tourist attractions with authentic local experiences."
                  </p>
                  <div className="pt-4 flex items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-800 to-pink-700 flex items-center justify-center text-white font-semibold text-lg mr-4">E</div>
                    <div>
                      <p className="font-semibold text-zinc-200">Elena K.</p>
                      <p className="text-xs text-zinc-500">Bali, Indonesia Trip</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-zinc-950"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
        
        <motion.div 
          className="container text-center max-w-4xl mx-auto px-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-violet-900/20 to-purple-900/20"></div>
            <div className="absolute inset-0 border border-zinc-800 rounded-2xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-50"></div>
            
            <div className="relative p-12 sm:p-16">
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                Ready to explore the world?
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-lg">
                Start with your destination and preferences, and let our AI handle the rest.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="rounded-full px-8 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 border-0 text-white">
                  <span className="font-medium">Plan My Trip Now</span>
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-8 py-6 bg-zinc-900/40 border border-zinc-800 text-zinc-300 hover:bg-zinc-800/60 hover:border-zinc-700 backdrop-blur-sm">
                  View Sample Itineraries
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}