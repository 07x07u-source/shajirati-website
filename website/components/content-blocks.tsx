import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";

export function InfoCard({
  title,
  children,
  icon = "leaf",
}: {
  title: string;
  children: ReactNode;
  icon?: IconName;
}) {
  return (
    <article className="info-card reveal">
      <div className="feature-icon"><Icon name={icon} /></div>
      <h2>{title}</h2>
      <div className="info-card-copy">{children}</div>
    </article>
  );
}

export function FactRow({ label, value }: { label: string; value: string }) {
  return <div className="fact-row"><span>{label}</span><strong>{value}</strong></div>;
}
