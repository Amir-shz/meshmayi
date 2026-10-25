"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function StartupLoader() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "hidden">(
    "visible",
  );
  const dismiss = useCallback(() => {
    try {
      sessionStorage.setItem("zarsazan-startup-seen", "1");
    } catch {
      /* Storage is optional. */
    }
    setPhase(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "hidden"
        : "leaving",
    );
  }, []);
  useEffect(() => {
    if (phase !== "visible") return;
    // A review link keeps the introduction open until the visitor chooses to enter.
    if (new URLSearchParams(window.location.search).get("intro") === "preview")
      return;
    try {
      if (sessionStorage.getItem("zarsazan-startup-seen")) {
        setPhase("hidden");
        return;
      }
    } catch {
      /* Storage is optional. */
    }
    const started = performance.now();
    let readyTimer: ReturnType<typeof setTimeout>;
    const minimum = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 350
      : 1800;
    const ready = () => {
      readyTimer = setTimeout(
        dismiss,
        Math.max(0, minimum - (performance.now() - started)),
      );
    };
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    const deadline = setTimeout(dismiss, 2800);
    return () => {
      clearTimeout(readyTimer);
      clearTimeout(deadline);
      window.removeEventListener("load", ready);
    };
  }, [dismiss, phase]);
  useEffect(() => {
    if (phase !== "leaving") return;
    const timeout = setTimeout(() => setPhase("hidden"), 420);
    return () => clearTimeout(timeout);
  }, [phase]);
  useEffect(() => {
    if (phase === "hidden") return;
    const shell = document.querySelector<HTMLElement>(".website-shell");
    const previousOverflow = document.documentElement.style.overflow;
    const previousInert = shell?.inert ?? false;
    if (shell) shell.inert = true;
    document.documentElement.style.overflow = "hidden";
    return () => {
      if (shell) shell.inert = previousInert;
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [phase]);
  if (phase === "hidden") return null;
  return (
    <div className="startup-loader" data-phase={phase}>
      <div className="startup-loader-top">
        <span dir="ltr">ZARSAZAN BEHRO</span>
        <span>آغاز یک همراهی</span>
      </div>
      <div className="startup-loader-orbit" aria-hidden="true" />
      <div className="startup-loader-center">
        <Image
          src="/logo.png"
          width={84}
          height={84}
          alt="زرسازان بهرو"
          className="startup-loader-logo"
        />
        <p className="startup-loader-kicker">دنیای خودروهای وارداتی</p>
        <div className="startup-loader-words" aria-hidden="true">
          <span>یک مسیر تازه.</span>
          <span>یک انتخاب متمایز.</span>
          <span>با شما، در هر مسیر.</span>
        </div>
        <p className="sr-only" role="status">
          در حال آماده‌سازی زرسازان بهرو
        </p>
        <div className="startup-loader-road" aria-hidden="true">
          <svg viewBox="0 0 280 70" fill="none">
            <path d="M18 49h244M46 44l15-22c3-4 8-6 13-6h87c10 0 18 5 25 13l24 7c9 2 14 6 14 13M71 22h82l20 15H57m22 17a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm105 0a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
          </svg>
          <span />
        </div>
      </div>
      <div className="startup-loader-bottom">
        <p>مسیر تازه، انتخاب متمایز.</p>
        <button onClick={dismiss}>
          ورود به سایت <ArrowLeft size={17} />
        </button>
      </div>
    </div>
  );
}
