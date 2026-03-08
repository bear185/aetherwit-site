"use client";

import { useEffect, useRef } from "react";

export function SpotlightBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top } = containerRef.current.getBoundingClientRect();
      
      const x = clientX - left;
      const y = clientY - top;
      
      containerRef.current.style.setProperty("--x", `${x}px`);
      containerRef.current.style.setProperty("--y", `${y}px`);
    };

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (!containerRef.current || e.touches.length === 0) return;
      
      const touch = e.touches[0];
      const { left, top } = containerRef.current.getBoundingClientRect();
      
      const x = touch.clientX - left;
      const y = touch.clientY - top;
      
      containerRef.current.style.setProperty("--x", `${x}px`);
      containerRef.current.style.setProperty("--y", `${y}px`);
    };

    // Only add mouse events on non-touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    // Add touch events for all devices
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Cybernetic/circuit irregular lines background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-[0.15]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cyber-lines" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M0,50 L50,50 L75,25 L100,25 L125,50 L200,50" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              <path d="M50,0 L50,50 L25,75 L25,125 L50,150 L50,200" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              <path d="M100,0 L100,25 L125,50 L125,150 L100,175 L100,200" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              <path d="M0,150 L50,150 L75,175 L125,175 L150,150 L200,150" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              <path d="M150,0 L150,25 L175,50 L175,100 L150,125 L150,200" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              <path d="M0,100 L25,100 L50,75 L100,75 L125,100 L200,100" stroke="var(--border-color)" strokeWidth="1" fill="none" />
              
              {/* Circuit nodes */}
              <circle cx="50" cy="50" r="2" fill="var(--color-silicon)" opacity="0.5" />
              <circle cx="125" cy="50" r="2" fill="var(--color-carbon)" opacity="0.5" />
              <circle cx="25" cy="125" r="2" fill="var(--color-ai)" opacity="0.5" />
              <circle cx="125" cy="175" r="2" fill="var(--color-silicon)" opacity="0.5" />
              <circle cx="175" cy="100" r="2" fill="var(--color-carbon)" opacity="0.5" />
            </pattern>
            
            <mask id="fade-mask">
              <rect width="100%" height="100%" fill="url(#radial-gradient)" />
            </mask>
            <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="white" />
              <stop offset="80%" stopColor="white" stopOpacity="0.2" />
              <stop offset="100%" stopColor="black" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#cyber-lines)" mask="url(#fade-mask)" />
        </svg>
      </div>

      {/* 
        This is the "illuminated" layer that only shows where the mouse is.
        Using a spotlight-mask to reveal the vibrant colors (silicon & carbon embracing)
      */}
      <div 
        className="absolute inset-0 spotlight-mask opacity-80 mix-blend-screen dark:mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 40% 40%, var(--color-silicon) 0%, transparent 60%), radial-gradient(circle at 60% 60%, var(--color-carbon) 0%, transparent 60%)"
        }}
      >
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[var(--color-silicon)]/20 rounded-full blur-[80px] animate-fluid mix-blend-screen pointer-events-none"></div>
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-[var(--color-carbon)]/20 rounded-full blur-[80px] animate-fluid mix-blend-screen pointer-events-none" style={{ animationDelay: '-3s' }}></div>
      </div>
    </div>
  );
}
