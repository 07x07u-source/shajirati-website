import Image from "next/image";
import { FactRow } from "@/components/content-blocks";
import { Icon } from "@/components/icons";
import { Notice, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata("تحميل شجيرتي", "حالة توفر تطبيق شجيرتي وروابط التحميل الرسمية عند نشرها.", "/download/");

export default function DownloadPage() {
  const published = siteConfig.appStatus === "published" && Boolean(siteConfig.googlePlayUrl);
  return (
    <main>
      <PageHero eyebrow="التحميل" title="شجيرتي على Android" description="رابط التحميل الرسمي يظهر هنا عند توفره على Google Play." image="/trees/sidr.jpg" />
      <section className="content-section container-shell">
        <div className="download-card reveal">
          <Image src="/brand/app-icon.png" alt="أيقونة شجيرتي" width={112} height={112} />
          <span className="status-chip"><Icon name={published ? "check" : "sparkle"} className="h-4 w-4" /> {published ? "متوفر رسميًا" : "قريبًا على Google Play"}</span>
          <h2>تطبيق شجيرتي</h2>
          <p>{published ? "نزّل التطبيق من Google Play." : "سيظهر رابط Google Play عند نشر التطبيق رسميًا."}</p>
          {published ? <a className="button" href={siteConfig.googlePlayUrl} rel="noopener">التحميل من Google Play</a> : null}
        </div>
        <div className="facts-panel container-narrow reveal">
          <FactRow label="النظام" value="Android" />
          <FactRow label="الإصدار الموجود في المشروع" value={siteConfig.appVersion} />
          <FactRow label="iOS" value="لا توجد نسخة معلنة حاليًا" />
          <FactRow label="مصدر التحميل" value="Google Play فقط بعد النشر الرسمي" />
        </div>
        <div className="container-narrow section-space"><Notice tone="warning">لا تثبّت ملفات تطبيق من روابط غير رسمية. سيُحدّث هذا الموقع برابط المتجر بعد اكتمال النشر والمراجعة.</Notice></div>
      </section>
    </main>
  );
}
