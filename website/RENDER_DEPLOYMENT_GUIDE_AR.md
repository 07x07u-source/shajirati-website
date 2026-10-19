# دليل نشر موقع شجيرتي على Render

آخر إعداد واختبار محلي: 19 أكتوبر 2026

هذا الدليل مخصص للموقع الموجود داخل `website/`. لم يُنشر الموقع ولم يُنشأ مستودع GitHub ضمن هذا العمل.

## القرار التقني الصحيح

استخدم **Render Static Site**، لا Node Web Service. إعداد Next.js الحالي يستخدم `output: "export"` ويولد كل الصفحات داخل `website/out/` من دون API Routes أو SSR أو خادم دائم. لذلك لا يوجد Start Command أو `PORT` أو Health Check في خدمة Render.

تؤكد وثائق Render أن Static Site ينشر الواجهة عبر CDN عالمي، وأن `startCommand` غير مدعوم فيه، بينما يكون `staticPublishPath` هو البديل. راجع:

- [Render Static Sites](https://render.com/docs/static-sites)
- [Render Blueprint YAML Reference](https://render.com/docs/blueprint-spec)
- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)

## 1. شكل المستودع المطلوب

اجعل مجلد المشروع الذي يحتوي الملفين التاليين هو جذر المستودع:

```text
shajirati/
├─ render.yaml
└─ website/
   ├─ package.json
   ├─ package-lock.json
   ├─ next.config.ts
   └─ ...
```

لا ترفع `node_modules/` أو `.next/` أو `out/` أو ملفات `.env`. ملف `.gitignore` مجهز لذلك.

## 2. اختبار محلي قبل الرفع

من داخل `website/`:

```bash
npm ci
npm run build:render
npm audit --omit=dev
npm run start
```

ثم افتح `http://127.0.0.1:3000/`. أمر `start` هنا للمعاينة المحلية فقط، وليس أمر تشغيل Render.

## 3. النشر الموصى به عبر Blueprint

1. ارفع المشروع إلى مستودع GitHub خاص تملكه. لا تجعل المستودع عامًا إذا كان ذلك غير مقصود.
2. افتح لوحة Render واختر **New > Blueprint**.
3. اربط مستودع GitHub الذي يحتوي `render.yaml` في جذره.
4. اختر الفرع المطلوب، عادة `main`.
5. سيقرأ Render خدمة باسم `shajirati-official-website` من `render.yaml`.
6. عندما يطلب Render قيم المتغيرات ذات `sync: false`، أدخل القيم الحقيقية فقط:
   - `SUPPORT_EMAIL`: بريد الدعم والخصوصية الرسمي.
   - `LEGAL_OWNER`: اسم المالك أو الجهة القانونية المعتمدة.
7. راجع الملخص ثم ابدأ النشر.
8. انتظر نجاح Build وDeploy، ثم افتح رابط `*.onrender.com` الذي يمنحه Render.

لا تضف قاعدة بيانات أو Redis أو قرصًا دائمًا؛ الموقع لا يحتاجها.

## 4. الإعداد اليدوي البديل

إذا لم تستخدم Blueprint، اختر **New > Static Site**، ثم أدخل:

| الحقل | القيمة |
|---|---|
| Root Directory | `website` |
| Build Command | `npm ci && npm run build:render` |
| Publish Directory | `out` |
| Start Command | لا يوجد |
| Health Check Path | لا يوجد |
| Node Version | `24.21.0` |

أضف متغيرات البيئة التالية:

| المتغير | القيمة أو الاستخدام |
|---|---|
| `NODE_VERSION` | `24.21.0` |
| `SKIP_INSTALL_DEPS` | `true` لمنع تثبيت تلقائي ثانٍ؛ أمر البناء يشغّل `npm ci` بنفسه |
| `NEXT_TELEMETRY_DISABLED` | `1` |
| `APP_STATUS` | `coming-soon` حاليًا |
| `SUPPORT_EMAIL` | القيمة الرسمية، مطلوبة قبل الإطلاق العام |
| `LEGAL_OWNER` | القيمة القانونية المعتمدة، مطلوبة قبل الإطلاق العام |
| `GOOGLE_PLAY_URL` | أضفه فقط بعد وجود رابط تطبيق حقيقي على `play.google.com` |
| `SITE_URL` | اتركه فارغًا أولًا؛ أضف الدومين الرسمي بعد ربطه |

Render يوفر `RENDER_EXTERNAL_URL` تلقائيًا لخدمات الويب والمواقع الثابتة، ويستخدمه الموقع عندما يكون `SITE_URL` فارغًا. راجع [متغيرات Render الافتراضية](https://render.com/docs/environment-variables).

## 5. ما يحدث أثناء Build

ينفذ Render:

```bash
npm ci && npm run build:render
```

ويتضمن `build:render` بالتسلسل:

```bash
npm run lint
npm run typecheck
npm run build
npm run validate
```

أي فشل في ESLint أو TypeScript أو Next production build أو فحص المسارات والـSEO يوقف النشر. لا توجد إعدادات لتجاوز الأخطاء.

## 6. الفحص بعد أول نشر

استبدل `RENDER_URL` بعنوان الخدمة الفعلي وافتح:

```text
https://RENDER_URL/
https://RENDER_URL/trees/
https://RENDER_URL/trees/phoenix-dactylifera/
https://RENDER_URL/privacy/
https://RENDER_URL/terms/
https://RENDER_URL/contact/
https://RENDER_URL/support/
https://RENDER_URL/data-deletion/
https://RENDER_URL/ads-policy/
https://RENDER_URL/robots.txt
https://RENDER_URL/sitemap.xml
https://RENDER_URL/manifest.webmanifest
```

تحقق من الهاتف والكمبيوتر، ومن البحث والتصنيفات وتبويبات دول الخليج، ومن عدم وجود أخطاء Console. يجب أن يعيد `/app-ads.txt` حالة 404 إلى أن تضيف سجل AdMob الرسمي.

## 7. Auto Deploy

عند عدم تحديد `autoDeployTrigger`، يستخدم Render النشر التلقائي عند كل Commit للفرع المرتبط للخدمة الجديدة. لإيقافه:

1. افتح الخدمة في Render.
2. افتح **Settings > Build & Deploy**.
3. غيّر Auto-Deploy إلى Off.

أو أضف إلى الخدمة في `render.yaml`:

```yaml
autoDeployTrigger: off
```

لإعادته مع كل Commit استخدم `commit`. راجع [Blueprint YAML Reference](https://render.com/docs/blueprint-spec).

## 8. ربط الدومين وHTTPS

1. اختبر رابط `onrender.com` أولًا.
2. من الخدمة افتح **Settings > Custom Domains** ثم اختر **Add Custom Domain**.
3. أدخل الدومين الفعلي الذي تملكه.
4. انسخ سجلات DNS التي يعرضها Render حرفيًا إلى مزود الدومين؛ لا تخمّن A أو CNAME.
5. إذا وجدت سجلات `AAAA` متعارضة، اتبع تعليمات Render لإزالتها أثناء التهيئة.
6. ارجع إلى Render واضغط Verify بعد انتشار DNS.
7. يصدر Render شهادة TLS ويحوّل HTTP إلى HTTPS تلقائيًا.
8. اختر النطاق الأساسي المطلوب. Render يربط الجذر و`www` ويحوّل أحدهما إلى الآخر حسب النطاق الذي تضيفه.
9. أضف متغير الإنتاج:

```text
SITE_URL=https://YOUR-OFFICIAL-DOMAIN
```

10. نفذ Manual Deploy جديدًا، ثم تحقق أن Canonical و`robots.txt` و`sitemap.xml` تستخدم الدومين الرسمي.

لا توقف نطاق `onrender.com` إلا بعد استقرار الدومين الرسمي. تفاصيل Render الحالية: [Custom Domains on Render](https://render.com/docs/custom-domains).

## 9. إضافة app-ads.txt لاحقًا

لا تنشئ محتوى من App ID أو Ad Unit ID.

1. افتح حساب AdMob الخاص بالمالك.
2. انسخ سجل التفويض الرسمي الكامل.
3. أنشئ `website/public/app-ads.txt` وضع السجل الرسمي فقط.
4. شغّل `npm run build:render` محليًا.
5. ارفع التغيير ودعه يُنشر.
6. تحقق أن `https://YOUR-DOMAIN/app-ads.txt` يعرض `text/plain` والسجل نفسه.
7. استخدم الدومين نفسه في Google Play Console وAdMob، ثم اطلب إعادة التحقق.

هذا التجهيز لا يضمن قبول AdMob؛ القرار يعود إلى Google وحالة الحساب والتطبيق. راجع `APP_ADS_SETUP_AR.md`.

## 10. القيم التي لا يجوز اختراعها

لا تطلق الموقع رسميًا قبل توفير:

- بريد دعم وخصوصية حقيقي.
- اسم الجهة المالكة أو الشخص القانوني المعتمد.
- مراجعة قانونية للنصوص الموسومة بأنها مسودات.
- رابط Google Play الحقيقي إذا كان التطبيق منشورًا.
- سجل `app-ads.txt` الرسمي إذا طُلب من AdMob.
- الدومين النهائي إن كان سيستخدم بدل نطاق Render.

## 11. التراجع عند مشكلة

Deploys على Render ذرّية؛ لا يستبدل الإصدار العامل إلا بعد نجاح البناء. عند مشكلة لاحقة افتح تبويب Deploys واختر إصدارًا ناجحًا سابقًا أو أصلح Commit ثم أعد النشر. لا تستخدم `npm audit fix --force` أو ترقيات رئيسية عشوائية داخل نشر طارئ.
