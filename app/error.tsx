"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[50vh] w-full max-w-xl flex-col items-start justify-center px-4 py-20 sm:px-6">
      <h1 className="display text-6xl">The signal dropped.</h1>
      <p className="mt-4 text-muted-foreground">Something went wrong while drawing this page. You can try again.</p>
      <Button type="button" className="mt-6 h-11" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
