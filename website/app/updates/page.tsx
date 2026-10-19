import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata("تحديثات التطبيق", "التحديثات الرسمية لتطبيق شجيرتي عند نشرها واعتمادها.", "/updates/");

export default function UpdatesPage() {
  return (
    <main>
      <PageHero eyebrow="التحديثات" title="تحديثات شجيرتي" description="إصدارات التطبيق المنشورة، عندما تتوفر." image="/trees/ornamental.jpg" />
      <section className="content-section container-shell">
        <div className="empty-state reveal"><span className="eyebrow">الإصدار الموجود في المشروع: {siteConfig.appVersion}</span><h2>لا توجد تحديثات منشورة بعد</h2><p>سيظهر سجل الإصدارات عند إطلاق التطبيق على Google Play.</p></div>
      </section>
    </main>
  );
}
