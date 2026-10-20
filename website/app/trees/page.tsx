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
    <main className="inner-page tree-directory-page">
      <PageHero eyebrow="دليل شجيرتي" title="أشجار من بيئتنا وحدائقنا" description="أنواع محلية وأشجار زينة شائعة، بأسمائها العلمية ومصادرها." image="/trees/date-palm.jpg" />
      <section className="section-space container-shell tree-directory-section">
        <div className="directory-note">
          <strong>كيف نستخدم كلمة «محلي»؟</strong>
          <p>تعني أن المصدر يضع النوع ضمن موطنه الأصلي في المنطقة. الأنواع المستوردة موسومة للزينة.</p>
        </div>
        <Suspense fallback={<div className="empty-state">جاري تجهيز الدليل…</div>}><TreeExplorer /></Suspense>
      </section>
    </main>
  );
}
