import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";

export const metadata = {
  title: "Contact ALINA - Get in Touch",
  description: "Have questions? Get in touch with the ALINA team. We're here to help you succeed.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <ContactSection />
    </div>
  );
}
