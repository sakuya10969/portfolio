import Link from 'next/link';
import { FaSquareGithub } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { SITE_NAME } from '@/shared/config/site';

export function Footer() {
  return (
    <footer className="border-border bg-background border-t">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/sakuya10969"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <FaSquareGithub className="h-7 w-7" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <FaSquareXTwitter className="h-7 w-7" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sakuya-fukuda-07858a329/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-7 w-7" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
