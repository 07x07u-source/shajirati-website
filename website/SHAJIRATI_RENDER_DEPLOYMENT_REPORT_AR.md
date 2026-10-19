# تقرير تجهيز شجيرتي للنشر على Render

تاريخ التقرير: 19 أكتوبر 2026

## 1. النتيجة التنفيذية

الموقع **جاهز تقنيًا للنشر كـ Render Static Site**. نجح تثبيت التبعيات من ملف القفل، وفحوص ESLint وTypeScript، وبناء Next.js الإنتاجي، والتحقق الآلي من المسارات والروابط الداخلية وبيانات SEO، ثم اختبار نسخة الإنتاج محليًا على سطح المكتب والجوال.

لم يُنشر الموقع إلى Render، ولم يُنشأ أو يُرفع مستودع GitHub، ولم تُعدّل ملفات Flutter أو Supabase.

الإطلاق العام النهائي ما زال يحتاج بيانات بشرية لا يجوز اختراعها: بريد الدعم، اسم الجهة القانونية، مراجعة قانونية، الدومين النهائي عند توفره، وسجل `app-ads.txt` الرسمي من AdMob.

## 2. نتيجة فحص البنية

| العنصر | النتيجة |
|---|---|
| مسار الموقع | `outputs/shajirati/website` |
| `package.json` | `website/package.json` |
| الإطار | Next.js `16.4.1`، App Router |
| React | `19.1.1` |
| TypeScript | `5.9.x` |
| مدير الحزم | npm مع `package-lock.json` إصدار 3 |
| Node المحلي المستخدم للاختبار | `24.16.0` |
| Node المثبت لـRender | `24.21.0` |
| استراتيجية العرض | Static Export عبر `output: "export"` |
| مجلد الناتج | `website/out` |
| الصفحات الديناميكية | `/trees/[slug]` مولدة مسبقًا بواسطة `generateStaticParams()` |
| Server Components | موجودة وتعمل وقت البناء فقط |
| Client Components | أربعة مكونات تفاعلية محدودة: الرأس، البحث، مستكشف الخليج، ومنسق الحركة |
| API Routes / Route Handlers | غير موجودة |
| SSR أو خادم دائم | غير مطلوب |
| قاعدة بيانات/Redis | غير مطلوبة للموقع |

يدعم Next.js تشغيل Server Components وقت البناء ضمن Static Export ويولد مجلد `out`. المرجع: [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports).

## 3. قرار Render

اختير `Render Static Site` للأسباب التالية:

