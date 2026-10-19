# موقع شجيرتي الرسمي

موقع عربي مستقل لتطبيق «شجيرتي»، مبني بـ Next.js App Router وTypeScript وTailwind CSS. الموقع ثابت بالكامل ومجهّز للنشر على Render Static Site. لم يُربط بقاعدة بيانات، ولم تُضف إليه حسابات أو نموذج تواصل وهمي.

## المتطلبات

- Node.js 24 (مثبت في `.node-version` وRender).
- npm 10 أو 11.

## التشغيل المحلي

```bash
npm ci
npm run dev
```

ثم افتح:

```text
http://localhost:3000
```

## الفحص والبناء

```bash
npm run lint
npm run typecheck
npm run build
npm run validate
npm audit --omit=dev
```

ينتج البناء الثابت داخل مجلد `out/`. يحتوي المجلد على جميع صفحات HTML والأصول وملفات `robots.txt` و`sitemap.xml` و`manifest.webmanifest`. لا يظهر `app-ads.txt` إلا بعد إضافة سجل الناشر الرسمي.

## الإعدادات المركزية

انسخ `.env.example` إلى `.env.local` محليًا، أو أضف المتغيرات نفسها داخل إعدادات Render:

| المتغير | الغرض |
|---|---|
| `SITE_URL` | الدومين الرسمي الكامل بعد ربطه. إن تُرك فارغًا يستخدم البناء `RENDER_EXTERNAL_URL` تلقائيًا |
| `SUPPORT_EMAIL` | بريد الدعم والخصوصية المعتمد |
| `LEGAL_OWNER` | اسم المالك أو الجهة القانونية بعد اعتماده |
| `GOOGLE_PLAY_URL` | رابط Google Play الرسمي بعد النشر فقط |
| `APP_STATUS` | `coming-soon` حاليًا، أو `published` بعد اعتماد رابط المتجر |

مصدر الإعدادات الوحيد هو `lib/site-config.ts`. عند ترك القيم الحساسة فارغة، لا يخترع الموقع بريدًا أو مالكًا أو رابط متجر؛ بل يعرض حالة واضحة بأن القناة أو الرابط قيد الاعتماد.

## بنية المشروع

```text
app/                 الصفحات، Metadata، sitemap، robots والـManifest
components/          مكونات الواجهة المشتركة
lib/                 الإعدادات والمحتوى والنصوص القانونية
public/              الهوية، اللقطات الفعلية وصور الأشجار
scripts/             فاحص البناء والروابط والـSEO
out/                 ناتج البناء الثابت
../render.yaml       تعريف Render Blueprint للموقع الثابت
```

## app-ads.txt

لا يُنشر الملف حاليًا لأن سجل الناشر الرسمي غير متوفر. بعد نسخه من AdMob، أنشئ `public/app-ads.txt` ليظهر على:

```text
https://DOMAIN/app-ads.txt
```

لا تضع فيه Android App ID أو Ad Unit ID. يجب نسخ سجل الناشر الرسمي من حساب AdMob نفسه. راجع `APP_ADS_SETUP_AR.md` قبل النشر.

## النشر على Render

لم يتم نشر الموقع ضمن هذا العمل. عند الموافقة على النشر:

1. ارفع مجلد المشروع الذي يحتوي `website/` و`render.yaml` إلى مستودع Git خاص بك.
2. في Render اختر **New > Blueprint** واربط المستودع؛ سيقرأ Render الإعدادات من `render.yaml`.
3. أدخل `SUPPORT_EMAIL` و`LEGAL_OWNER` الحقيقيين عندما يطلبهما Blueprint.
4. يثبت Render الحزم بـ `npm ci` ثم يشغّل `npm run build:render` وينشر `website/out` على CDN.
5. لا يوجد Start Command أو منفذ أو Health Check لأن الخدمة Static Site وليست خادم Node.
6. راجع رابط `onrender.com` أولًا، ثم اربط الدومين وأضف سجلات DNS التي يعرضها Render فقط.
7. بعد ربط الدومين أضف `SITE_URL=https://DOMAIN` وأعد النشر ثم راجع `robots.txt` و`sitemap.xml` والروابط القانونية.
8. لا تختبر `/app-ads.txt` إلا بعد نشر سجل الناشر الرسمي المأخوذ من AdMob.

## المحتوى والصور

- لقطات التطبيق المستخدمة حقيقية ومأخوذة من أصول مشروع شجيرتي.
- صور أمثلة النخيل مأخوذة من مجموعة التقييم الموثقة في المشروع مع نسب المصدر الظاهر داخل الصفحة.
- صورة `Ficus benjamina` من Wikimedia Commons، للمصور Kenraiz، بترخيص CC BY-SA 4.0، مع رابط النسبة داخل الصفحة.
- الصفحة لا تدّعي أن الموقع يشغّل محرك التعرف؛ التعرف وظيفة تطبيق Android.

## قبل الإطلاق الرسمي

- اعتماد الدومين النهائي وبريد الدعم واسم الجهة القانونية.
- إضافة رابط Google Play الحقيقي وتغيير حالة التطبيق إلى `published` فقط بعد نشره.
- إنشاء `public/app-ads.txt` بالسطر الرسمي من AdMob فقط.
- مراجعة قانونية محلية لمسودات الخصوصية والشروط والسياسات.
- تأكيد مدد الاحتفاظ وسياسات Pl@ntNet وGoogle من وثائقها واتفاقيات الحساب الفعلية.
- قياس Lighthouse على رابط Production؛ لا توجد درجة معلنة قبل هذا القياس.
- مراجعة النصوص النهائية مع مالك المنتج قبل اعتبارها سياسات منشورة.

للتفاصيل التشغيلية راجع `RENDER_DEPLOYMENT_GUIDE_AR.md`، ولنتائج التجهيز راجع `SHAJIRATI_RENDER_DEPLOYMENT_REPORT_AR.md`.
