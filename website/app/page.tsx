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
  ["اسم شائع ≠ نوع علمي", "قد يشير الاسم الشعبي الواحد إلى أكثر من نوع، لذلك يحسم الاسم العلمي المقصود بدقة أكبر."],
  ["النخيل يتشابه بصريًا", "الجذع والسعف والتاج والثمار كلها أدلة؛ ولا تكفي لقطة بعيدة في الحالات المتقاربة."],
  ["تحمّل الجفاف ليس انعدام الري", "حتى الأنواع الصحراوية تحتاج ماءً مناسبًا خلال التأسيس، وتختلف الاستجابة حسب التربة."],
  ["الصحراء ليست فراغًا", "الأوراق الصغيرة والجذور العميقة وإدارة فقد الماء وسائل مختلفة للتكيف مع الحر والجفاف."],
  ["الري قرار سياقي", "العمر والفصل والتربة والملوحة والرياح عوامل تغيّر الاحتياج المائي."],
] as const;

export default function HomePage() {
  const saudiTrees = saudiSlugs.map((slug) => trees.find((tree) => tree.slug === slug)!);
  const ornamentals = ornamentalSlugs.map((slug) => trees.find((tree) => tree.slug === slug)!);
  const datePalm = trees.find((tree) => tree.slug === "phoenix-dactylifera")!;
  const washingtonia = trees.find((tree) => tree.slug === "washingtonia-robusta")!;

  return (
    <main>
      <section className="discovery-hero">
        <Image className="discovery-hero-image" src="/trees/hero-tree.jpg" alt="شجرة صحراوية كبيرة في مشهد طبيعي" fill priority sizes="100vw" />
        <div className="discovery-hero-shade" />
        <div className="container-shell discovery-hero-grid">
          <div className="discovery-hero-copy reveal">
            <span className="hero-pill"><Icon name="sparkle" /> دليل عربي للطبيعة من حولك</span>
            <h1>اكتشف عالم الأشجار <em>من حولك</em></h1>
            <p>تعرّف على الأشجار والنباتات، واستكشف أنواعها وخصائصها وطرق العناية بها، مع شجيرتي.</p>
            <div className="hero-actions">
              <Link className="button button-light" href="/trees/">اكتشف الأشجار</Link>
              <Link className="button discovery-ghost" href="/download/">حمّل التطبيق</Link>
            </div>
            <div className="hero-source-note"><span>12 نوعًا موثقًا كبداية</span><span>مصادر علمية قابلة للمراجعة</span></div>
          </div>
          <div className="hero-app-preview reveal">
            <div className="phone-shell discovery-phone"><div className="phone-camera" /><Image src="/app/screens/camera.png" alt="شاشة الكاميرا الفعلية في تطبيق شجيرتي" width={390} height={844} priority /></div>
            <div className="hero-glass-note"><Icon name="leaf" /><span><strong>صورة حقيقية</strong><small>من تطبيق شجيرتي</small></span></div>
          </div>
        </div>
        <a className="hero-scroll" href="#world"><span>استكشف</span><i /></a>
      </section>

      <section className="section-space container-shell editorial-intro" id="world">
        <div className="editorial-image reveal"><Image src={trees[2].image} alt={trees[2].imageAlt} fill sizes="(max-width: 800px) 100vw, 52vw" /><span>بيئات جافة، حياة متكيفة</span></div>
        <div className="editorial-copy reveal"><span className="section-index">01 — لماذا الأشجار؟</span><h2>الأشجار أكثر من مجرد منظر جميل</h2><p>هي موائل ومصادر ظل وعناصر أساسية في النظم البيئية. لكن نجاح التشجير لا يعتمد على العدد وحده؛ بل على اختيار النوع المناسب للمناخ والتربة والمساحة والماء المتاح.</p><ul><li>تدعم التنوع الحيوي وتوفر الغذاء والمأوى.</li><li>تلطف البيئات المحلية وتوفر الظل عندما تُزرع في المكان المناسب.</li><li>تساعد الجذور والغطاء النباتي على حماية التربة.</li><li>النوع المحلي غالبًا أقدر على الانسجام مع بيئته الأصلية.</li></ul></div>
      </section>

      <section className="section-space saudi-trees-section">
        <div className="container-shell">
          <SectionHeading eyebrow="أشجار السعودية" title="أشجار تنمو في أرضنا" text="اختيار أولي لأنواع موثقة في السعودية، مع فصل واضح بين الأصالة النباتية والشيوع الزراعي." />
          <div className="saudi-tree-list">
            {saudiTrees.map((tree, index) => <article className="saudi-tree-row reveal" key={tree.slug}><span className="tree-row-index">0{index + 1}</span><div className="tree-row-image"><Image src={tree.image} alt={tree.imageAlt} fill sizes="(max-width: 700px) 34vw, 230px" /></div><div className="tree-row-copy"><span>{tree.statusLabel}</span><h3>{tree.arabicName}</h3><p lang="la" dir="ltr">{tree.scientificName}</p><small>{tree.sunlight} · {tree.climate}</small></div><Link href={`/trees/${tree.slug}/`} aria-label={`اكتشف ${tree.arabicName}`}>اكتشف الشجرة <span aria-hidden="true">←</span></Link></article>)}
          </div>
        </div>
      </section>

      <section className="section-space ornamental-section">
        <div className="container-shell">
          <SectionHeading align="start" eyebrow="المشهد الحضري" title="أشجار تضيف جمالًا للمكان" text="هذه الأنواع شائعة في تنسيق الحدائق، لكنها ليست محلية أصلية في الخليج. نجاحها يعتمد على الموقع والماء والصيانة." />
          <div className="ornamental-rail">
            {ornamentals.map((tree) => <article className="ornamental-slide" key={tree.slug}><div><Image src={tree.image} alt={tree.imageAlt} fill sizes="(max-width: 600px) 84vw, 390px" /></div><span>مزروعة للزينة</span><h3>{tree.arabicName}</h3><p lang="la" dir="ltr">{tree.scientificName}</p><Link href={`/trees/${tree.slug}/`}>التفاصيل</Link></article>)}
          </div>
        </div>
      </section>

      <section className="section-space container-shell category-section">
        <SectionHeading eyebrow="اختر طريقك" title="استكشف عالم الأشجار" text="قد ينتمي النوع إلى أكثر من فئة عندما يكون التصنيف مفهومًا: فنخيل التمر نخلة مثمرة ومحلية، والسدر شجرة ظل ومثمرة وصحراوية." />
        <div className="category-gallery">
          {categoryOptions.filter((item) => item.id !== "all").map((category, index) => { const sample = trees.find((tree) => tree.categories.includes(category.id as never))!; return <Link href={`/trees/?category=${category.id}`} className={`category-tile category-${index + 1}`} key={category.id}><Image src={sample.image} alt="" fill sizes="(max-width: 700px) 92vw, 32vw" /><span><strong>{category.label}</strong><small>{category.description}</small></span></Link>; })}
        </div>
      </section>

      <section className="section-space gulf-section">
        <div className="container-shell"><SectionHeading eyebrow="اختيار يدوي بلا موقع جغرافي" title="من السعودية إلى الخليج" text="اختر الدولة بنفسك. تعرض القوائم أمثلة موثقة أو محددة بوضوح كأنواع مزروعة، وليست حصرًا كاملًا لفلورا كل دولة." /><GulfExplorer /></div>
      </section>

      <section className="section-space container-shell featured-tree-section">
        <div className="featured-tree-image"><Image src={featuredTree.image} alt={featuredTree.imageAlt} fill sizes="(max-width: 800px) 100vw, 57vw" /><span>شجرة مميزة</span></div>
        <div className="featured-tree-copy reveal"><span className="section-index">شجرة مميزة — اختيار تحريري</span><h2>{featuredTree.arabicName}</h2><p className="latin" lang="la" dir="ltr">{featuredTree.scientificName}</p><p>{featuredTree.summary} {featuredTree.range}</p><blockquote>«{featuredTree.fact}»</blockquote><Link className="button" href={`/trees/${featuredTree.slug}/`}>استكشف الغاف</Link></div>
      </section>

      <section className="section-space identification-section">
        <div className="container-shell"><SectionHeading eyebrow="ملاحظة قبل التصوير" title="كل شجرة لها ما يميزها" text="التعرف الأدق يأتي من مجموعة أدلة، لا من لون الورقة أو شكل التاج وحده." /><div className="clue-grid">{[["ورقة","الشكل والحافة وترتيب الوريقات"],["جذع","الملمس واللون وآثار قواعد السعف"],["ثمرة","الشكل واللون وطريقة تجمعها"],["زهرة","اللون والبنية وموسم الظهور"],["تاج","مروحي أو ريشي أو مظلي"],["سياق","الموطن والمناخ وهل النوع مزروع"]].map(([title,text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="identification-note"><Icon name="photos" /><p>صوّر الشجرة كاملة ثم الأوراق والجذع والثمار أو الأزهار إن وُجدت. بعض الأنواع المتشابهة لا يمكن حسمها بصريًا من صورة واحدة.</p></div></div>
      </section>

      <section className="section-space app-journey-section">
        <div className="container-shell app-journey-grid"><div className="app-journey-copy"><span className="section-index">تطبيق شجيرتي</span><h2>تعرّف على شجرتك بصورة واحدة</h2><p>ابدأ بصورة واضحة، ثم دع التطبيق يرتب الاحتمالات ويضع النتيجة في سياقها.</p><ol>{["التقط صورة واضحة","راجع الأنواع المحتملة","اكتشف معلومات العناية","احفظ النبات في مزرعتي"].map((item,index)=><li key={item}><span>0{index+1}</span>{item}</li>)}</ol><div className="honesty-box"><Icon name="shield" /><p>قد تخطئ نتائج الذكاء الاصطناعي. الأنواع المتقاربة قد تحتاج صورًا إضافية أو تحققًا من مختص.</p></div></div><div className="app-screens-stack">{appScreens.slice(0,3).map((screen,index)=><div className={`stack-screen stack-${index+1}`} key={screen.src}><Image src={screen.src} alt={screen.alt} width={390} height={844} /></div>)}</div></div>
      </section>

      <section className="section-space container-shell care-section">
        <SectionHeading eyebrow="دليل عملي" title="العناية الصحيحة تبدأ بالمعرفة" text="نصائح عامة تساعدك على طرح الأسئلة الصحيحة قبل اتخاذ قرار الري أو الزراعة أو التقليم." />
        <div className="care-editorial">{careTopics.map(([title,text],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section-space quick-facts-section">
        <div className="container-shell"><SectionHeading align="start" eyebrow="مختصر ومفيد" title="معلومات نباتية سريعة" /><div className="facts-bento">{quickFacts.map(([title,text], index)=><article className={`fact-${index+1}`} key={title}><span>معرفة</span><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>

      <section className="section-space container-shell comparison-section">
        <SectionHeading eyebrow="مقارنة بصرية" title="تتشابه في الشكل وتختلف في النوع" text="نخيل التمر وواشنطونيا مثال واضح: كلاهما نخيل، لكن بنية الورقة والجذع والثمار مختلفة." />
        <div className="comparison-grid"><article><Image src={datePalm.image} alt={datePalm.imageAlt} fill sizes="(max-width: 700px) 92vw, 45vw" /><div><span>01</span><h3>{datePalm.arabicName}</h3><p>سعف ريشي، جذع ذو آثار قواعد السعف، وثمار تمر متجمعة عند الإثمار.</p></div></article><div className="comparison-vs">مقابل</div><article><Image src={washingtonia.image} alt={washingtonia.imageAlt} fill sizes="(max-width: 700px) 92vw, 45vw" /><div><span>02</span><h3>{washingtonia.arabicName}</h3><p>أوراق مروحية وجذع طويل نحيل نسبيًا؛ تزرع للزينة وليست نخلة تمر.</p></div></article></div><p className="comparison-caveat"><Icon name="shield" /> لا تُحسم هوية النخلة دائمًا من علامة واحدة، خصوصًا مع الصور البعيدة والأنواع الهجينة.</p>
      </section>

      <section className="section-space why-section">
        <div className="container-shell why-grid"><div><span className="section-index">لماذا شجيرتي؟</span><h2>معرفة واضحة، باللغة التي تستخدمها.</h2><p>منصة عربية تربط الاسم العلمي بالمعلومة العملية، وتصرّح بعدم اليقين عندما تكون الصورة غير كافية.</p><Link className="button button-light" href="/features/">استكشف المميزات</Link></div><ul>{["تجربة عربية واضحة","أسماء علمية للنباتات","معلومات عناية منظمة","تركيز على السعودية والخليج","حفظ محلي في مزرعتي","عرض عدم اليقين بدل الثقة الزائفة"].map((item)=><li key={item}><Icon name="check" />{item}</li>)}</ul></div>
      </section>

      <section className="section-space container-narrow homepage-faq">
        <SectionHeading eyebrow="قبل أن تبدأ" title="أسئلة شائعة" />
        <div className="faq-list">{faqs.map((item)=><details className="faq-item" key={item.question}><summary>{item.question}<span aria-hidden="true">＋</span></summary><p>{item.answer}</p></details>)}</div>
      </section>

      <section className="download-stage final-download container-shell reveal">
        <div className="download-glow" /><Image src="/brand/app-icon.png" alt="أيقونة تطبيق شجيرتي" width={112} height={112} /><span className="eyebrow eyebrow-light">Android · {siteConfig.appStatus === "published" ? "متوفر الآن" : "قريبًا"}</span><h2>ابدأ رحلتك مع عالم الأشجار</h2><p>كل شجرة من حولك تحمل قصة. اكتشفها مع شجيرتي.</p>{siteConfig.appStatus === "published" && siteConfig.googlePlayUrl ? <a className="button button-light" href={siteConfig.googlePlayUrl}>حمّل شجيرتي</a> : <Link className="button button-light" href="/download/">حمّل شجيرتي · قريبًا</Link>}
      </section>

      <section className="section-space container-shell homepage-directory">
        <SectionHeading eyebrow="ابدأ من هنا" title="ابحث في دليل الأشجار" text="ابحث بالعربية أو بالاسم العلمي، أو صفِّ النتائج حسب الفئة." />
        <Suspense fallback={<div className="empty-state">جاري تجهيز الدليل…</div>}><TreeExplorer compact /></Suspense>
      </section>
    </main>
  );
}
