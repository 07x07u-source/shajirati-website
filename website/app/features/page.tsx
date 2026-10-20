import { InfoCard } from "@/components/content-blocks";
import { CtaBand, Notice, PageHero } from "@/components/ui";
import { featureItems } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("مميزات التطبيق", "اكتشف مميزات شجيرتي للتعرف على الأشجار والعناية بها وحفظها محليًا.", "/features/");

export default function FeaturesPage() {
  return (
    <main className="inner-page features-page">
      <PageHero eyebrow="المميزات" title="من الصورة إلى العناية" description="تعرّف على الشجرة، راجع البدائل، واحفظ ما يهمك." image="/trees/date-palm.jpg" />
      <section className="content-section container-shell">
        <Notice>التعرّف النباتي مساعدة تقنية وليس حكمًا علميًا نهائيًا. راجع درجة الثقة والبدائل، واستعن بمختص عند القرارات الزراعية أو الصحية الحساسة.</Notice>
        <div className="content-grid section-space">
          {featureItems.map((feature) => (
            <InfoCard key={feature.title} title={feature.title} icon={feature.icon}>
              <p>{feature.text}</p>
            </InfoCard>
          ))}
          <InfoCard title="ست دول خليجية" icon="tag"><p>تدعم بنية الأسعار السعودية والإمارات والكويت وقطر والبحرين وعُمان، بحسب البيانات المتاحة وتاريخها.</p></InfoCard>
        </div>
      </section>
      <CtaBand />
    </main>
  );
}
