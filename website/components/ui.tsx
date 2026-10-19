import Link from "next/link";
import Image from "next/image";
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
  image = "/trees/hero-tree.jpg",
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Image className="page-hero-image" src={image} alt="" fill priority sizes="100vw" />
      <div className="page-hero-shade" aria-hidden="true" />
      <div className="container-shell page-hero-content reveal">
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
        <span className="eyebrow eyebrow-light">تطبيق شجيرتي</span>
        <h2>صوّر الشجرة وتعرّف عليها.</h2>
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
