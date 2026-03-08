"use client";

import { useEffect, useRef, useCallback } from "react";

interface TouchPoint {
  x: number;
  y: number;
  id: number;
}

export function useTouchSpotlight(maxTouchPoints: number = 3) {
  const touchPointsRef = useRef<TouchPoint[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | undefined>(undefined);
  const lastUpdateRef = useRef<number>(0);

  const updateSpotlight = useCallback(() => {
    if (!containerRef.current) return;
    
    const now = performance.now();
    // Throttle to 60fps (16.67ms)
    if (now - lastUpdateRef.current < 16.67) {
      rafIdRef.current = requestAnimationFrame(updateSpotlight);
      return;
    }
    lastUpdateRef.current = now;

    touchPointsRef.current.forEach((point, index) => {
      containerRef.current?.style.setProperty(
        `--touch-x-${index}`,
        `${point.x}px`
      );
      containerRef.current?.style.setProperty(
        `--touch-y-${index}`,
        `${point.y}px`
      );
    });

    rafIdRef.current = requestAnimationFrame(updateSpotlight);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touches = Array.from(e.touches).slice(0, maxTouchPoints);
      
      touchPointsRef.current = touches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
        id: touch.identifier,
      }));

      if (!rafIdRef.current) {
        rafIdRef.current = requestAnimationFrame(updateSpotlight);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touches = Array.from(e.touches).slice(0, maxTouchPoints);
      
      touchPointsRef.current = touches.map((touch) => ({
        x: touch.clientX,
        y: touch.clientY,
        id: touch.identifier,
      }));
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touches = Array.from(e.touches).slice(0, maxTouchPoints);
      
      if (touches.length === 0) {
        if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = undefined;
        }
        touchPointsRef.current = [];
      } else {
        touchPointsRef.current = touches.map((touch) => ({
          x: touch.clientX,
          y: touch.clientY,
          id: touch.identifier,
        }));
      }
    };

    // Add touch-action CSS to prevent default scrolling behavior
    container.style.touchAction = "pan-y";

    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, [maxTouchPoints, updateSpotlight]);

  return { containerRef, touchPoints: touchPointsRef.current };
}
