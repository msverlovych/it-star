"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; z: number; pz: number; tint: number };

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = performance.now();
    let boost = 0;
    let running = true;

    const makeStar = (): Star => ({
      x: (Math.random() * 2 - 1) * 1.15,
      y: (Math.random() * 2 - 1) * 1.15,
      z: Math.random(),
      pz: Math.random(),
      tint: Math.random(),
    });

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = width < 720 ? 90 : 180;
      if (stars.length !== count) {
        stars = Array.from({ length: count }, makeStar);
      }
    };

    const colors = () => {
      const dark = document.documentElement.classList.contains("dark");
      return dark
        ? {
            star: "rgba(255, 246, 236, 0.92)",
            tint: "rgba(255, 90, 70, 0.9)",
            streak: "rgba(255, 214, 196, 0.35)",
          }
        : {
            star: "rgba(20, 42, 92, 0.72)",
            tint: "rgba(16, 120, 170, 0.7)",
            streak: "rgba(30, 70, 140, 0.28)",
          };
    };

    const drawStatic = () => {
      context.clearRect(0, 0, width, height);
      const palette = colors();
      const cx = width / 2;
      const cy = height / 2;
      for (const star of stars) {
        const k = 0.42 / Math.max(star.z, 0.08);
        const x = cx + star.x * k * cx;
        const y = cy + star.y * k * cy;
        context.fillStyle = star.tint > 0.86 ? palette.tint : palette.star;
        context.globalAlpha = 0.45 + (1 - star.z) * 0.55;
        context.beginPath();
        context.arc(x, y, star.z < 0.4 ? 1.6 : 1, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      boost *= Math.exp(-dt * 2.4);
      const speed = (0.09 + boost * 1.25) * dt;
      const palette = colors();
      context.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;

      for (const star of stars) {
        star.pz = star.z;
        star.z -= speed;
        if (star.z <= 0.04) {
          star.x = (Math.random() * 2 - 1) * 1.15;
          star.y = (Math.random() * 2 - 1) * 1.15;
          star.z = 1;
          star.pz = 1;
        }
        const project = (z: number) => {
          const k = 0.38 / z;
          return [cx + star.x * k * cx, cy + star.y * k * cy] as const;
        };
        const [x, y] = project(star.z);
        const [px, py] = project(star.pz);
        const near = 1 - star.z;
        context.strokeStyle = star.tint > 0.88 ? palette.tint : palette.streak;
        context.globalAlpha = 0.25 + near * 0.75;
        context.lineWidth = 0.6 + near * (boost > 0.05 ? 2.2 : 1.1);
        context.beginPath();
        context.moveTo(px, py);
        context.lineTo(x, y);
        context.stroke();
        context.fillStyle = star.tint > 0.88 ? palette.tint : palette.star;
        context.beginPath();
        context.arc(x, y, 0.6 + near * 1.5, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      raf = window.requestAnimationFrame(frame);
    };

    const start = () => {
      window.cancelAnimationFrame(raf);
      if (reduce.matches || document.hidden) {
        drawStatic();
        return;
      }
      last = performance.now();
      raf = window.requestAnimationFrame(frame);
    };

    const onWarp = () => {
      if (reduce.matches) return;
      boost = 1;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) start();
      else window.cancelAnimationFrame(raf);
    };

    const onResize = () => {
      resize();
      if (reduce.matches || document.hidden) drawStatic();
    };
    const observer = new MutationObserver(() => {
      if (reduce.matches || document.hidden) drawStatic();
    });

    resize();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("itstar-warp", onWarp);
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", start);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("itstar-warp", onWarp);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", start);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  );
}
