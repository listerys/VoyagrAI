'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { 
  Calendar as CalendarIcon, 
  Check, 
  ChevronsUpDown, 
  Loader2, 
  MapPin, 
  Users, 
  Calendar, 
  DollarSign, 
  Briefcase, 
  Heart, 
  Hotel, 
  Compass, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { generateTravelPlan } from '@/lib/api';
import { getInterestCategories, getAccommodationTypes, getTravelStyles } from '@/lib/utils';
import { MapView } from '@/components/MapView';

// Define your options
const interestOptions = getInterestCategories();
const accommodationOptions = getAccommodationTypes();
const travelStyleOptions = getTravelStyles();

// Define the schema with a top-level refine
const formSchema = z
  .object({
    destination: z.string().min(2, { message: 'Destination must be at least 2 characters.' }),
    origin_city: z.string().optional(),
    startDate: z.date({ required_error: 'Start date is required.' }),
    endDate: z.date({ required_error: 'End date is required.' }),
    budget: z.string().min(1, { message: 'Budget is required.' }),
    travelers: z.coerce
      .number()
      .min(1, { message: 'At least 1 traveler is required.' })
      .max(20, { message: 'Maximum 20 travelers allowed.' }),
    interests: z.array(z.string()).min(1, { message: 'Select at least one interest.' }),
    accommodation_type: z.string().optional(),
    travel_style: z.string().optional(),
    dietary_restrictions: z.array(z.string()).optional(),
    accessibility_needs: z.string().optional(),
  })
  .refine(
    (data) => data.endDate >= data.startDate,
    {
      message: 'End date must be after start date.',
      path: ['endDate'],
    }
  );

type FormValues = z.infer<typeof formSchema>;

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 200 
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

