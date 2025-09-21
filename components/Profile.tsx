"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ImageUploadModal } from "@/components/ImageUploadModal";

interface Offer {
  id: number;
  title: string;
  discount: string;
  image: string;
}

const offers: Offer[] = [
  /* ... your offers array ... */
];

export default function Profile() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<"home" | "profile">("profile");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleTabChange = (tab: "home" | "profile") => {
    setCurrentTab(tab);
    if (tab === "home") {
      router.push("/");
    }
  };

  const handleAvatarEdit = () => {
    router.push("/avatar");
  };

  const handleReportIssue = () => {
    setShowUploadModal(true);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col justify-between overflow-x-hidden bg-warm-background">
      {/* Header */}
      <header className="flex items-center bg-background p-4 justify-between sticky top-0 z-10 shadow-sm">
        <div className="w-10" />
        <h1 className="text-foreground text-xl font-bold leading-tight flex-1 text-center font-display">
          Profile
        </h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="p-4 flex flex-col items-center">
        {/* Avatar Section */}
        <div className="relative mb-4">
          <img
            alt="User Avatar"
            className="rounded-full h-32 w-32 object-cover border-4 border-background shadow-lg"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcwYVWLw9T-W7h8o3VQvIO931OtEdpODH67JtT2phKDJ-S5SC9cOhIcm9S1Fv5uRVLBMIUhV5yga2Xvh5JOwzD2NRXT5SrLhjX0EYsSwgqC8PAkQ2KsftTfUNk5SstWl19QLA7Uw39KAaycdoi5pWNL2XafMi9ZOR-gbxwHPREOW-wHlXB5k3ijX0r_orTxTKVDXJDPerp5FyzMug1PmgXlf24pRObz1WZGfYZNSYb3jVrT99J2PC1IVZqcQ80jz3KEEYTxKESXMSJ"
          />
          <Button
            onClick={handleAvatarEdit}
            size="icon"
            className="absolute bottom-1 right-1 bg-primary h-8 w-8 rounded-full flex items-center justify-center text-white shadow-md hover:bg-primary/90 transition-all"
          >
            <Icon name="edit" size="lg" />
          </Button>
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <p className="text-foreground text-2xl font-bold leading-tight font-display">
            Rohan
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Icon name="stars" className="text-primary" size="xl" />
            <p className="text-muted-foreground text-lg font-medium leading-normal">
              1200 Karma
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full mb-6">
          <div className="grid grid-cols-2 gap-4 px-4">
            <Button
              onClick={() => router.push("/reports")}
              variant="outline"
              className="h-16 flex flex-col gap-1 hover:bg-muted transition-colors"
            >
              <Icon name="history" size="2xl" className="text-primary" />
              <span className="text-sm font-medium">My Reports</span>
            </Button>
            <Button
              onClick={handleReportIssue}
              className="h-16 flex flex-col gap-1 civic-gradient text-white hover:opacity-90 transition-all"
            >
              <Icon name="add_circle" size="2xl" />
              <span className="text-sm font-medium">Report Issue</span>
            </Button>
          </div>
        </div>

        {/* Offers Section */}
        <section className="w-full">
          <h2 className="text-foreground text-xl font-bold leading-tight px-4 pb-3 font-display">
            Redeem Offers This Month
          </h2>
          <div className="grid grid-cols-2 gap-4 px-4 pb-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="flex flex-col gap-3 rounded-xl bg-background p-3 shadow-sm card-shadow hover:shadow-md transition-all cursor-pointer"
              >
                <div
                  className="w-full aspect-square bg-cover rounded-lg"
                  style={{ backgroundImage: `url("${offer.image}")` }}
                />
                <div>
                  <p className="text-foreground text-base font-bold leading-normal">
                    {offer.title}
                  </p>
                  <p className="text-primary text-sm font-semibold">
                    {offer.discount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <footer className="sticky bottom-0 bg-background shadow-[0_-2px_4px_rgba(0,0,0,0.05)]">
        <nav className="flex justify-around items-center h-16">
          <button
            onClick={() => handleTabChange("home")}
            className={`flex flex-col items-center justify-center w-1/3 transition-colors ${
              currentTab === "home" ? "text-primary font-semibold" : "text-muted-foreground"
            }`}
          >
            <Icon name="home" size="2xl" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={handleReportIssue}
            className="flex items-center justify-center -mt-8 transition-spring hover:scale-110 active:scale-95"
          >
            <div className="flex items-center justify-center h-16 w-16 civic-gradient rounded-full text-white civic-shadow">
              <Icon name="add" size="4xl" />
            </div>
          </button>

          <button
            onClick={() => handleTabChange("profile")}
            className={`flex flex-col items-center justify-center w-1/3 transition-colors ${
              currentTab === "profile" ? "text-primary font-semibold" : "text-muted-foreground"
            }`}
          >
            <Icon name="person" size="2xl" />
            <span className="text-xs">Profile</span>
          </button>
        </nav>
      </footer>

      {/* Image Upload Modal */}
      <ImageUploadModal 
        open={showUploadModal} 
        onOpenChange={setShowUploadModal} 
      />
    </div>
  );
}
