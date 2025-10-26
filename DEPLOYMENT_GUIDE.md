# 🚀 GitHub Pages Deployment Guide

## Prerequisites
- Git installed on your computer
- GitHub account
- Node.js and npm installed

## Step 1: Create GitHub Repository

1. Go to https://github.com and sign in
2. Click "+" → "New repository"
3. Repository name: `quotation` (or your preferred name)
4. Make it **Public**
5. Do NOT initialize with README
6. Click "Create repository"

## Step 2: Update vite.config.js (if needed)

If your repository name is NOT "quotation", update line 7 in `vite.config.js`:

```javascript
base: '/your-repo-name/',
```

For example, if repo is "marble-app":
```javascript
base: '/marble-app/',
```

## Step 3: Initialize Git and Push to GitHub

Open terminal/command prompt in the project folder and run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make first commit
git commit -m "Initial commit: Marble Murti Quotation Generator"

# Add your GitHub repository as remote (replace USERNAME and REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Important:** Replace `USERNAME` with your GitHub username and `REPO_NAME` with your repository name.

## Step 4: Deploy to GitHub Pages

After pushing to GitHub, run:

```bash
npm run deploy
```

This will:
- Build your project
- Create a `gh-pages` branch
- Deploy to GitHub Pages

## Step 5: Enable GitHub Pages (if not automatic)

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section (left sidebar)
4. Under "Source", ensure it's set to "Deploy from a branch"
5. Under "Branch", select `gh-pages` and `/root`
6. Click "Save"

## Step 6: Access Your Live App

After 1-2 minutes, your app will be live at:

```
https://USERNAME.github.io/REPO_NAME/
```

For example:
```
https://kuvajpay.github.io/quotation/
```

## 🔄 Updating Your App

Whenever you make changes:

```bash
# Save your changes
git add .
git commit -m "Description of changes"
git push

# Deploy new version
npm run deploy
```

## 🎉 You're Done!

Your Marble Murti Quotation Generator is now live and accessible from anywhere!

## Troubleshooting

### Blank page after deployment
- Check that `base` in `vite.config.js` matches your repo name
- Ensure it starts and ends with `/`

### 404 errors
- Wait 2-3 minutes after deployment
- Clear browser cache
- Check GitHub Pages settings

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check for any linter errors

## 📱 Share Your App

Once deployed, you can:
- Share the URL with anyone
- Access from mobile/tablet/desktop
- Bookmark it for quick access
- Works offline after first load

