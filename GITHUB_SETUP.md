# GitHub Setup Guide

Your repository is ready to push to GitHub! Follow these steps:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in the details:
   - **Repository name**: `orbyte` (or your preferred name)
   - **Description**: "AI-powered cloud compliance and sustainability platform"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

## Step 2: Connect and Push

After creating the repo, GitHub will show you commands. Use these:

### Option A: If you haven't set up SSH (use HTTPS)

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/orbyte.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push to GitHub
git push -u origin main
```

### Option B: If you have SSH set up

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin git@github.com:YOUR_USERNAME/orbyte.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Verify

1. Go to your GitHub repository page
2. You should see all your files
3. The README.md will display on the main page

## Troubleshooting

### If you get "remote origin already exists"
```bash
git remote remove origin
# Then add it again with the commands above
```

### If you get authentication errors
- For HTTPS: GitHub will prompt for username and Personal Access Token (not password)
- Create a token: GitHub Settings → Developer settings → Personal access tokens → Generate new token
- For SSH: Make sure your SSH key is added to GitHub

### If you need to change the remote URL
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/orbyte.git
```

## Next Steps After Pushing

1. **Add a repository description** on GitHub
2. **Add topics/tags**: `nextjs`, `compliance`, `sustainability`, `google-cloud`, `ai`
3. **Enable GitHub Actions** (CI will run automatically on pushes)
4. **Add a license** if you want (MIT, Apache 2.0, etc.)
5. **Set up branch protection** if working with a team

## Quick Commands Reference

```bash
# Check remote
git remote -v

# Push changes (after initial push)
git push

# Pull latest changes
git pull

# Check status
git status
```

