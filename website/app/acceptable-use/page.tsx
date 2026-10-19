import { LegalPage } from "@/components/legal-page";
import { acceptableUseSections } from "@/lib/legal-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("سياسة الاستخدام المقبول", "الاستخدام المسؤول والممارسات المحظورة في خدمات شجيرتي.", "/acceptable-use/");
export default function AcceptableUsePage() { return <LegalPage eyebrow="الاستخدام المقبول" title="استخدم شجيرتي بوعي ومسؤولية" description="قواعد تحمي المستخدم والخدمة ومقدمي الخدمات الخارجية من الإساءة أو الاستخدام المضلل." sections={acceptableUseSections} />; }
