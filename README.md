# To My Favourite Person ❤️ — A Diwali Surprise Website

A personal, cinematic Diwali gift built as a tiny love story in six chapters —
made for **Yashu**, from **Bharath**. Pure HTML + CSS + vanilla JavaScript.
No frameworks, no build step, no backend. Deploys free on GitHub Pages and
opens beautifully in WhatsApp's in-app browser on a phone.

---

## The six chapters

| # | Page | What she experiences |
|---|------|----------------------|
| 1 | `index.html` | A candlelit night sky, glowing diyas and a golden surprise button that opens a message from you |
| 2 | `story.html` | "Our Little Love Story" — a five-chapter timeline that fills with light as she scrolls, with your photos |
| 3 | `anime-love.html` | Your anime GIF framed like a cinematic poster under floating cherry blossoms, with the two captions |
| 4 | `diwali.html` | The full Diwali wish, rangoli corners, a marigold garland, five tap-to-light diyas and the grand diya ritual with golden rain |
| 5 | `letter.html` | A sealed envelope that opens, then the letter writes itself in handwriting with a typewriter effect |
| 6 | `forever.html` | Starry night, moonlight, a glowing heart, your photo — and the final full-screen surprise with floating hearts |

Navigation: on phones an elegant bottom bar with six chapter icons (the active
one glows); on desktop a minimal top menu plus a diamond progress indicator.
Every page also has "previous / continue the story" links at the foot, so the
site reads like a story, not a website.

---

## Folder structure

```
index.html            story.html            anime-love.html
diwali.html           letter.html           forever.html
css/
  style.css           design system (palette, type, all components)
  animations.css      keyframes, ambient particles, reduced-motion support
  responsive.css      breakpoints: 360 / 640 / 900 / 1200 px
js/
  content.js          ★ ALL personal text, names & asset paths live here
  navigation.js       header, mobile chapter bar, progress dots, prev/next
  animations.js       surprise reveal, diya ritual, envelope + typewriter, finale
  main.js             content wiring, photo fallbacks, ambient layers, music
assets/
  images/
    our-anime-love.gif   the anime animation (shown untouched, full quality)
    her-photo.jpg        Yashu
    my-photo.jpg         Bharath
    our-photo.jpg        together
  music/
    background-music.m4a soft santoor-style melody (swap for any MP3 you like)
  icons/
    favicon.svg          little glowing diya
README.md
```

## Make it yours (editing)

Everything personal is in **`js/content.js`** — one file:

- **Names**: `names: { her: "Yashu", me: "Bharath" }`. Any text that contains
  `{her}` or `{me}` automatically uses these names.
- **The letter**: edit `letter.greeting`, `letter.paragraphs` (each string is
  one paragraph), and the two signature lines.
- **Story chapters**: edit `story.chapters[0..4].title` and `.text`.
- **Photos**: chapters take a key from `assets.photos` (`"her"`, `"me"`,
  `"us"`, `"chapter4"`, `"chapter5"`) or `null`, which shows an elegant
  "waiting for its photograph" placeholder. Swap image files in
  `assets/images/` (keep the same file names) or point `assets.photos` at new
  paths.
- **Music**: replace `assets/music/background-music.m4a` with your MP3 and
  update `assets.music.src` (see `assets/music/README.txt`). Music **never
  autoplays** — sound only starts when she taps the note button. Her choice
  then follows her through every page: it resumes automatically on each new
  page (or with her first touch if the browser's autoplay gate refuses),
  and stays off everywhere once she turns it off.

## Run it locally

Just open `index.html` in a browser — it works from the file system. For the
full experience (and to test like GitHub Pages does):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy on GitHub Pages (free)

1. Create a GitHub account if you don't have one, then click **New repository**.
2. Name it anything, e.g. `diwali-for-yashu`. Keep it **Public**. Don't add a
   README (this folder already is one). Click **Create repository**.
3. Upload this whole folder. Easiest way: on the new repo page click
   **"uploading an existing file"**, then drag *all* files and folders from
   here (keep the folder structure: `css/`, `js/`, `assets/`). Or with git:

   ```bash
   git init
   git add .
   git commit -m "A Diwali surprise for Yashu"
   git branch -M main
   git remote add origin https://github.com/<your-username>/diwali-for-yashu.git
   git push -u origin main
   ```

4. Go to **Settings → Pages** (left sidebar).
5. Under **Build and deployment** set **Source: Deploy from a branch**,
   choose branch **`main`** and folder **`/ (root)`**, click **Save**.
6. Wait 1–2 minutes, then your site is live at:

   `https://<your-username>.github.io/diwali-for-yashu/`

7. **Share on WhatsApp**: open that link, tap Share → WhatsApp → send it to
   her. Tip: WhatsApp builds its link preview from the `og:` tags in
   `index.html` — for a perfect preview card, replace the relative
   `og:image` path with the full `https://…/assets/images/our-photo.jpg`
   URL after your first deploy.

(If you'd rather have a clean root URL like `<username>.github.io`, name the
repository exactly `<your-username>.github.io`.)

## Good to know

- **Mobile-first**: built and tested at 320 / 375 / 390 / 430 / 768 / 1024 /
  1440 px. No horizontal scrolling; buttons are thumb-sized (≥ 44 px).
- **Reduced motion**: if her phone has "Reduce Motion" enabled, all ambient
  particles stop, the typewriter prints instantly and the letter still opens.
- **Missing files never break the magic**: if a photo or the GIF is missing,
  a graceful placeholder appears instead of a broken-image icon; if the music
  file is missing, the music button quietly disables itself.
- **Privacy**: it's a fully static site — nothing is tracked, nothing leaves
  the browser.
- **Update later**: edit `js/content.js`, push again, and GitHub Pages
  redeploys automatically in about a minute.

---

Made with all my heart, for my favourite person. Happy Diwali, Yashu. ❤️
