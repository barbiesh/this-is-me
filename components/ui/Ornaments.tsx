// Small decorative marks drawn from Barbie's photo: sparkles and pearls.
// All use currentColor so colour comes from tokens.

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20 0c1.2 9.6 5.4 13.8 20 20-14.6 6.2-18.8 10.4-20 20-1.2-9.6-5.4-13.8-20-20C14.6 13.8 18.8 9.6 20 0Z" />
    </svg>
  );
}

export function Pearl({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`block rounded-full bg-[radial-gradient(circle_at_32%_30%,var(--color-cream)_0%,var(--color-cream)_18%,var(--color-baby)_55%,var(--color-blush)_100%)] ${className}`}
    />
  );
}

export function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
