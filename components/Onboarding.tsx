"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function Onboarding() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/avatar");
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col justify-between overflow-x-hidden bg-background">
      {/* Header */}
      <header className="flex items-center p-4 justify-between sticky top-0 glass z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background shadow-sm hover:bg-muted"
        >
          <Icon name="arrow_back" className="text-foreground" />
        </Button>
        <h2 className="text-foreground text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display">
          Civic Sethu
        </h2>
        <div className="size-10" />
      </header>

      {/* Main Content */}
      <main className="flex-grow px-6 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-foreground text-4xl font-bold leading-tight tracking-tighter font-display">
            Karma System & Offer Claim
          </h1>
          <p className="text-muted-foreground text-base font-normal leading-relaxed max-w-md mx-auto">
            Earn Karma points by actively participating in community initiatives and reporting issues. 
            Redeem these points for exclusive offers from top food chains and mobile apps.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mt-12">
          <div
            className="w-full bg-center bg-no-repeat bg-cover rounded-3xl aspect-[4/5] shadow-xl warm-shadow"
            style={{
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaJYwlHWoxWaoL5grotu6QgCNLcjQF2LpM07nFn91sjj1BpCDus_b9PTqzJtcDaxsw3vNIjURNaDUViSysaRopfAsuHYLPFMVx_r4bAYH0dHiPG0VIeLJkENU81o8o_BVVUSzFsSkTxDCi86CF0tgerqBH2swImBhToEx-hu-0FzIvB-VCXt1k-J2rAZgK_xDx1GGomVtZj70wu-AswYOoCS7hgmqLqWEPUN8gCLdjsfubNHER9iqb0SiJT54v2jfL1q3ry9O55tHb")`,
            }}
          />
        </div>

        {/* How it Works Section */}
        <div className="mt-12 space-y-4">
          <h3 className="text-foreground text-2xl font-bold leading-tight tracking-tight font-display">
            How it Works
          </h3>
          <div className="space-y-6">
            {[
              { icon: "military_tech", title: "Earn Karma Points", desc: "Report issues, participate in community events, and engage with other users." },
              { icon: "redeem", title: "Redeem Offers", desc: "Accumulated Karma points can be exchanged for exciting offers." },
              { icon: "sentiment_satisfied", title: "Enjoy Rewards", desc: "Enjoy discounts and freebies from popular food chains and mobile apps." },
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex items-center justify-center rounded-full bg-primary/20 text-primary shrink-0 size-12">
                  <Icon name={item.icon} size="3xl" />
                </div>
                <div className="flex flex-col">
                  <p className="text-foreground text-lg font-bold leading-normal">{item.title}</p>
                  <p className="text-muted-foreground text-base font-normal leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 glass p-4">
        <div className="flex gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex flex-1 min-w-[84px] h-14 px-5 bg-background text-foreground text-lg font-bold shadow-sm hover:bg-muted"
          >
            <span>Back</span>
          </Button>
          <Button
            onClick={handleNext}
            className="flex flex-1 min-w-[84px] h-14 px-5 civic-gradient text-white text-lg font-bold civic-shadow transition-spring hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Next</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
