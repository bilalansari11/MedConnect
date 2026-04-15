"use client";

import { useEffect, useState, useRef } from "react";

export function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number; opacity: number }[]>([]);
  const trailIdRef = useRef(0);
  const lastTrailTime = useRef(0);

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trailing particle with throttling
      const now = Date.now();
      if (now - lastTrailTime.current > 30) {
        lastTrailTime.current = now;
        setTrails((prev) => {
          const newTrail = {
            id: trailIdRef.current++,
            x: e.clientX,
            y: e.clientY,
            opacity: 1,
          };
          const updated = [...prev, newTrail].slice(-15); // Keep max 15 trails
          return updated;
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Fade out trails
    const fadeInterval = setInterval(() => {
      setTrails((prev) =>
        prev
          .map((trail) => ({ ...trail, opacity: trail.opacity - 0.15 }))
          .filter((trail) => trail.opacity > 0)
      );
    }, 50);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(fadeInterval);
    };
  }, [mounted]);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Trailing Particles */}
      {trails.map((trail) => (
        <div
          key={trail.id}
          className="pointer-events-none fixed z-[9999] rounded-full"
          style={{
            left: trail.x - 6,
            top: trail.y - 6,
            width: 12,
            height: 12,
            background: `radial-gradient(circle, rgba(0, 92, 85, ${trail.opacity * 0.8}) 0%, rgba(128, 213, 203, ${trail.opacity * 0.4}) 50%, transparent 70%)`,
            transform: `scale(${trail.opacity})`,
            transition: "transform 0.1s ease-out, opacity 0.05s ease-out",
          }}
        />
      ))}

      {/* Main Cursor Glow */}
      <div
        className="pointer-events-none fixed z-[9998] rounded-full transition-transform duration-75 ease-out"
        style={{
          left: position.x - (isClicking ? 20 : 16),
          top: position.y - (isClicking ? 20 : 16),
          width: isClicking ? 40 : 32,
          height: isClicking ? 40 : 32,
          background: isClicking
            ? "radial-gradient(circle, rgba(0, 92, 85, 0.4) 0%, rgba(128, 213, 203, 0.2) 40%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 92, 85, 0.3) 0%, rgba(128, 213, 203, 0.15) 50%, transparent 70%)",
          transform: isClicking ? "scale(1.3)" : "scale(1)",
          opacity: isVisible ? 1 : 0,
          boxShadow: isClicking
            ? "0 0 30px rgba(0, 92, 85, 0.5), 0 0 60px rgba(128, 213, 203, 0.3)"
            : "0 0 20px rgba(0, 92, 85, 0.3), 0 0 40px rgba(128, 213, 203, 0.2)",
        }}
      />

      {/* Inner Core */}
      <div
        className="pointer-events-none fixed z-[9999] rounded-full transition-all duration-100 ease-out"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          width: isClicking ? 12 : 8,
          height: isClicking ? 12 : 8,
          background: isClicking
            ? "linear-gradient(135deg, #80d5cb, #005c55)"
            : "linear-gradient(135deg, #9cf2e8, #0f766e)",
          transform: isClicking ? "scale(1.5)" : "scale(1)",
          opacity: isVisible ? 1 : 0,
          boxShadow: isClicking
            ? "0 0 15px rgba(128, 213, 203, 0.8), 0 0 30px rgba(0, 92, 85, 0.5)"
            : "0 0 10px rgba(15, 118, 110, 0.6), 0 0 20px rgba(0, 92, 85, 0.3)",
        }}
      />

      {/* Click Ripple Effect */}
      {isClicking && (
        <div
          className="pointer-events-none fixed z-[9997] rounded-full animate-ping"
          style={{
            left: position.x - 25,
            top: position.y - 25,
            width: 50,
            height: 50,
            border: "2px solid rgba(0, 92, 85, 0.6)",
            animation: "ping 0.6s cubic-bezier(0, 0, 0.2, 1)",
          }}
        />
      )}

      {/* Hide default cursor on desktop */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"], input, select, textarea, label {
          cursor: none;
        }
        @media (hover: none) and (pointer: coarse) {
          body {
            cursor: auto;
          }
          div[data-cursor="false"] ~ * {
            cursor: auto !important;
          }
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
