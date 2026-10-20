import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { getTree, trees } from "@/lib/trees";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return trees.map((tree) => ({ slug: tree.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tree = getTree(slug);
  if (!tree) return {};
  const title = `${tree.arabicName} — ${tree.scientificName}`;
  const description = `${tree.summary} تعرّف على صفاتها وموطنها والعناية العامة بها في دليل شجيرتي.`;
  const canonical = new URL(`/trees/${tree.slug}/`, siteConfig.url).toString();
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: tree.image, alt: tree.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [tree.image],
    },
  };
}

export default async function TreePage({ params }: Props) {
  const { slug } = await params;
  const tree = getTree(slug);
  if (!tree) notFound();

  const related = tree.similar.map((name) => trees.find((candidate) => candidate.arabicName === name || candidate.scientificName === name)).filter(Boolean);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${tree.arabicName} — ${tree.scientificName}`,
    description: tree.summary,
    url: new URL(`/trees/${tree.slug}/`, siteConfig.url).toString(),
    inLanguage: "ar",
    citation: tree.sources.map((source) => source.url),
  };

  return (
    <main className="inner-page tree-detail-page">
      <section className="tree-detail-hero">
        <div className="tree-detail-image">
          <Image src={tree.image} alt={tree.imageAlt} fill priority sizes="100vw" />
          <div className="tree-detail-overlay" />
        </div>
        <div className="container-shell tree-detail-title reveal">
          <Link href="/trees/" className="tree-back">دليل الأشجار <span aria-hidden="true">←</span></Link>
          <span className={`origin-badge ${tree.status}`}>{tree.statusLabel}</span>
          <h1>{tree.arabicName}</h1>
          <p lang="la" dir="ltr">{tree.scientificName}</p>
        </div>
      </section>

      <section className="section-space container-shell tree-detail-layout">
        <article className="tree-story">
          <span className="eyebrow">نبذة موثقة</span>
          <h2>{tree.summary}</h2>
          <p>{tree.range}</p>
          <div className="tree-fact-callout"><Icon name="sparkle" /><p>{tree.fact}</p></div>

          <h2>علامات تساعد على التعرّف</h2>
          <ul className="trait-list">{tree.visibleTraits.map((trait) => <li key={trait}>{trait}</li>)}</ul>

          <h2>عناية عامة</h2>
          <p>هذه إرشادات عامة وليست جدول ري ثابتًا؛ يتغير الاحتياج حسب العمر والتربة والحرارة والملوحة والرياح.</p>
          <ul className="care-list">{tree.care.map((item) => <li key={item}><Icon name="check" />{item}</li>)}</ul>
        </article>

        <aside className="tree-facts-panel">
          <dl>
            <div><dt>العائلة النباتية</dt><dd lang="la" dir="ltr">{tree.family}</dd></div>
            <div><dt>الموطن/الحالة</dt><dd>{tree.statusLabel}</dd></div>
            <div><dt>الموئل العام</dt><dd>{tree.habitat}</dd></div>
            <div><dt>الضوء</dt><dd>{tree.sunlight}</dd></div>
            <div><dt>المناخ</dt><dd>{tree.climate}</dd></div>
          </dl>
          <div className="source-box">
            <h2>المراجع</h2>
            {tree.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}
            <a href={tree.imageSource} target="_blank" rel="noreferrer">الصورة: {tree.imageCredit} · {tree.imageLicense}</a>
          </div>
        </aside>
      </section>

      {related.length ? <section className="container-shell related-trees"><h2>أنواع قد تتشابه معها</h2>{related.map((item) => item ? <Link key={item.slug} href={`/trees/${item.slug}/`}>{item.arabicName}</Link> : null)}</section> : null}

      <section className="tree-app-cta container-shell">
        <div><span className="eyebrow eyebrow-light">جرّب شجيرتي</span><h2>هل هذه الشجرة أمامك؟</h2><p>التقط صورًا واضحة للشجرة والأوراق والجذع أو الثمار. قد تعرض النتيجة أكثر من احتمال عندما لا تكفي الأدلة البصرية.</p></div>
        <Link className="button button-light" href="/download/">تجربة التعرف في التطبيق</Link>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </main>
  );
}
