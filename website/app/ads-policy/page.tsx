import { LegalPage } from "@/components/legal-page";
import { adsSections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("سياسة الإعلانات", "سياسة إعلانات Google AdMob والموافقة عبر UMP داخل تطبيق شجيرتي.", "/ads-policy/");
export default function AdsPolicyPage() { return <LegalPage eyebrow="الإعلانات" title="إعلانات واضحة" description="مواضع الإعلانات والموافقة وخيارات الخصوصية." sections={adsSections} />; }
