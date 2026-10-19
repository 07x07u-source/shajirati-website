import Image from "next/image";
import { FactRow, InfoCard } from "@/components/content-blocks";
import { CtaBand, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata("عن شجيرتي", "قصة شجيرتي ورؤيته لتقريب معرفة الأشجار والنباتات إلى المستخدم العربي.", "/about/");

export default function AboutPage() {
  return (
    <main>
      <PageHero eyebrow="من نحن" title="نبني صلة أوضح بين الإنسان والشجرة" description="شجيرتي تجربة عربية تجمع التصوير والتعرّف النباتي والمعلومة العملية في مكان واحد، مع احترام حدود التقنية وخصوصية المستخدم." />
      <section className="content-section container-shell">
        <div className="story-grid">
          <div className="story-visual reveal"><Image src="/trees/hero-tree.jpg" alt="شجرة في بيئة صحراوية" fill sizes="(max-width: 850px) 100vw, 42vw" /></div>
          <div className="story-copy reveal">
            <span className="eyebrow eyebrow-light">لماذا شجيرتي؟</span>
            <h2>المعرفة تبدأ من لحظة فضول.</h2>
            <p>رؤية شجرة لا تعرف اسمها لحظة بسيطة، لكنها قد تفتح بابًا لفهم نوعها واحتياجاتها وقيمتها في المكان. شجيرتي يحوّل هذه اللحظة إلى رحلة قصيرة تبدأ بصورة وتنتهي بمعلومة أوضح—أو باعتراف صريح بأن الصورة لا تكفي.</p>
          </div>
        </div>
        <div className="content-grid three section-space">
          <InfoCard title="رؤيتنا" icon="sparkle"><p>تجربة عربية موثوقة تساعد الناس على ملاحظة النباتات من حولهم وفهمها، من دون أن تحل محل المختصين.</p></InfoCard>
          <InfoCard title="مبدأنا" icon="shield"><p>الصدق أهم من رقم ثقة مرتفع؛ لذلك نعرض البدائل ونطلب دليلًا إضافيًا عندما تكون النتيجة غير محسومة.</p></InfoCard>
          <InfoCard title="ما نبنيه" icon="leaf"><p>منتج جوال سريع، قابل للصيانة، يوازن بين الذكاء الاصطناعي والمصادر النباتية والتجربة المحلية الخفيفة.</p></InfoCard>
        </div>
        <div className="facts-panel reveal">
          <FactRow label="المنصة" value="تطبيق Android للتعرف على الأشجار والنباتات" />
          <FactRow label="اللغة الأساسية" value="العربية" />
          <FactRow label="الإصدار الحالي في المشروع" value={siteConfig.appVersion} />
          <FactRow label="الحسابات" value="لا يوجد نظام حساب مستخدم حاليًا" />
          <FactRow label="حالة النشر" value={siteConfig.appStatus === "published" ? "منشور" : "قريبًا — لم يُعتمد رابط متجر بعد"} />
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
