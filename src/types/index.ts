/**
 * Type definitions for the Travel Planner application
 */

// User travel preferences
export interface TravelPreferences {
  destination: string;
  startDate: string;
  endDate: string;
  budget: string;
  travelers: number;
  interests: string[];
  accommodation_type?: string;
  travel_style?: string;
  dietary_restrictions?: string[];
  accessibility_needs?: string;
  origin_city?: string; // Added for flight search
}

// Location information
export interface Location {
  name: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  maps_url?: string;
}

// Activity in an itinerary
export interface Activity {
  time?: string;
  name: string;
  description?: string;
  location: Location;
  cost?: number;
  duration?: string;
  booking_url?: string;
  image_url?: string;
  tags?: string[];
}

// Weather information
export interface Weather {
  description?: string;
  temperature?: string;
  condition?: string;
  precipitation_chance?: string;
  humidity?: string;
  wind?: string;
}

// Daily plan in an itinerary
export interface DayPlan {
  day_number: number;
  date: string;
  title: string;
  activities: Activity[];
  weather: Weather;
  description: string;
  notes?: string;
}

// Budget information
export interface Budget {
  total: number;
  currency: string;
  breakdown: {
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    miscellaneous: number;
    [key: string]: number;
  };
}

// Destination overview
export interface Overview {
  description: string;
  highlights?: string[];
  culture?: string;
  best_time_to_visit?: string;
  image_url?: string;
}

// Practical travel information
export interface PracticalInfo {
  currency: string;
  language: string;
  transportation: string;
  safety: string;
  timezone?: string;
  electricity?: string;
  internet?: string;
  emergency_contacts?: string;
  visa_requirements?: string;
  health_recommendations?: string;
  full_text: string;
}

// AI Research result
export interface ResearchResult {
  query: string;
  research: string;
}

// AI Weather Information result
export interface WeatherInfoResult {
  query: string;
  weather_info: string;
}

// AI Location Plan result
export interface LocationPlanResult {
  query: string;
  plan: string;
}

// AI Budget Plan result
export interface BudgetPlanResult {
  query: string;
  full_plan: string;
  total: number;
  per_person: number;
  per_day: number;
  per_person_per_day: number;
  currency: string;
  breakdown: {
    [key: string]: number;
  };
}

// AI Activities Recommendations result
export interface ActivitiesResult {
  query: string;
  recommendations: string;
}

// AI Accommodations Recommendations result
export interface AccommodationsResult {
  query: string;
  recommendations: string;
  destination: string;
  check_in: string;
  check_out: string;
  budget: string;
  travelers: number; // Add this to fix the TypeScript error
}

// AI Flight Options result 
export interface FlightResult {
  query: string;
  response: string;
  origin: string;
  destination: string;
  departure_date: string;
  return_date?: string;
  one_way: boolean;
  num_passengers: number;
  options: any[];
  recommendation: string;
  booking_info: string;
}

// Complete itinerary
export interface Itinerary {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  duration: number;
  budget: Budget;
  days: DayPlan[];
  overview: Overview;
  practical_info: PracticalInfo;
  created_at: string;
  updated_at: string;
  status?: string;
  message?: string;
  original_id?: string;
  
  // Additional properties from AI planning
  destination_research?: ResearchResult;
  weather_info?: WeatherInfoResult;
  location_plan?: LocationPlanResult;
  budget_plan?: BudgetPlanResult;
  activities?: ActivitiesResult;
  accommodations?: AccommodationsResult;
  flights?: FlightResult; // Add this to fix the TypeScript error
}

// Itinerary summary (used for listing)
export interface ItinerarySummary {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

// Job status
export interface JobStatus {
  job_id: string;
  status: 'generating' | 'processing' | 'complete' | 'error';
  message: string;
  ready: boolean;
}

// Question and answer
export interface QuestionAnswer {
  itinerary_id: string;
  question: string;
  answer: string;
}

// API error
export interface ApiError {
  status: number;
  message: string;
  details?: any;
}