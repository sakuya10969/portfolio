'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ArrowDown, MapPin, Code2, CircleDot } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { fadeInUp, staggerContainer } from '@/shared/lib/motion';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
      {/* Subtle top-gradient from brand color */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% -5%, color-mix(in oklch, var(--brand) 10%, transparent), transparent 65%)',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative max-w-3xl space-y-7"
      >
        {/* Role badge */}
        <motion.div variants={fadeInUp} className="flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/6 px-3.5 py-1 text-xs font-medium text-brand">
            <Code2 className="h-3 w-3" />
            フルスタックエンジニア
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={fadeInUp}
          className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
        >
          福田 朔哉
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={fadeInUp}
          className="text-muted-foreground mx-auto max-w-xl text-base leading-relaxed sm:text-lg"
        >
          TypeScript・Python・Next.js・NestJS・FastAPI・PostgreSQL を主軸に、
          <br className="hidden sm:block" />
          設計から実装まで一貫して担うエンジニアです。
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center justify-center gap-3 pt-1 sm:flex-row"
        >
          <Button asChild size="lg">
            <Link href="/projects">
              プロジェクトを見る
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">プロフィール</Link>
          </Button>
        </motion.div>

        {/* Meta row */}
        <motion.div
          variants={fadeInUp}
          className="flex items-center justify-center gap-4 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Japan
          </span>
          <span className="h-3 w-px bg-border" aria-hidden />
          <span className="flex items-center gap-1.5">
            <CircleDot className="h-3 w-3 text-[oklch(0.65_0.22_142)]" />
            Open to work
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-4 w-4 text-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
