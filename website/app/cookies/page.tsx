import { LegalPage } from "@/components/legal-page";
import { cookiesSections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("سياسة ملفات تعريف الارتباط", "حالة ملفات تعريف الارتباط وتقنيات الموقع الرسمي لشجيرتي.", "/cookies/");
export default function CookiesPage() { return <LegalPage eyebrow="ملفات الارتباط" title="موقع ثابت بلا تتبع تسويقي" description="ما يستخدمه الموقع الآن، وما يتغير إذا أضفنا أدوات جديدة." sections={cookiesSections} />; }
