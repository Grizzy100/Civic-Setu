"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function Location() {
  const router = useRouter();

  const handleAllowLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location:", position.coords);
          router.push("/onboarding");
        },
        (error) => {
          console.error("Location error:", error);
          router.push("/onboarding");
        }
      );
    } else {
      router.push("/onboarding");
    }
  };

  const handleManualEntry = () => {
    router.push("/onboarding");
  };

  return (
    <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-background">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 glass">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-foreground hover:text-primary"
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
            Set Your Location
          </h2>
          <p className="text-muted-foreground text-base leading-relaxed max-w-sm mx-auto">
            Enable location to report local issues and see what's happening in your community.
          </p>
        </div>

        {/* Map Image */}
        <div className="my-8 flex justify-center">
          <div className="w-full max-w-xs h-auto aspect-[3/4] bg-center bg-no-repeat bg-cover rounded-3xl shadow-lg card-shadow">
            <img
              alt="Map of Jharkhand with warm color overlay"
              className="w-full h-full object-cover rounded-3xl opacity-90"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZxByftMSb4qssRvD246sZbLlQUnCvwqYZEK-Q7a1EgjzMel6KxsQrKskJWRHo95CMwTEXo6ockQ5Gt2a0ma3IwIYrTSybhhf79yhjF99D7Qp2-IRCVu-IU_GityQu06TUF0Y4ccvec_fz-QSRUN6_ubvRLf7qPDZze-N_p_7_HEMR4nSkenxg1epAhJjcGgwAf0op9GYNpq66dwSue3MUQT6NkQGGW7xG6RT1ztoTbAaNapTj6HUe4RlcovtTSZDrY3fwQ0VWxIF_"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleAllowLocation}
            className="flex w-full items-center justify-center gap-2 h-14 px-5 civic-gradient text-white text-lg font-bold transition-spring hover:scale-[1.02] active:scale-[0.98] civic-shadow"
          >
            <Icon name="my_location" />
            <span>Allow Location</span>
          </Button>
          <Button
            onClick={handleManualEntry}
            variant="secondary"
            className="flex w-full items-center justify-center h-14 px-5 bg-secondary text-secondary-foreground text-lg font-bold transition-spring hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Enter Manually</span>
          </Button>
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
