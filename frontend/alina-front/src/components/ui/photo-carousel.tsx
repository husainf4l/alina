"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageCard {
  id: string
  src: string
  alt: string
  rotation: number
}

interface PhotoCarouselProps {
  images: ImageCard[]
}

export function PhotoCarousel({ images }: PhotoCarouselProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [rotatingCards, setRotatingCards] = useState<number[]>([])

  // Continuous rotation animation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingCards((prev) => prev.map((angle) => (angle + 0.5) % 360))
    }, 50)

    return () => clearInterval(interval)
  }, [])

  // Initialize cards
  useEffect(() => {
    setRotatingCards(images.map((_, i) => i * (360 / images.length)))
  }, [images.length])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()

    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="relative w-full max-w-5xl h-full"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {images.map((image, index) => {
            const angle = (rotatingCards[index] || 0) * (Math.PI / 180)
            const radius = 180

            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            const perspectiveX = (mousePosition.x - 0.5) * 20
            const perspectiveY = (mousePosition.y - 0.5) * 20

            return (
              <div
                key={image.id}
                className="absolute w-36 h-44 transition-all duration-300"
                style={{
                  transform: `
                    translate(${x}px, ${y}px)
                    rotateX(${perspectiveY}deg)
                    rotateY(${perspectiveX}deg)
                    rotateZ(${image.rotation}deg)
                  `,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className={cn(
                    "relative w-full h-full rounded-xl overflow-hidden shadow-xl",
                    "hover:scale-110 transition-all duration-300"
                  )}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
