"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTouchSpotlight } from "@/hooks/useTouchSpotlight";

export function MobileHeroAnimation() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { containerRef: touchContainerRef } = useTouchSpotlight(3);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Transform scroll progress to various animation values
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.1, 0.3], [20, 0]);
  const buttonsOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const buttonsY = useTransform(scrollYProgress, [0.2, 0.4], [30, 0]);
  const backgroundBrightness = useTransform(scrollYProgress, [0.4, 0.8], [0.5, 1]);

  useEffect(() => {
    // Detect touch device
    setIsTouchDevice(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    );
  }, []);

  // Combine refs
  const setRefs = (el: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    (touchContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
  };

  if (!isTouchDevice) return null;

  return (
    <div
      ref={setRefs}
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden md:hidden"
    >
      {/* Touch spotlight effects */}
      <div className="absolute inset-0">
        {/* Primary touch point glow */}
        <div
          className="absolute w-[120px] h-[120px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(8, 145, 178, 0.4) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            left: "var(--touch-x-0, -9999px)",
            top: "var(--touch-y-0, -9999px)",
            transition: "left 0.15s ease-out, top 0.15s ease-out",
          }}
        />
        
        {/* Secondary touch point glow */}
        <div
          className="absolute w-[100px] h-[100px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(234, 88, 12, 0.3) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            left: "var(--touch-x-1, -9999px)",
            top: "var(--touch-y-1, -9999px)",
            transition: "left 0.15s ease-out, top 0.15s ease-out",
          }}
        />
        
        {/* Tertiary touch point glow */}
        <div
          className="absolute w-[80px] h-[80px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            left: "var(--touch-x-2, -9999px)",
            top: "var(--touch-y-2, -9999px)",
            transition: "left 0.15s ease-out, top 0.15s ease-out",
          }}
        />
      </div>

      {/* Pulsing circuit nodes at touch points */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: "var(--touch-x-0, -9999px)",
          top: "var(--touch-y-0, -9999px)",
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-[var(--color-silicon)]"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 0.4, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </motion.div>

      {/* Scroll-triggered background brightness */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(8, 145, 178, 0.1) 0%, transparent 50%)",
          opacity: backgroundBrightness,
        }}
      />
    </div>
  );
}
