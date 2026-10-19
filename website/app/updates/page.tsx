import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata("تحديثات التطبيق", "التحديثات الرسمية لتطبيق شجيرتي عند نشرها واعتمادها.", "/updates/");

export default function UpdatesPage() {
  return (
    <main>
      <PageHero eyebrow="التحديثات" title="سجل واضح، عندما يبدأ النشر" description="لن ننشئ أخبارًا أو ملاحظات إصدار غير حقيقية. سيظهر هنا فقط ما تم نشره واعتماده رسميًا." />
      <section className="content-section container-shell">
        <div className="empty-state reveal"><span className="eyebrow">الإصدار الموجود في المشروع: {siteConfig.appVersion}</span><h2>لا توجد تحديثات متجر منشورة بعد</h2><p>حالة التطبيق في إعدادات الموقع «قريبًا». بعد إطلاق Google Play، يمكن إضافة سجل إصدار مؤرخ يطابق ما يظهر في المتجر.</p></div>
      </section>
    </main>
  );
}
