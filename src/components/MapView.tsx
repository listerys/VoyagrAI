'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { MapPin, Loader2, ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert';
import { Location } from '@/lib/api';

// Define a global variable for script loading status
let googleMapsLoaded = false;

interface MapViewProps {
  destination: string;
  initialLocation?: Location;
  activities?: Array<{
    name: string;
    location: Location;
  }>;
  onMapLoaded?: () => void;
  height?: string;
  width?: string;
  zoomLevel?: number;
  interactive?: boolean;
  className?: string;
}

// Get Google Maps API key from environment variable
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

export function MapView({
  destination,
  initialLocation,
  activities = [],
  onMapLoaded,
  height = '400px',
  width = '100%',
  zoomLevel = 13,
  interactive = true,
  className = ''
}: MapViewProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{
    name: string;
    position: google.maps.LatLngLiteral;
    address?: string;
    maps_url?: string;
  } | null>(null);
  
  const mapRef = useRef<google.maps.Map | null>(null);

  // Custom map style to match the app's dark theme
  const mapStyles = [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [{ color: '#242f3e' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'all',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#242f3e' }]
    },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }]
    }
  ];

  // Load Google Maps script only once
  useEffect(() => {
    if (googleMapsLoaded || window.google?.maps) {
      setIsScriptLoaded(true);
      return;
    }

    const loadGoogleMapsScript = () => {
      if (document.getElementById('google-maps-script')) {
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.id = 'google-maps-script';
      
      script.onload = () => {
        console.log('Google Maps script loaded');
        googleMapsLoaded = true;
        setIsScriptLoaded(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load Google Maps script');
        setError('Failed to load Google Maps. Please check your internet connection and try again.');
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, [apiKey]);

  // Geocode the destination to get coordinates
  const geocodeDestination = useCallback(async (destination: string) => {
    if (!destination) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // If we already have coordinates from initialLocation, use them
      if (initialLocation?.coordinates?.lat && initialLocation?.coordinates?.lng) {
        setCenter({
          lat: initialLocation.coordinates.lat,
          lng: initialLocation.coordinates.lng
        });
        setIsLoading(false);
        return;
      }
      
      // Otherwise use Geocoding API
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: destination }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
          const location = results[0].geometry.location;
          setCenter({
            lat: location.lat(),
            lng: location.lng()
          });
          
          // If the map is available, pan to this location
          if (mapRef.current) {
            mapRef.current.panTo({
              lat: location.lat(),
              lng: location.lng()
            });
            mapRef.current.setZoom(zoomLevel);
          }
        } else {
          console.error('Geocoding error:', status);
          setError(`Could not find location: ${destination}`);
          // Default to a fallback location
          setCenter({ lat: 40.7128, lng: -74.0060 }); // New York as fallback
        }
        setIsLoading(false);
      });
    } catch (err) {
      console.error('Map loading error:', err);
      setError('Error loading map. Please try again later.');
      setIsLoading(false);
    }
  }, [initialLocation, zoomLevel]);

  // Initialize map
  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Map loaded successfully');
    mapRef.current = map;
    setMap(map);
    
    // Apply custom styles
    map.setOptions({
      styles: mapStyles,
      disableDefaultUI: !interactive,
      zoomControl: interactive,
      scrollwheel: interactive,
      streetViewControl: interactive,
      fullscreenControl: interactive
    });
    
    if (onMapLoaded) {
      onMapLoaded();
    }
  }, [mapStyles, onMapLoaded, interactive]);

  const onUnmount = useCallback(() => {
    console.log('Map unmounted');
    mapRef.current = null;
    setMap(null);
  }, []);

  // Update map when destination changes or when script loads
  useEffect(() => {
    if (isScriptLoaded && destination) {
      geocodeDestination(destination);
    }
  }, [destination, geocodeDestination, isScriptLoaded]);

  // Handle marker click
  const handleMarkerClick = (name: string, position: google.maps.LatLngLiteral, address?: string, maps_url?: string) => {
    setSelectedMarker({ name, position, address, maps_url });
  };

  // Close info window
  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const customMapContainerStyle = {
    width,
    height,
    borderRadius: '0.5rem'
  };

  // If no API key is available
  if (!apiKey) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Map Not Available</CardTitle>
          <CardDescription>
            Google Maps API key is missing. Please check your environment configuration.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-indigo-400" />
              {destination || 'Map View'}
            </CardTitle>
            {initialLocation?.name && (
              <CardDescription>
                {initialLocation.name}
              </CardDescription>
            )}
          </div>
          {error && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => geocodeDestination(destination)}
            >
              Retry
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-hidden rounded-b-lg">
        {error ? (
          <Alert variant="destructive" className="m-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 rounded-b-lg">
                <div className="flex flex-col items-center space-y-2">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
                  <span className="text-sm text-white">Loading map...</span>
                </div>
              </div>
            )}
            
            {/* Display a colored placeholder box until map is loaded */}
            <div className="bg-zinc-900 w-full" style={{ height }}></div>
            
            {isScriptLoaded && center && (
              <div className="absolute top-0 left-0 w-full" style={{ height }}>
                <GoogleMap
                  mapContainerStyle={customMapContainerStyle}
                  center={center}
                  zoom={zoomLevel}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  options={{
                    styles: mapStyles,
                    disableDefaultUI: !interactive,
                    zoomControl: interactive,
                    scrollwheel: interactive,
                    streetViewControl: interactive,
                    fullscreenControl: interactive
                  }}
                >
                  {/* Main destination marker */}
                  <Marker
                    position={center}
                    icon={{
                      url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="%23818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
                      scaledSize: new google.maps.Size(36, 36),
                      origin: new google.maps.Point(0, 0),
                      anchor: new google.maps.Point(18, 36)
                    }}
                    onClick={() => handleMarkerClick(
                      destination, 
                      center, 
                      initialLocation?.address,
                      initialLocation?.maps_url
                    )}
                  />
                  
                  {/* Activity markers */}
                  {activities.map((activity, index) => {
                    if (activity.location?.coordinates?.lat && activity.location?.coordinates?.lng) {
                      const position = {
                        lat: activity.location.coordinates.lat,
                        lng: activity.location.coordinates.lng
                      };
                      
                      return (
                        <Marker
                          key={index}
                          position={position}
                          icon={{
                            url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%23a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
                            scaledSize: new google.maps.Size(24, 24),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(12, 24)
                          }}
                          onClick={() => handleMarkerClick(
                            activity.name, 
                            position,
                            activity.location.address,
                            activity.location.maps_url
                          )}
                        />
                      );
                    }
                    return null;
                  })}
                  
                  {/* Info window for selected marker */}
                  {selectedMarker && (
                    <InfoWindow
                      position={selectedMarker.position}
                      onCloseClick={handleInfoWindowClose}
                    >
                      <div className="p-2 max-w-xs bg-white rounded shadow-sm">
                        <p className="font-semibold text-gray-900">{selectedMarker.name}</p>
                        {selectedMarker.address && (
                          <p className="text-sm text-gray-600 mt-1">{selectedMarker.address}</p>
                        )}
                        {selectedMarker.maps_url && (
                          <a 
                            href={selectedMarker.maps_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-indigo-600 mt-2 hover:text-indigo-800"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View in Google Maps
                          </a>
                        )}
                      </div>
                    </InfoWindow>
                  )}
                </GoogleMap>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}