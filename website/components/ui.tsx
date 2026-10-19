import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/icons";

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "start";
}) {
  return (
    <div className={`section-heading ${align === "start" ? "text-start" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="orb orb-one" />
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="page-hero-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="container-narrow reveal">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {children}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="cta-band container-shell reveal">
      <div>
        <span className="eyebrow eyebrow-light">الطبيعة أقرب مما تتخيل</span>
        <h2>اكتشف ما حولك، شجرةً بعد شجرة.</h2>
        <p>ابدأ بالصورة، ودع شجيرتي يساعدك على فهم النبات والعناية به.</p>
      </div>
      <Link className="button button-light" href="/download/">
        حالة التحميل <Icon name="arrow" className="h-5 w-5 rtl-flip" />
      </Link>
    </section>
  );
}

export function Notice({ children, tone = "info" }: { children: ReactNode; tone?: "info" | "warning" }) {
  return (
    <div className={`notice notice-${tone}`} role="note">
      <Icon name={tone === "warning" ? "shield" : "sparkle"} className="h-5 w-5" />
      <div>{children}</div>
    </div>
  );
}
