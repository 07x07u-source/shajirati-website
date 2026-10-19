"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function MotionOrchestrator() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("motion-enabled");

    if (reducedMotion) {
      return;
    }

    const seen = new WeakSet<HTMLElement>();
    let index = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const register = (element: HTMLElement) => {
      if (seen.has(element)) return;
      seen.add(element);
      element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
      index += 1;
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.classList.add("is-visible");
      } else {
        element.classList.add("reveal-pending");
        observer.observe(element);
      }
    };

    document.querySelectorAll<HTMLElement>(".reveal").forEach(register);
    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches(".reveal")) register(node);
          node.querySelectorAll<HTMLElement>(".reveal").forEach(register);
        });
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
