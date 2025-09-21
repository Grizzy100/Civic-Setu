"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import type { JSX } from "react";

// Sample avatar URLs - in a real app these would come from your API
const avatarUrls: string[] = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAWS3rfwbGFeGORPoJVJqkFE3s6N6TVyK82IavIkByRClY_TBbEqlE8BWfyF25HqblmaEIQSdWH6tsXwNuXNCTrwGvegiaTsE-Z7gdyBTFWWVI5kien0oAg5XZHgCrldg6XS0MeQ9YPnJsdhll-ozzdAV3zeUZf8Ndfgaste1fcDOtwCN-SJ5uliZWeY2loOGcjJRnkTs_SuA9W6bRBK0OzjmxZmHtEdUkJ5Hf43wDLjlDkspwULGJEkQJYm0j-W2GoystE9zugFzY9",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA5oPTFnkNT7TO6K1N1nUo0uFuLnMh2oIOhSnRAp9PcZ4lZgEQpgnHrr2Drfw-lb-2ppyCus1spSVCIye70FrbbwUIctg_OWz7_p82gtCC6VsrG9nvNzfRJXtyV6ZJwL0V6SrdEqiXkT5XAV3q98uNoeDteY0CtyzLkoQRgOxxSHcw33n5XlR4KxjL_MpJQD8IXW4PlAdetRivnmesLRrhvP5SPdGJKMH9XzPOUk1LusEs0ZccoWRuWogHTBS0z1WM2SARDn9ocJAMf",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDe__rVQ4AIbIe2UcZOwhLJKJcX2G9FNUwjHy11nLzLKuJbOgMo5U27mEtcMED6cX2rfhI9JP0_S5W4LILI5J5kZN4a_fdc8DWQIfECpfVduJlx4PSY0MgjGMLQPQzsDaz2I1mKElhTYZZVmE5dTBsRPZMWcPg1OuP57ydJZ5QAglF1q3gnvJ2Nz_aNQt3Ksku7B8LgsmnOhMyPhcv6QuujuG-h3Zz-M2k1MLDumCa4bwjfdrxOdWOXEBH5QXp69bM5gJlnoeYY-_KH",
  // ... other URLs
];

export default function Avatar(): JSX.Element {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1); // Default to second avatar

  const handleConfirm = (): void => {
    // In a real app, save the selected avatar to user preferences
    router.push("/profile");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-warm border-b border-border">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground"
          >
            <Icon name="close" size="3xl" />
          </Button>
          <h1 className="text-xl font-bold text-foreground text-center flex-1 pr-8">
            Choose Avatar
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-foreground mb-6 font-display">
          Select an avatar
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          {avatarUrls.map((url: string, index: number) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => setSelectedAvatar(index)}
            >
              <div
                className={`w-full aspect-square bg-cover rounded-full border-4 transition-all duration-200 ring-2 ring-offset-2 ring-offset-background ${
                  selectedAvatar === index
                    ? "border-primary ring-primary"
                    : "border-transparent ring-transparent group-hover:border-primary group-hover:ring-primary/50"
                }`}
                style={{ backgroundImage: `url("${url}")` }}
              />
              <div
                className={`absolute inset-0 rounded-full bg-black/50 flex items-center justify-center transition-opacity duration-200 ${
                  selectedAvatar === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Icon name="check_circle" size="4xl" className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 bg-background border-t border-border p-4">
        <Button
          onClick={handleConfirm}
          className="w-full h-14 text-lg font-bold civic-gradient civic-shadow transition-spring hover:scale-[1.02] active:scale-[0.98]"
        >
          Confirm Selection
        </Button>
      </footer>
    </div>
  );
}
