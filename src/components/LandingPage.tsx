"use client";

import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import Terminal from "@/components/Terminal";

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    wordsRef.current = wordsRef.current.slice(0, 7);
  }, []);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        // Hero words rise animation (Obsidian-style)
        gsap.to(wordsRef.current, {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "expo.out",
          delay: 0.3,
        });

        // Subtitle fade in
        gsap.fromTo(
          ".hero-sub",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "expo.out", delay: 0.7 }
        );

        // CTA buttons
        gsap.fromTo(
          ".hero-cta",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "expo.out", delay: 0.9 }
        );

        // Terminal slide up
        gsap.fromTo(
          ".hero-terminal",
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "expo.out", delay: 0.5 }
        );
      }, heroRef);
      return () => ctx.revert();
    },
    { scope: heroRef }
  );

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />

      {/* Subtle gradient wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,97,97,0.05) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 fade-bottom"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1240px] px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: copy */}
          <div>
            <h1 className="hero-display leading-[1.08]">
              {["The", "future", "of", "audio", "intelligence"].map((word, i) => (
                <span
                  key={word}
                  ref={(el) => {
                    if (el) wordsRef.current[i] = el;
                  }}
                  className="hero-word inline-block opacity-0"
                  style={{ transform: "translateY(8px)" }}
                >
                  {word}
                  {i < 4 ? " " : ""}
                </span>
              ))}
              <br />
              <span className="text-[#ff6161]">built for you.</span>
            </h1>

            <p className="hero-sub mt-5 max-w-[480px] text-[17px] leading-[1.65] text-[#a8a29e]">
              Sonclarus uses AI to cleanly separate speakers and generate
              accurate transcripts — all in one seamless pipeline.
            </p>

            <div className="hero-cta mt-7 flex flex-wrap items-center justify-end gap-3">
              <Link
                href="/register"
                className="rounded-full bg-[#fafaf9] px-6 py-3 text-[14px] font-medium text-[#1c1917] transition-all hover:bg-[#e7e5e4]"
              >
                Get started free
              </Link>
              <a
                href="#features"
                className="rounded-full border border-[#3c3835] px-6 py-3 text-[14px] font-medium text-[#e7e5e4] transition-all hover:border-[#4a4541] hover:bg-[#181613]"
              >
                Learn more
              </a>
            </div>

            {/* Trust strip */}
            <div className="hero-sub mt-10 flex items-center gap-4 text-[13px] text-[#71717a]">
              <span>Trusted by teams at</span>
              {["Acme", "Globex", "Initech"].map((name) => (
                <span key={name} className="font-medium text-[#a8a29e]">
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Right: terminal */}
          <div className="hero-terminal">
            <Terminal />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[12px] text-[#71717a]">
        <span>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#71717a] to-transparent" />
      </div>
    </div>
  );
}