export function TripPreferencesForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [openInterests, setOpenInterests] = useState(false);
  const [formStage, setFormStage] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [previewDestination, setPreviewDestination] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Setup react-hook-form with zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: '',
      origin_city: '',
      budget: '',
      travelers: 2,
      interests: [],
      accommodation_type: undefined,
      travel_style: undefined,
      dietary_restrictions: [],
      accessibility_needs: '',
    },
  });

  useEffect(() => {
    // Trigger animation after component mount
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Handle submission
  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const preferences = {
        ...values,
        // store ISO strings
        startDate: values.startDate.toISOString().split('T')[0],
        endDate: values.endDate.toISOString().split('T')[0],
        // Add origin_city for flight search if provided
        origin_city: values.origin_city || undefined
      };

      const result = await generateTravelPlan(preferences);

      toast(
        'Trip planning started! We\'re creating your personalized itinerary. This may take a few minutes.'
      );
      router.push(`/trip/status/${result.job_id}`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to create travel plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const sections = [
    { name: "Destination", icon: <MapPin className="h-5 w-5" /> },
    { name: "Dates", icon: <Calendar className="h-5 w-5" /> },
    { name: "Details", icon: <Briefcase className="h-5 w-5" /> },
    { name: "Preferences", icon: <Heart className="h-5 w-5" /> }
  ];

  const nextStage = () => {
    if (formStage < 3) {
      setFormStage(formStage + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const prevStage = () => {
    if (formStage > 0) {
      setFormStage(formStage - 1);
    }
  };

  // Check if current stage is valid
  const isCurrentStageValid = () => {
    const currentFields = {
      0: ['destination', 'origin_city'],
      1: ['startDate', 'endDate'],
      2: ['budget', 'travelers'],
      3: ['interests', 'accommodation_type', 'travel_style', 'accessibility_needs']
    }[formStage];

    return currentFields?.every(field => {
      if (field === 'origin_city') return true; // Optional field
      if (field === 'accommodation_type' || field === 'travel_style') return true; // Optional fields
      if (field === 'accessibility_needs') return true; // Optional field
      
      const fieldState = form.getFieldState(field as any);
      return !fieldState.invalid;
    });
  };
  
  const getProgressPercent = () => {
    return ((formStage + 1) / 4) * 100;
  };

  return (
    <motion.div 
      className="w-full"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-zinc-400">Step {formStage + 1} of 4</div>
            <div className="text-xs text-zinc-400">{Math.round(getProgressPercent())}% Complete</div>
          </div>
          <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${getProgressPercent()}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="hidden md:flex justify-between mb-8">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={cn(
                "flex flex-col items-center space-y-2 relative",
                index <= formStage ? "opacity-100" : "opacity-50"
              )}
            >
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all z-10",
                  index < formStage ? "bg-indigo-600 text-white" : 
                  index === formStage ? "bg-violet-600 text-white" : 
                  "bg-zinc-800 text-zinc-400 border border-zinc-700"
                )}
              >
                {index < formStage ? (
                  <Check className="h-5 w-5" />
                ) : (
                  section.icon
                )}
              </div>
              <span className={cn(
                "text-xs font-medium",
                index <= formStage ? "text-zinc-200" : "text-zinc-500"
              )}>
                {section.name}
              </span>
              
              {/* Connector lines */}
              {index < sections.length - 1 && (
                <div className="absolute top-5 left-10 w-full h-px bg-zinc-800">
                  <motion.div 
                    className="h-full bg-indigo-600"
                    initial={{ width: '0%' }}
                    animate={{ width: index < formStage ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              {formStage === 0 && (
                <motion.div 
                  key="stage-0"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={slideUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">Where would you like to go?</h3>
                    <p className="text-zinc-400">Let us know your starting point and destination</p>
                  </motion.div>

                  {/* Origin City */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="origin_city"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <MapPin className="text-indigo-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Origin</FormLabel>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="New York, USA" 
                                {...field} 
                                disabled={isLoading} 
                                className="bg-zinc-900 border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all pl-3 text-zinc-200 h-12 rounded-lg"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-zinc-500 text-xs italic">
                            City or airport you'll be departing from
                          </FormDescription>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Destination */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="destination"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <MapPin className="text-violet-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Destination</FormLabel>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Paris, France" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  // Only update map after user stops typing for 1 second
                                  if (e.target.value.length > 2) {
                                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                    timeoutRef.current = setTimeout(() => {
                                      setPreviewDestination(e.target.value);
                                    }, 1000);
                                  }
                                }}
                                disabled={isLoading} 
                                className="bg-zinc-900 border-zinc-800 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all pl-3 text-zinc-200 h-12 rounded-lg"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-zinc-500 text-xs italic">
                            City, region, or country you want to visit
                          </FormDescription>
                          <FormMessage className="text-rose-400" />
                          
                          {previewDestination && (
                            <div className="mt-4">
                              <MapView 
                                destination={previewDestination}
                                height="250px"
                                zoomLevel={10}
                              />
                            </div>
                          )}
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </motion.div>
              )}

              {formStage === 1 && (
                <motion.div 
                  key="stage-1"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={slideUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">When are you traveling?</h3>
                    <p className="text-zinc-400">Select your travel dates</p>
                  </motion.div>

                  {/* Start Date */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <CalendarIcon className="text-indigo-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Departure Date</FormLabel>
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-full bg-zinc-900 border-zinc-800 text-left justify-between hover:bg-zinc-800 hover:border-indigo-500 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all h-12 rounded-lg',
                                    !field.value && 'text-zinc-500',
                                    field.value && 'text-zinc-200'
                                  )}
                                  disabled={isLoading}
                                >
                                  {field.value
                                    ? format(field.value, 'MMMM d, yyyy')
                                    : 'Select date'}
                                  <CalendarIcon className="h-4 w-4 text-zinc-400" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                                className="bg-zinc-900 text-zinc-200"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* End Date */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <CalendarIcon className="text-violet-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Return Date</FormLabel>
                          </div>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-full bg-zinc-900 border-zinc-800 text-left justify-between hover:bg-zinc-800 hover:border-violet-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all h-12 rounded-lg',
                                    !field.value && 'text-zinc-500',
                                    field.value && 'text-zinc-200'
                                  )}
                                  disabled={isLoading}
                                >
                                  {field.value
                                    ? format(field.value, 'MMMM d, yyyy')
                                    : 'Select date'}
                                  <CalendarIcon className="h-4 w-4 text-zinc-400" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-zinc-900 border-zinc-700" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) =>
                                  date < new Date() ||
                                  (form.getValues().startDate && date < form.getValues().startDate)
                                }
                                className="bg-zinc-900 text-zinc-200"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </motion.div>
              )}

              {formStage === 2 && (
                <motion.div 
                  key="stage-2"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={slideUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">Trip Details</h3>
                    <p className="text-zinc-400">Tell us about your budget and travel group</p>
                  </motion.div>

                  {/* Budget */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <DollarSign className="text-emerald-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Budget</FormLabel>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="5000 USD" 
                                {...field} 
                                disabled={isLoading} 
                                className="bg-zinc-900 border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all pl-3 text-zinc-200 h-12 rounded-lg"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-zinc-500 text-xs italic">
                            Your total budget for the trip
                          </FormDescription>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  {/* Travelers */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="travelers"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <Users className="text-amber-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Travelers</FormLabel>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                min={1}
                                max={20}
                                {...field}
                                disabled={isLoading}
                                className="bg-zinc-900 border-zinc-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all pl-3 text-zinc-200 h-12 rounded-lg"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-zinc-500 text-xs italic">
                            Number of people traveling with you
                          </FormDescription>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </motion.div>
              )}

              {formStage === 3 && (
                <motion.div 
                  key="stage-3"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  variants={staggerContainer}
                  className="space-y-6"
                >
                  <motion.div variants={slideUp} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-1">Travel Preferences</h3>
                    <p className="text-zinc-400">Help us create your perfect itinerary</p>
                  </motion.div>

                  {/* Interest Selection */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="interests"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <Heart className="text-rose-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Travel Interests</FormLabel>
                          </div>
                          <Popover open={openInterests} onOpenChange={setOpenInterests}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openInterests}
                                  className={cn(
                                    'w-full bg-zinc-900 border-zinc-800 text-left justify-between hover:bg-zinc-800 hover:border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all h-12 rounded-lg',
                                    !field.value.length && 'text-zinc-500',
                                    field.value.length && 'text-zinc-200'
                                  )}
                                  disabled={isLoading}
                                >
                                  {field.value.length
                                    ? `${field.value.length} interest${field.value.length !== 1 ? 's' : ''} selected`
                                    : 'What interests you?'}
                                  <ChevronsUpDown className="h-4 w-4 text-zinc-400" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0 bg-zinc-900 border-zinc-700 max-h-64 overflow-auto" align="start">
                              <Command className="bg-transparent">
                                <CommandInput placeholder="Search interests..." className="text-zinc-200 border-zinc-700" />
                                <CommandEmpty className="text-zinc-400 py-2">No interests found.</CommandEmpty>
                                <CommandGroup className="overflow-auto">
                                  {interestOptions.map((interest) => (
                                    <CommandItem
                                      key={interest.value}
                                      value={String(interest.value)}
                                      onSelect={() => {
                                        const alreadySelected = field.value.includes(interest.value);
                                        const newValue = alreadySelected
                                          ? field.value.filter((v) => v !== interest.value)
                                          : [...field.value, interest.value];
                                        field.onChange(newValue);
                                      }}
                                      className={cn(
                                        "text-zinc-200 hover:bg-zinc-800 aria-selected:bg-zinc-800",
                                        field.value.includes(interest.value) && "bg-indigo-900/30"
                                      )}
                                    >
                                      <div className={cn(
                                        "mr-2 h-5 w-5 rounded-full border border-zinc-700 flex items-center justify-center transition-all duration-200",
                                        field.value.includes(interest.value) 
                                          ? "bg-rose-500 border-rose-500" 
                                          : "bg-transparent"
                                      )}>
                                        <Check className={cn(
                                          "h-3 w-3 text-white transition-opacity",
                                          field.value.includes(interest.value) ? "opacity-100" : "opacity-0"
                                        )} />
                                      </div>
                                      {interest.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormDescription className="text-zinc-500 text-xs italic">
                            Select activities and experiences that interest you
                          </FormDescription>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* Accommodation Type */}
                    <motion.div variants={slideUp}>
                      <FormField
                        control={form.control}
                        name="accommodation_type"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <div className="flex items-center">
                              <Hotel className="text-sky-400 mr-2 h-4 w-4" />
                              <FormLabel className="font-medium text-zinc-200">Accommodation</FormLabel>
                            </div>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all h-12 rounded-lg">
                                  <SelectValue placeholder="Where would you like to stay?" className="text-zinc-500" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-200">
                                {accommodationOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value} className="hover:bg-zinc-800 focus:bg-zinc-800">
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-zinc-500 text-xs italic">
                              Your preferred type of accommodation
                            </FormDescription>
                            <FormMessage className="text-rose-400" />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    {/* Travel Style */}
                    <motion.div variants={slideUp}>
                      <FormField
                        control={form.control}
                        name="travel_style"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <div className="flex items-center">
                              <Compass className="text-purple-400 mr-2 h-4 w-4" />
                              <FormLabel className="font-medium text-zinc-200">Travel Style</FormLabel>
                            </div>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isLoading}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-zinc-900 border-zinc-800 text-zinc-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all h-12 rounded-lg">
                                  <SelectValue placeholder="How do you like to travel?" className="text-zinc-500" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-200">
                                {travelStyleOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value} className="hover:bg-zinc-800 focus:bg-zinc-800">
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-zinc-500 text-xs italic">
                              How you prefer to experience your travels
                            </FormDescription>
                            <FormMessage className="text-rose-400" />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </div>

                  {/* Additional Notes */}
                  <motion.div variants={slideUp}>
                    <FormField
                      control={form.control}
                      name="accessibility_needs"
                      render={({ field }) => (
                        <FormItem className="space-y-2">
                          <div className="flex items-center">
                            <MessageSquare className="text-orange-400 mr-2 h-4 w-4" />
                            <FormLabel className="font-medium text-zinc-200">Additional Notes</FormLabel>
                          </div>
                          <FormControl>
                            <div className="relative">
                              <Input
                                placeholder="Any special requirements or preferences"
                                {...field}
                                disabled={isLoading}
                                className="bg-zinc-900 border-zinc-800 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all pl-3 text-zinc-200 h-12 rounded-lg"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-zinc-500 text-xs italic">
                            Special requirements, accessibility needs, etc.
                          </FormDescription>
                          <FormMessage className="text-rose-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {formStage > 0 ? (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStage}
                  className="bg-zinc-900/60 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-200 h-12 rounded-lg px-6 transition-all"
                  disabled={isLoading}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              <Button 
                type="button" 
                onClick={nextStage}
                disabled={isLoading || !isCurrentStageValid()}
                className={cn(
                  "h-12 rounded-lg px-6 transition-all",
                  formStage === 3 
                    ? "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white" 
                    : "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white"
                )}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Creating your journey...</span>
                  </div>
                ) : formStage === 3 ? (
                  <div className="flex items-center">
                    <Sparkles className="mr-2 h-5 w-5" />
                    <span>Create My Itinerary</span>
                  </div>
                ) : (
                  <span>Continue</span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </motion.div>
  );
}