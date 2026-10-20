import { PageHero, Notice } from "@/components/ui";
import { siteConfig } from "@/lib/site-config";

export type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export function LegalPage({
  eyebrow,
  title,
  description,
  sections,
  legalDraft = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly LegalSection[];
  legalDraft?: boolean;
}) {
  return (
    <main className="inner-page legal-page">
      <PageHero eyebrow={eyebrow} title={title} description={description} />
      <section className="legal-layout container-shell">
        <nav className="legal-toc" aria-label="فهرس محتوى الصفحة">
          <span>في هذه الصفحة</span>
          <ol>{sections.map((section, index) => <li key={section.title}><a href={`#legal-${index}`}>{section.title}</a></li>)}</ol>
        </nav>
        <div className="legal-content">
          {legalDraft ? (
            <Notice tone="warning">
              <strong>مسودة للمراجعة قبل النشر.</strong> أُعد هذا النص وفق السلوك التقني الحالي للتطبيق، ولا يُعد رأيًا قانونيًا أو إعلانًا عن امتثال كامل. يجب اعتماد بيانات الجهة المالكة ومراجعة النص قانونيًا قبل الإطلاق.
            </Notice>
          ) : null}
          <p className="last-updated">آخر تحديث للمسودة: {siteConfig.policyLastUpdated}</p>
          {sections.map((section, index) => (
            <section className="legal-section reveal" key={section.title} aria-labelledby={`legal-${index}`}>
              <h2 id={`legal-${index}`}>{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              ) : null}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
