'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Plane, Calendar, ArrowRight, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FlightOptionsProps {
  flightData: any;
}

// Helper function to format flight text with enhanced styling
function formatFlightText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary">$1</strong>') // bold with primary color
    .replace(/(Option \d+:)/g, '<div class="flex items-center gap-2 border-l-4 border-primary pl-3 py-2 mt-6 mb-3"><span class="text-lg font-medium">$1</span></div>')
    .replace(/(\$\d+(?:\.\d+)?)/g, '<span class="text-emerald-400 font-semibold">$1</span>')
    .replace(/(Best Option|Recommended|Best Value)/gi, '<span class="inline-flex items-center bg-emerald-950/50 text-emerald-400 px-3 py-1 rounded-full text-xs font-medium border border-emerald-800/50 ml-2">$1</span>')
    .replace(/(Economy|Business|First Class)/g, '<span class="text-violet-400 font-medium">$1</span>')
    .replace(/(Duration: )([^,\n]+)/g, '<div class="flex items-center mt-2 text-sm"><span class="text-muted-foreground mr-2">Duration:</span><span class="font-medium">$2</span></div>')
    .replace(/(Layover: )([^,\n]+)/g, '<div class="flex items-center mt-1 text-sm"><span class="text-muted-foreground mr-2">Layover:</span><span class="font-medium">$2</span></div>')
    .trim();
}

export function FlightOptions({ flightData }: FlightOptionsProps) {
  const [activeTab, setActiveTab] = useState('flights');
  const [hasFlights, setHasFlights] = useState(false);

  useEffect(() => {
    // Check if flights data is available
    setHasFlights(
      !!flightData && 
      (!!flightData.response || !!flightData.recommendations) &&
      !!flightData.origin &&
      !!flightData.destination
    );
  }, [flightData]);

  if (!hasFlights) {
    return (
      <Card className="w-full bg-zinc-900 border-zinc-800 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold tracking-tight">Flight Options</CardTitle>
          <CardDescription className="text-zinc-400">
            No flight information available. Add your departure city to see flight options.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-10 text-center">
          <Plane className="h-16 w-16 text-zinc-700 mb-4" />
          <p className="text-zinc-400 max-w-md">
            Flight information will appear here once you've added your departure and destination cities.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Fallback to flightData.recommendations if flightData.response is empty
  const flightText = flightData.response || flightData.recommendations || '';

  return (
    <Card className="w-full bg-zinc-900 border-zinc-800 backdrop-blur-sm overflow-hidden transition-all">
      <CardHeader className="pb-3 border-b border-zinc-800/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <CardTitle className="text-xl font-semibold tracking-tight">Flight Options</CardTitle>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className="rounded-full bg-zinc-800/50 text-zinc-300 border-zinc-700 mr-2">
                <Plane className="h-3 w-3 mr-1 inline" />
                {flightData.origin}
              </Badge>
              <ArrowRight className="h-3 w-3 text-zinc-600 mx-1" />
              <Badge variant="outline" className="rounded-full bg-zinc-800/50 text-zinc-300 border-zinc-700">
                <Plane className="h-3 w-3 mr-1 inline" />
                {flightData.destination}
              </Badge>
              {flightData.one_way ? (
                <Badge variant="outline" className="ml-2 rounded-full bg-zinc-800/50 text-zinc-400 border-zinc-700">
                  One Way
                </Badge>
              ) : (
                <Badge variant="outline" className="ml-2 rounded-full bg-zinc-800/50 text-zinc-400 border-zinc-700">
                  <Calendar className="h-3 w-3 mr-1 inline" />
                  {flightData.departure_date} - {flightData.return_date}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <Tabs defaultValue="flights" className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none bg-zinc-900 border-b border-zinc-800/50">
            <TabsTrigger 
              value="flights" 
              className="rounded-none data-[state=active]:bg-zinc-800/30 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Flight Options
            </TabsTrigger>
            <TabsTrigger 
              value="info" 
              className="rounded-none data-[state=active]:bg-zinc-800/30 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
            >
              Travel Info
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="flights" className="m-0">
            <ScrollArea className="h-[400px]">
              <div className="p-6">
                <div
                  className="text-zinc-300 space-y-2"
                  dangerouslySetInnerHTML={{ __html: formatFlightText(flightText) }}
                />
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="info" className="m-0">
            <ScrollArea className="h-[400px]">
              <div className="p-6 space-y-4">
                <div className="rounded-lg bg-zinc-800/30 border border-zinc-800 p-4">
                  <h3 className="text-sm font-medium flex items-center mb-3">
                    <Info className="h-4 w-4 mr-2 text-primary" />
                    Travel Advisory
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Always check visa requirements and travel restrictions before booking. Flight prices and availability 
                    are subject to change until confirmed with the airline.
                  </p>
                </div>
                
                <div className="rounded-lg bg-zinc-800/30 border border-zinc-800 p-4">
                  <h3 className="text-sm font-medium flex items-center mb-3">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    Flight Search Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Origin:</span>
                      <span className="font-medium">{flightData.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Destination:</span>
                      <span className="font-medium">{flightData.destination}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Departure:</span>
                      <span className="font-medium">{flightData.departure_date}</span>
                    </div>
                    {!flightData.one_way && (
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Return:</span>
                        <span className="font-medium">{flightData.return_date}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Trip Type:</span>
                      <span className="font-medium">{flightData.one_way ? 'One Way' : 'Round Trip'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-zinc-800/50 p-4 bg-zinc-900/30">
        <p className="text-xs text-zinc-500">
          Prices and availability may change. Check the booking site for current information.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300"
          onClick={() => window.open('https://www.skyscanner.com/', '_blank')}
        >
          <ExternalLink className="h-3.5 w-3.5 mr-2" />
          Search on Skyscanner
        </Button>
      </CardFooter>
    </Card>
  );
}