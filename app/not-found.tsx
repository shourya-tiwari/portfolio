import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="shell flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint">404</p>
      <h1 className="mt-4 text-display-sm font-bold text-fg">Nothing here</h1>
      <p className="mt-4 max-w-md text-muted">
        This page does not exist. It may have been an in-progress project that has not shipped yet.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/projects" className="btn-secondary">
          View projects
        </Link>
      </div>
    </div>
  );
}
