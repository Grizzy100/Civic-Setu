// "use client";

// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Icon } from "@/components/ui/icon";

// export default function Location() {
//   const router = useRouter();

//   const handleAllowLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           console.log("Location:", position.coords);
//           router.push("/onboarding");
//         },
//         (error) => {
//           console.error("Location error:", error);
//           router.push("/onboarding");
//         }
//       );
//     } else {
//       router.push("/onboarding");
//     }
//   };

//   const handleManualEntry = () => {
//     router.push("/onboarding");
//   };

//   return (
//     <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-background">
//       {/* Header */}
//       <header className="absolute top-0 left-0 right-0 z-10 glass">
//         <div className="flex items-center p-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => router.back()}
//             className="text-foreground hover:text-primary"
//           >
//             <Icon name="arrow_back" />
//           </Button>
//           <h1 className="text-foreground text-lg font-bold flex-1 text-center pr-6 font-display">
//             Civic Sethu
//           </h1>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col justify-center px-6 pt-20 pb-8">
//         <div className="text-center">
//           <h2 className="text-foreground text-3xl font-bold tracking-tight mb-2 font-display">
//             Set Your Location
//           </h2>
//           <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
//             Enable location to report local issues and see what's happening in your community.
//           </p>
//         </div>

//         {/* Map Image */}
//         <div className="my-8 flex justify-center">
//           <div className="w-full max-w-xs h-auto aspect-[3/4] bg-center bg-no-repeat bg-cover rounded-3xl shadow-lg card-shadow">
//             <img
//               alt="Map of Jharkhand with warm color overlay"
//               className="w-full h-full object-cover rounded-3xl opacity-90"
//               src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZxByftMSb4qssRvD246sZbLlQUnCvwqYZEK-Q7a1EgjzMel6KxsQrKskJWRHo95CMwTEXo6ockQ5Gt2a0ma3IwIYrTSybhhf79yhjF99D7Qp2-IRCVu-IU_GityQu06TUF0Y4ccvec_fz-QSRUN6_ubvRLf7qPDZze-N_p_7_HEMR4nSkenxg1epAhJjcGgwAf0op9GYNpq66dwSue3MUQT6NkQGGW7xG6RT1ztoTbAaNapTj6HUe4RlcovtTSZDrY3fwQ0VWxIF_"
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="space-y-4">
//           <Button
//             onClick={handleAllowLocation}
//             className="flex w-full items-center justify-center gap-2 h-14 px-5 civic-gradient text-white text-lg font-bold transition-spring hover:scale-[1.02] active:scale-[0.98] civic-shadow"
//           >
//             <Icon name="my_location" />
//             <span>Allow Location</span>
//           </Button>
//           <Button
//             onClick={handleManualEntry}
//             variant="secondary"
//             className="flex w-full items-center justify-center h-14 px-5 bg-secondary text-secondary-foreground text-lg font-bold transition-spring hover:scale-[1.02] active:scale-[0.98]"
//           >
//             <span>Enter Manually</span>
//           </Button>
//         </div>
//       </main>

//       {/* Progress Indicator */}
//       <footer className="w-full pb-8 pt-4">
//         <div className="flex w-full flex-row items-center justify-center gap-3">
//           <div className="h-2 w-2 rounded-full bg-accent" />
//           <div className="h-2 w-4 rounded-full bg-primary" />
//           <div className="h-2 w-2 rounded-full bg-accent" />
//         </div>
//       </footer>
//     </div>
//   );
// }







// components/Location.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface LocationState {
  loading: boolean;
  error: string | null;
  manualEntry: boolean;
  address: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy?: number;
  address?: string;
}

