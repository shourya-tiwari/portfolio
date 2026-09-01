'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { NAV_LINKS } from '@/lib/site';

/**
 * The only stateful thing here is the mobile menu. Everything else is a link.
 */
export function Nav({ name, resume }: { name: string; resume: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav className="shell flex h-16 items-center justify-between" aria-label="Main">
        <Link
          href="/"
          className="font-semibold tracking-tight text-fg transition-colors hover:text-accent"
        >
          {name}
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={`text-sm transition-colors ${
                isActive(link.href) ? 'text-fg' : 'text-muted hover:text-fg'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            Resume
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md text-fg transition-colors hover:bg-surface sm:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M5 5l10 10" />
                <path d="M15 5L5 15" />
              </>
            ) : (
              <>
                <path d="M3 6h14" />
                <path d="M3 10h14" />
                <path d="M3 14h14" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg sm:hidden">
          <div className="shell flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={`border-b border-line py-3.5 text-sm last:border-0 ${
                  isActive(link.href) ? 'text-accent' : 'text-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3.5 text-sm text-muted"
            >
              Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
