'use client';

import { useState } from 'react';
import { ExternalLink, MapPin, DollarSign, Star, Wifi, Coffee, Calendar } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AccommodationOptionsProps {
  accommodationsData: any;
}

export function AccommodationOptions({ accommodationsData }: AccommodationOptionsProps) {
  const [activeTab, setActiveTab] = useState('options');
  
  if (!accommodationsData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Accommodation Options</CardTitle>
          <CardDescription>
            No accommodation information available.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Accommodation Options</CardTitle>
        <CardDescription>
          {accommodationsData.destination} • {formatDate(accommodationsData.check_in)} to {formatDate(accommodationsData.check_out)}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="options" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="options">Room Options</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="options">
            <ScrollArea className="h-[400px] pr-3">
              <div className="space-y-4">
                {/* Display the accommodation options from the response content */}
                <div className="whitespace-pre-line">
                  {/* This simply renders the markdown-formatted accommodation data results */}
                  {extractAccommodationOptions(accommodationsData.recommendations)}
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="details">
            <ScrollArea className="h-[400px] pr-3">
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Search Parameters</h3>
                  <p className="text-sm"><strong>Destination:</strong> {accommodationsData.destination}</p>
                  <p className="text-sm"><strong>Check-in:</strong> {formatDate(accommodationsData.check_in)}</p>
                  <p className="text-sm"><strong>Check-out:</strong> {formatDate(accommodationsData.check_out)}</p>
                  <p className="text-sm"><strong>Budget:</strong> {accommodationsData.budget}</p>
                  <p className="text-sm"><strong>Travelers:</strong> {accommodationsData.travelers}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">About These Results</h3>
                  <p className="text-sm text-muted-foreground">
                    Accommodation options are based on real-time searches using the Agno AI platform with DuckDuckGo web search. 
                    Prices are approximate and may change. Always check the booking website for the most current rates and availability.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4">
        <p className="text-sm text-muted-foreground">
          {activeTab === 'options' ? 'Prices are subject to change based on availability.' : 'Results powered by Agno + Groq AI'}
        </p>
        <Button variant="outline" size="sm" onClick={() => window.open('https://www.booking.com/', '_blank')}>
          <ExternalLink className="h-4 w-4 mr-2" />
          Search on Booking.com
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper function to extract and format accommodation options from the text
function extractAccommodationOptions(text: string): JSX.Element {
  if (!text) return <p>No accommodation information available.</p>;
  
  // Process the text to make hotel names and prices stand out
  const processedText = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold text
    .replace(/#+\s*(.*?)(?:\n|$)/g, (match, title) => {
      // Determine if this is a main heading or subheading
      const level = match.split('#').length - 1;
      const className = level === 1 
        ? "text-xl font-bold mt-6 mb-3" 
        : "text-lg font-semibold mt-4 mb-2";
      return `<h${level} class="${className}">${title}</h${level}>`;
    })
    .replace(/(\$\d+(?:,\d+)*(?:\.\d+)?(?:\s*\/\s*night|\s*total)?)/g, '<span class="text-green-600 font-bold">$1</span>') // Highlight prices
    .replace(/((?:\d+\s*)?stars?|★+|⭐+)/gi, '<span class="text-amber-500 font-medium">$1</span>') // Highlight stars
    .replace(/(Budget Option|Luxury Option|Best Value|Recommended)/gi, '<span class="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs font-medium">$1</span>'); // Highlight recommendations
  
  return <div dangerouslySetInnerHTML={{ __html: processedText }} />;
}