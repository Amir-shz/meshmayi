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
        const skipTimer = setTimeout(() => setPhase("hidden"), 0);
        return () => clearTimeout(skipTimer);
      }
    } catch {
      /* Storage is optional. */
    }
    const started = performance.now();
    let readyTimer: ReturnType<typeof setTimeout>;
    const minimum = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 350
      : 3000;
    const ready = () => {
      readyTimer = setTimeout(
        dismiss,
        Math.max(0, minimum - (performance.now() - started)),
      );
    };
    if (document.readyState === "complete") ready();
    else window.addEventListener("load", ready, { once: true });
    const deadline = setTimeout(dismiss, 4000);
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
    <div className="startup-loader" data-phase={phase} aria-busy="true">
      <div className="startup-loader-top">
        <span dir="ltr">ZARSAZAN BEHRO</span>
        <span className="startup-loader-welcome">آغاز یک همراهی</span>
      </div>
      <div className="startup-loader-horizon" aria-hidden="true" />
      <div className="startup-loader-orbit" aria-hidden="true" />
      <div className="startup-loader-center">
        <div className="startup-loader-emblem">
          <Image
            src="/logo.png"
            width={84}
            height={84}
            alt="زرسازان بهرو"
            className="startup-loader-logo"
          />
        </div>
        <p className="startup-loader-kicker">دنیای خودروهای وارداتی</p>
        <div className="startup-loader-words" aria-hidden="true">
          <span>یک مسیر تازه.</span>
          <span>یک انتخاب متمایز.</span>
          <span>با شما، در هر مسیر.</span>
        </div>
        <p className="startup-loader-description">
          از یک انتخاب متمایز، تا تجربه‌ای فراتر از انتظار
        </p>
        <div
          className="startup-loader-loading"
          role="status"
          aria-live="polite"
        >
          <div className="startup-loader-status">
            <span className="startup-loader-spinner" aria-hidden="true" />
            <strong>در حال بارگذاری سایت</strong>
          </div>
          <p>لطفاً چند لحظه صبر کنید…</p>
          <div className="startup-loader-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
      <div className="startup-loader-bottom">
        <p>
          <span aria-hidden="true" />
          مسیر تازه، انتخاب متمایز.
        </p>
        <button type="button" onClick={dismiss}>
          رد کردن و ورود به سایت <ArrowLeft size={17} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
