"use client";

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SONCLARUS = [
  "███████╗ ██████╗ ███╗   ██╗ ██████╗ ██╗      █████╗ ██████╗ ██╗   ██╗███████╗",
  "██╔════╝██╔═══██╗████╗  ██║██╔════╝ ██║     ██╔══██╗██╔══██╗██║   ██║██╔════╝",
  "███████╗██║   ██║██╔██╗ ██║██║      ██║     ███████║██████╔╝██║   ██║███████╗",
  "╚════██║██║   ██║██║╚██╗██║██║      ██║     ██╔══██║██╔══██╗██║   ██║╚════██║",
  "███████║╚██████╔╝██║ ╚████║╚██████╗ ███████╗██║  ██║██║  ██║╚██████╔╝███████║",
  "╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝",
];

interface TerminalProps {
  startDelay?: number;
}

export default function Terminal({ startDelay = 500 }: TerminalProps) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const done = lineIdx >= SONCLARUS.length;
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || lineIdx >= SONCLARUS.length) return;
    const currentLine = SONCLARUS[lineIdx];
    if (charIdx < currentLine.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 19);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setLineIdx((l) => l + 1), 80);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, started]);

  useGSAP(
    () => {
      if (done && terminalRef.current) {
        gsap.fromTo(
          terminalRef.current,
          { textShadow: "0 0 20px rgba(255,97,97,0.6)" },
          { textShadow: "0 0 0px rgba(255,97,97,0)", duration: 1.5, ease: "power2.out" }
        );
      }
    },
    { dependencies: [done], scope: terminalRef }
  );

  return (
    <div
      ref={terminalRef}
      className="rounded-xl border border-border bg-muted shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-[900px]"
    >
      {/* Title bar */}
      <div className="flex items-center justify-end gap-2 px-5 py-4 border-b border-border-subtle bg-card">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5701]" />
          <div className="w-3 h-3 rounded-full bg-[#ffc940]" />
          <div className="w-3 h-3 rounded-full bg-[#67d243]" />
        </div>
      </div>

      {/* Terminal content */}
      <div
        className="relative p-6 font-mono text-[9px] sm:text-[11px] leading-[1.4] text-[#ff6161] overflow-hidden"
        style={{ height: 280 }}
      >
        <div className="flex flex-col items-center justify-center h-full">
        {SONCLARUS.map((line, i) => {
          const isCompleted = i < lineIdx;
          const isTyping = i === lineIdx;
          return (
            <div
              key={i}
              className="whitespace-pre text-center"
              style={{ color: "#ff6161" }}
            >
              {isCompleted ? line : isTyping ? <span className="text-[#ff8585]">{line.slice(0, charIdx)}</span> : "\u00A0"}
            </div>
          );
        })}
        <div
          className={`mt-4 text-center text-[8px] sm:text-[10px] text-foreground-faint font-mono ${done ? "opacity-100" : "opacity-0"}`}
        >
          <span className="text-[#ff6161]">$</span> sonclarus init — audio pipeline ready
        </div>
        </div>
      </div>
    </div>
  );
}