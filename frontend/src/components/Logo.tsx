import { cn } from '@/lib/cn';

/**
 * ClaimBot mark: a protective shield with a payout bolt struck through it.
 *
 * The shield is the insurance idiom — cover you can trust. The white bolt is
 * the 90-second payout cutting clean through it. A soft top sheen gives the
 * badge depth at large sizes, while the silhouette stays legible at favicon
 * scale. Works on any background.
 */
export function Logo({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ClaimBot"
      className={cn('shrink-0', className)}
    >
      <defs>
        <linearGradient id="cbShield" x1="6" y1="2" x2="26" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#86EFAC" />
          <stop offset="0.5" stopColor="#4ADE80" />
          <stop offset="1" stopColor="#15A349" />
        </linearGradient>
        <linearGradient id="cbBolt" x1="12" y1="7" x2="20" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E9FBF0" />
        </linearGradient>
      </defs>

      {/* Shield body */}
      <path
        fill="url(#cbShield)"
        d="M15.5 2.5A1.4 1.4 0 0 1 16.5 2.5L26.1 5.9A1.4 1.4 0 0 1 27.1 7.2V15.3C27.1 21.7 22.5 26.4 16.4 29.1A1.1 1.1 0 0 1 15.6 29.1C9.5 26.4 4.9 21.7 4.9 15.3V7.2A1.4 1.4 0 0 1 5.9 5.9Z"
      />

      {/* Top sheen for depth */}
      <path
        fill="#FFFFFF"
        fillOpacity="0.18"
        d="M15.5 2.5A1.4 1.4 0 0 1 16.5 2.5L26.1 5.9A1.4 1.4 0 0 1 27.1 7.2V9.4C27.1 10.1 22.5 11.1 16 11.1C9.5 11.1 4.9 10.1 4.9 9.4V7.2A1.4 1.4 0 0 1 5.9 5.9Z"
      />

      {/* Payout bolt */}
      <path
        fill="url(#cbBolt)"
        d="M17.9 7.7L11.5 16.7A0.55 0.55 0 0 0 11.95 17.55H14.85L14.2 22.9A0.55 0.55 0 0 0 15.2 23.3L20.7 14.4A0.55 0.55 0 0 0 20.25 13.55H17.35L18.9 8.2A0.55 0.55 0 0 0 17.9 7.7Z"
      />
    </svg>
  );
}
