import { LegalPage } from "@/components/legal-page";
import { privacySections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("سياسة الخصوصية", "مسودة سياسة خصوصية شجيرتي ومعالجة الصور والتخزين المحلي وSupabase وPl@ntNet وAdMob.", "/privacy/");
export default function PrivacyPage() { return <LegalPage eyebrow="الخصوصية" title="كيف يعالج شجيرتي بياناتك" description="شرح واضح لمسار الصورة والتخزين المحلي والإعلانات والحقوق، مبني على الكود الحالي للتطبيق." sections={privacySections} />; }
