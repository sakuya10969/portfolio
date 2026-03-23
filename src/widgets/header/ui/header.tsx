import Link from 'next/link';
import { NAV_LINKS, SITE_NAME } from '@/shared/config/site';
import { ThemeToggle } from '@/features/theme-toggle';
import { MobileMenu } from '@/features/mobile-menu';

export function Header() {
  return (
    <header className="border-border bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="hover:text-primary text-lg font-bold tracking-tight transition-colors"
          >
            {SITE_NAME}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
