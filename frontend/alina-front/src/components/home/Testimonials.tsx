"use client";

import { useTranslations } from "next-intl";

// Testimonials are loaded from the real API when available.
// An empty array means the section is hidden until real data exists.
const TESTIMONIALS: { name: string; role: string; avatar: string | null; rating: number; textKey: string }[] = [];

export default function Testimonials() {
  useTranslations("Home.testimonials");
  if (!TESTIMONIALS.length) return null;
  return null;
}
