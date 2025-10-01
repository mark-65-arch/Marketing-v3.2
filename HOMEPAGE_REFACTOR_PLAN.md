# HOMEPAGE REFACTOR PLAN
## Convert index.astro to Use MainLayout

**Priority:** 🔴 HIGH - Blocking production launch
**Estimated Time:** 30-45 minutes
**Complexity:** Medium (large file, careful migration needed)

---

## 🎯 OBJECTIVE

Convert `src/pages/index.astro` from standalone HTML to use `MainLayout.astro`, enabling:
- ✅ Full SEO meta tags (title, description, canonical URL)
- ✅ Open Graph tags for social sharing
- ✅ Structured data (LocalBusiness, WebPage schemas)
- ✅ Consistent header/footer with other pages
- ✅ Breadcrumb capability (optional for homepage)
- ✅ Centralized SEO management

---

## 📊 CURRENT STATE ANALYSIS

### What index.astro Currently Has:
- ✅ Custom HTML structure
- ✅ Inline styles with CSS variables
- ✅ Google Fonts loaded
- ✅ Font Awesome loaded
- ✅ Complete homepage content (hero, services, pricing, FAQ, CTA)
- ✅ Custom JavaScript for interactions
- ❌ NO meta description
- ❌ NO structured data
- ❌ NO Open Graph tags
- ❌ NO canonical URL
- ❌ Different header/footer from other pages

### File Size: 1308 lines
### Sections to Preserve:
1. Hero section with gradient text
2. Trust signals (5-star reviews)
3. Services overview
4. Pricing cards (3 tiers)
5. FAQ accordion
6. Final CTA section
7. Custom organic shapes/animations

---

## 🛠️ REFACTORING STRATEGY

### Approach: Incremental Migration (Safest)

**Step-by-step process to minimize risk of breaking design:**

1. Create backup of current index.astro
2. Extract custom styles to new file or keep in page
3. Convert frontmatter to use MainLayout props
4. Wrap content in MainLayout
5. Remove duplicate HTML structure
6. Test build and visual appearance
7. Commit when working

---

## 📝 DETAILED IMPLEMENTATION PLAN

### Phase 1: Preparation (5 minutes)

```bash
# Create backup
cp src/pages/index.astro src/pages/_index.astro.refactor-backup

# Verify backup
ls -lh src/pages/_index.astro.refactor-backup
```

### Phase 2: Extract Frontmatter (10 minutes)

**Current frontmatter:**
```astro
---
import '../styles/global.css';
import GlobalNav from '../components/GlobalNav.astro';
---
```

**New frontmatter:**
```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import type { BreadcrumbItem } from '../utils/seo.ts';

// 🔍 SEO Configuration
const pageTitle = 'Marketing AI Houston — Websites That Get Houston Small Businesses Found';
const pageDescription = 'AI-powered web design & SEO for Houston small businesses. Mobile-first websites that convert, local SEO that works, and growth strategies that deliver results. Launch in weeks, not months.';
const canonicalURL = `${import.meta.env.SITE}${import.meta.env.BASE_URL}`;

// 🍞 Breadcrumbs (optional for homepage)
const breadcrumbs: BreadcrumbItem[] = [];

// Note: index.astro has custom inline styles that need to be preserved
---
```

### Phase 3: Update HTML Structure (15 minutes)

**Current structure:**
```astro
<html>
<head>
  <!-- Custom meta tags, fonts, etc. -->
</head>
<body>
  <GlobalNav />
  <main>
    <!-- All content -->
  </main>
  <Footer />
</body>
</html>
```

**New structure:**
```astro
<MainLayout
  title={pageTitle}
  description={pageDescription}
  canonicalURL={canonicalURL}
  breadcrumbs={breadcrumbs}
  pageType="home"
  currentPath="/"
>
  <!-- All existing content goes here -->
  <!-- Keep custom styles in <style> tag at end -->
</MainLayout>
```

### Phase 4: Handle Custom Styles (5 minutes)

**Options:**

**Option A: Keep inline (Recommended for now)**
```astro
<MainLayout {...props}>
  <!-- Content -->

  <style>
    /* All existing custom CSS from <head> */
  </style>
</MainLayout>
```

**Option B: Extract to separate file**
- Create `src/styles/homepage.css`
- Import in frontmatter
- Less duplication, more maintainable

### Phase 5: Handle Custom Scripts (5 minutes)

