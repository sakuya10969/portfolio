'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Badge } from '@/shared/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import type { Project } from '../model/types';

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      <Link href={`/projects/${project.slug}`}>
        <Card className="group flex h-full cursor-pointer flex-col border-border/60 transition-all duration-200 hover:border-brand/35 hover:shadow-md">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base leading-snug">{project.title}</CardTitle>
              <Badge
                variant="secondary"
                className="shrink-0 border-brand/20 bg-brand/8 text-xs text-brand"
              >
                {project.category.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pt-0">
            <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed">
              {project.summary}
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-1 pt-0">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech.id} variant="outline" className="text-xs">
                {tech.name}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="outline" className="text-muted-foreground text-xs">
                +{project.technologies.length - 5}
              </Badge>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
