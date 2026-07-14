# Citrus_alu × YEHUB — RWBISD E-LAB 2026

Two-site project by Citrus_alu think tank, African Leadership University.

## Projects
| Folder | Site | Description |
|--------|------|-------------|
| `citrus-alu/` | Main website | Mission, problem, solution, team, E-LAB challenges |
| `yehub/` | Product prototype | Full hub platform — auth, dashboard, AI, all pages |

## Quick Start
```bash
# Main website
cd citrus-alu && npm install && npm run dev

# YEHUB prototype  
cd yehub && npm install && npm run dev
```

## Deploy on Vercel
1. Push this repo to GitHub
2. Go to vercel.com → New Project → Import repo
3. **citrus-alu**: set Root Directory = `citrus-alu` → Deploy
4. **yehub**: New Project → same repo → Root Directory = `yehub` → Deploy

## After Deploying — Update Links
- `citrus-alu/src/App.jsx` line 9: `const YEHUB_URL = "https://YOUR-YEHUB-URL.vercel.app"`
- `yehub/src/App.jsx` line 8: `const CITRUS_URL = "https://YOUR-CITRUS-URL.vercel.app"`

## Team Photos (already included in public/assets/)
achol.png | Frank.jpg | Eden.png | ian.png | Elysee.jpg

## Push to GitHub
```bash
cd citrus-project
git init
git add .
git commit -m "Initial commit — Citrus_alu + YEHUB"
git remote add origin https://github.com/YOUR_USERNAME/citrus-project.git
git push -u origin main
```
