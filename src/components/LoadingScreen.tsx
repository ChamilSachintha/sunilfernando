"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scrolling while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds smooth progress

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve for natural, satisfying deceleration as it nears 100%
      const easedProgress = 1 - Math.pow(1 - progressFraction, 3);
      const currentPercent = Math.min(Math.round(easedProgress * 100), 100);

      setProgress(currentPercent);

      if (progressFraction < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Hold at 100% briefly before fading out
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = originalOverflow;
        }, 220);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="global-loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white select-none overflow-hidden"
          style={{ willChange: "opacity" }}
        >
          {/* Subtle ambient luxury backdrop glow */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#e0f2fe]/50 to-[#f1f5f9]/80 blur-3xl" />
          </div>

          <div className="relative z-10 flex flex-col items-center px-6">
            {/* Logo container with gentle pulse animation */}
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                animate={{
                  opacity: [0.92, 1, 0.92],
                  scale: [1, 1.015, 1],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Sunil Fernando & Associates Logo"
                  className="h-20 sm:h-24 md:h-28 w-auto object-contain block"
                  priority-load="true"
                />
              </motion.div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-[10px] sm:text-[11px] font-montserrat font-semibold tracking-[0.3em] uppercase text-sfa-navy/60 text-center"
            >
              Real Estate Advisory &amp; Valuation
            </motion.p>

            {/* Sleek Progress Bar Track */}
            <div className="w-56 sm:w-64 h-[3px] bg-slate-100 rounded-full overflow-hidden mt-8 relative">
              <div
                className="h-full bg-gradient-to-r from-secondary via-sfa-blue to-[#00bdf1] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,189,241,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Percentage Animation Counter */}
            <div className="flex items-center justify-between w-56 sm:w-64 mt-3">
              <span className="text-[10px] font-avenir font-semibold tracking-[0.2em] uppercase text-sfa-navy/50">
                Loading
              </span>
              <span className="text-xs sm:text-sm font-montserrat font-bold text-sfa-navy tracking-widest tabular-nums">
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
