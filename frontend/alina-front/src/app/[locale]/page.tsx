import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import TrendingGigs from "@/components/home/TrendingGigs";
import WhyAlina from "@/components/home/WhyAlina";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <TrendingGigs />
      <WhyAlina />
      <CTABanner />
    </div>
  );
}
