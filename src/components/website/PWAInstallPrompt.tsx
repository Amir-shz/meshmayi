"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "@/../public/logo.png";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const PWAInstallPrompt = () => {
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const { toast } = useToast();

  // بررسی اینکه آیا اپلیکیشن نصب شده است یا نه
  const isAppInstalled = () => {
    return (
      window.matchMedia("(display-mode: standalone)").matches ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window.navigator as any).standalone
    );
  };

  useEffect(() => {
    if (isAppInstalled() || sessionStorage.getItem("pwa-prompt-shown")) return;

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      console.log("App installed successfully");
      setPromptEvent(null);
      sessionStorage.setItem("pwa-installed", "true");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;
    promptEvent.prompt();
    const choiceResult = await promptEvent.userChoice;
    setPromptEvent(null);
    sessionStorage.setItem("pwa-prompt-shown", "true");
    console.log(
      choiceResult.outcome === "accepted"
        ? "User accepted the install prompt"
        : "User dismissed the install prompt"
    );
  };

  useEffect(() => {
    if (!promptEvent || sessionStorage.getItem("pwa-prompt-shown")) return;

    sessionStorage.setItem("pwa-prompt-shown", "true"); // جلوگیری از نمایش مجدد در همان session

    toast({
      title: "",
      description: (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Image src={logo} alt="App Logo" className="size-10 rounded-md" />
            <span className="text-xs font-medium text-neutral-700">
              برای نصب اپلیکیشن روی Install کلیک کنید
            </span>
          </div>
        </div>
      ),
      action: (
        <ToastAction
          altText="install"
          className="text-primary-600 px-3 py-0.5 rounded-sm font-sans flex justify-center items-center leading-6 toastAction"
          onClick={handleInstall}
          style={{ marginLeft: "-2px", marginRight: "4px", border: "none" }}
        >
          Install
        </ToastAction>
      ),
      duration: 8000,
      style: {
        padding: "8px",
        backgroundColor: "#fafafa",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px 0px rgba(17,17,17,0.1)",
      },
    });
  }, [toast, promptEvent]);

  return null;
};

export default PWAInstallPrompt;
