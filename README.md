# Metron | ميترون للاستشارات المهنية

موقع إلكتروني احترافي لشركة استشارية — تصميم مستوى Big 4 مع دعم كامل للعربية والإنجليزية (RTL/LTR).

## التشغيل

```bash
npm install
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

## هيكل المشروع

```
/branding          # الهوية البصرية (ألوان، خطوط، شعار، أيقونات)
/theme             # إعدادات الثيم ومتغيرات Tailwind
/public/assets     # ملفات ثابتة (PDF، صور، شعارات عملاء)
/src
  /components      # مكونات UI والأقسام
  /data            # بيانات الفريق، الخدمات، العملاء (جاهزة لـ CMS)
  /i18n            # الترجمات
  /content         # دليل تكامل CMS
```

## تخصيص الهوية

| ما تريد تغييره | الملف |
|-----------------|-------|
| الألوان | `branding/colors.ts` |
| الخطوط | `branding/typography.ts` |
| الشعار | `branding/logo.ts` + `public/branding/` |
| بروفايل الشركة PDF | استبدل `public/assets/company-profile.pdf` أو غيّر المسار في `theme/theme.config.ts` |
| البريد والعنوان | `theme/theme.config.ts` → `contact` |

## إدارة المحتوى

- **الفريق:** عدّل `src/data/team.ts` — أضف أعضاء دون تغيير التصميم
- **الخدمات:** `src/data/services.ts`
- **العملاء:** `src/data/clients.ts` + شعارات في `public/assets/clients/`
- **النصوص:** `src/i18n/translations.ts`

## التقنيات

- Next.js 15 (App Router)
- React 19
- Tailwind CSS
- Framer Motion
- Lucide Icons

## البناء للإنتاج

```bash
npm run build
npm start
```

## CMS مستقبلاً

راجع `src/content/cms-ready.ts` لهيكل المجموعات المقترح.
