import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { GulfExplorer } from "@/components/gulf-explorer";
import { Icon } from "@/components/icons";
import { TreeExplorer } from "@/components/tree-explorer";
import { SectionHeading } from "@/components/ui";
import { appScreens, faqs } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { categoryOptions, featuredTree, trees } from "@/lib/trees";
import heroStyles from "./home-hero.module.css";
import sectionStyles from "./home-sections.module.css";

export const metadata = pageMetadata(
  "اكتشف عالم الأشجار من حولك",
  "دليل عربي لأشجار السعودية والخليج، ومعلومات موثقة عن الأنواع والعناية بها، وتجربة تطبيق شجيرتي للتعرف على الأشجار بالصور.",
  "/",
);

const saudiSlugs = ["phoenix-dactylifera", "ziziphus-spina-christi", "vachellia-tortilis", "tamarix-aphylla", "salvadora-persica", "hyphaene-thebaica"];
const ornamentalSlugs = ["washingtonia-robusta", "roystonea-regia", "ficus-benjamina", "azadirachta-indica", "delonix-regia"];

const careTopics = [
  ["الماء", "راقب رطوبة التربة ومرحلة نمو الشجرة؛ لا يوجد جدول واحد يناسب كل الأنواع."],
  ["التربة", "التصريف والملوحة وعمق الجذور عوامل لا تقل أهمية عن كمية الري."],
  ["حرارة الصيف", "الري العميق والتغطية العضوية والموقع الصحيح تساعد، مع تجنب الإغراق."],
  ["الاختيار", "قد تكون الشجرة جميلة لكنها غير مناسبة للمساحة أو للمناخ المحلي."],
  ["الظل والزينة", "شجرة الظل تُختار للتاج والموقع؛ وشجرة الزينة قد تُختار للأزهار أو الهيئة."],
  ["أخطاء شائعة", "الزراعة قرب الخدمات، وكثرة الري، والتقليم القاسي أسباب متكررة للمشكلات."],
] as const;

const quickFacts = [
  ["الاسم العلمي أدق", "الاسم الشائع قد يطلق على أكثر من نوع."],
  ["النخيل متشابه", "صوّر السعف والجذع والثمار، لا التاج وحده."],
  ["الجفاف لا يلغي الري", "حتى الشجرة الصحراوية تحتاج ماءً خلال التأسيس."],
  ["التكيف أشكال", "الأوراق الصغيرة والجذور العميقة تقلل أثر الجفاف."],
  ["الري يتغير", "العمر والفصل والتربة والملوحة تحدد الاحتياج."],
] as const;

