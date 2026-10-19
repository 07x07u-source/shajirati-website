import Link from "next/link";
import { CtaBand, Notice, PageHero } from "@/components/ui";
import { howSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("كيف يعمل شجيرتي؟", "تعرّف على خطوات التصوير والمعالجة ومراجعة نتائج التعرف النباتي في شجيرتي.", "/how-it-works/");

const detailedSteps = [
  ...howSteps,
  { number: "04", title: "أضف دليلًا عند الحاجة", text: "إذا كانت الاحتمالات متقاربة، يمكنك إضافة صور أخرى للنبات نفسه—حتى خمس صور—مع التركيز على ورقة أو زهرة أو ثمرة أو الجذع." },
  { number: "05", title: "احفظ ما يهمك", text: "احفظ النبات في «مزرعتي» لتبقى بياناته وصورته على جهازك، ثم احذفه من الصفحة نفسها متى شئت." },
];

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero eyebrow="كيف يعمل؟" title="صوّر. راجع. تعلّم." description="تبدأ النتيجة بصورة واضحة، وتعرض الأنواع المحتملة مع درجة الثقة." image="/trees/ornamental.jpg" />
      <section className="content-section container-narrow">
        <div className="process-list">
          {detailedSteps.map((step) => <article className="process-item reveal" key={step.number}><div><h2>{step.title}</h2><p>{step.text}</p></div></article>)}
        </div>
        <div className="section-space"><Notice tone="warning">تغادر صورة التعرف الجهاز عند تنفيذ الطلب، إذ تمر عبر البنية الخلفية في Supabase إلى Pl@ntNet. راجع <Link className="text-link" href="/privacy/">سياسة الخصوصية</Link> للتفاصيل.</Notice></div>
      </section>
      <CtaBand />
    </main>
  );
}
