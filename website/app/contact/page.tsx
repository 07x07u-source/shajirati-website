import { Icon } from "@/components/icons";
import { Notice, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";

export const metadata = pageMetadata("تواصل معنا", "قنوات التواصل والدعم والخصوصية والشراكات الخاصة بمنصة شجيرتي.", "/contact/");

const contacts = [
  { icon: "mail" as const, title: "الدعم الفني", text: "اذكر نوع الجهاز، إصدار Android، وخطوات ظهور المشكلة. لا تُرسل صورًا شخصية أو مفاتيح وصول." },
  { icon: "shield" as const, title: "طلبات الخصوصية", text: "وضّح نوع الطلب والبيانات التي تعتقد أنها مرتبطة بك. لا ترسل وثائق هوية قبل أن يطلبها مسار رسمي وآمن." },
  { icon: "sparkle" as const, title: "الشراكات", text: "عرّفنا بالجهة والفكرة المقترحة." },
];

export default function ContactPage() {
  return (
    <main className="inner-page contact-page">
      <PageHero eyebrow="التواصل" title="تواصل مع شجيرتي" description="الدعم والخصوصية والشراكات في مكان واحد." image="/trees/ficus-benjamina.jpg" />
      <section className="content-section container-shell">
        <div className="contact-options">{contacts.map((item) => <article className="contact-option reveal" key={item.title}><div className="feature-icon"><Icon name={item.icon} /></div><h2>{item.title}</h2><p>{item.text}</p></article>)}</div>
        <div className="container-narrow section-space">
          {siteConfig.supportEmail ? (
            <div className="empty-state"><h2>البريد الرسمي</h2><p>يمكنك مراسلتنا عبر البريد المعتمد:</p><a className="button" href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a></div>
          ) : (
            <Notice tone="warning"><strong>قناة التواصل قيد الاعتماد.</strong> لم يقدّم مالك المنصة بريد دعم رسميًا بعد، لذلك لا نعرض عنوانًا مؤقتًا أو مختلقًا.</Notice>
          )}
        </div>
      </section>
    </main>
  );
}