- كل المحتوى قابل للتوليد في البناء.
- لا توجد API Routes أو مصادقة أو طلبات خادم وقت التشغيل.
- لا توجد حاجة إلى عملية Node مستمرة أو `PORT` أو Health Check.
- Render يقدم CDN عالميًا وHTTPS وBrotli وHTTP/2 ونشرًا ذريًا للمواقع الثابتة. المرجع: [Render Static Sites](https://render.com/docs/static-sites).

استخدام Node Web Service هنا سيضيف استهلاكًا وتعقيدًا بلا وظيفة، بينما تؤكد مواصفة Render أن `startCommand` غير مدعوم للموقع الثابت ويستبدل بـ`staticPublishPath`. المرجع: [Blueprint YAML Reference](https://render.com/docs/blueprint-spec).

## 4. المشكلات المكتشفة

1. توثيق المشروع كان موجهًا إلى Vercel، لا Render.
2. متغيرات الموقع كانت بأسماء `NEXT_PUBLIC_*` رغم أنها لا تحتاج التعرض للمتصفح.
3. Canonical وSitemap كانا يعتمدان على قيمة يدوية فقط ولا يستخدمان عنوان Render التلقائي.
4. ملف `app-ads.txt` فارغ بالتعليقات فقط كان سيُنشر كأنه جاهز.
5. صفحات الأشجار لم تكن متسقة بالكامل في Open Graph وTwitter Cards.
6. فاحص البناء لم يتحقق من OG/Twitter ولم يمنع `localhost` في بناء Render.
7. خادم المعاينة المحلي كان يثبت المنفذ 3000 ولم يضبط MIME الخاص بـXML.
8. تذييل الحقوق لم يكن يستخدم اسم الجهة القانونية عند توفره.
9. سياسة ملفات الارتباط أشارت إلى Vercel بدل Render.
10. عنوان الصفحة الرئيسية كان كبيرًا أكثر من اللازم على هاتف بعرض 390px.
11. لم يكن هناك `render.yaml` أو تثبيت صريح لإصدار Node.

## 5. الإصلاحات المنفذة

- إضافة `render.yaml` لخدمة Static Site واحدة فقط.
- ضبط Root Directory على `website`، وأمر البناء على `npm ci && npm run build:render`، ومجلد النشر على `./out`.
- تثبيت Node `24.21.0` في Render و`.node-version` وتحديد نطاق Major 24 في `package.json`.
- إضافة `SKIP_INSTALL_DEPS=true` لمنع تثبيت تبعيات تلقائي ثانٍ، و`NEXT_TELEMETRY_DISABLED=1`.
- إضافة أوامر `check` و`build:render` وعدم تعطيل TypeScript أو ESLint.
- استبدال متغيرات الإعداد العامة بأسماء خادم/بناء غير عامة: `SITE_URL` و`SUPPORT_EMAIL` و`LEGAL_OWNER` و`GOOGLE_PLAY_URL` و`APP_STATUS`.
- استخدام `RENDER_EXTERNAL_URL` تلقائيًا عندما لا يحدد `SITE_URL`.
- التحقق الصارم من صيغة الموقع والبريد ورابط Google Play، مع رفض رابط متجر غير HTTPS أو خارج `play.google.com`.
- منع حالة `published` ما لم يوجد رابط Google Play حقيقي.
- إضافة Open Graph وTwitter Cards العامة وصفحات الأشجار ودليل الأشجار.
- توحيد Canonical المطلقة وبيانات Structured Data.
- تحسين الفاحص الآلي ليشمل OG/Twitter، والروابط الداخلية، وRTL، وملفات SEO، ورفض `localhost` في بناء Render.
- حذف `public/app-ads.txt` غير المعتمد، مع إبقاء المسار غير منشور حتى توفر السجل الرسمي.
- تحديث سياسة الإعلانات ودليل AdMob بما يطابق الواقع.
- إضافة رؤوس أمان وأداء في Render: CSP، منع MIME sniffing، منع framing، Referrer Policy، Permissions Policy، COOP، HSTS، وكاش immutable لأصول Next المرقمة.
- تحديث `.gitignore` لحماية ملفات البيئة ومخرجات البناء والسجلات.
- جعل خادم المعاينة المحلي يحترم `HOST` و`PORT` وتصحيح `application/xml`.
- تصحيح حجم عنوان الصفحة الرئيسية على الجوال من دون تغيير الهوية أو الهيكل.

## 6. إعداد render.yaml

المسار: `outputs/shajirati/render.yaml`

```yaml
type: web
runtime: static
rootDir: website
buildCommand: npm ci && npm run build:render
staticPublishPath: ./out
```

لا يوجد `startCommand` أو `healthCheckPath` لأن هذه الحقول خاصة بعملية خادم، بينما الخدمة Static Site. تم تحليل YAML محليًا والتحقق من وجود خدمة واحدة ومن الحقول الأساسية وعدم وجود حقول تشغيل خادم. لم يُشغّل Render CLI لأنه غير مثبت، ولم يُجر اختبار Blueprint على حساب Render لأن النشر غير مصرح به.

## 7. أوامر البناء والتشغيل

أمر Render:

```bash
npm ci && npm run build:render
```

أمر المعاينة المحلية فقط:

```bash
npm run start
```

يدعم خادم المعاينة المحلي `HOST` و`PORT`، لكنه لا يدخل في تشغيل Render. لا يوجد أمر Start للإنتاج على Render Static Site.

## 8. متغيرات البيئة

| المتغير | الحالة | الغرض |
|---|---|---|
| `NODE_VERSION` | مضبوط: `24.21.0` | تثبيت إصدار البناء |
| `SKIP_INSTALL_DEPS` | مضبوط: `true` | منع تكرار التثبيت التلقائي |
| `NEXT_TELEMETRY_DISABLED` | مضبوط: `1` | تعطيل Telemetry أثناء البناء |
| `APP_STATUS` | مضبوط: `coming-soon` | عدم الادعاء بوجود رابط متجر |
| `SUPPORT_EMAIL` | مطلوب قبل الإطلاق | بريد الدعم والخصوصية الحقيقي |
| `LEGAL_OWNER` | مطلوب قبل الإطلاق | الاسم القانوني المعتمد |
| `SITE_URL` | اختياري أولًا، مطلوب للدومين المخصص | أصل الموقع الرسمي بلا مسار |
| `GOOGLE_PLAY_URL` | اختياري حتى النشر | رابط التطبيق الحقيقي على Google Play |

لا توجد مفاتيح Supabase أو API أسرار في الموقع أو `render.yaml`. قيم `SUPPORT_EMAIL` و`LEGAL_OWNER` مضبوطة `sync: false` ليطلبها Render عند إنشاء Blueprint بدل تخزينها في الملف.

Render يوفر `RENDER_EXTERNAL_URL` للموقع الثابت؛ يستخدمه البناء تلقائيًا قبل ربط الدومين. المرجع: [Render Environment Variables](https://render.com/docs/environment-variables).

## 9. SEO

- Title وMeta Description لكل الصفحات.
- Canonical مطلقة مبنية على عنوان البيئة.
- Open Graph وTwitter Cards.
- `robots.txt` و`sitemap.xml` مولدان آليًا.
- Sitemap تحتوي 17 مسارًا عامًا و12 صفحة شجرة منشورة، ولا تحتوي 404.
- Structured Data لنوع `WebSite` و`SoftwareApplication` وصفحات الأشجار.
- Favicon وWeb Manifest موجودان.
- صفحة 404 مولدة.
- كل الروابط الداخلية تم فحصها آليًا.
- فحص الإنتاج يرفض `localhost` عندما تكون البيئة Render أو `REQUIRE_PRODUCTION_URL=1`.

بناء QA مؤقت استخدم النطاق المحجوز `.invalid` للتحقق فقط من عدم تسرب `localhost`، ولم يُحفظ هذا النطاق في ملفات الإعداد ولم يُنشر. البناء المحلي النهائي يعود إلى `localhost` طبيعيًا؛ بناء Render الفعلي سيستخدم `RENDER_EXTERNAL_URL`، ثم يستخدم `SITE_URL` بعد ربط الدومين الرسمي.

## 10. الصفحات القانونية وGoogle Play/AdMob

تم التأكد من وجود ووصول:

- `/privacy/`
- `/terms/`
- `/contact/`
- `/support/`
- `/data-deletion/`
- `/ads-policy/`
- `/acceptable-use/`
- `/cookies/`
- `/disclaimer/`

جميعها متاحة دون تسجيل دخول وروابطها موجودة في Footer. لا يوجد نموذج تواصل أو مدخلات خادم، لذلك لا يوجد سطح Spam أو API يحتاج حماية.

النصوص القانونية ما زالت موسومة بوضوح كمسودات. لا يوجد بريد وهمي أو اسم شركة مختلق. يجب إدخال القيم الحقيقية وإجراء مراجعة قانونية قبل الإطلاق العام.

### حالة app-ads.txt

الحالة الحالية الصحيحة: **غير منشور**، ويعيد محليًا 404. لم يُستخدم App ID أو Ad Unit ID بديلًا عن سجل الناشر. عند توفر سجل AdMob الرسمي، يُنشأ `public/app-ads.txt` ويعيد الفاحص رفض الملف إذا كان فارغًا أو يحتوي معرّف تطبيق/وحدة إعلان بدل سجل التفويض.

## 11. الأمان

- لا توجد أسرار في المستودع أو ملفات JavaScript العامة.
- لا توجد API Routes أو نماذج إرسال أو قاعدة بيانات للموقع.
- الروابط الخارجية محدودة إلى مراجع نباتية وحكومية معروفة مثل Kew وWikimedia Commons وiNaturalist ومواقع حكومية خليجية، وتفتح باستخدام `rel="noreferrer"`.
- CSP تسمح بالمصادر الذاتية و`data:` للصور والخطوط، وتمنع objects وiframes والمصادر الخارجية. بقي `unsafe-inline` للـstyle/script لتوافق Next static hydration؛ إزالة ذلك تحتاج Nonce/Hash يُختبر على خدمة فعلية.
- Render يوفر HTTPS وتحويل HTTP وشهادات TLS مُدارة. المرجع: [Custom Domains on Render](https://render.com/docs/custom-domains).
- `npm audit --omit=dev`: صفر ثغرات في تبعيات التشغيل.
- الفحص الشامل يسجل 9 تنبيهات في أدوات البناء فقط: 2 متوسطة و7 عالية عبر Tailwind 3/ESLint glob stack. الإصلاح الآلي المقترح يتطلب ترقيات رئيسية أو خفض `eslint-config-next` إلى إصدار غير متوافق، لذلك لم يُستخدم `--force`. لا تدخل هذه الحزم في ملفات التشغيل المنشورة، ويجب متابعة ترقيتها في مهمة ترقية مستقلة مع اختبار بصري كامل.

## 12. الأداء

| المقياس الخام داخل `out/` | النتيجة |
|---|---:|
| JavaScript | 13 ملفًا، 657,032 بايت |
| CSS | ملف واحد، 73,646 بايت |
| HTML | 32 ملفًا، 1,116,731 بايت |
| WebP | 12 ملفًا، 3,575,506 بايت |
| JPEG | 7 ملفات، 3,548,911 بايت |
| PNG | 6 ملفات، 766,377 بايت |
| خطوط محلية | 4 ملفات، 973,176 بايت |

الصفحات ثابتة، أصول Next المرقمة مخزنة بكاش طويل، الخطوط محلية مع `display: swap`، والصور غير ذات الأولوية Lazy Loaded. صورة البداية `hero-tree.jpg` حجمها نحو 203KB. أكبر أصل هو `ficus-benjamina.jpg` بنحو 1.12MB ويظهر في محتوى غير أولي؛ لم يُعاد ضغطه لتجنب تغيير الجودة البصرية دون مراجعة مقارنة.

لأن Static Export لا يدعم Next default image optimizer، يستخدم المشروع `images.unoptimized: true` كما تتطلب البنية الحالية. Render يعوض على النقل بـCDN وBrotli/HTTP2، لكنه لا يعيد ترميز الصور. قياس Lighthouse النهائي يجب أن يتم على رابط Render الحقيقي بعد النشر، ولا توجد درجة مختلقة في هذا التقرير.

## 13. نتائج الاختبارات

| الاختبار | النتيجة |
|---|---|
| `npm ci` | نجح؛ 387 حزمة من lockfile |
| `npm run lint` | نجح بلا تحذيرات |
| `npm run typecheck` | نجح |
| `npm run build` | نجح؛ 35 صفحة ثابتة/SSG |
| `npm run validate` | نجح؛ 30 مسارًا، 12 صفحة شجرة، 32 HTML |
| `npm audit --omit=dev` | صفر ثغرات |
| بناء محاكاة Render مع URL غير محلي | نجح، ولم يظهر `localhost` |
| الصفحة الرئيسية | 200 |
| دليل الأشجار | 200 |
| صفحة نخيل التمر | 200 |
| الصفحات القانونية/الدعم/التحميل | 200 |
| `robots.txt` | 200 و`text/plain` |
| `sitemap.xml` | 200 و`application/xml` |
| `manifest.webmanifest` | 200 والنوع الصحيح |
| `app-ads.txt` | 404 متوقع حتى السجل الرسمي |
| مسار غير موجود | 404 |
| RTL/Lang | `dir=rtl` و`lang=ar` |
| هاتف 390×844 | لا يوجد Horizontal Overflow، العنوان مصحح، الصور الظاهرة سليمة |
| بحث الأشجار | البحث عن «نخيل التمر» أعاد بطاقة واحدة صحيحة |
| تصنيفات الأشجار | ظهرت وتفاعلت في الجوال |
| تبويب دول الخليج | اختيار «الإمارات» حدّث التبويب والمحتوى |
| Console المتصفح | لا أخطاء أو تحذيرات بعد الاستقرار |
| إعادة تشغيل المعاينة | نجحت وعادت الصفحات 200 |

لم يتم اختبار Render الحقيقي لأن الموقع لم يُنشر، ولم يُدّع ذلك.

## 14. الملفات المعدلة أو المضافة

- `render.yaml` (جديد في جذر المشروع)
- `website/.node-version` (جديد)
- `website/.env.example`
- `website/.gitignore`
- `website/package.json`
- `website/package-lock.json`
- `website/lib/site-config.ts`
- `website/lib/metadata.ts`
- `website/lib/legal-content.ts`
- `website/app/trees/page.tsx`
- `website/app/trees/[slug]/page.tsx`
- `website/app/globals.css`
- `website/components/footer.tsx`
- `website/scripts/validate-site.mjs`
- `website/scripts/static-preview.mjs`
- `website/README_AR.md`
- `website/APP_ADS_SETUP_AR.md`
- `website/public/app-ads.txt` (حُذف لأنه لم يحتوي سجلًا رسميًا)
- `website/RENDER_DEPLOYMENT_GUIDE_AR.md` (جديد)
- `website/SHAJIRATI_RENDER_DEPLOYMENT_REPORT_AR.md` (هذا التقرير)

لم تُعدّل صفحات أو مكونات Flutter، ولم تُعدّل Supabase، ولم يُحذف أي مسار موقع أو قسم تصميمي.

## 15. خطوات النشر المختصرة

1. أدخل بريد الدعم واسم الجهة القانونية الحقيقيين.
2. راجع المسودات القانونية واعتمدها.
3. ارفع جذر `shajirati/` إلى مستودع GitHub خاص.
4. في Render اختر New > Blueprint واربط المستودع.
5. أدخل متغيرات `sync: false` عند الطلب.
6. دع Render ينفذ `npm ci && npm run build:render` وينشر `website/out`.
7. اختبر رابط `onrender.com` بالكامل.
8. اربط الدومين وفق سجلات DNS التي يعرضها Render.
9. أضف `SITE_URL=https://الدومين-الرسمي` وأعد النشر.
10. أضف `app-ads.txt` فقط بعد نسخ السجل الرسمي من AdMob.

التعليمات التفصيلية في `RENDER_DEPLOYMENT_GUIDE_AR.md`.

## 16. العوائق والمتطلبات المتبقية

- لا يوجد بريد دعم رسمي في البيانات الحالية.
- لا يوجد اسم جهة قانونية معتمد.
- السياسات تحتاج اعتمادًا قانونيًا بشريًا.
- لم يُحدد الدومين الرسمي.
- لا يوجد سجل `app-ads.txt` رسمي.
- رابط Google Play غير معتمد؛ تبقى حالة التطبيق `coming-soon`.
- لم يُنفذ Lighthouse على Render الحقيقي.
- لم يتم ربط GitHub أو Render أو DNS؛ كل ذلك يحتاج تنفيذ المالك وموافقته.

هذه العناصر لا تمنع البناء التقني، لكنها تمنع وصف الموقع بأنه مكتمل قانونيًا أو منشور رسميًا.
