"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const SPRING_CONFIG = { stiffness: 150, damping: 12, mass: 0.3 };

export function TiltCard({
  children,
  className = "",
  intensity = 15,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, SPRING_CONFIG);
  const rotateY = useSpring(y, SPRING_CONFIG);
  const skewX = useSpring(0, SPRING_CONFIG);
  const skewY = useSpring(0, SPRING_CONFIG);
  const glowIntensity = useSpring(0, { stiffness: 50, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const centerX = width / 2;
    const centerY = height / 2;
    x.set(((mouseX - centerX) / centerX) * intensity);
    y.set(((centerY - mouseY) / centerY) * intensity);
    skewX.set(((mouseX - centerX) / centerX) * (intensity * 0.2));
    skewY.set(((centerY - mouseY) / centerY) * (intensity * 0.2));
    glowIntensity.set(
      Math.abs(x.get()) + Math.abs(y.get()) > 1 ? 0.4 : 0,
    );
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    skewX.set(0);
    skewY.set(0);
    glowIntensity.set(0);
  };

  const glarePosition = useMotionTemplate`${x}px ${y}px`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        skewX,
        skewY,
        transformStyle: "preserve-3d",
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Glare effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background: useMotionTemplate`radial-gradient(
            circle at ${glarePosition},
            rgba(255,255,255,0.12) 0%,
            transparent 60%
          )`,
        }}
      />
      {/* Border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit]">
        <div
          className="absolute inset-0 rounded-[inherit] border border-hairline-soft"
          style={{
            boxShadow: `0 0 ${glowIntensity.get() * 30}px -5px rgba(87,193,255,${glowIntensity.get()})`,
          }}
        />
      </div>
      <div style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className = "",
  gap = 0.05,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: gap,
          },
        },
      }}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
