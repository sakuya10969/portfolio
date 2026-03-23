'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const COUNTS = [3, 2, 1] as const;
const STEP_MS = 550;
const STORAGE_KEY = 'portfolio-intro-shown';

export function IntroCountdown() {
  // false = まだ確認前(SSR安全) → useEffect後に判定
  const [shouldShow, setShouldShow] = useState(false);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // マウント後に sessionStorage を確認し、初回のみ表示
  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setShouldShow(true);
    }
  }, []);

  // カウントダウン進行（shouldShow が true のときのみ動く）
  useEffect(() => {
    if (!shouldShow) return;

    if (step < COUNTS.length - 1) {
      const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setDone(true), STEP_MS);
      return () => clearTimeout(t);
    }
  }, [step, shouldShow]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 50%, oklch(var(--brand) / 0.08), transparent 70%)',
            }}
          />

          {/* Count */}
          <AnimatePresence mode="wait">
            <motion.p
              key={COUNTS[step]}
              initial={{ opacity: 0, scale: 0.82, y: 28, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.12, y: -28, filter: 'blur(10px)' }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="select-none text-[9rem] font-bold leading-none tabular-nums text-foreground sm:text-[11rem]"
            >
              {COUNTS[step]}
            </motion.p>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="mt-10 h-px w-20 overflow-hidden rounded-full bg-border">
            <motion.div
              key={step}
              className="h-full rounded-full bg-brand"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: STEP_MS / 1000 - 0.08, ease: 'linear' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
