import Link from "next/link";
import { Icon } from "@/components/icons";

export function NotFoundView() {
  return <main className="not-found"><div><strong aria-hidden="true">404</strong><h1>يبدو أن هذا المسار لم يُزرع بعد.</h1><p>الصفحة التي تبحث عنها غير موجودة أو انتقلت إلى مكان آخر. عد إلى الصفحة الرئيسية لتكمل جولتك.</p><Link className="button" href="/">العودة إلى الرئيسية <Icon name="arrow" className="h-5 w-5 rtl-flip" /></Link></div></main>;
}