Keep existing JavaScript at the end of the page:
```astro
<MainLayout {...props}>
  <!-- Content -->

  <script>
    // All existing JS from index.astro
  </script>

  <style>
    /* Existing styles */
  </style>
</MainLayout>
```

---

## 🎨 PRESERVING DESIGN ELEMENTS

### Critical Elements to NOT Break:

1. **Gradient Text Effect**
   ```css
   .text-gradient {
     background: linear-gradient(135deg, #3b82f6, #14b8a6);
     -webkit-background-clip: text;
     -webkit-text-fill-color: transparent;
   }
   ```
   ✅ Keep in inline styles

2. **Organic Shapes**
   ```css
   .organic-blob { border-radius: 30% 70%... }
   ```
   ✅ Keep in inline styles

3. **Custom Animations**
   ```css
   @keyframes float { ... }
   @keyframes blob { ... }
   ```
   ✅ Keep in inline styles

4. **Font Weight Overrides**
   ```css
   h1, h1 *, h1 span { font-weight: 900 !important; }
   ```
   ✅ Keep in inline styles

---

## ⚠️ POTENTIAL ISSUES & SOLUTIONS

### Issue 1: GlobalNav Already in MainLayout
**Problem:** Index.astro has custom GlobalNav, MainLayout also includes it
**Solution:** MainLayout's GlobalNav will replace index.astro's - verify it looks the same

### Issue 2: Duplicate Google Fonts
**Problem:** Both index.astro and MainLayout load fonts
**Solution:** MainLayout's fonts will load automatically - remove from index

### Issue 3: Duplicate Font Awesome
**Problem:** Both files load Font Awesome
**Solution:** MainLayout's Font Awesome will load automatically - remove from index

### Issue 4: CSS Variable Conflicts
**Problem:** Index.astro defines :root variables that might conflict
**Solution:** Check if BaseLayout has same variables, merge if needed

### Issue 5: Custom JavaScript Might Break
**Problem:** Page-specific JS might not work with new structure
**Solution:** Test thoroughly, keep JS in <script> tag at end of MainLayout content

---

## 🧪 TESTING CHECKLIST

After refactoring, verify:

### Visual Testing
- [ ] Hero section looks identical
- [ ] Gradient text renders correctly
- [ ] Organic shapes animate properly
- [ ] All colors match original
- [ ] Font weights are correct (900 for headings)
- [ ] Pricing cards display properly
- [ ] FAQ accordion works
- [ ] Mobile responsive on all screen sizes

### Functional Testing
- [ ] Navigation works (GlobalNav from MainLayout)
- [ ] All internal links work with BASE_URL
- [ ] Smooth scroll to sections works
- [ ] CTA buttons link correctly
- [ ] Form submissions work (if any)
- [ ] No JavaScript errors in console

### SEO Testing
- [ ] View Page Source - verify meta description exists
- [ ] Check canonical URL is present and correct
- [ ] Verify Open Graph tags present
- [ ] Check Twitter Card tags present
- [ ] Verify structured data with Google Rich Results Test
- [ ] Confirm title tag format is correct

### Build Testing
- [ ] `npm run build` succeeds without errors
- [ ] No TypeScript errors
- [ ] Check dist/index.html has all meta tags
- [ ] Verify no broken CSS or missing styles

---

## 📋 STEP-BY-STEP IMPLEMENTATION

### Step 1: Create Backup
```bash
cp src/pages/index.astro src/pages/_index.astro.refactor-backup
```

### Step 2: Update Frontmatter

**Find line 1-4:**
```astro
---
import '../styles/global.css';
import GlobalNav from '../components/GlobalNav.astro';
---
```

**Replace with:**
```astro
---
import MainLayout from '../layouts/MainLayout.astro';
import type { BreadcrumbItem } from '../utils/seo.ts';

const pageTitle = 'Marketing AI Houston — Websites That Get Houston Small Businesses Found';
const pageDescription = 'AI-powered web design & SEO for Houston small businesses. Mobile-first websites that convert, local SEO that works, and growth strategies that deliver results.';
const canonicalURL = `${import.meta.env.SITE}${import.meta.env.BASE_URL}`;
const breadcrumbs: BreadcrumbItem[] = [];
---
```

### Step 3: Replace HTML Wrapper

**Find (around line 5-6):**
```html
<html lang="en">
<head>
```

**Replace with:**
```astro
<MainLayout
  title={pageTitle}
  description={pageDescription}
  canonicalURL={canonicalURL}
  breadcrumbs={breadcrumbs}
  pageType="home"
  currentPath="/"
>
```

