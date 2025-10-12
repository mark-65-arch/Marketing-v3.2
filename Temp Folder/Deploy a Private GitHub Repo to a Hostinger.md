# **🚀 Astro to Hostinger Deployment Guide (Static Site)**

## **🧱 Part 1: Prepare Your Astro Site for Deployment**

### **✅ 1\. Use Static Output**

In `astro.config.mjs`, set:

js  
output: 'static',

This ensures Astro builds a fully static site in the `dist/` folder — perfect for FTP hosting.

### **✅ 2\. Set the Correct `base` Path**

| Deployment Target | `base` value |
| ----- | ----- |
| **Root domain** (e.g. `marketingaidemo.shop`) | `base: '/'` |
| **Subdomain** (e.g. `test.marketingaidemo.shop`) | `base: '/'` |
| **Subfolder** (e.g. `marketingaidemo.shop/test/`) | `base: '/test/'` |

**Important:** If you're deploying to a subdomain like `test.marketingaidemo.shop`, **do not** use `base: '/test/'` — the subdomain already maps to `/test/`, so adding `/test/` again causes broken paths.

### **✅ 3\. Tailwind Setup**

Make sure your Tailwind entry file (e.g. `src/global.css`) includes:

css  
@tailwind base;  
@tailwind components;  
@tailwind utilities;

And that it’s imported in your layout:

js  
import '../global.css';

### **✅ 4\. Build the Site**

Run:

bash  
npm run build

This generates:

* `dist/index.html`  
* `dist/assets/index.[hash].css` (your bundled Tailwind styles)

## **📦 Part 2: Deploy to Hostinger via GitHub Actions**

### **✅ 1\. FTP Setup**

In Hostinger:

* Create an FTP user that points to:  
  * `/public_html/` for **root domain**  
  * `/public_html/test/` for **subdomain**

### **✅ 2\. GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

yaml  
name: Deploy to Hostinger

on:  
  push:  
    branches:  
      \- main

jobs:  
  ftp-deploy:  
    name: FTP Deploy  
    runs-on: ubuntu-latest  
    steps:  
      \- name: Checkout  
        uses: actions/checkout@v3

      \- name: Build Astro site  
        run: npm ci && npm run build

      \- name: Deploy via FTP  
        uses: SamKirkland/FTP-Deploy-Action@v4  
        with:  
          server: ${{ secrets.FTP\_SERVER }}  
          username: ${{ secrets.FTP\_USERNAME }}  
          password: ${{ secrets.FTP\_PASSWORD }}  
          local-dir: dist  
          server-dir: ./  
          dangerous-clean-slate: true

Set your FTP credentials as GitHub secrets:

* `FTP_SERVER`  
* `FTP_USERNAME`  
* `FTP_PASSWORD`

## **🌐 Part 3: Domain vs Subdomain — Key Differences**

| Feature | Root Domain (`marketingaidemo.shop`) | Subdomain (`test.marketingaidemo.shop`) |
| ----- | ----- | ----- |
| Folder | `/public_html/` | `/public_html/test/` |
| `base` path | `'/'` | `'/'` |
| URL structure | `/assets/index.css` | `/assets/index.css` |
| Use case | Production/live site | Staging, testing, alternate versions |

**Tip:** Subdomains are ideal for testing new layouts, languages, or workflows without affecting your main site.

## **✅ Final Checklist Before Deploy**

* \[x\] `astro.config.mjs` uses correct `base` path  
* \[x\] Tailwind CSS is bundled and imported  
* \[x\] `dist/index.html` references correct CSS file  
* \[x\] GitHub Actions deploys to correct FTP folder  
* \[x\] `dangerous-clean-slate: true` is enabled to avoid stale files  
* \[x\] Subdomain root folder is correctly mapped in Hostinger

Let me know if you want this turned into a reusable spec or README template for your agency. I can also help you set up deploy badges, staging workflows, or multilingual routing. You're building this the right way.

\=======================================================

**DEPLOYING\_TO\_HOSTINGER.md**

\# 🚀 Deploying an Astro Site to Hostinger (Static FTP Deployment)

This guide outlines how to prepare and deploy an Astro site to Hostinger using GitHub Actions and FTP, with special attention to avoiding common pitfalls like broken CSS paths or 404 errors.

\---

\#\# 🧱 1\. Prepare Your Astro Site

\#\#\# ✅ Use Static Output

