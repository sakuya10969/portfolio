"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import type { Project } from "../model/types";

type Props = {
  project: Project;
};

export function ProjectCard({ project }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/projects/${project.slug}`}>
        <Card className="h-full flex flex-col cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg leading-snug">{project.title}</CardTitle>
              <Badge variant="secondary" className="shrink-0 text-xs">
                {project.category.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-sm text-muted-foreground line-clamp-3">{project.summary}</p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-1 pt-0">
            {project.technologies.slice(0, 5).map((tech) => (
              <Badge key={tech.id} variant="outline" className="text-xs">
                {tech.name}
              </Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{project.technologies.length - 5}
              </Badge>
            )}
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
