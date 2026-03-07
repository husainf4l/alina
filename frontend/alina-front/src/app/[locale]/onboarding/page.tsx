import Navbar from "@/components/Navbar";
import OnboardingCard from "@/components/onboarding/OnboardingCard";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-16 [isolation:isolate]">
        {/* Dot grid background */}
        <div className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(oklch(0.836_0_0/0.6)_1px,transparent_1px)] [background-size:28px_28px] dark:[background-image:radial-gradient(oklch(0.249_0_0/0.6)_1px,transparent_1px)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <OnboardingCard />
      </main>
    </div>
  );
}
