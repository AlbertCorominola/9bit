# 🔐 Setup git-secrets for 9bit Project

Preventing secrets from being committed is critical. `git-secrets` is a tool that prevents you from committing secrets to git.

## 1. Install git-secrets

### Windows (PowerShell as Administrator)
```powershell
# Option A: Using Chocolatey (recommended)
choco install git-secrets

# Option B: Manual installation
# Download from: https://github.com/awslabs/git-secrets/releases
# Extract and add to PATH
```

### macOS
```bash
brew install git-secrets
```

### Linux
```bash
git clone https://github.com/awslabs/git-secrets.git
cd git-secrets
make install
```

**Verify installation:**
```bash
git secrets --version
```

---

## 2. Configure git-secrets for 9bit Project

Navigate to the project:
```bash
cd c:\Users\Albert Corominola\PROJECTES\9bit
```

### Initialize git-secrets
```bash
git secrets --install
```

### Register built-in patterns
```bash
git secrets --register-aws
```

### Add custom patterns for this project

**Resend API Key pattern:**
```bash
git secrets --add 're_[a-zA-Z0-9]{20,}'
```

**Generic secret patterns:**
```bash
git secrets --add 'sk_[a-zA-Z0-9]{20,}'        # Stripe keys
git secrets --add 'ghp_[a-zA-Z0-9]{36}'        # GitHub Personal Access Tokens
git secrets --add 'glpat-[a-zA-Z0-9\-]{20,}'  # GitLab tokens
git secrets --add 'npm_[a-zA-Z0-9]{36}'        # npm tokens
git secrets --add 'FORMSPREE_ENDPOINT=.*https://' # Formspree endpoint (optional)
```

---

## 3. Verify Configuration

Check your git-secrets configuration:
```bash
git secrets --list
```

**Expected output:**
```
AWS Access Key ID:  AKIA[0-9A-Z]{16}
AWS Account ID:     \b[0-9]{12}\b
AWS Secret Access Key: (?i)aws_secret_access_key\s*=\s*[A-Za-z0-9/+=]{40}
re_[a-zA-Z0-9]{20,}
sk_[a-zA-Z0-9]{20,}
... (other patterns)
```

---

## 4. Test it Works

Create a test file with a fake secret:
```bash
# Create a test file
echo "RESEND_API_KEY=re_test1234567890abcdef" > .env.test

# Try to add and commit (should be blocked)
git add .env.test
git commit -m "test"  # This should FAIL with: Secret found in staged commits
```

If blocked ✅ — git-secrets is working!

```bash
# Clean up test
rm .env.test
git reset
```

---

## 5. Configure .gitignore-blacklist (Optional)

For more comprehensive protection, create `.gitignore-blacklist`:

```bash
cat > .gitignore-blacklist << 'EOF'
# Never commit these patterns
re_[a-zA-Z0-9]{20,}
sk_[a-zA-Z0-9]{20,}
npm_[a-zA-Z0-9]{36}
ghp_[a-zA-Z0-9]{36}
EOF

git secrets --add --allow $(grep . .gitignore-blacklist)
```

---

## 6. Global Configuration (Recommended)

To apply git-secrets globally to all your repositories:

```bash
# Install globally
git secrets --install --global

# Register AWS patterns globally
git secrets --register-aws --global

# Add common patterns globally
git secrets --add --global 're_[a-zA-Z0-9]{20,}'
git secrets --add --global 'sk_[a-zA-Z0-9]{20,}'
git secrets --add --global 'npm_[a-zA-Z0-9]{36}'
git secrets --add --global 'ghp_[a-zA-Z0-9]{36}'
```

**Check global config:**
```bash
cat ~/.git-secrets/config
```

---

## 7. Handle False Positives (if needed)

If git-secrets blocks a legitimate line:

```bash
# Temporarily allow a commit with manual inspection
git commit --no-verify -m "message"

# Or add a whitelist pattern
git secrets --add --allowed 'some-pattern-that-is-safe'
```

---

## 8. Pre-commit Hook

git-secrets installs a pre-commit hook automatically. Verify it exists:

```bash
cat .git/hooks/pre-commit | grep "git-secrets"
```

You should see:
```bash
# ... content ...
exec git secrets --pre_commit_hook -- "$@"
```

---

## ✅ Checklist

- [ ] git-secrets installed
- [ ] `git secrets --install` run in 9bit project
- [ ] `git secrets --register-aws` executed
- [ ] Custom patterns added (Resend, Stripe, etc.)
- [ ] Configuration verified with `git secrets --list`
- [ ] Test commit blocked with fake secret ✓
- [ ] Pre-commit hook in place
- [ ] (Optional) Global configuration done

---

## 🚨 If You Accidentally Committed a Secret

```bash
# 1. IMMEDIATELY rotate the secret in your service
# For Resend: Create new API key at https://resend.com/api-keys

# 2. Remove from git history (if it was never pushed)
git reset --soft HEAD~1  # Undo last commit
git reset .env           # Unstage the file
git checkout .env        # Restore clean version

# 3. If already pushed to GitHub:
# Use BFG Repo-Cleaner: https://rtyley.github.io/bfg-repo-cleaner/
# Or GitHub's native secret revocation in Security settings

# 4. After cleanup, regenerate keys
```

---

## 📚 Reference

- **git-secrets GitHub:** https://github.com/awslabs/git-secrets
- **BFG Repo-Cleaner:** https://rtyley.github.io/bfg-repo-cleaner/
- **GitHub Secret Scanning:** https://docs.github.com/en/code-security/secret-scanning

---

**Setup Time:** ~5 minutes  
**Protection:** Prevents future accidental commits of secrets  
**Status:** Recommended ✅
