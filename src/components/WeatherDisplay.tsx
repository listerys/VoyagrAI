'use client';

import { useState } from 'react';
import { Itinerary, DayPlan, Weather } from '@/types';
import { formatDate, getWeatherIcon } from '@/lib/utils';
import { 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudFog, 
  CloudLightning, 
  Sun, 
  CloudSun,
  Wind, 
  Umbrella, 
  Thermometer
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface WeatherDisplayProps {
  itinerary: Itinerary;
  selectedDay?: number;
}

export function WeatherDisplay({ itinerary, selectedDay }: WeatherDisplayProps) {
  const [view, setView] = useState<'daily' | 'summary'>('daily');
  
  // Get weather icon component based on description
  const getWeatherIconComponent = (description?: string) => {
    if (!description) return <Cloud className="h-6 w-6" />;
    
    const desc = description.toLowerCase();
    
    if (desc.includes('sun') || desc.includes('clear')) return <Sun className="h-6 w-6 text-amber-500" />;
    if (desc.includes('cloud') && desc.includes('sun')) return <CloudSun className="h-6 w-6 text-amber-400" />;
    if (desc.includes('cloud')) return <Cloud className="h-6 w-6 text-slate-400" />;
    if (desc.includes('rain') || desc.includes('shower')) return <CloudRain className="h-6 w-6 text-blue-400" />;
    if (desc.includes('thunder') || desc.includes('storm')) return <CloudLightning className="h-6 w-6 text-purple-500" />;
    if (desc.includes('snow') || desc.includes('flurries')) return <CloudSnow className="h-6 w-6 text-sky-200" />;
    if (desc.includes('fog') || desc.includes('mist')) return <CloudFog className="h-6 w-6 text-slate-300" />;
    if (desc.includes('wind')) return <Wind className="h-6 w-6 text-slate-500" />;
    
    return <Cloud className="h-6 w-6" />;
  };
  
  // Get weather summary for the entire trip
  const getWeatherSummary = () => {
    // Count weather conditions
    const conditions: Record<string, number> = {};
    let totalTemp = 0;
    let tempCount = 0;
    
    itinerary.days.forEach(day => {
      if (day.weather && day.weather.description) {
        const desc = day.weather.description.toLowerCase();
        conditions[desc] = (conditions[desc] || 0) + 1;
      }
      
      if (day.weather && day.weather.temperature) {
        // Extract number from temperature string (e.g., "25°C" -> 25)
        const match = day.weather.temperature.match(/(\d+)/);
        if (match && match[1]) {
          totalTemp += parseInt(match[1], 10);
          tempCount++;
        }
      }
    });
    
    // Find most common condition
    let mostCommonCondition = '';
    let maxCount = 0;
    
    Object.entries(conditions).forEach(([condition, count]) => {
      if (count > maxCount) {
        mostCommonCondition = condition;
        maxCount = count;
      }
    });
    
    // Calculate average temperature
    const avgTemp = tempCount > 0 ? Math.round(totalTemp / tempCount) : null;
    
    return {
      mostCommonCondition,
      conditionCount: maxCount,
      averageTemp: avgTemp,
      conditions
    };
  };
  
  // Get packing suggestions based on weather
  const getPackingSuggestions = () => {
    const summary = getWeatherSummary();
    const suggestions: string[] = [];
    
    // Add base suggestions
    suggestions.push('Comfortable walking shoes');
    suggestions.push('Travel documents and copies');
    suggestions.push('Phone charger and adapter');
    
    // Temperature-based suggestions
    if (summary.averageTemp) {
      if (summary.averageTemp >= 25) {
        suggestions.push('Lightweight, breathable clothing');
        suggestions.push('Sunscreen and sunglasses');
        suggestions.push('Hat or cap for sun protection');
        suggestions.push('Refillable water bottle');
      } else if (summary.averageTemp >= 15) {
        suggestions.push('Mix of short and long-sleeved clothing for layering');
        suggestions.push('Light jacket or sweater for evenings');
        suggestions.push('Sunglasses');
      } else if (summary.averageTemp >= 5) {
        suggestions.push('Warm layers (sweaters, long sleeves)');
        suggestions.push('Jacket or coat');
        suggestions.push('Scarf and gloves');
      } else {
        suggestions.push('Heavy winter coat');
        suggestions.push('Thermal underwear');
        suggestions.push('Warm hat, gloves, and scarf');
        suggestions.push('Insulated boots');
      }
    }
    
    // Condition-based suggestions
    if (summary.conditions) {
      const hasRain = Object.keys(summary.conditions).some(
        c => c.includes('rain') || c.includes('shower') || c.includes('drizzle')
      );
      
      const hasSnow = Object.keys(summary.conditions).some(
        c => c.includes('snow') || c.includes('flurries')
      );
      
      if (hasRain) {
        suggestions.push('Waterproof jacket or raincoat');
        suggestions.push('Umbrella');
        suggestions.push('Waterproof footwear');
      }
      
      if (hasSnow) {
        suggestions.push('Snow boots');
        suggestions.push('Waterproof gloves');
        suggestions.push('Thermal socks');
      }
    }
    
    return suggestions;
  };
  
  // Filter days based on selected day
  const daysToShow = selectedDay 
    ? itinerary.days.filter(day => day.day_number === selectedDay) 
    : itinerary.days;
    
  const weatherSummary = getWeatherSummary();
  const packingSuggestions = getPackingSuggestions();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
        <CardDescription>
          Weather conditions for your trip to {itinerary.destination}
        </CardDescription>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="daily" 
            onClick={() => setView('daily')}
            data-state={view === 'daily' ? 'active' : ''}
          >
            Daily Forecast
          </TabsTrigger>
          <TabsTrigger 
            value="summary" 
            onClick={() => setView('summary')}
            data-state={view === 'summary' ? 'active' : ''}
          >
            Trip Summary
          </TabsTrigger>
        </TabsList>
      </CardHeader>
      <CardContent>
        {view === 'daily' ? (
          <ScrollArea className="h-[300px] pr-3">
            <div className="space-y-4">
              {daysToShow.map((day) => (
                <Card key={day.day_number} className="overflow-hidden">
                  <div className={`p-4 ${day.day_number === selectedDay ? 'bg-primary/10' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-sm">Day {day.day_number}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(day.date)}</p>
                      </div>
                      
                      {day.weather && day.weather.description ? (
                        <div className="flex items-center space-x-2">
                          {getWeatherIconComponent(day.weather.description)}
                          
                          <div>
                            {day.weather.temperature && (
                              <p className="text-sm font-medium">
                                {day.weather.temperature}
                              </p>
                            )}
                            <p className="text-xs text-muted-foreground">
                              {day.weather.description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <Badge variant="outline">No weather data</Badge>
                      )}
                    </div>
                    
                    {/* Additional weather info if available */}
                    {day.weather && (day.weather.precipitation_chance || day.weather.humidity) && (
                      <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-muted-foreground">
                        {day.weather.precipitation_chance && (
                          <div className="flex items-center">
                            <Umbrella className="h-3 w-3 mr-1" />
                            <span>{day.weather.precipitation_chance} chance of precipitation</span>
                          </div>
                        )}
                        {day.weather.humidity && (
                          <div className="flex items-center">
                            <Thermometer className="h-3 w-3 mr-1" />
                            <span>{day.weather.humidity} humidity</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="space-y-4">
            {/* Weather summary */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Trip Overview</h3>
                <p className="text-sm text-muted-foreground">
                  {formatDate(itinerary.start_date)} - {formatDate(itinerary.end_date)}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                {weatherSummary.mostCommonCondition && (
                  <>{getWeatherIconComponent(weatherSummary.mostCommonCondition)}</>
                )}
                
                {weatherSummary.averageTemp && (
                  <Badge variant="outline">
                    Avg. {weatherSummary.averageTemp}°
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Summary text */}
            <p className="text-sm">
              {weatherSummary.mostCommonCondition && weatherSummary.conditionCount > 0 ? (
                `Expect mostly ${weatherSummary.mostCommonCondition} conditions during your trip, with an average temperature of around ${weatherSummary.averageTemp}°.`
              ) : (
                'Weather information is limited for this trip.'
              )}
            </p>
            
            {/* Packing suggestions */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Packing Suggestions</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {packingSuggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                    {suggestion}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}