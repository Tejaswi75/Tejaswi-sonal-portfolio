# Tejaswi Sonal — Portfolio (Static Site)

This is a **fully ready-to-deploy** portfolio website built from your resume.
It includes:
- Dark/Light theme toggle (saved in browser)
- Accent color picker (saved in browser)
- Responsive layout + animations
- Project details modal
- Copy-to-clipboard for email
- Resume PDF included (`Tejaswi_Sonal_Resume.pdf`)
- PWA manifest + simple offline cache (service worker)

## Quick start (local)
Just open `index.html` in a browser.

## Deploy on GitHub Pages
1. Create a GitHub repo (example: `tejaswi-portfolio`)
2. Upload all files from this folder to the repo root
3. Go to **Settings → Pages**
4. Source: **Deploy from a branch**
5. Branch: `main` / folder: `/ (root)`
6. Save → your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

## Deploy on Netlify / Vercel
- Netlify: drag-and-drop the folder in Netlify dashboard
- Vercel: import the GitHub repo (Framework preset: “Other”)

## Add your project links
Edit: `assets/config.js`
Add:
- `live: "https://..."` for demo link
- `repo: "https://..."` for GitHub link

## Custom domain + OG URL
Update the `<meta property="og:url" ...>` and JSON-LD `"url"` in `index.html` after you know your domain.

---

Made with HTML/CSS/JS only (no build tools required).
