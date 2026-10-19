import type { Metadata } from "next";
import { Suspense } from "react";
import { TreeExplorer } from "@/components/tree-explorer";
import { PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata(
    "دليل أشجار السعودية والخليج",
    "دليل عربي مختار لأسماء الأشجار المحلية وأشجار الزينة الشائعة، مع أسماء علمية ومصادر نباتية موثوقة.",
    "/trees/",
  ),
  keywords: ["أشجار السعودية", "أشجار الخليج", "أسماء الأشجار", "أنواع النخيل", "الأشجار الصحراوية"],
};

export default function TreesPage() {
  return (
    <main>
      <PageHero eyebrow="دليل شجيرتي" title="أشجار من بيئتنا… ومن حدائقنا" description="مجموعة منتقاة من الأنواع الأصلية في السعودية والخليج، إلى جانب أشجار زينة مستوردة تظهر في مدن المنطقة. كل نوع موصوف بحدود واضحة ومراجع قابلة للمراجعة." />
      <section className="section-space container-shell tree-directory-section">
        <div className="directory-note">
          <strong>كيف نستخدم كلمة «محلي»؟</strong>
          <p>تعني هنا أن المصدر النباتي يضع النوع ضمن نطاقه الأصلي في السعودية أو أجزاء من الخليج. أما الأنواع المزروعة للزينة فموسومة بوضوح، حتى لو كانت شائعة في الشوارع والحدائق.</p>
        </div>
        <Suspense fallback={<div className="empty-state">جاري تجهيز الدليل…</div>}><TreeExplorer /></Suspense>
      </section>
    </main>
  );
}
