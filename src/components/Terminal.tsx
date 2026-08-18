"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SONCLARUS = [
  " ███╗   ██╗███████╗ ██████╗ ███╗   ██╗",
  " ████╗  ██║██╔════╝██╔═══██╗████╗  ██║",
  " ██╔██╗ ██║█████╗  ██║   ██║██╔██╗ ██║",
  " ██║╚██╗██║██╔══╝  ██║   ██║██║╚██╗██║",
  " ██║ ╚████║███████╗╚██████╔╝██║ ╚████║",
  " ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═══╝",
];

const LOOP_FRAMES = [
  [
    " ┌─┐ ┌┬┐┌─┐ ┬ ┬",
    " │ │ ││││ ┬ │││",
    " │─┤─┴┬┘│ └┤├┴┘",
    " └─┘ ┴ ┴ └─┘┴ ┴",
    "             ",
  ],
  [
    " ┌─┐ ┌─┐┬ ┬",
    " ├┤  │ ││││",
    " │   │ │├┴┘",
    " └─┘ └─┘┴ ┴",
    "            ",
  ],
  [
    " ┌─┐ ┌─┐┬─┐",
    " │   │ │├┴┐",
    " └─┐ │ │┬┬├┐",
    "  └─┘ └─┘┴ ┴",
    "             ",
  ],
];

export default function Terminal() {
  const [phase, setPhase] = useState<"typing" | "flicker">("typing");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [loopIdx, setLoopIdx] = useState(0);

  // Typing animation
  useEffect(() => {
    if (phase !== "typing") return;
    if (lineIdx >= SONCLARUS.length) {
      const t = setTimeout(() => setPhase("flicker"), 600);
      return () => clearTimeout(t);
    }
    const currentLine = SONCLARUS[lineIdx];
    if (charIdx < currentLine.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setLineIdx((l) => l + 1), 90);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, phase]);

  // Flicker loop
  useEffect(() => {
    if (phase !== "flicker") return;
    const t = setTimeout(() => {
      setLoopIdx((l) => (l + 1) % LOOP_FRAMES.length);
    }, 650);
    return () => clearTimeout(t);
  }, [loopIdx, phase]);

  const isTyping = phase === "typing";
  const cursorVisible = isTyping && charIdx < (SONCLARUS[lineIdx]?.length ?? 0);

  return (
    <div className="relative rounded-xl border border-hairline bg-[#0d0d0d] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden min-h-[420px] flex flex-col">
      {/* Chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-hairline-soft bg-[#0d0d0d]">
        <div className="flex gap-1.5 ml-auto">
          <div className="h-2 w-2 rounded-full bg-[#ff5f57]/70" />
          <div className="h-2 w-2 rounded-full bg-[#febc2e]/70" />
          <div className="h-2 w-2 rounded-full bg-[#28c840]/70" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 font-mono text-xs leading-[1.45]">
        <pre className="text-center">
          {isTyping
            ? SONCLARUS.map((line, i) => {
                if (i < lineIdx) return line;
                if (i === lineIdx) return line.slice(0, charIdx);
                return "";
              })
            : LOOP_FRAMES[loopIdx]}
        </pre>

        {/* Cursor */}
        {cursorVisible && (
          <motion.span
            className="inline-block w-2 h-4 bg-accent-yellow ml-0.5 align-middle"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        )}
      </div>
    </div>
  );
}
