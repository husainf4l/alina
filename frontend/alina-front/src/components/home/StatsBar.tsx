"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

function useCountUp(end: number, duration = 2000, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, active]);
  return val;
}

interface StatItemProps {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  active: boolean;
}

function StatItem({ label, value, suffix, prefix = "", active }: StatItemProps) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4">
      <span className="text-3xl sm:text-4xl font-bold text-foreground tabular-nums">
        {prefix}{count.toLocaleString()}{suffix}
      </span>
      <span className="text-sm text-muted-foreground font-medium text-center">{label}</span>
    </div>
  );
}

export default function StatsBar() {
  const t = useTranslations("Home.stats");
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { key: "freelancers", value: 1000000, suffix: "+", prefix: "" },
    { key: "projects", value: 5000000, suffix: "+", prefix: "" },
    { key: "satisfaction", value: 98, suffix: "%", prefix: "" },
    { key: "countries", value: 160, suffix: "+", prefix: "" },
  ];

  return (
    <section ref={ref} className="w-full border-y border-border bg-card/50">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-border">
          {stats.map((s) => (
            <StatItem
              key={s.key}
              label={t(s.key)}
              value={s.value}
              suffix={s.suffix}
              prefix={s.prefix}
              active={active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