**Find (around line 100):**
```html
</head>
<body>
```

**Delete these lines** (MainLayout provides body)

**Find (around line 102):**
```astro
<GlobalNav currentPath="/" />
```

**Delete this line** (MainLayout includes GlobalNav)

**Find (near end of file):**
```html
</body>
</html>
```

**Replace with:**
```astro
</MainLayout>
```

### Step 4: Move Inline Styles

**Find all CSS between `<style>` tags in `<head>` (lines 20-98 approximately)**

**Cut these lines and paste them BEFORE the closing `</MainLayout>` tag**

Keep the entire `<style>` block including:
- CSS variable definitions (:root)
- Typography rules
- Custom classes (organic-blob, gradient-ocean, etc.)
- Animations (@keyframes)
- All responsive media queries

### Step 5: Keep Footer

**Find near end:**
```astro
<Footer />
```

**Delete this line** (MainLayout includes Footer)

### Step 6: Clean Up Meta Tags

**Delete these lines from what was in `<head>` (they're now in MainLayout):**
- `<meta charset="UTF-8">`
- `<meta name="viewport"...>`
- `<title>` tag
- Google Fonts `<link>` tag
- Font Awesome `<link>` tag

**Keep any homepage-specific assets or scripts**

### Step 7: Build and Test

```bash
# Build
npm run build

# If successful, preview
npm run preview

# Open browser to http://localhost:4321/Marketing-v3.2/
```

---

## 🎯 SUCCESS CRITERIA

### ✅ Refactor is successful when:

1. **Visual Appearance**
   - Homepage looks identical to before
   - No layout shifts or broken designs
   - All animations work

2. **SEO Tags Present**
   - Meta description in HTML source
   - Open Graph tags present
   - Structured data in `<script type="application/ld+json">`
   - Canonical URL correct

3. **Build Succeeds**
   - No TypeScript errors
   - No console warnings
   - Build completes in reasonable time

4. **Navigation Works**
   - Header navigation matches other pages
   - Footer matches other pages
   - All links work correctly

5. **No Regressions**
   - Other pages still work
   - Sitemap still generates
   - Robots.txt still copies

---

## 🚨 ROLLBACK PLAN

If something breaks:

```bash
# Restore from backup
cp src/pages/_index.astro.refactor-backup src/pages/index.astro

# Rebuild
npm run build

# Verify original works
npm run preview
```

---

## 📦 FILES TO MODIFY

- ✏️ `src/pages/index.astro` (major refactor)

---

## 📊 EXPECTED DIFF SUMMARY

```
src/pages/index.astro:
- Lines deleted: ~100 (HTML structure, duplicate headers)
- Lines added: ~15 (frontmatter, MainLayout wrapper)
- Lines moved: ~80 (styles from <head> to end)
- Net change: -5 lines (cleaner, more maintainable)
```

---

## 🔄 AFTER REFACTORING

### Next Steps:
1. Test thoroughly on localhost
2. Commit changes if working
3. Deploy and test on GitHub Pages
4. Verify with Google Rich Results Test
5. Check social sharing previews
6. Update FIXES_COMPLETED.md

### SEO Improvements Gained:
✅ Meta description for search results
✅ Open Graph for social sharing
✅ Structured data for rich snippets
✅ Canonical URL for duplicate content prevention
✅ Consistent schema across all pages
✅ Twitter Card tags
✅ Proper title formatting with brand

---

## 💡 PRO TIPS

1. **Work incrementally** - Make one change, test, commit
2. **Use git** - Commit after each successful change
3. **Test mobile** - Homepage is critical for mobile users
4. **Check analytics** - Ensure tracking still works after change
5. **Monitor performance** - Lighthouse score shouldn't decrease
6. **Get feedback** - Have someone review before launch

---

## 📞 NEED HELP?

If you get stuck:

1. **Check backup exists:** `src/pages/_index.astro.refactor-backup`
2. **Review git diff:** `git diff src/pages/index.astro`
3. **Check build errors:** Look at error messages carefully
4. **Rollback if needed:** Use backup to restore
5. **Test other pages:** Make sure they still work

---

**Status:** 📋 READY TO IMPLEMENT
**Blocker:** None - all prerequisites complete
**Risk Level:** Medium (large file, but clear plan)
**Estimated Time:** 30-45 minutes
**Best Time:** When you have uninterrupted focus

---

*This plan provides a safe, step-by-step approach to refactoring the homepage while preserving all design elements and adding critical SEO functionality.*
