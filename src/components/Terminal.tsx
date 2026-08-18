"use client";

import { useEffect, useState } from "react";

// "SONCLARUS" in dense block-letter art.
const SONCLARUS = [
  "███████╗ ██████╗ ███╗   ██╗ ██████╗ ██╗      █████╗ ██████╗ ██╗   ██╗███████╗",
  "██╔════╝██╔═══██╗████╗  ██║██╔════╝ ██║     ██╔══██╗██╔══██╗██║   ██║██╔════╝",
  "███████╗██║   ██║██╔██╗ ██║██║      ██║     ███████║██████╔╝██║   ██║███████╗",
  "╚════██║██║   ██║██║╚██╗██║██║      ██║     ██╔══██║██╔══██╗██║   ██║╚════██║",
  "███████║╚██████╔╝██║ ╚████║╚██████╗ ███████╗██║  ██║██║  ██║╚██████╔╝███████║",
  "╚══════╝ ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝",
];


export default function Terminal() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= SONCLARUS.length) return;
    const currentLine = SONCLARUS[lineIdx];
    if (charIdx < currentLine.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 22);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setLineIdx((l) => l + 1), 100);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  const lines = SONCLARUS.map((line, i) =>
    i < lineIdx ? line : i === lineIdx ? line.slice(0, charIdx) : ""
  );

  return (
    <div
      style={{
        borderRadius: 12,
        border: "1px solid #242728",
        background: "#0d0d0d",
        boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        overflow: "hidden",
        minHeight: 420,
        maxWidth: 820,
        margin: "0 auto",
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 14,
        lineHeight: "1.45",
        color: "#ff6161",
        boxSizing: "border-box",
      }}
    >
      {/* Chrome */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "#0d0d0d",
        }}
      >
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(255,95,87,0.7)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(254,188,46,0.7)" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(40,200,64,0.7)" }} />
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          minHeight: 325,
          padding: 24,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: 14,
              lineHeight: "1.45",
              color: "#ff6161",
              whiteSpace: "pre",
              textAlign: "center",
            }}
          >
            {line || " "}
          </div>
        ))}
      </div>
    </div>
  );
}