export default function Location() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [state, setState] = useState<LocationState>({
    loading: false,
    error: null,
    manualEntry: false,
    address: '',
  });

  const saveLocationToAPI = async (locationData: LocationData, manual: boolean = false) => {
    try {
      const response = await fetch('/api/user/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: locationData.latitude,
          longitude: locationData.longitude,
          accuracy: locationData.accuracy,
          manual,
          manualAddress: manual ? state.address : undefined,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to save location');
      }

      return result.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  const handleAllowLocation = async () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 300000, // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          };

          console.log("Location obtained:", locationData);

          // Save to API
          await saveLocationToAPI(locationData, false);

          toast({
            title: "Location saved successfully",
            description: "Your location has been updated.",
          });

          // Navigate to next step
          router.push("/onboarding");
        } catch (error) {
          console.error("Location save error:", error);
          setState(prev => ({ 
            ...prev, 
            loading: false, 
            error: "Failed to save location. Please try again." 
          }));
          
          toast({
            title: "Location save failed",
            description: "Unable to save your location. Please try again.",
            variant: "destructive",
          });
        }
      },
      (error) => {
        let errorMessage = "Unable to get your location.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable. Please try manual entry.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Please try again.";
            break;
          default:
            errorMessage = "An unknown error occurred while getting location.";
            break;
        }

        console.error("Geolocation error:", error);
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
        
        toast({
          title: "Location Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
      options
    );
  };

  const handleManualEntry = () => {
    setState(prev => ({ ...prev, manualEntry: true, error: null }));
  };

  const handleManualSave = async () => {
    if (!state.address.trim()) {
      toast({
        title: "Address required",
        description: "Please enter your address.",
        variant: "destructive",
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // For manual entry, we'll use default coordinates for Ranchi
      // In a real app, you might want to geocode the address to get coordinates
      const defaultLocation: LocationData = {
        latitude: 23.3441, // Ranchi coordinates
        longitude: 85.3096,
        address: state.address,
      };

      await saveLocationToAPI(defaultLocation, true);

      toast({
        title: "Address saved successfully",
        description: "Your address has been saved.",
      });

      router.push("/onboarding");
    } catch (error) {
      console.error("Manual location save error:", error);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: "Failed to save address. Please try again." 
      }));
      
      toast({
        title: "Save failed",
        description: "Unable to save your address. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBackFromManual = () => {
    setState(prev => ({ 
      ...prev, 
      manualEntry: false, 
      address: '', 
      error: null 
    }));
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 glass">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={state.manualEntry ? handleBackFromManual : () => router.back()}
            className="text-foreground hover:text-primary"
            disabled={state.loading}
          >
            <Icon name="arrow_back" />
          </Button>
          <h1 className="text-foreground text-lg font-bold flex-1 text-center pr-6 font-display">
            Civic Sethu
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center px-6 pt-20 pb-8">
        <div className="text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight mb-2 font-display">
            {state.manualEntry ? "Enter Your Address" : "Set Your Location"}
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            {state.manualEntry 
              ? "Please enter your address manually to continue."
              : "Enable location to report local issues and see what's happening in your community."
            }
          </p>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="my-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{state.error}</p>
          </div>
        )}

        {/* Map Image or Manual Entry */}
        <div className="my-8 flex justify-center">
          {state.manualEntry ? (
            <div className="w-full max-w-sm space-y-4">
              <Input
                type="text"
                placeholder="Enter your address..."
                value={state.address}
                onChange={(e) => setState(prev => ({ ...prev, address: e.target.value }))}
                className="h-12 text-base"
                disabled={state.loading}
              />
              <p className="text-xs text-muted-foreground text-center">
                Include your area, city, and state for better accuracy
              </p>
            </div>
          ) : (
            <div className="w-full max-w-xs h-auto aspect-[3/4] bg-center bg-no-repeat bg-cover rounded-3xl shadow-lg card-shadow">
              <img
                alt="Map of Jharkhand with warm color overlay"
                className="w-full h-full object-cover rounded-3xl opacity-90"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZxByftMSb4qssRvD246sZbLlQUnCvwqYZEK-Q7a1EgjzMel6KxsQrKskJWRHo95CMwTEXo6ockQ5Gt2a0ma3IwIYrTSybhhf79yhjF99D7Qp2-IRCVu-IU_GityQu06TUF0Y4ccvec_fz-QSRUN6_ubvRLf7qPDZze-N_p_7_HEMR4nSkenxg1epAhJjcGgwAf0op9GYNpq66dwSue3MUQT6NkQGGW7xG6RT1ztoTbAaNapTj6HUe4RlcovtTSZDrY3fwQ0VWxIF_"
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {state.manualEntry ? (
            <Button
              onClick={handleManualSave}
              disabled={state.loading || !state.address.trim()}
              className="flex w-full items-center justify-center gap-2 h-14 px-5 civic-gradient text-white text-lg font-bold transition-spring hover:scale-[1.02] active:scale-[0.98] civic-shadow"
            >
              {state.loading ? (
                <>
                  <Icon name="refresh" className="animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Icon name="check" />
                  <span>Save Address</span>
                </>
              )}
            </Button>
          ) : (
            <>
              <Button
                onClick={handleAllowLocation}
                disabled={state.loading}
                className="flex w-full items-center justify-center gap-2 h-14 px-5 civic-gradient text-white text-lg font-bold transition-spring hover:scale-[1.02] active:scale-[0.98] civic-shadow"
              >
                {state.loading ? (
                  <>
                    <Icon name="refresh" className="animate-spin" />
                    <span>Getting Location...</span>
                  </>
                ) : (
                  <>
                    <Icon name="my_location" />
                    <span>Allow Location</span>
                  </>
                )}
              </Button>
              <Button
                onClick={handleManualEntry}
                variant="secondary"
                disabled={state.loading}
                className="flex w-full items-center justify-center h-14 px-5 bg-secondary text-secondary-foreground text-lg font-bold transition-spring hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Enter Manually</span>
              </Button>
            </>
          )}
        </div>
      </main>

      {/* Progress Indicator */}
      <footer className="w-full pb-8 pt-4">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-2 w-2 rounded-full bg-accent" />
          <div className="h-2 w-4 rounded-full bg-primary" />
          <div className="h-2 w-2 rounded-full bg-accent" />
        </div>
      </footer>
    </div>
  );
}
