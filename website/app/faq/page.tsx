import { PageHero } from "@/components/ui";
import { faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("الأسئلة الشائعة", "إجابات واضحة عن دقة التعرف والصور والأسعار والإعلانات والخصوصية في شجيرتي.", "/faq/");

export default function FaqPage() {
  return (
    <main className="inner-page faq-page">
      <PageHero eyebrow="الأسئلة الشائعة" title="إجابات واضحة" description="عن التعرّف والصور والأسعار وتوفر التطبيق." image="/trees/royal-palm.jpg" />
      <section className="content-section container-narrow"><div className="faq-list">{faqs.map((item) => <details className="faq-item reveal" key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div></section>
    </main>
  );
}
