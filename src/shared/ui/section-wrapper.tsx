'use client';

import { motion } from 'framer-motion';
import { fadeInUp } from '@/shared/lib/motion';

type Props = {
  title: string;
  titleIcon?: React.ReactNode;
  description?: string;
  children: React.ReactNode;
};

export function SectionWrapper({ title, titleIcon, description, children }: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={fadeInUp}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            {titleIcon && (
              <span className="text-brand" aria-hidden>
                {titleIcon}
              </span>
            )}
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
          </div>
          {/* Accent underline */}
          <div className="h-0.5 w-10 rounded-full bg-brand" />
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {children}
      </div>
    </motion.section>
  );
}
