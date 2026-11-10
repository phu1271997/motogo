import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * MotoGo mark: a navy racing helmet with a shield visor — protection (shield)
 * meets the road (helmet). Served from /logo.png so the brand art stays a
 * single source of truth across the header, favicon and share cards.
 */
export function Logo({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="MotoGo"
      width={size}
      height={size}
      priority
      className={cn('shrink-0 object-contain', className)}
    />
  );
}
