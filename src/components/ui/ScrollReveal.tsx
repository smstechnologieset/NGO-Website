"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-in" | "stagger-children" | "scale-up" | "slide-right" | "slide-left";
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  triggerOnce?: boolean;
}

export default function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.9,
  stagger = 0.15,
  className = "",
  triggerOnce = true,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    let ctx = gsap.context(() => {
      if (animation === "stagger-children") {
        const targets = element.children;
        gsap.fromTo(
          targets,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: duration,
            stagger: stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      } else if (animation === "fade-up") {
        gsap.fromTo(
          element,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: duration,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      } else if (animation === "scale-up") {
        gsap.fromTo(
          element,
          { opacity: 0, scale: 0.92 },
          {
            opacity: 1,
            scale: 1,
            duration: duration,
            delay: delay,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      } else if (animation === "slide-right") {
        gsap.fromTo(
          element,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: duration,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      } else if (animation === "slide-left") {
        gsap.fromTo(
          element,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: duration,
            delay: delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      } else {
        // fade-in
        gsap.fromTo(
          element,
          { opacity: 0 },
          {
            opacity: 1,
            duration: duration,
            delay: delay,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: triggerOnce ? "play none none none" : "play reverse play reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [animation, delay, duration, stagger, triggerOnce]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
