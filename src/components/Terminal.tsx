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
  const scrollRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lineIdx, charIdx]);

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

  const lines = SONCLARUS.map((line, i) =>
    i < lineIdx ? line : i === lineIdx ? line.slice(0, charIdx) : ""
  );

  return (
    <div
      ref={terminalRef}
      className="rounded-xl border border-border bg-muted shadow-[0_24px_64px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-[900px]"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border-subtle bg-card">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5701]" />
          <div className="w-3 h-3 rounded-full bg-[#ffc940]" />
          <div className="w-3 h-3 rounded-full bg-[#67d243]" />
        </div>
        <span className="ml-2 text-[13px] text-foreground-faint font-mono">sonclarus — zsh</span>
      </div>

      {/* Terminal content */}
      <div
        ref={scrollRef}
        className="p-6 font-mono text-[8px] sm:text-[9px] leading-[1.4] text-[#ff6161] overflow-auto"
        style={{ minHeight: 200 }}
      >
        {lines.map((line, i) => {
          const completed = i < lineIdx ? SONCLARUS[i] : "";
          const typing = i === lineIdx ? line : "";
          return (
            <div
              key={i}
              className="whitespace-pre text-center"
              style={{ color: "#ff6161" }}
            >
              {completed}
              {i === lineIdx && (
                <span className="text-[#ff8585]">{typing}</span>
              )}
            </div>
          );
        })}
        {done && (
          <div className="mt-4 text-center text-[7px] sm:text-[9px] text-foreground-faint font-mono">
            <span className="text-[#ff6161]">$</span> sonclarus init — audio pipeline ready
          </div>
        )}
      </div>
    </div>
  );
}