In your \`astro.config.mjs\`, set:

\`\`\`js  
import { defineConfig } from 'astro/config';  
import tailwind from '@astrojs/tailwind';

export default defineConfig({  
  integrations: \[tailwind()\],  
  output: 'static',  
  build: {  
    assets: 'assets',  
  },  
  trailingSlash: 'never',  
  base: '/', // See section 2 for correct value  
});

## **🌐 2\. Set the Correct `base` Path**

| Deployment Target | `base` value |
| ----- | ----- |
| Root domain (e.g. `example.com`) | `'/'` |
| Subdomain (e.g. `test.example.com`) | `'/'` |
| Subfolder (e.g. `example.com/test/`) | `'/test/'` |

⚠️ If you're deploying to a subdomain like `test.example.com`, **do not** set `base: '/test/'`. The subdomain already maps to `/test/`, so adding `/test/` again will break asset paths.

## **🎨 3\. Tailwind Setup**

Ensure your Tailwind CSS is bundled:

* Create `src/global.css` with:

@tailwind base;

@tailwind components;

@tailwind utilities;

* Import it in your layout or root page:

import '../global.css';

## **🏗️ 4\. Build the Site**

Run:

npm run build

This generates a `dist/` folder with your static site.

## **📦 5\. Deploy via GitHub Actions \+ FTP**

### **✅ FTP Setup**

In Hostinger:

* Create an FTP user with access to:  
  * `/public_html/` for root domain  
  * `/public_html/test/` for subdomain

### **✅ GitHub Secrets**

In your GitHub repo, add these secrets:

* `FTP_SERVER`  
* `FTP_USERNAME`  
* `FTP_PASSWORD`

### **✅ GitHub Actions Workflow**

Create `.github/workflows/deploy.yml`:

name: Deploy to Hostinger

on:

  push:

    branches:

      \- main

jobs:

  ftp-deploy:

    name: FTP Deploy

    runs-on: ubuntu-latest

    steps:

      \- name: Checkout

        uses: actions/checkout@v3

      \- name: Build Astro site

        run: npm ci && npm run build

      \- name: Deploy via FTP

        uses: SamKirkland/FTP-Deploy-Action@v4

        with:

          server: ${{ secrets.FTP\_SERVER }}

          username: ${{ secrets.FTP\_USERNAME }}

          password: ${{ secrets.FTP\_PASSWORD }}

          local-dir: dist

          server-dir: ./

          dangerous-clean-slate: true

`dangerous-clean-slate: true` ensures old files are removed before uploading new ones — this prevents stale CSS or HTML from lingering.

## **🧪 6\. Final Checks**

* ✅ `dist/index.html` references the correct CSS file (e.g. `/assets/index.[hash].css`)  
* ✅ Hostinger’s File Manager shows the correct file in `/public_html/assets/` or `/public_html/test/assets/`  
* ✅ No extra nesting (e.g. no `/test/test/` folders)  
* ✅ Subdomain root is correctly set in Hostinger (e.g. `test.example.com` → `/public_html/test`)  
* ✅ File permissions are `644` (readable by public)

## **🧼 7\. Troubleshooting**

* **404 on CSS file?**  
  * Check `astro.config.mjs` `base` path  
  * Confirm correct file exists in Hostinger  
  * Clear Hostinger cache and hard-refresh browser (Ctrl+Shift+R)  
* **CSS file exists but still 404?**  
  * Check for `.htaccess` rules blocking `/assets/`  
  * Confirm file is not corrupted or empty  
  * Ensure deploy overwrote old `index.html`

## **✅ Summary**

Astro \+ Hostinger works beautifully with static output and FTP — just make sure your `base` path matches your deployment target, and always verify that your `index.html` and CSS hashes are in sync.

Happy deploying\!

\---

\#\# 🤖 Claude Code Prompt

Here’s what to send Claude:

\> Please create a new file in the root of the project called \`DEPLOYING\_TO\_HOSTINGER.md\`.  

\>  

\> It should contain a detailed step-by-step guide for deploying an Astro static site to Hostinger using GitHub Actions and FTP.  

\>  

\> Include:

\> \- How to configure \`astro.config.mjs\` correctly for root domain vs subdomain vs subfolder

\> \- Tailwind CSS setup and import

\> \- GitHub Actions workflow with \`dangerous-clean-slate: true\`

\> \- FTP setup and GitHub secrets

\> \- Final deployment checklist

\> \- Troubleshooting tips for 404 errors and asset path issues

\>  

\> Format it with clear section headings, code blocks, and tables where helpful. Use a friendly, professional tone.  

\>  

\> Once created, commit the file with the message:  

\> \`"docs: add deployment guide for Astro \+ Hostinger"\`

\---

Let me know if you’d like me to help Claude verify the deploy.yml or automate a staging setup next. You’re building a rock-solid foundation here.

