import Link from "next/link";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-8 border-t border-border/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            A curated atlas for people learning to build software. Original design, synthesized sound, no borrowed film assets.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link href="/resources" className="hover:text-primary">Atlas</Link>
          <Link href="/paths" className="hover:text-primary">Paths</Link>
          <Link href="/about" className="hover:text-primary">About</Link>
        </nav>
      </div>
    </footer>
  );
}
