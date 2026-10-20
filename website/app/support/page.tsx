import Link from "next/link";
import { InfoCard } from "@/components/content-blocks";
import { Notice, PageHero } from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("مركز المساعدة", "مساعدة استخدام الكاميرا والتعرف والنتائج ومزرعتي والإعلانات في تطبيق شجيرتي.", "/support/");

export default function SupportPage() {
  return (
    <main className="inner-page support-page">
      <PageHero eyebrow="الدعم" title="كيف نساعدك؟" description="حلول للمشكلات الشائعة ومعلومات مفيدة للإبلاغ عنها." image="/trees/sidr.jpg" />
      <section className="content-section container-shell">
        <div className="content-grid two">
          <InfoCard title="الكاميرا لا تعمل" icon="camera"><ul><li>تحقق من إذن الكاميرا في إعدادات Android.</li><li>أغلق أي تطبيق آخر يستخدم الكاميرا.</li><li>أعد تشغيل التطبيق بعد تغيير الإذن.</li></ul></InfoCard>
          <InfoCard title="النتيجة غير مؤكدة" icon="scan"><ul><li>استخدم إضاءة طبيعية وصورة ثابتة.</li><li>صوّر الورقة أو الثمرة أو الجذع عن قرب.</li><li>أضف زاوية أخرى للنبات نفسه ولا تخلط نباتات مختلفة.</li></ul></InfoCard>
          <InfoCard title="المعلومات أو الأسعار غير متاحة" icon="tag"><p>قد تكون الخدمة مؤقتًا دون اتصال أو لا تتوفر بيانات لهذا النوع أو الدولة. الأسعار تقديرية ومؤرخة وليست عروض بيع.</p></InfoCard>
          <InfoCard title="إدارة مزرعتي" icon="bookmark"><p>اضغط زر الحذف بجانب النبات ثم أكّد العملية. الحذف يزيل السجل المحلي؛ لا يوجد حساب سحابي في النسخة الحالية.</p></InfoCard>
          <InfoCard title="خصوصية الإعلانات" icon="shield"><p>عندما تكون خيارات UMP مطلوبة، يظهر خيار «إدارة خيارات الخصوصية» داخل إعدادات التطبيق.</p></InfoCard>
          <InfoCard title="الإبلاغ عن مشكلة" icon="mail"><p>اذكر إصدار التطبيق والجهاز وإصدار Android وخطوات إعادة المشكلة. تجنب إرسال بيانات حساسة أو صور لا تخص النبات.</p></InfoCard>
        </div>
        <div className="container-narrow section-space"><Notice>لمزيد من التفاصيل راجع <Link className="text-link" href="/faq/">الأسئلة الشائعة</Link> أو <Link className="text-link" href="/contact/">صفحة التواصل</Link>.</Notice></div>
      </section>
    </main>
  );
}
