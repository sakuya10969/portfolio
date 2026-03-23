'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Badge } from '@/shared/ui/badge';
import type { ProjectCategory } from '@/entities/project';

type Props = {
  categories: ProjectCategory[];
  technologies: { id: string; name: string }[];
};

export function ProjectFilter({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams?.get('category') ?? '';

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm font-medium">カテゴリ</p>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={!activeCategory ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => updateFilter('category', '')}
          >
            すべて
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={activeCategory === cat.slug ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => updateFilter('category', cat.slug)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
