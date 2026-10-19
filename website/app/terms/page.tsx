import { LegalPage } from "@/components/legal-page";
import { termsSections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("الشروط والأحكام", "مسودة شروط استخدام تطبيق وموقع شجيرتي وحدود نتائج التعرف والعناية والأسعار.", "/terms/");
export default function TermsPage() { return <LegalPage eyebrow="الشروط" title="شروط استخدام شجيرتي" description="طبيعة الخدمة وحقوقك وحدود نتائجها." sections={termsSections} />; }
