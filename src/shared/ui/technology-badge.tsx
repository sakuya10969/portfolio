import { getTechnologyIcon } from '@/shared/config/technology-icons';
import { cn } from '@/shared/lib/utils';

type Size = 'sm' | 'md';

type Props = {
  /** DB の technology.name をそのまま渡す。正規化は内部で行う */
  name: string;
  size?: Size;
  className?: string;
};

const sizeStyles: Record<Size, { wrapper: string; icon: string }> = {
  sm: { wrapper: 'gap-1 px-2 py-0.5 text-xs', icon: 'h-4 w-4 shrink-0' },
  md: { wrapper: 'gap-1.5 px-3 py-1 text-sm', icon: 'h-5 w-5 shrink-0' },
};

/**
 * 技術名とアイコンをセットで表示するバッジ。
 * react-icons のアイコンが存在する場合はアイコン付きで、
 * 存在しない場合はテキストのみにフォールバックする。
 *
 * アイコンのカラーリングは意図的に抑制し（text-muted-foreground）、
 * ポートフォリオ全体の統一感を優先する。
 */
export function TechnologyBadge({ name, size = 'md', className }: Props) {
  const entry = getTechnologyIcon(name);
  const Icon = entry?.icon;
  const { wrapper, icon: iconSize } = sizeStyles[size];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-border bg-muted/50 font-medium text-foreground',
        wrapper,
        className,
      )}
    >
      {Icon && (
        <Icon
          className={cn('text-muted-foreground', iconSize)}
          aria-hidden
        />
      )}
      <span>{name}</span>
    </span>
  );
}
