"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const animationClasses: Record<string, string> = {
  "fade-in-up": "animate-fade-in-up",
  "fade-in-down": "animate-fade-in-down",
  "slide-in-right": "animate-slide-in-right",
  "scale-in": "animate-scale-in",
  "fade-in": "animate-fade-in",
};

type AnimationType = keyof typeof animationClasses;

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  once?: boolean;
  rootMargin?: string;
}

export function AnimateIn({
  children,
  className,
  animation = "fade-in-up",
  delay = 0,
  once = true,
  rootMargin = "0px 0px -40px 0px",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
        else if (!once) setVisible(false);
      },
      { threshold: 0.08, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once, rootMargin]);

  return (
    <div
      ref={ref}
      className={cn(
        !visible && "opacity-0",
        visible && animationClasses[animation],
        className
      )}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
