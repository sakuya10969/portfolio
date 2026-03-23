"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { fadeInUp, staggerContainer } from "@/shared/lib/motion";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center text-center px-4 py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-3xl space-y-6"
      >
        <motion.p variants={fadeInUp} className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Full-Stack Developer
        </motion.p>
        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          山田 太郎
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          TypeScript・Next.js・PostgreSQL を主軸に、設計から実装まで一貫して担うエンジニアです。
        </motion.p>
        <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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
