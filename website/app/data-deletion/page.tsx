import { LegalPage } from "@/components/legal-page";
import { deletionSections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("حذف البيانات", "خطوات حذف النباتات والبيانات المحلية وطلبات الخصوصية في تطبيق شجيرتي.", "/data-deletion/");
export default function DataDeletionPage() { return <LegalPage eyebrow="حذف البيانات" title="تحكم في بيانات جهازك" description="خطوات حذف البيانات المحلية وطلب المساعدة عند الحاجة." sections={deletionSections} />; }
