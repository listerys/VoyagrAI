// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date string to a more readable format
 * Handles 'Invalid Date' and null/undefined gracefully
 */
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Date not available';
  
  const date = new Date(dateStr);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return 'Invalid date';
  }
  
  // Format the date
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Format currency with proper symbol and decimal places
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  if (amount === undefined || amount === null) {
    return 'Not available';
  }
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount} ${currency || 'USD'}`;
  }
}

/**
 * Get weather icon based on weather description
 */
export function getWeatherIcon(description: string): string {
  const desc = description.toLowerCase();
  
  if (desc.includes('sun') || desc.includes('clear')) return '☀️';
  if (desc.includes('cloud')) return '☁️';
  if (desc.includes('rain')) return '🌧️';
  if (desc.includes('snow')) return '❄️';
  if (desc.includes('fog') || desc.includes('mist')) return '🌫️';
  if (desc.includes('wind')) return '💨';
  if (desc.includes('storm') || desc.includes('thunder')) return '⛈️';
  
  return '🌤️'; // default
}

/**
 * Get interest categories for the form
 */
export function getInterestCategories() {
  return [
    { value: 'history', label: 'History & Culture' },
    { value: 'nature', label: 'Nature & Outdoors' },
    { value: 'food', label: 'Food & Cuisine' },
    { value: 'adventure', label: 'Adventure & Sports' },
    { value: 'relaxation', label: 'Relaxation & Wellness' },
    { value: 'nightlife', label: 'Nightlife & Entertainment' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'architecture', label: 'Architecture & Design' },
    { value: 'arts', label: 'Arts & Museums' },
    { value: 'local', label: 'Local Experiences' },
  ];
}

/**
 * Get accommodation types for the form
 */
export function getAccommodationTypes() {
  return [
    { value: 'hotel', label: 'Hotel' },
    { value: 'hostel', label: 'Hostel' },
    { value: 'apartment', label: 'Apartment/Vacation Rental' },
    { value: 'resort', label: 'Resort' },
    { value: 'guesthouse', label: 'Guesthouse/B&B' },
    { value: 'camping', label: 'Camping/Glamping' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'budget', label: 'Budget' },
  ];
}

/**
 * Get travel styles for the form
 */
export function getTravelStyles() {
  return [
    { value: 'leisure', label: 'Leisure & Relaxation' },
    { value: 'adventure', label: 'Adventure & Exploration' },
    { value: 'cultural', label: 'Cultural Immersion' },
    { value: 'luxury', label: 'Luxury & Comfort' },
    { value: 'budget', label: 'Budget & Backpacking' },
    { value: 'family', label: 'Family Friendly' },
    { value: 'eco', label: 'Eco-Tourism & Sustainability' },
    { value: 'solo', label: 'Solo Travel' },
    { value: 'group', label: 'Group Travel' },
  ];
}