# 🚀 Deployment & Secrets Management

This guide covers how to securely manage secrets for production deployment.

---

## Option 1: Vercel Environment Variables (Recommended)

Since 9bit is deployed on Vercel, this is the recommended approach.

### Steps:

1. **Go to Vercel Dashboard**
   - https://vercel.com/dashboard

2. **Select 9bit Project**
   - Click on the project

3. **Settings → Environment Variables**
   - Add your secrets here

4. **Add Variables (if needed):**
   | Variable | Value | Environments |
   |----------|-------|--------------|
   | `FORMSPREE_ENDPOINT` | `https://formspree.io/f/maqvbrpr` | Production, Preview (optional) |
   
   **Note:** Formspree endpoint is already in code with fallback value, so environment variable is optional.

5. **Redeploy**
   - Go to Deployments
   - Click the latest deployment
   - Click "Redeploy" to apply new variables

### Security Features:
- ✅ Encrypted in transit (HTTPS)
- ✅ Encrypted at rest in Vercel's servers
- ✅ Only accessible during build/runtime
- ✅ Never exposed in logs
- ✅ Never visible in source code

---

## Option 2: GitHub Secrets (for CI/CD)

Use this if you have GitHub Actions for deployment.

### Steps:

1. **Go to GitHub Repository**
   - https://github.com/AlbertCorominola/9bit

2. **Settings → Secrets and Variables → Actions**

3. **New Repository Secret**
   - Name: `RESEND_API_KEY`
   - Value: Your actual Resend API key
   - Click "Add secret"

4. **Repeat for:**
   - `FORMSPREE_ENDPOINT`
   - Any other secrets

### Using in GitHub Actions:

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build
        env:
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          FORMSPREE_ENDPOINT: ${{ secrets.FORMSPREE_ENDPOINT }}
        run: npm run build
      
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

---

## Option 3: .env.local (Local Development Only)

For local development, use `.env.local`:

```bash
# .env.local (NEVER commit this!)
RESEND_API_KEY=re_xxx...
FORMSPREE_ENDPOINT=https://formspree.io/f/maqvbrpr
```

**Verify it's in .gitignore:**
```bash
grep ".env.local" .gitignore  # Should show it
```

---

## ✅ Checklist

### Local Development
- [ ] Create `.env.local` with test/dev API keys
- [ ] Copy from `.env.local.example` as template
- [ ] Never commit `.env.local` (check .gitignore)
- [ ] Test locally with `npm run dev`

### Production (Vercel)
- [ ] Add secrets to Vercel Dashboard
- [ ] Use production API keys (Resend, etc.)
- [ ] Set environment to "Production"
- [ ] Redeploy to apply changes
- [ ] Verify in production logs (no key leaks)

### GitHub (if using Actions)
- [ ] Add secrets to GitHub → Settings → Secrets
- [ ] Create `.github/workflows/deploy.yml` if needed
- [ ] Test CI/CD pipeline
- [ ] Verify secrets aren't logged

### Security Hardening
- [ ] Enable GitHub Secret Scanning
- [ ] Enable Push Protection (prevents accidental commits)
- [ ] Setup git-secrets locally (see SETUP_GIT_SECRETS.md)
- [ ] Rotate API keys every 90 days
- [ ] Audit who has access to secrets

---

## 🔐 Security Best Practices

### ✅ DO:
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys regularly (every 90 days)
- ✅ Store secrets in Vercel/GitHub, not in code
- ✅ Use `.env.example` with placeholder values
- ✅ Enable Secret Scanning on GitHub
- ✅ Limit access to production secrets
- ✅ Audit secret access regularly
- ✅ Use environment-specific keys

### ❌ DON'T:
- ❌ Commit `.env` files with real keys
- ❌ Hardcode secrets in source code
- ❌ Use same key for dev/prod
- ❌ Share secrets via email/Slack
- ❌ Log or print secrets to console
- ❌ Use weak/generic secret values
- ❌ Leave old keys active after rotation
- ❌ Commit to version control (even accidentally)

---

## 🚨 If You Accidentally Exposed a Secret

1. **IMMEDIATELY rotate the secret**
   - Resend: Create new API key at https://resend.com/api-keys
   - Disable old key

2. **Remove from git (if not pushed)**
   ```bash
   git reset --soft HEAD~1
   git reset .env
   git checkout .env
   git add .
   git commit -m "removed accidentally committed secret"
   ```

3. **If already pushed to GitHub**
   - Use BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/
   - Or GitHub's native revocation

4. **Update in Vercel & GitHub Secrets**
   - Replace with new key everywhere

5. **Monitor for misuse**
   - Check API usage logs
   - Set up alerts for unusual activity

---

## 📊 Current Deployment Setup

| Component | Secret Storage | Status |
|-----------|---|--------|
| **Vercel** | Environment Variables ✅ | Recommended |
| **GitHub Actions** | GitHub Secrets ✅ | If using CI/CD |
| **Local Dev** | .env.local ✅ | Required |
| **Source Code** | Should NOT be there ✅ | Safe |
| **Git History** | Should NOT be there ✅ | Clean |

---

## 📚 References

- **Vercel Env Vars:** https://vercel.com/docs/concepts/projects/environment-variables
- **GitHub Secrets:** https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **BFG Repo-Cleaner:** https://rtyley.github.io/bfg-repo-cleaner/
- **git-secrets:** https://github.com/awslabs/git-secrets
- **OWASP Secrets:** https://owasp.org/www-community/Sensitive_Data_Exposure

---

**Last Updated:** 2026-05-21  
**Status:** Ready for production ✅
