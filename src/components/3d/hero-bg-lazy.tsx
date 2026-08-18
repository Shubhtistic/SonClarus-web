import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Hero3DBackground = dynamic(
  () => import("./hero-bg").then((m) => m.Hero3DBackground),
  { ssr: false, loading: () => null },
);

export function HeroBackground({ isMobile }: { isMobile: boolean }) {
  return <Hero3DBackground isMobile={isMobile} />;
}
