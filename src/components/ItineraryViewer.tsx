'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  CloudSun,
  Info,
  ChevronLeft,
  ChevronRight,
  Plane
} from 'lucide-react';
import { Itinerary, DayPlan, Activity } from '@/types';
import { formatDate, formatCurrency } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert';

// Import components
import { FlightOptions } from './FlightOptions';
import { MapView } from './MapView';

// ---------------------------------------
// Helper functions for removing Markdown
// and trimming out the "Practical Information" section
// ---------------------------------------
function removeMarkdownSymbols(text: string): string {
  return text
    // Remove headings
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic markers
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Remove bullet points
    .replace(/^[\-\*\+]\s+/gm, '')
    // Remove backticks
    .replace(/`+/g, '')
    // Trim leftover whitespace
    .trim();
}

/**
 * Remove the "Practical Information" section
 * (and anything that follows it) from the overview.
 */
function removePracticalSection(overview: string): string {
  return overview.replace(/#{1,6}\s*Practical Information[\s\S]*/i, '').trim();
}

function extractDaySection(text: string, dayNumber: number): string {
  if (!text) return '';
  const dayRegex = new RegExp(
    `(#+\\s*)?Day\\s*${dayNumber}[:\\s](.+?)(?=#+\\s*Day\\s*\\d+|Day\\s*\\d+|$)`,
    'si'
  );
  const match = text.match(dayRegex);
  if (match && match[2]) {
    return removeMarkdownSymbols(match[2]);
  }
  return '';
}

interface ItineraryViewerProps {
  itinerary: Itinerary;
  onSelectDay?: (dayNumber: number) => void;
  onSelectActivity?: (activity: Activity, dayNumber: number) => void;
}

export function ItineraryViewer({
  itinerary,
  onSelectDay,
  onSelectActivity
}: ItineraryViewerProps) {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [hasFlights, setHasFlights] = useState(false);

  // If the server returns a separate activities array, merge them into each day's activities.
  useEffect(() => {
    if (itinerary.activities && Array.isArray(itinerary.activities)) {
      itinerary.activities.forEach((act) => {
        if (!act || !act.day_number) return;
        const matchingDay = itinerary.days?.find(
          (d) => d.day_number === act.day_number
        );
        if (matchingDay) {
          if (!matchingDay.activities) {
            matchingDay.activities = [];
          }
          const alreadyInDay = matchingDay.activities.find(
            (a) => a.name === act.name
          );
          if (!alreadyInDay) {
            matchingDay.activities.push(act);
          }
        }
      });
    }

    // Check if flights data is available
    setHasFlights(
      !!itinerary.flights && 
      !!itinerary.flights.response &&
      !!itinerary.flights.origin &&
      !!itinerary.flights.destination
    );
  }, [itinerary]);

  // Debug logging
  useEffect(() => {
    console.log('[ItineraryViewer] Rendering with itinerary:', {
      destination: itinerary?.destination,
      hasItinerary: !!itinerary,
      hasDays: !!itinerary?.days,
      daysLength: itinerary?.days?.length,
      hasBudget: !!itinerary?.budget,
      hasOverview: !!itinerary?.overview,
      hasPracticalInfo: !!itinerary?.practical_info,
      hasFlights: !!itinerary?.flights,
      status: itinerary?.status
    });
  }, [itinerary]);

  if (!itinerary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Itinerary Not Available</CardTitle>
          <CardDescription>
            The itinerary data could not be loaded.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // If itinerary is not complete, show a minimal state.
  if (itinerary.status !== 'complete') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Itinerary Being Generated</CardTitle>
          <CardDescription>
            {itinerary.status === 'processing'
              ? "Your itinerary is being processed. This may take a few minutes."
              : itinerary.status === 'generating'
              ? "Your itinerary is being generated. This may take a few minutes."
              : "Your itinerary is being prepared."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Status: {itinerary.status || 'Pending'}</AlertTitle>
            <AlertDescription>
              {itinerary.message ||
                'Please wait while we prepare your travel plan.'}
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Ensure we have a days array. If not, create fallback days but remove default text.
  if (!itinerary.days || itinerary.days.length === 0) {
    let dayList: DayPlan[] = [];
    const duration =
      itinerary.duration ||
      (itinerary.start_date && itinerary.end_date
        ? Math.ceil(
            (new Date(itinerary.end_date).getTime() -
              new Date(itinerary.start_date).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 1);
    for (let i = 1; i <= duration; i++) {
      dayList.push({
        day_number: i,
        date: '',
        title: `Day ${i}`,
        activities: [],
        weather: { description: 'TBD' },
        description: ''
      });
    }
    itinerary.days = dayList;
  }

  // Safely get current day
  const currentDay = itinerary.days[currentDayIndex] || null;

  // Day navigation
  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      const newIndex = currentDayIndex - 1;
      setCurrentDayIndex(newIndex);
      if (onSelectDay && itinerary.days[newIndex]) {
        onSelectDay(itinerary.days[newIndex].day_number);
      }
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < itinerary.days.length - 1) {
      const newIndex = currentDayIndex + 1;
      setCurrentDayIndex(newIndex);
      if (onSelectDay && itinerary.days[newIndex]) {
        onSelectDay(itinerary.days[newIndex].day_number);
      }
    }
  };

  const handleDaySelect = (dayNumber: number) => {
    const index = itinerary.days.findIndex((d) => d.day_number === dayNumber);
    if (index !== -1) {
      setCurrentDayIndex(index);
      if (onSelectDay) {
        onSelectDay(dayNumber);
      }
    }
  };

  const handleActivitySelect = (activity: Activity) => {
    if (onSelectActivity && currentDay) {
      onSelectActivity(activity, currentDay.day_number);
    }
  };

  // Destination overview fallback
  let overviewDescription =
    itinerary.overview?.description || (itinerary.destination_research?.research
      ? itinerary.destination_research.research.substring(0, 500) + '...'
      : '');
  overviewDescription = removePracticalSection(overviewDescription);
  overviewDescription = removeMarkdownSymbols(overviewDescription);

  // Parse practical info
  let practicalInfoContent = '';
  if (itinerary.destination_research?.research) {
    const researchText = itinerary.destination_research.research;
    const practicalMatch = researchText.match(
      /(?:Practical Information|Travel Logistics|Essential Information)[\s\S]*?(?=\n\n\d+\.|$)/i
    );
    if (practicalMatch) {
      practicalInfoContent = practicalMatch[0];
    }
  }
  if (!practicalInfoContent && itinerary.weather_info?.weather_info) {
    practicalInfoContent = itinerary.weather_info.weather_info;
  }
  const extractedPracticalInfo: Record<string, string> = {};
  if (practicalInfoContent) {
    extractedPracticalInfo.full_text = practicalInfoContent;
  }
  if (Object.keys(extractedPracticalInfo).length > 0) {
    itinerary.practical_info = {
      ...itinerary.practical_info,
      ...extractedPracticalInfo
    };
  }

  // Get all activities with locations for the map view
  const allActivitiesWithLocations = itinerary.days
    .flatMap(day => 
      day.activities.filter(activity => 
        activity.location && (
          (activity.location.coordinates && 
           activity.location.coordinates.lat && 
           activity.location.coordinates.lng) || 
          activity.location.address
        )
      )
    );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">
              {itinerary.destination || 'Your Trip'}
            </CardTitle>
            <CardDescription>
              {formatDate(itinerary.start_date)} - {formatDate(itinerary.end_date)} (
              {itinerary.duration || itinerary.days.length}{' '}
              {itinerary.duration === 1 ? 'day' : 'days'})
            </CardDescription>
          </div>
          <div className="flex items-center">
            <Button variant="outline" size="sm" className="mr-2">
              <Calendar className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Info className="h-4 w-4 mr-2" />
              Trip Details
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className={`grid ${hasFlights ? 'grid-cols-4' : 'grid-cols-3'} mb-4`}>
            <TabsTrigger value="daily">Daily Itinerary</TabsTrigger>
            <TabsTrigger value="overview">Trip Overview</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            {hasFlights && (
              <TabsTrigger value="flights">
                <Plane className="h-4 w-4 mr-2" />
                Flights
              </TabsTrigger>
            )}
          </TabsList>

          {/* Daily Itinerary */}
          <TabsContent value="daily" className="space-y-4">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={goToPreviousDay}
                disabled={currentDayIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex space-x-1 overflow-x-auto py-1">
                {itinerary.days.map((day) => (
                  <Button
                    key={day.day_number}
                    variant={
                      day.day_number === currentDay?.day_number
                        ? 'default'
                        : 'outline'
                    }
                    size="sm"
                    className="min-w-[40px]"
                    onClick={() => handleDaySelect(day.day_number)}
                  >
                    {day.day_number}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextDay}
                disabled={currentDayIndex === itinerary.days.length - 1}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            {currentDay ? (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">
                      Day {currentDay.day_number}:{' '}
                      {currentDay.title || `Day ${currentDay.day_number}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentDay.date ? formatDate(currentDay.date) : ''}
                    </p>
                  </div>
                  {/* Weather */}
                  {currentDay.weather?.description && (
                    <Badge variant="outline" className="flex items-center">
                      <CloudSun className="h-4 w-4 mr-1" />
                      {currentDay.weather.temperature
                        ? `${currentDay.weather.temperature} - `
                        : ''}
                      {currentDay.weather.description}
                    </Badge>
                  )}
                </div>

                <ScrollArea className="h-[400px] pr-4">
                  {currentDay.activities && currentDay.activities.length > 0 ? (
                    <div className="space-y-4">
                      {currentDay.activities.map((activity, index) => (
                        <Card
                          key={index}
                          className="cursor-pointer hover:bg-accent/50 transition-colors"
                          onClick={() => handleActivitySelect(activity)}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium">
                                  {activity.name ||
                                    `Activity ${index + 1}`}
                                </h4>
                                <div className="mt-2 space-y-1 text-sm">
                                  {activity.time && (
                                    <div className="flex items-center text-muted-foreground">
                                      <Clock className="h-3.5 w-3.5 mr-1.5" />
                                      {activity.time}
                                    </div>
                                  )}
                                  {activity.location?.name && (
                                    <div className="flex items-center text-muted-foreground">
                                      <MapPin className="h-3.5 w-3.5 mr-1.5" />
                                      {activity.location.name}
                                    </div>
                                  )}
                                  {activity.cost !== undefined && (
                                    <div className="flex items-center text-muted-foreground">
                                      <DollarSign className="h-3.5 w-3.5 mr-1.5" />
                                      {formatCurrency(
                                        activity.cost,
                                        itinerary.budget?.currency || 'USD'
                                      )}
                                    </div>
                                  )}
                                </div>
                                {activity.description && (
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    {activity.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground space-y-4">
                      {currentDay.description && <div>{currentDay.description}</div>}
                      {itinerary.activities?.recommendations && (
                        <div className="p-4 bg-muted rounded-lg text-sm">
                          <p className="whitespace-pre-line text-left">
                            {extractDaySection(
                              itinerary.activities.recommendations,
                              currentDay.day_number
                            )}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>Day information not available.</p>
              </div>
            )}
          </TabsContent>

          {/* Trip Overview */}
          <TabsContent value="overview">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Destination Overview
                </h3>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {overviewDescription ||
                    'Overview information is not available.'}
                </p>
              </div>

              {itinerary.budget ? (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Budget</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">
                          Total Budget
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-2xl font-bold">
                          {formatCurrency(
                            itinerary.budget.total || 0,
                            itinerary.budget.currency || 'USD'
                          )}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="py-4">
                        <CardTitle className="text-base">
                          Daily Average
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="py-2">
                        <p className="text-2xl font-bold">
                          {formatCurrency(
                            (itinerary.budget.total || 0) /
                              (itinerary.duration || itinerary.days.length || 1),
                            itinerary.budget.currency || 'USD'
                          )}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  {itinerary.budget.breakdown &&
                  Object.keys(itinerary.budget.breakdown).length > 0 ? (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">
                        Budget Breakdown
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(itinerary.budget.breakdown).map(
                          ([category, amount]) => (
                            <div
                              key={category}
                              className="flex justify-between items-center"
                            >
                              <span className="text-sm capitalize">
                                {category.replace('_', ' ')}
                              </span>
                              <div className="flex items-center">
                                <span className="text-sm font-medium">
                                  {formatCurrency(
                                    amount,
                                    itinerary.budget.currency || 'USD'
                                  )}
                                </span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  (
                                  {Math.round(
                                    (amount /
                                      (itinerary.budget.total || 1)) *
                                      100
                                  )}
                                  %)
                                </span>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-2">
                      Budget breakdown not available.
                    </p>
                  )}
                  {itinerary.budget_plan?.full_plan && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">
                        Detailed Budget Plan
                      </h4>
                      <div className="p-4 bg-muted rounded-lg text-sm">
                        <p className="whitespace-pre-line">
                          {removeMarkdownSymbols(
                            itinerary.budget_plan.full_plan
                          ).trim()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Budget</h3>
                  <p className="text-sm text-muted-foreground">
                    Budget information is not available.
                  </p>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Practical Information
                </h3>
                {itinerary.practical_info ? (
                  Object.keys(itinerary.practical_info).length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {itinerary.practical_info.full_text && (
                        <AccordionItem value="full_text">
                          <AccordionTrigger>
                            Complete Practical Information
                          </AccordionTrigger>
                          <AccordionContent className="whitespace-pre-line">
                            {removeMarkdownSymbols(
                              itinerary.practical_info.full_text || ''
                            )}
                          </AccordionContent>
                        </AccordionItem>
                      )}
                    </Accordion>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Practical information is being prepared.
                    </p>
                  )
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No practical information found.
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Map View Tab */}
          <TabsContent value="map">
            <div className="space-y-4">
              <MapView 
                destination={itinerary.destination}
                activities={currentDay?.activities}
                height="500px"
                zoomLevel={13}
              />
              
              {/* Additional section to show all activities with locations */}
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Places to Visit</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {itinerary.days.flatMap(day => 
                    day.activities.filter(activity => 
                      activity.location && (activity.location.coordinates || activity.location.address)
                    ).map((activity, index) => (
                      <Card key={`${day.day_number}-${index}`} className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-violet-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium">{activity.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {activity.location.name}
                                {activity.location.address && 
                                  `, ${activity.location.address.split(',')[0]}`
                                }
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Day {day.day_number}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Flights Tab */}
          {hasFlights && (
            <TabsContent value="flights">
              <FlightOptions flightData={itinerary.flights} />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}