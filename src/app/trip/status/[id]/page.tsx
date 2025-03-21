'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { ItineraryViewer } from '@/components/ItineraryViewer';
import { MapView } from '@/components/MapView';
import { ChatInterface } from '@/components/ChatInterface';
import { BudgetBreakdown } from '@/components/BudgetBreakdown';
import { FlightOptions } from '@/components/FlightOptions';
import { AccommodationOptions } from '@/components/AccommodationOptions';
import { getItinerary, checkItineraryStatus } from '@/lib/api';
import { Itinerary, Activity } from '@/types';
import { ArrowLeft, FileDown, RefreshCw, Share2, MapPin, Plane, Hotel, Calendar, Wallet } from 'lucide-react';

export default function TripPage() {
  const params = useParams();
  const id = params.id as string;

  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [retryCount, setRetryCount] = useState(0);
  const [pollingEnabled, setPollingEnabled] = useState(true);
  const [pollingInterval, setPollingInterval] = useState(5000); // Start with 5 seconds
  const [activeTab, setActiveTab] = useState('itinerary');

  // Function to fetch itinerary
  const fetchItinerary = useCallback(async () => {
    try {
      console.log(`[TripPage] Fetching itinerary ${id}...`);
      setError(null);
      const data = await getItinerary(id);
      
      if (!data) {
        console.error("[TripPage] No data returned from API");
        throw new Error("No data returned from API");
      }
      
      console.log("[TripPage] Received itinerary data for", id, {
        status: data.status,
        hasData: !!data,
        hasDays: !!data.days,
        daysLength: data.days?.length,
        hasBudget: !!data.budget,
        hasOverview: !!data.overview,
        hasPracticalInfo: !!data.practical_info,
        hasDestinationResearch: !!data.destination_research,
        hasActivities: !!data.activities,
        hasLocationPlan: !!data.location_plan,
        hasBudgetPlan: !!data.budget_plan,
        hasAccommodations: !!data.accommodations,
        hasFlights: !!data.flights,
        hasWeatherInfo: !!data.weather_info
      });

      // ---------------------------------------
      // CHANGE #1: Remove date parsing that set dates to null on parse errors.
      // We'll trust that the user’s date format is valid enough for new Date(...).
      // ---------------------------------------
      // if (data.start_date) {
      //   try {
      //     new Date(data.start_date).toISOString();
      //   } catch (e) {
      //     console.warn("[TripPage] Invalid start_date format in API response");
      //     data.start_date = null;
      //   }
      // }
      // if (data.end_date) {
      //   try {
      //     new Date(data.end_date).toISOString();
      //   } catch (e) {
      //     console.warn("[TripPage] Invalid end_date format in API response");
      //     data.end_date = null;
      //   }
      // }

      // Ensure days array exists
      if (!data.days) {
        console.warn("[TripPage] Days array missing, creating empty array");
        data.days = [];
      }
      
      // Ensure budget object exists with necessary properties
      if (!data.budget) {
        console.warn("[TripPage] Budget object missing, creating default");
        data.budget = {
          total: 0,
          currency: 'USD',
          breakdown: {}
        };
      } else if (!data.budget.breakdown) {
        console.warn("[TripPage] Budget breakdown missing, creating empty object");
        data.budget.breakdown = {};
      }
      
      setItinerary(data);
      
      // If we get valid data with a complete status, we can stop polling
      if (data.status === 'complete') {
        console.log("[TripPage] Itinerary is complete with days, stopping polling");
        setPollingEnabled(false);
        toast.success("Your itinerary is ready!");
        
        // If we have flight data, show the flights tab first (optional).
        if (data.flights) {
          setActiveTab('flights');
        }
      }
      // If there's an error, stop polling
      else if (data.status === 'error') {
        console.error("[TripPage] Itinerary has error status", data.message);
        setPollingEnabled(false);
        setError(data.message || "An error occurred while generating your itinerary");
      }
      
      return data;
    } catch (err: any) {
      console.error('[TripPage] Error fetching itinerary:', err);
      setError(err.message || 'Failed to load itinerary');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  // Initial data fetch
  useEffect(() => {
    fetchItinerary();
  }, [fetchItinerary]);

  // Polling logic
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    
    if (pollingEnabled && !error) {
      console.log(`[TripPage] Setting up polling (attempt ${retryCount + 1}, interval: ${pollingInterval}ms)`);
      
      timerId = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        
        // On every 5th retry, check status first
        if (retryCount % 5 === 4) {
          checkItineraryStatus(id)
            .then(status => {
              console.log("[TripPage] Status check result:", status);
              if (status.ready) {
                return fetchItinerary();
              } else if (status.status === 'error') {
                setError(status.message || "An error occurred while generating your itinerary");
                setPollingEnabled(false);
              }
              return null;
            })
            .catch(err => {
              console.error('[TripPage] Error checking status:', err);
            });
        } else {
          fetchItinerary();
        }
        
        // Exponential backoff after 5 retries
        if (retryCount >= 5) {
          setPollingInterval(prev => Math.min(prev * 1.5, 60000)); // Cap at 1 minute
        }
        
        // If we've polled more than 20 times, stop polling
        if (retryCount > 20) {
          console.log('[TripPage] Exceeded maximum retry count, stopping polling');
          setPollingEnabled(false);
          setError("Itinerary generation is taking longer than expected. Please check back later or refresh the page.");
        }
      }, pollingInterval);
    }
    
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [pollingEnabled, retryCount, error, pollingInterval, id, fetchItinerary]);

  const handleDaySelect = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    setSelectedActivity(undefined);
  };

  const handleActivitySelect = (activity: Activity, dayNumber: number) => {
    setSelectedActivity(activity);
    setSelectedDay(dayNumber);
  };

  const handleExport = () => {
    if (!itinerary) return;
    const data = JSON.stringify(itinerary, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `itinerary-${itinerary.destination?.replace(/\s+/g, '-').toLowerCase() || 'trip'}.json`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);

    toast('Your itinerary has been downloaded as a JSON file.');
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast('Itinerary link copied to clipboard!');
  };

  const handleShare = () => {
    if (!itinerary) return;

    if (navigator.share) {
      navigator
        .share({
          title: `Travel Itinerary: ${itinerary.destination || 'My Trip'}`,
          text: `Check out my travel itinerary for ${itinerary.destination || 'my trip'}!`,
          url: window.location.href,
        })
        .then(() => {
          toast('Itinerary shared!');
        })
        .catch((error) => {
          console.error('Error sharing:', error);
          fallbackShare();
        });
    } else {
      fallbackShare();
    }
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    setPollingEnabled(false); 
    setRetryCount(0);         
    setPollingInterval(5000); 
    setError(null);           
    fetchItinerary().then(() => {
      if (itinerary?.status !== 'complete') {
        setPollingEnabled(true);
      }
    });
    toast('Refreshing your itinerary...');
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-[500px] w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Get display dates for header
  // (No longer forcing them to null if parse error.)
  const startDate = itinerary?.start_date 
    ? new Date(itinerary.start_date).toLocaleDateString()
    : 'Date not available';
  
  const endDate = itinerary?.end_date 
    ? new Date(itinerary.end_date).toLocaleDateString()
    : 'Date not available';
  
  // Calculate duration (fallback to stored value or 0)
  const duration = itinerary?.duration ||
    (itinerary?.start_date && itinerary?.end_date
      ? Math.ceil((new Date(itinerary.end_date).getTime() - new Date(itinerary.start_date).getTime()) / (1000 * 60 * 60 * 24))
      : 0);

  // Is itinerary still generating?
  const isGenerating = !error && 
    (itinerary?.status === 'generating' || 
     itinerary?.status === 'processing' || 
     (!itinerary?.days || itinerary.days.length === 0));
  
  // Determine which tabs to show
  const hasFlights = itinerary?.flights !== undefined;
  const hasAccommodations = itinerary?.accommodations !== undefined;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{itinerary?.destination || 'Your Trip'}</h1>
          <p className="text-muted-foreground">
            {startDate} - {endDate} ({duration} {duration === 1 ? 'day' : 'days'})
          </p>
          {itinerary?.status && itinerary.status !== 'complete' && (
            <p className="text-sm text-amber-500 font-medium mt-1">
              Status: {itinerary.status.charAt(0).toUpperCase() + itinerary.status.slice(1)}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" asChild>
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </a>
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport} disabled={isGenerating}>
            <FileDown className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" variant="outline" onClick={handleShare} disabled={isGenerating}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Separator />

      {error ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Error Loading Itinerary</h2>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="itinerary" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Itinerary
                </TabsTrigger>
                {hasFlights && (
                  <TabsTrigger value="flights" className="flex items-center">
                    <Plane className="h-4 w-4 mr-2" />
                    Flights
                  </TabsTrigger>
                )}
                {hasAccommodations && (
                  <TabsTrigger value="hotels" className="flex items-center">
                    <Hotel className="h-4 w-4 mr-2" />
                    Hotels
                  </TabsTrigger>
                )}
                <TabsTrigger value="map" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Map
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="itinerary" className="mt-4">
                <ItineraryViewer
                  itinerary={itinerary as Itinerary}
                  onSelectDay={handleDaySelect}
                  onSelectActivity={handleActivitySelect}
                />
                {isGenerating && (
                  <div className="mt-4 p-4 bg-muted rounded-md text-center">
                    <p className="font-medium">Your itinerary is being generated. This may take a few minutes.</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {pollingEnabled 
                        ? "The page will automatically refresh when your itinerary is ready."
                        : "Please refresh the page in a few minutes to check if your itinerary is ready."}
                    </p>
                    {itinerary?.message && (
                      <p className="text-sm mt-2 italic">{itinerary.message}</p>
                    )}
                  </div>
                )}
              </TabsContent>
              
              {hasFlights && (
                <TabsContent value="flights" className="mt-4">
                  <FlightOptions flightData={itinerary?.flights} />
                </TabsContent>
              )}
              
              {hasAccommodations && (
                <TabsContent value="hotels" className="mt-4">
                  <AccommodationOptions accommodationsData={itinerary?.accommodations} />
                </TabsContent>
              )}
              
              <TabsContent value="map" className="mt-4">
                {itinerary && (
                  <MapView
                    itinerary={itinerary}
                    selectedDay={selectedDay}
                    selectedActivity={selectedActivity}
                  />
                )}
              </TabsContent>
            </Tabs>

            {itinerary && itinerary.budget && (
              <BudgetBreakdown
                budget={itinerary.budget}
                duration={duration}
                travelers={itinerary.accommodations?.travelers || 2}
              />
            )}
          </div>

          <div className="space-y-6">
            <ChatInterface itineraryId={id} />
          </div>
        </div>
      )}
    </div>
  );
}
