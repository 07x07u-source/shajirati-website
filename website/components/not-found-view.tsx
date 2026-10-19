import Link from "next/link";
import { Icon } from "@/components/icons";
import { PageHero } from "@/components/ui";

export function NotFoundView() {
  return <main><PageHero eyebrow="404" title="هذه الصفحة غير موجودة" description="عد إلى الدليل واستكشف الأشجار." image="/trees/sidr.jpg"><Link className="button button-light not-found-link" href="/">العودة إلى الرئيسية <Icon name="arrow" className="h-5 w-5 rtl-flip" /></Link></PageHero></main>;
}
