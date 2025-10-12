# 🚀 Hostinger Deployment Guide

This guide explains how to deploy the Marketing AI Houston website to Hostinger using GitHub Actions and FTP.

## ✅ Configuration Complete

The project has been configured for Hostinger deployment with the following changes:

### 1. Astro Configuration ([astro.config.mjs](astro.config.mjs))

- **Base path**: Set to `'/'` for root domain deployment
- **Output**: `'static'` (generates static HTML files)
- **Site URL**: `https://marketingaihouston.com`

### 2. GitHub Actions Workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))

The workflow automatically:
- Builds the Astro site on every push to `main` branch
- Deploys the `dist/` folder to Hostinger via FTP
- Uses `dangerous-clean-slate: true` to remove old files before uploading

## 🔐 Required GitHub Secrets

Before the first deployment, you **must** add the following secrets to your GitHub repository:

### How to Add Secrets:

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the following secrets:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `FTP_HOST` | Your Hostinger FTP server hostname | `ftp.marketingaihouston.com` |
| `FTP_USERNAME` | Your FTP username from Hostinger | `u123456789` |
| `FTP_PASSWORD` | Your FTP password | `YourSecurePassword123!` |
| `FTP_PORT` | FTP port (usually 21) | `21` |

### Finding Your FTP Credentials in Hostinger:

1. Log into your Hostinger control panel (hPanel)
2. Go to **Files** → **FTP Accounts**
3. Create a new FTP account or use an existing one
4. Set the **Home Directory** to:
   - `/public_html/` for root domain (`marketingaihouston.com`)
   - `/public_html/subdomain/` for subdomain deployment

## 📦 Deployment Process

### Automatic Deployment

Once secrets are configured, deployment happens automatically:

1. Push changes to the `main` branch
2. GitHub Actions builds the site
3. The `dist/` folder is deployed to Hostinger via FTP
4. Your site updates automatically

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab in GitHub
2. Select **🚀 Deploy Astro Site to Hostinger**
3. Click **Run workflow**
4. Select `main` branch and click **Run workflow**

## 🌐 Deployment Scenarios

### Root Domain Deployment

**Current configuration** (already set up):

- **Domain**: `marketingaihouston.com`
- **FTP Directory**: `/public_html/`
- **Base Path**: `'/'`

### Subdomain Deployment

If deploying to a subdomain (e.g., `test.marketingaihouston.com`):

1. **FTP Directory**: `/public_html/test/`
2. **Base Path**: Keep as `'/'` (subdomain is already mapped)
3. Update `server-dir` in `.github/workflows/deploy.yml` if needed

### Subfolder Deployment

If deploying to a subfolder (e.g., `marketingaihouston.com/test/`):

1. **FTP Directory**: `/public_html/test/`
2. **Base Path**: Change to `'/test/'` in `astro.config.mjs`
3. Rebuild and redeploy

## 🧪 Testing Before Deployment

Always test locally before pushing:

```bash
# Install dependencies
npm install

# Build the site
npm run build

# Preview the production build
npm run preview
```

Visit `http://localhost:4321` to verify everything works.

## 📋 Deployment Checklist

Before your first deployment:

- [ ] Add all 4 GitHub secrets (`FTP_HOST`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_PORT`)
- [ ] Verify FTP credentials work by testing with an FTP client
- [ ] Ensure FTP home directory points to `/public_html/`
- [ ] Confirm domain DNS is pointed to Hostinger
- [ ] Test build locally with `npm run build`
- [ ] Push to `main` branch to trigger deployment

After deployment:

- [ ] Check GitHub Actions for successful deployment
- [ ] Visit your domain to verify the site loads
- [ ] Test navigation and all internal links
- [ ] Verify CSS and assets load correctly
- [ ] Test on mobile devices
- [ ] Check browser console for any errors

## 🔍 Monitoring Deployments

### View Deployment Status

1. Go to **Actions** tab in your GitHub repository
2. Click on the latest workflow run
3. Expand each step to see detailed logs
4. Look for the **Deploy via FTP** step to confirm upload

### Debugging Failed Deployments

If deployment fails:

1. Check the GitHub Actions logs for error messages
2. Verify all secrets are correctly set
3. Test FTP credentials manually using FileZilla or another FTP client
4. Ensure Hostinger account is active and has enough disk space
5. Check that file permissions allow uploads

## 🛠️ Troubleshooting

### CSS Not Loading / 404 Errors

- **Cause**: Incorrect `base` path in `astro.config.mjs`
- **Solution**: Ensure `base: '/'` for root domain or subdomain

### Files Not Updating

- **Cause**: FTP cache or `dangerous-clean-slate` not working
- **Solution**:
  1. Manually delete files via Hostinger File Manager
  2. Redeploy from GitHub Actions
  3. Clear browser cache (Ctrl+Shift+R)

### Assets Missing After Deployment

- **Cause**: Build failed or incomplete upload
- **Solution**:
  1. Check GitHub Actions logs
  2. Verify `dist/` folder contains all files locally
  3. Check Hostinger file manager for uploaded files

### FTP Connection Timeout

- **Cause**: Incorrect FTP host or port
- **Solution**:
  1. Verify `FTP_HOST` and `FTP_PORT` secrets
  2. Try both hostname and IP address
  3. Ensure port 21 is not blocked

## 📚 Additional Resources

- [Astro Static Site Deployment](https://docs.astro.build/en/guides/deploy/)
- [Hostinger FTP Documentation](https://support.hostinger.com/en/articles/1583245-how-to-upload-files-using-ftp)
- [GitHub Actions Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [FTP-Deploy-Action Documentation](https://github.com/SamKirkland/FTP-Deploy-Action)

## 🎯 Next Steps

1. **Add GitHub Secrets** using the instructions above
2. **Push to main branch** to trigger your first deployment
3. **Monitor the deployment** in GitHub Actions
4. **Verify your site** at https://marketingaihouston.com

---

**Note**: This deployment replaces the previous GitHub Pages deployment. The site will now be hosted directly on Hostinger instead of GitHub Pages.
