import { PageHero } from "@/components/ui";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("الأسئلة الشائعة", "إجابات واضحة عن دقة التعرف والصور والأسعار والإعلانات والخصوصية في شجيرتي.", "/faq/");

export default function FaqPage() {
  return (
    <main>
      <PageHero eyebrow="الأسئلة الشائعة" title="ما تحتاج إلى معرفته، بإجابة مباشرة" description="إذا لم تجد إجابتك هنا، انتقل إلى مركز الدعم لمعرفة المعلومات المطلوبة عند الإبلاغ عن مشكلة." />
      <section className="content-section container-narrow"><div className="faq-list">{faqs.map((item) => <details className="faq-item reveal" key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div></section>
    </main>
  );
}
