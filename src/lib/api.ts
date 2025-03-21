// src/lib/api.ts
import { toast } from 'sonner';

// Define base API URL
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Log API requests and responses for debugging
 */
function logApiOperation(operation: string, url: string, data?: any, error?: any) {
  if (process.env.NODE_ENV !== 'production') {
    console.group(`🌐 API ${operation}: ${url}`);
    if (data) {
      console.log('📊 Data:', data);
    }
    if (error) {
      console.error('❌ Error:', error);
    }
    console.groupEnd();
  }
}

// Common fetch wrapper with error handling
async function fetchWithErrorHandling(url: string, options: RequestInit = {}) {
  const fetchOptions = {
    ...options,
    mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...options.headers,
    },
  };

  logApiOperation('Request', url, options.body ? JSON.parse(String(options.body)) : undefined);

  try {
    const response = await fetch(url, fetchOptions);
    let responseData: any;
    try {
      // Clone the response to avoid consuming it
      const clonedResponse = response.clone();
      if (clonedResponse.headers.get('content-type')?.includes('application/json')) {
        responseData = await clonedResponse.json();
      } else {
        responseData = await clonedResponse.text();
      }
    } catch (e) {
      console.warn('Could not clone response for logging:', e);
    }
    // Check if the response is ok (status in the range 200-299)
    if (!response.ok) {
      let errorMessage;
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail || errorData.message || `Error: ${response.status} ${response.statusText}`;
      } catch (e) {
        errorMessage = `Error: ${response.status} ${response.statusText}`;
      }
      logApiOperation('Error', url, undefined, { status: response.status, message: errorMessage });
      throw new Error(errorMessage);
    }
    // For 204 No Content responses, return null
    if (response.status === 204) {
      logApiOperation('Response', url, null);
      return null;
    }
    const data = await response.json();
    logApiOperation('Response', url, data);
    return data;
  } catch (error: any) {
    if (error.message && (
      error.message.includes('Failed to fetch') ||
      error.message.includes('CORS') ||
      error.message.includes('Network Error')
    )) {
      console.error('CORS or Network Error:', error);
      const corsErrorMsg = 'Connection to the server failed. This might be due to a CORS policy error or the server being unavailable.';
      logApiOperation('CORS Error', url, undefined, corsErrorMsg);
      throw new Error(corsErrorMsg);
    }
    if (error.name !== 'Error' || !error.message.startsWith('Error:')) {
      logApiOperation('Fetch Error', url, undefined, error);
    }
    throw error;
  }
}

/**
 * Generate a travel plan based on user preferences
 */
export async function generateTravelPlan(preferences: any) {
  console.log('Generating travel plan with preferences:', preferences);
  try {
    // Extract only numeric part from budget before sending (keep a clean copy)
    const preferencesForSending = { ...preferences };
    if (typeof preferencesForSending.budget === 'string' && preferencesForSending.budget.includes(' ')) {
      const budgetParts = preferencesForSending.budget.split(' ');
      if (budgetParts.length > 1) {
        // Only send the numeric part to avoid server parsing issues
        preferencesForSending.budget = budgetParts[0];
        console.log('Extracted numeric budget for API:', preferencesForSending.budget);
      }
    }
    return await fetchWithErrorHandling(`${API_URL}/generate-plan`, {
      method: 'POST',
      body: JSON.stringify(preferencesForSending),
    });
  } catch (error: any) {
    console.error('Failed to generate travel plan:', error);
    throw new Error(error.message || 'Failed to generate travel plan');
  }
}

/**
 * Get itinerary by ID with robust error handling
 */
export async function getItinerary(id: string) {
  try {
    // Add a cache-busting parameter to ensure we get fresh data
    const timestamp = new Date().getTime();
    const data = await fetchWithErrorHandling(`${API_URL}/itinerary/${id}?_=${timestamp}`);
    if (!data) {
      throw new Error('No data returned from API');
    }
    console.log(`Itinerary data structure for ${id}:`, Object.keys(data));
    if (data.days) {
      console.log(`- Days array length: ${data.days.length}`);
    } else {
      console.warn(`- No days array found in itinerary ${id}`);
    }
    if (data.budget) {
      console.log(`- Budget total: ${data.budget.total}`);
    } else {
      console.warn(`- No budget information found in itinerary ${id}`);
    }
    return data;
  } catch (error: any) {
    console.error('Failed to fetch itinerary:', error);
    throw error;
  }
}

/**
 * Check the status of an itinerary generation job
 */
export async function checkItineraryStatus(jobId: string) {
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/check-status/${jobId}`);
    console.log(`Itinerary status for ${jobId}:`, data);
    return data;
  } catch (error: any) {
    console.error('Failed to check itinerary status:', error);
    throw new Error(error.message || 'Failed to check status');
  }
}

/**
 * Ask a question about an itinerary
 */
export async function askQuestion(itineraryId: string, question: string) {
  console.log(`Asking question for itinerary ${itineraryId}:`, question);
  try {
    return await fetchWithErrorHandling(`${API_URL}/ask-question`, {
      method: 'POST',
      body: JSON.stringify({ itinerary_id: itineraryId, question }),
    });
  } catch (error: any) {
    console.error('Failed to ask question:', error);
    throw new Error(error.message || 'Failed to ask question');
  }
}

/**
 * Update itinerary preferences
 */
export async function updatePreferences(itineraryId: string, preferences: any) {
  console.log(`Updating preferences for itinerary ${itineraryId}:`, preferences);
  try {
    const data = await fetchWithErrorHandling(`${API_URL}/update-preferences/${itineraryId}`, {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
    toast.success('Preferences updated successfully');
    return data;
  } catch (error: any) {
    toast.error(error.message || 'Failed to update preferences');
    throw error;
  }
}

/**
 * Type definitions for the Travel Planner application
 *
 * (For brevity, type definitions are assumed to remain unchanged.
 *  See your original code for complete type definitions.)
 */

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
  origin_city?: string;
}

export interface Location {
  name: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  maps_url?: string;
}

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

export interface Weather {
  description?: string;
  temperature?: string;
  condition?: string;
  precipitation_chance?: string;
  humidity?: string;
  wind?: string;
}

export interface DayPlan {
  day_number: number;
  date: string;
  title: string;
  activities: Activity[];
  weather: Weather;
  description: string;
  notes?: string;
}

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

export interface Overview {
  description: string;
  highlights?: string[];
  culture?: string;
  best_time_to_visit?: string;
  image_url?: string;
}

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

export interface ResearchResult {
  query: string;
  research: string;
}

export interface WeatherInfoResult {
  query: string;
  weather_info: string;
}

export interface LocationPlanResult {
  query: string;
  plan: string;
}

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

export interface ActivitiesResult {
  query: string;
  recommendations: string;
}

export interface AccommodationsResult {
  query: string;
  recommendations: string;
  destination: string;
  check_in: string;
  check_out: string;
  budget: string;
  travelers: number;
}

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
  destination_research?: ResearchResult;
  weather_info?: WeatherInfoResult;
  location_plan?: LocationPlanResult;
  budget_plan?: BudgetPlanResult;
  activities?: ActivitiesResult;
  accommodations?: AccommodationsResult;
  flights?: FlightResult;
}

export interface ItinerarySummary {
  id: string;
  destination: string;
  start_date: string;
  end_date: string;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface JobStatus {
  job_id: string;
  status: 'generating' | 'processing' | 'complete' | 'error';
  message: string;
  ready: boolean;
}

export interface QuestionAnswer {
  itinerary_id: string;
  question: string;
  answer: string;
}

export interface ApiError {
  status: number;
  message: string;
  details?: any;
}
