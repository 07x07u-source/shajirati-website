import { NotFoundView } from "@/components/not-found-view";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "الصفحة غير موجودة",
  "تعذر العثور على الصفحة المطلوبة في موقع شجيرتي.",
  "/404/",
);

export default function NotFound() { return <NotFoundView />; }
