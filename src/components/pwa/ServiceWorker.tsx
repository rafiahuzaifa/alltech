"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

/** Registers /sw.js once (production only) and offers a reload when a new version is deployed. */
export default function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;

    let reloading = false;
    const onControllerChange = () => {
      if (reloading) return;
      reloading = true;
      window.location.reload();
    };

    const offerUpdate = (worker: ServiceWorker) => {
      toast(
        (t) => (
          <span className="flex items-center gap-3 text-sm">
            A new version of the site is available.
            <button
              type="button"
              className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white"
              onClick={() => {
                toast.dismiss(t.id);
                navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
                worker.postMessage("SKIP_WAITING");
              }}
            >
              Update
            </button>
          </span>
        ),
        { id: "sw-update", duration: Infinity },
      );
    };

    const register = async () => {
      try {
        const reg = await navigator.serviceWorker.register("/sw.js", { scope: "/" });
        if (reg.waiting && navigator.serviceWorker.controller) offerUpdate(reg.waiting);
        reg.addEventListener("updatefound", () => {
          const next = reg.installing;
          next?.addEventListener("statechange", () => {
            // Only an *update* if a previous worker already controls the page.
            if (next.state === "installed" && navigator.serviceWorker.controller) offerUpdate(next);
          });
        });
        // Check for new deploys when the user returns to the app.
        document.addEventListener("visibilitychange", () => document.visibilityState === "visible" && reg.update().catch(() => {}));
      } catch (err) {
        console.error("Service worker registration failed:", err);
      }
    };

    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);

  return null;
}
