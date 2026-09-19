"use client";

import dynamic from "next/dynamic";

export const DottedSurface = dynamic(
  () => import("@/components/ui/dotted-surface"),
  {
    ssr: false,
  },
);

export const BeamsBackground = dynamic(
  () =>
    import("@/components/ui/beams-background").then(
      (module) => module.BeamsBackground,
    ),
  { ssr: false },
);

export const AnimatedGradientBackground = dynamic(
  () => import("@/components/ui/animated-gradient-background"),
  { ssr: false },
);
