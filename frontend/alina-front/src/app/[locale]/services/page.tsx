import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";

export const metadata = {
  title: "Services - ALINA Freelance Marketplace",
  description: "Browse thousands of professional services across web development, design, writing, marketing, and more on ALINA.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ServicesSection />
    </div>
  );
}
