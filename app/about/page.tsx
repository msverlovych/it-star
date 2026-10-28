import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "ITstar is Maksym's curated atlas of real learning resources and ranked roadmaps for people becoming developers.",
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">About</p>
      <h1 className="display mt-3 text-[clamp(3.2rem,8vw,5.5rem)]">A map made by someone who still uses one.</h1>
      <div className="mt-8 space-y-5 text-lg leading-8 text-muted-foreground">
        <p>
          Maksym is a senior software developer working in React, Flutter, and Java. ITstar is the atlas he wanted on the desk: real materials, in an order a person can follow, with the marketing scraped off.
        </p>
        <p>
          The site is for developers and for people who want to become one. It is not a course and it does not issue ranks as certificates. Spark, Apprentice, Knight, and Master are a pace. You move when the milestone is true.
        </p>
      </div>
      <section className="mt-12" aria-labelledby="how-chosen">
        <h2 id="how-chosen" className="font-heading text-4xl">How a resource gets in</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>It exists, and the URL is the official or canonical one.</li>
          <li>It is well known enough that a working developer would recognize the name.</li>
          <li>Free, freemium, and paid are labeled honestly.</li>
          <li>If a link dies, it leaves the atlas. Invented URLs do not get a seat.</li>
        </ul>
      </section>
      <section className="mt-12" aria-labelledby="dawn-ember">
        <h2 id="dawn-ember" className="font-heading text-4xl">Dawn and Ember</h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          The light theme carries a blue-green energy blade. The dark theme carries a red one. Switching themes plays a short ignition synthesized in your browser with the Web Audio API. Nothing is taken from a film, and nothing plays until you choose. If your system asks for reduced motion, the sweep is skipped and the sound is shorter. The choice is stored on this device.
        </p>
        <p className="mt-4 leading-7 text-muted-foreground">
          The space-opera framing is original. ITstar is not affiliated with any studio or franchise.
        </p>
      </section>
      <section className="mt-12" aria-labelledby="built">
        <h2 id="built" className="font-heading text-4xl">How it is built</h2>
        <p className="mt-4 leading-7 text-muted-foreground">
          Next.js, TypeScript, and Tailwind CSS. Motion comes from Framer Motion. The catalog and the five roadmaps live in typed modules under <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">data/</code>. Pages read that catalog through <code className="rounded bg-muted px-1.5 py-0.5 text-foreground">data/catalog.ts</code>, so a CMS or database can replace the file later without rewriting the screens.
        </p>
        <p className="mt-6">
          <Link href="/resources" className="font-medium text-primary hover:underline">Open the atlas</Link>
        </p>
      </section>
    </article>
  );
}
