"use client";

import { MotionConfig } from "framer-motion";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "!rounded-2xl !bg-card !text-ink !border !border-line !shadow-xl",
        }}
      />
    </MotionConfig>
  );
}
