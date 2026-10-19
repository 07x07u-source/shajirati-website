import { LegalPage } from "@/components/legal-page";
import { disclaimerSections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("إخلاء المسؤولية", "حدود نتائج التعرف ومعلومات العناية والأسعار التقديرية في شجيرتي.", "/disclaimer/");
export default function DisclaimerPage() { return <LegalPage eyebrow="تنبيه مهم" title="المعرفة المساعدة ليست حكمًا نهائيًا" description="حدود واضحة لما يستطيع شجيرتي تقديمه، ومتى يجب الرجوع إلى مختص." sections={disclaimerSections} />; }
