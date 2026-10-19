import Image from "next/image";
import Link from "next/link";
import { footerNavigation, siteConfig } from "@/lib/site-config";

const groups = [
  { title: "المنصة", links: footerNavigation.platform },
  { title: "المساعدة", links: footerNavigation.help },
  { title: "السياسات", links: footerNavigation.legal },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-shell footer-grid">
        <div className="footer-intro">
          <Image src="/brand/logo-arabic-forest.png" alt="شجيرتي" width={176} height={62} />
          <p>{siteConfig.description}</p>
          <span className="draft-badge">الموقع قيد التجهيز للإطلاق الرسمي</span>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((item) => (
                <li key={item.href}><Link href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-shell footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.legalOwner || "شجيرتي"}.{siteConfig.legalOwner ? " جميع الحقوق محفوظة." : ""}</p>
        <p>النسخة الحالية: {siteConfig.appVersion} · العربية</p>
      </div>
    </footer>
  );
}
