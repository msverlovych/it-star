import Link from "next/link";
import { cn } from "cn";

export function StarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <path
        className="fill-primary"
        d="M16 2.4 18.7 12.1 28.6 16 18.7 19.9 16 29.6 13.3 19.9 3.4 16 13.3 12.1Z"
      />
      <path
        className="fill-background"
        d="M16 8.2 17.3 14.2 23.4 16 17.3 17.8 16 23.8 14.7 17.8 8.6 16 14.7 14.2Z"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2 rounded-full focus-visible:outline-none", className)}
    >
      <StarMark />
      <span className="font-heading text-[1.7rem] leading-none tracking-wide">
        IT<span className="text-primary">star</span>
      </span>
    </Link>
  );
}