export default function HomePage() {
  const saudiTrees = saudiSlugs.map((slug) => trees.find((tree) => tree.slug === slug)!);
  const ornamentals = ornamentalSlugs.map((slug) => trees.find((tree) => tree.slug === slug)!);
  const datePalm = trees.find((tree) => tree.slug === "phoenix-dactylifera")!;
  const washingtonia = trees.find((tree) => tree.slug === "washingtonia-robusta")!;

  return (
    <main className={sectionStyles.page}>
      <section className={`home-focus-hero ${heroStyles.hero}`}>
        <Image className={heroStyles.image} src="/trees/hero-tree.jpg" alt="شجرة صحراوية كبيرة في مشهد طبيعي" fill priority sizes="100vw" />
        <div className={heroStyles.shade} />
        <div className={`container-shell home-focus-hero-grid ${heroStyles.content}`}>
          <div className={heroStyles.heading}>
            <span className={heroStyles.kicker}><Icon name="sparkle" /> شجيرتي · دليل الأشجار</span>
            <h1>اكتشف شجرتك <em>واعرفها أكثر</em></h1>
          </div>
          <div className={heroStyles.intro}>
            <p>صوّر الشجرة أو تصفّح الدليل العربي لمعرفة نوعها والعناية المناسبة.</p>
            <div className={heroStyles.actions}>
              <Link className={heroStyles.primaryAction} href="/trees/">اكتشف الأشجار</Link>
              <Link className={heroStyles.secondaryAction} href="/download/">حمّل التطبيق <span aria-hidden="true">←</span></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space container-shell editorial-intro" id="world">
        <div className="editorial-image reveal"><Image src={trees[2].image} alt={trees[2].imageAlt} fill sizes="(max-width: 800px) 100vw, 52vw" /><span>بيئات جافة، حياة متكيفة</span></div>
        <div className="editorial-copy reveal"><span className="section-index">01 — لماذا الأشجار؟</span><h2>الشجرة المناسبة تغيّر المكان</h2><p>توفر الظل والمأوى. ولتنجح زراعتها، اختر نوعًا يناسب المناخ والتربة والمساحة والماء المتاح.</p><ul><li>تدعم التنوع الحيوي.</li><li>تخفف حرارة المكان وتظللّه.</li><li>تحمي التربة عندما تنمو في موضع مناسب.</li></ul></div>
      </section>

      <section className="section-space saudi-trees-section">
        <div className="container-shell">
          <SectionHeading eyebrow="أشجار السعودية" title="أشجار تنمو في أرضنا" text="أنواع موثقة مع تمييز المحلي من المزروع." />
          <div className="saudi-tree-list">
            {saudiTrees.map((tree, index) => <article className="saudi-tree-row reveal" key={tree.slug}><span className="tree-row-index">0{index + 1}</span><div className="tree-row-image"><Image src={tree.image} alt={tree.imageAlt} fill sizes="(max-width: 700px) 34vw, 230px" /></div><div className="tree-row-copy"><span>{tree.statusLabel}</span><h3>{tree.arabicName}</h3><p lang="la" dir="ltr">{tree.scientificName}</p><small>{tree.sunlight} · {tree.climate}</small></div><Link href={`/trees/${tree.slug}/`} aria-label={`اكتشف ${tree.arabicName}`}>اكتشف الشجرة <span aria-hidden="true">←</span></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section-space ornamental-section">
        <div className="container-shell">
          <SectionHeading align="start" eyebrow="المشهد الحضري" title="أشجار الزينة" text="شائعة في الحدائق، وتحتاج موقعًا وعناية مناسبين." />
          <div className="ornamental-rail">
            {ornamentals.map((tree) => <article className="ornamental-slide" key={tree.slug}><div><Image src={tree.image} alt={tree.imageAlt} fill sizes="(max-width: 600px) 84vw, 390px" /></div><span>مزروعة للزينة</span><h3>{tree.arabicName}</h3><p lang="la" dir="ltr">{tree.scientificName}</p><Link href={`/trees/${tree.slug}/`}>التفاصيل</Link></article>)}
          </div>
        </div>
      </section>

      <section className="section-space container-shell category-section">
        <SectionHeading eyebrow="حسب الفئة" title="ابدأ بما يهمك" />
        <div className="category-gallery">
          {categoryOptions.filter((item) => item.id !== "all").map((category, index) => { const sample = trees.find((tree) => tree.categories.includes(category.id as never))!; return <Link href={`/trees/?category=${category.id}`} className={`category-tile category-${index + 1}`} key={category.id}><Image src={sample.image} alt="" fill sizes="(max-width: 700px) 92vw, 32vw" /><span><strong>{category.label}</strong><small>{category.description}</small></span></Link>; })}
        </div>
      </section>

      <section className="section-space gulf-section">
        <div className="container-shell"><SectionHeading eyebrow="حسب الدولة" title="من السعودية إلى الخليج" text="أمثلة محلية ومزروعة في كل دولة؛ القائمة ليست حصرًا شاملًا." /><GulfExplorer /></div>
      </section>

      <section className="section-space container-shell featured-tree-section">
        <div className="featured-tree-image"><Image src={featuredTree.image} alt={featuredTree.imageAlt} fill sizes="(max-width: 800px) 100vw, 57vw" /><span>شجرة مميزة</span></div>
        <div className="featured-tree-copy reveal"><span className="section-index">شجرة مميزة</span><h2>{featuredTree.arabicName}</h2><p className="latin" lang="la" dir="ltr">{featuredTree.scientificName}</p><p>{featuredTree.summary}</p><blockquote>«{featuredTree.fact}»</blockquote><Link className="button" href={`/trees/${featuredTree.slug}/`}>استكشف الغاف</Link></div>
      </section>

      <section className="section-space identification-section">
        <div className="container-shell"><SectionHeading eyebrow="قبل التصوير" title="التفاصيل تصنع الفرق" text="صورة الشجرة كاملة مفيدة، والتفاصيل القريبة تكملها." /><div className="clue-grid">{[["ورقة","الشكل والحافة وترتيب الوريقات"],["جذع","الملمس واللون وآثار قواعد السعف"],["ثمرة","الشكل واللون وطريقة تجمعها"],["زهرة","اللون والبنية وموسم الظهور"],["تاج","مروحي أو ريشي أو مظلي"],["سياق","الموطن والمناخ وهل النوع مزروع"]].map(([title,text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="identification-note"><Icon name="photos" /><p>صوّر الأوراق والجذع والثمار أو الأزهار إن وُجدت. قد تحتاج الأنواع المتشابهة إلى أكثر من صورة.</p></div></div>
      </section>

      <section className="section-space app-journey-section">
        <div className="container-shell app-journey-grid"><div className="app-journey-copy"><span className="section-index">تطبيق شجيرتي</span><h2>صوّر، ثم راجع النتيجة</h2><ol>{["التقط صورة واضحة","راجع الأنواع المحتملة","اكتشف معلومات العناية","احفظ النبات في مزرعتي"].map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ol><div className="honesty-box"><Icon name="shield" /><p>عند تشابه الأنواع، أضف صورًا أخرى أو استعن بمختص.</p></div></div><div className="app-screens-stack">{appScreens.slice(0,3).map((screen,index)=><div className={`stack-screen stack-${index+1}`} key={screen.src}><Image src={screen.src} alt={screen.alt} width={390} height={844} /></div>)}</div></div>
      </section>

      <section className="section-space container-shell care-section">
        <SectionHeading eyebrow="دليل عملي" title="أساسيات العناية" />
        <div className="care-editorial">{careTopics.map(([title,text],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section-space quick-facts-section">
        <div className="container-shell"><SectionHeading align="start" eyebrow="معلومة سريعة" title="اعرف قبل أن تزرع" /><div className="facts-bento">{quickFacts.map(([title,text], index)=><article className={`fact-${index+1}`} key={title}><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="section-space container-shell comparison-section">
        <SectionHeading eyebrow="مقارنة بصرية" title="نخيل التمر أم واشنطونيا؟" />
        <div className="comparison-grid"><article><Image src={datePalm.image} alt={datePalm.imageAlt} fill sizes="(max-width: 700px) 92vw, 45vw" /><div><span>01</span><h3>{datePalm.arabicName}</h3><p>سعف ريشي، جذع ذو آثار قواعد السعف، وثمار تمر متجمعة عند الإثمار.</p></div></article><div className="comparison-vs">مقابل</div><article><Image src={washingtonia.image} alt={washingtonia.imageAlt} fill sizes="(max-width: 700px) 92vw, 45vw" /><div><span>02</span><h3>{washingtonia.arabicName}</h3><p>أوراق مروحية وجذع طويل نحيل نسبيًا؛ تزرع للزينة وليست نخلة تمر.</p></div></article></div><p className="comparison-caveat"><Icon name="shield" /> لا تُحسم هوية النخلة دائمًا من علامة واحدة، خصوصًا مع الصور البعيدة والأنواع الهجينة.</p>
      </section>

      <section className="section-space why-section">
        <div className="container-shell why-grid"><div><span className="section-index">لماذا شجيرتي؟</span><h2>أسماء أوضح. قرارات أفضل.</h2><p>الأسماء العلمية والعناية العملية بالعربية، مع إظهار الشك عندما لا تكفي الصورة.</p><Link className="button button-light" href="/features/">استكشف المميزات</Link></div><ul>{["أسماء عربية وعلمية","عناية تناسب النوع","حفظ محلي في مزرعتي","بدائل عندما لا تُحسم النتيجة"].map((item)=><li key={item}><Icon name="check" />{item}</li>)}</ul></div>
      </section>

      <section className="section-space container-narrow homepage-faq">
        <SectionHeading eyebrow="قبل أن تبدأ" title="أسئلة شائعة" />
        <div className="faq-list">{faqs.slice(0, 4).map((item)=><details className="faq-item" key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div>
        <Link className="text-link faq-more" href="/faq/">كل الأسئلة الشائعة <span aria-hidden="true">←</span></Link>
      </section>

      <section className="download-stage final-download container-shell reveal">
        <div className="download-glow" /><Image src="/brand/app-icon.png" alt="أيقونة تطبيق شجيرتي" width={112} height={112} /><span className="eyebrow eyebrow-light">Android · {siteConfig.appStatus === "published" ? "متوفر الآن" : "قريبًا"}</span><h2>اكتشف شجرتك مع شجيرتي</h2>{siteConfig.appStatus === "published" && siteConfig.googlePlayUrl ? <a className="button button-light" href={siteConfig.googlePlayUrl}>حمّل شجيرتي</a> : <Link className="button button-light" href="/download/">حالة التحميل</Link>}
      </section>

      <section className="section-space container-shell homepage-directory">
        <SectionHeading eyebrow="ابدأ من هنا" title="ابحث في دليل الأشجار" />
        <Suspense fallback={<div className="empty-state">جاري تجهيز الدليل…</div>}><TreeExplorer compact /></Suspense>
      </section>
    </main>
  );
}
