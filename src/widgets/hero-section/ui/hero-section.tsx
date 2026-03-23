'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { fadeInUp, staggerContainer } from '@/shared/lib/motion';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-3xl space-y-6"
      >
        <motion.p
          variants={fadeInUp}
          className="text-muted-foreground text-sm font-medium tracking-widest uppercase"
        >
          Full-Stack Developer
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          山田 太郎
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          className="text-muted-foreground mx-auto max-w-xl text-lg leading-relaxed sm:text-xl"
        >
          TypeScript・Next.js・PostgreSQL を主軸に、設計から実装まで一貫して担うエンジニアです。
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row"
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
      </motion.div>
    </section>
  );
}
