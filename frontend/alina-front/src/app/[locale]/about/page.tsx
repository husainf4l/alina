import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";

export const metadata = {
  title: "About ALINA - Freelance Services Marketplace",
  description: "Learn about ALINA, the leading platform connecting businesses with talented freelancers worldwide.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AboutSection />
    </div>
  );
}
