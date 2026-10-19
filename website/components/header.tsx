"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { mainNavigation } from "@/lib/site-config";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header" aria-label="التنقل الرئيسي" style={{ viewTransitionName: "site-header" }}>
      <div className="glass-nav container-shell">
        <Link href="/" className="brand-link" aria-label="شجيرتي — الرئيسية" onClick={() => setOpen(false)}>
          <Image src="/brand/app-icon.png" width={42} height={42} alt="" loading="eager" />
          <span>شجيرتي</span>
        </Link>

        <nav className="desktop-nav" aria-label="روابط الموقع">
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href.replace(/\/$/, "") || pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-sm desktop-download" href="/download/">
          حمّل شجيرتي
        </Link>

        <button
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "x" : "menu"} />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`mobile-nav glass-panel ${open ? "is-open" : ""}`}
        aria-label="قائمة الجوال"
        aria-hidden={!open}
        inert={!open}
      >
        {mainNavigation.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>
        ))}
        <Link className="button" href="/download/" onClick={() => setOpen(false)}>حمّل شجيرتي</Link>
      </nav>
      <span className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
