"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/shared/lib/motion";

type Props = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function SectionWrapper({ title, description, children }: Props) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        {children}
      </div>
    </motion.section>
  );
}
