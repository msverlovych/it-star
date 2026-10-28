import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-start justify-center px-4 py-20 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">404</p>
      <h1 className="display mt-3 text-6xl">This star is not on the chart.</h1>
      <p className="mt-4 text-muted-foreground">The page is missing. The atlas and the paths are still there.</p>
      <div className="mt-6 flex gap-3">
        <Button asChild className="h-11">
          <Link href="/">Go home</Link>
        </Button>
        <Button asChild variant="outline" className="h-11">
          <Link href="/resources">Browse the atlas</Link>
        </Button>
      </div>
    </div>
  );
}
