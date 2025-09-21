// ===== app/page.tsx (Home Page) =====
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaPeopleLine } from "react-icons/fa6";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-orange-100">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 rounded-full flex items-center justify-center civic-shadow">
            <FaPeopleLine size="2xl" className="text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground font-display">
            Welcome to Civic Sethu
          </h1>
          <p className="text-xl text-[#8B4513] max-w-md mx-auto">
            Building better communities together. Report issues, earn Karma, and make a difference in Jharkhand.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => router.push("/sign-up")}
            className="w-full max-w-sm h-14 text-lg font-bold text-white bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 rounded-lg shadow-lg transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started
          </Button>

          {/* <div className="flex gap-4 max-w-sm mx-auto">
            <Link href="/sign-in" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 font-semibold hover:bg-muted"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up" className="flex-1">
              <Button
                variant="outline"
                className="w-full h-12 font-semibold hover:bg-muted"
              >
                Sign Up
              </Button>
            </Link>
          </div> */}
        </div>

        <div className="pt-8">
          <p className="text-sm text-[#8B4513]">
            Join thousands of citizens making Jharkhand better
          </p>
        </div>
      </div>
    </div>
  );
}