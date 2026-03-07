import Navbar from "@/components/Navbar";
import AuthCard from "@/components/auth/AuthCard";
import { PhotoCarousel } from "@/components/ui/photo-carousel";

export default function AuthPage() {
  const images = [
    {
      id: "1",
      src: "/logo/signin1.webp",
      alt: "ALINA Platform",
      rotation: -10,
    },
    {
      id: "2",
      src: "/logo/signin2.webp",
      alt: "ALINA Platform",
      rotation: 5,
    },
    {
      id: "3",
      src: "/logo/sign3.webp",
      alt: "ALINA Platform",
      rotation: 12,
    },
    {
      id: "4",
      src: "/logo/sign4.webp",
      alt: "ALINA Platform",
      rotation: -8,
    },
    {
      id: "5",
      src: "/logo/signin5.webp",
      alt: "ALINA Platform",
      rotation: 3,
    },
    {
      id: "6",
      src: "/logo/signin6.webp",
      alt: "ALINA Platform",
      rotation: -15,
    },
    {
      id: "7",
      src: "/logo/signin7.jpg",
      alt: "ALINA Platform",
      rotation: 8,
    },
    {
      id: "8",
      src: "/logo/signin8.jpg",
      alt: "ALINA Platform",
      rotation: -5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Two-column layout */}
      <main className="relative min-h-[calc(100svh-4rem)] [isolation:isolate] bg-gradient-to-br from-muted/30 to-background">
        {/* Dot grid background - full page */}
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(oklch(0.836_0_0/0.4)_1px,transparent_1px)] [background-size:28px_28px] dark:[background-image:radial-gradient(oklch(0.249_0_0/0.4)_1px,transparent_1px)]" />
        
        {/* Gradient overlays - full page */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#c71463]/5 to-[#3E9666]/5" />

        <div className="relative grid lg:grid-cols-2 min-h-[calc(100svh-4rem)]">
          {/* Left side - Photo Carousel (hidden on mobile) */}
          <div className="hidden lg:flex relative items-center justify-center">
            <div className="relative w-full h-full">
              <PhotoCarousel images={images} />
            </div>
          </div>

          {/* Right side - Auth Form */}
          <div className="relative flex items-center justify-center px-4 py-16">
            <AuthCard />
          </div>
        </div>
      </main>
    </div>
  );
}
