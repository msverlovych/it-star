"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/resources", label: "Atlas" },
  { href: "/paths", label: "Paths" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return;
      }
      event.preventDefault();
      document.getElementById("site-search")?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/resources?q=${encodeURIComponent(value)}` : "/resources");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Logo />
        <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(pathname, link.href) ? "page" : undefined}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground aria-[current=page]:bg-primary/10 aria-[current=page]:text-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form onSubmit={submit} className="ml-auto hidden min-w-0 flex-1 items-center gap-2 md:flex md:max-w-xs lg:max-w-sm" role="search">
          <label htmlFor="site-search" className="sr-only">
            Search the atlas
          </label>
          <div className="relative w-full">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id="site-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the atlas"
              className="h-10 bg-card/70 pl-8"
            />
          </div>
        </form>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">ITstar</SheetTitle>
              </SheetHeader>
              <form onSubmit={submit} className="px-4" role="search">
                <label htmlFor="mobile-search" className="sr-only">
                  Search the atlas
                </label>
                <Input
                  id="mobile-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the atlas"
                  className="h-10"
                />
              </form>
              <nav className="flex flex-col gap-1 px-2" aria-label="Mobile">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                      className="rounded-xl px-3 py-3 text-base font-medium aria-[current=page]:bg-primary/10"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
