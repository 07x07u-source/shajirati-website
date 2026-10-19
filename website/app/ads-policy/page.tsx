import { LegalPage } from "@/components/legal-page";
import { adsSections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("سياسة الإعلانات", "سياسة إعلانات Google AdMob والموافقة عبر UMP داخل تطبيق شجيرتي.", "/ads-policy/");
export default function AdsPolicyPage() { return <LegalPage eyebrow="الإعلانات" title="إعلانات واضحة وفي مواضع مسؤولة" description="كيف يدمج شجيرتي AdMob، ومتى تُطلب الإعلانات، وما دور موافقة Google UMP." sections={adsSections} />; }
