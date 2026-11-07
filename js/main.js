/* ==========================================================================
   MAIN — runs on every page. Fills text from SITE_CONTENT, wires photos
   (with graceful placeholders), builds the ambient particle layers,
   handles the music toggle and scroll-reveal animations.
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Replace {her} / {me} tokens with the configured names. */
function fillTokens(text) {
  return String(text)
    .replaceAll("{her}", SITE_CONTENT.names.her)
    .replaceAll("{me}", SITE_CONTENT.names.me);
}

/* Resolve a dot-path like "story.chapters.0.title" against SITE_CONTENT. */
function resolveContent(path) {
  let value = SITE_CONTENT;
  for (const key of String(path).split(".")) {
    if (value == null || !(key in value)) return undefined;
    value = value[key];
  }
  return value;
}

/* ---- content: every [data-text="chapter.key"] slot gets its copy ---- */
function applyContent() {
  document.querySelectorAll("[data-text]").forEach((el) => {
    const value = resolveContent(el.dataset.text);
    if (Array.isArray(value)) el.textContent = fillTokens(value.join("\n"));
    else if (typeof value === "string") el.textContent = fillTokens(value);
  });

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---- photos: real image if present, otherwise a soft placeholder that
        never looks like a broken link ---- */
function placeholderImage(initial, label) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#3a1425"/><stop offset="1" stop-color="#1d0a15"/>
    </linearGradient></defs>
    <rect width="800" height="600" fill="url(#g)"/>
    <text x="400" y="290" font-family="Georgia, serif" font-size="150" fill="#e9b85c" opacity="0.85"
      text-anchor="middle">${initial}</text>
    <text x="400" y="380" font-family="Georgia, serif" font-size="30" fill="#f6ecd9" opacity="0.75"
      text-anchor="middle" font-style="italic">${label}</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function applyPhotos() {
  document.querySelectorAll("[data-photo]").forEach((el) => {
    const key = el.dataset.photo; // "her" | "me" | "us" or empty for placeholder
    const initialEl = el.querySelector(".photo-fallback-initial");
    const labelEl = el.querySelector(".photo-fallback-label");
    const img = el.tagName === "IMG" ? el : el.querySelector("img");

    const showFallback = () => {
      const initial = key === "her" ? SITE_CONTENT.names.her[0] : key === "me" ? SITE_CONTENT.names.me[0] : "❤";
      const label = SITE_CONTENT.story.photoPlaceholderText;
      if (img) {
        img.removeAttribute("src");
        img.style.backgroundImage = `url("${placeholderImage(initial, label)}")`;
        img.style.backgroundSize = "cover";
        img.style.backgroundPosition = "center";
        img.style.opacity = "0"; // hide the broken-image icon entirely
      } else {
        if (initialEl) initialEl.textContent = initial;
        if (labelEl) labelEl.textContent = label;
        el.classList.add("photo-slot--empty");
      }
    };

    if (!key || !SITE_CONTENT.assets.photos[key]) {
      showFallback();
      return;
    }
    if (img) {
      img.addEventListener("error", showFallback, { once: true });
      img.addEventListener(
        "load",
        () => {
          img.classList.add("is-loaded");
          const fallback = el.querySelector(".photo-fallback");
          if (fallback) fallback.remove();
        },
        { once: true }
      );
      img.src = SITE_CONTENT.assets.photos[key];
      if (img.complete && img.naturalWidth > 0) img.classList.add("is-loaded");
      const alt = el.getAttribute("data-photo-alt");
      if (alt) {
        const resolved = resolveContent(alt);
        img.alt = fillTokens(typeof resolved === "string" ? resolved : alt);
      }
      img.loading = "lazy";
      img.decoding = "async";
    }
  });
}

/* ---- the anime centrepiece: GIF stays untouched; a spritesheet would be
        animated frame-by-frame and never shown raw ---- */
function applyAnime() {
  const holder = document.getElementById("anime-holder");
  if (!holder) return;
  const cfg = SITE_CONTENT.assets.anime;
  const frame = document.createElement("div");
  frame.className = "anime-frame";

  if (cfg.type === "sheet" && cfg.frameWidth && cfg.frames > 1) {
    const stage = document.createElement("div");
    stage.className = "anime-sprite";
    stage.style.width = cfg.frameWidth + "px";
    stage.style.aspectRatio = `${cfg.frameWidth} / ${cfg.frameHeight}`;
    stage.style.backgroundImage = `url("${cfg.src}")`;
    stage.style.backgroundRepeat = "no-repeat";
    if (!prefersReducedMotion) {
      stage.style.animation = `sprite-play ${cfg.frames / cfg.fps}s steps(${cfg.frames - 1}) infinite`;
      stage.style.setProperty("--sheet-width", cfg.frameWidth * cfg.frames + "px");
    }
    frame.appendChild(stage);
  } else {
    const img = document.createElement("img");
    img.src = cfg.src;
    img.alt = cfg.alt;
    img.decoding = "async";
    img.addEventListener("error", () => {
      img.style.opacity = "0";
      frame.classList.add("anime-frame--missing");
      const note = document.createElement("p");
      note.className = "anime-missing-note";
      note.append("Our animation is resting — add it at ");
      const code = document.createElement("code");
      code.textContent = "assets/images/our-anime-love.gif";
      note.append(code);
      frame.appendChild(note);
    });
    frame.appendChild(img);
  }
  holder.appendChild(frame);
}

/* ---- ambient layers: DOM particles animated purely with CSS ---- */
const Ambient = (() => {
  const recipes = {
    petals: { n: 9, cls: "petal" },
    blossoms: { n: 10, cls: "blossom" },
    sparks: { n: 16, cls: "spark" },
    stars: { n: 42, cls: "star" },
    hearts: { n: 7, cls: "ambient-heart" },
    bokeh: { n: 12, cls: "bokeh" },
  };

  function build(type, layer) {
    const { n, cls } = recipes[type];
    for (let i = 0; i < n; i++) {
      const el = document.createElement("span");
      el.className = cls;
      el.style.setProperty("--x", (Math.random() * 100).toFixed(2) + "vw");
      el.style.setProperty("--y", (Math.random() * 92).toFixed(2) + "vh"); // star sky positions
      el.style.setProperty("--d", (7 + Math.random() * 9).toFixed(2) + "s"); // fall/drift duration
      el.style.setProperty("--t", (2.5 + Math.random() * 3).toFixed(2) + "s"); // sway duration
      el.style.setProperty("--delay", (-Math.random() * 16).toFixed(2) + "s");
      el.style.setProperty("--s", (0.55 + Math.random() * 0.8).toFixed(2));
      el.style.setProperty("--o", (0.35 + Math.random() * 0.5).toFixed(2));
      layer.appendChild(el);
    }
  }

  function init() {
    if (prefersReducedMotion) return; // stillness is the accessible default
    document.querySelectorAll("[data-ambient]").forEach((zone) => {
      // particles live inside the fixed .ambient layer, not the page body,
      // so nothing can ever poke past the viewport edge (no horizontal drag)
      const layer = zone.querySelector(":scope > .ambient") || zone;
      zone.dataset.ambient.split(" ").forEach((type) => {
        if (recipes[type]) build(type, layer);
      });
    });
  }
  return { init };
})();

/* ---- music: strictly opt-in — nothing plays until she taps the toggle.
        Once it is on, her choice follows her to every page: each new page
        resumes automatically, and if the browser's autoplay gate refuses,
        playback resumes with her very first touch. Turning it off follows
        her the same way. ---- */
const Music = (() => {
  let audio = null;
  let btn = null;
  let trackSrc = "";
  let stopResumeWatch = null;
  const STORE_KEY = "diwali-music";

  function markPlaying() {
    btn.classList.add("is-playing");
    btn.setAttribute("aria-pressed", "true");
    btn.dataset.pending = "";
    sessionStorage.setItem(STORE_KEY, "on");
    if (stopResumeWatch) stopResumeWatch();
  }

  /* wait for her first touch anywhere, then try again quietly */
  function armResumeWatch() {
    const tryResume = (e) => {
      if (btn.contains(e.target)) return; // the toggle speaks for itself
      audio.play().then(markPlaying).catch(() => {});
    };
    document.addEventListener("pointerdown", tryResume, true);
    document.addEventListener("keydown", tryResume, true);
    stopResumeWatch = () => {
      document.removeEventListener("pointerdown", tryResume, true);
      document.removeEventListener("keydown", tryResume, true);
      stopResumeWatch = null;
    };
  }

  function init() {
    btn = document.getElementById("music-toggle");
    if (!btn) return;
    trackSrc = SITE_CONTENT.assets.music.src;
    audio = new Audio();
    audio.loop = true;
    audio.preload = "none";
    audio.volume = 0.55;
    audio.addEventListener("error", () => {
      btn.classList.add("is-unavailable");
      btn.dataset.pending = "";
    });
    btn.setAttribute("aria-label", SITE_CONTENT.assets.music.title);
    btn.addEventListener("click", toggle);

    if (sessionStorage.getItem(STORE_KEY) === "on") {
      audio.src = trackSrc; // she already chose music on an earlier page
      audio
        .play()
        .then(markPlaying)
        .catch(() => {
          btn.dataset.pending = "true"; // label shown; playback waits for a touch
          armResumeWatch();
        });
    }
  }

  function toggle() {
    if (!audio || btn.classList.contains("is-unavailable")) return;
    if (audio.paused) {
      if (!audio.src) audio.src = trackSrc; // first tap: fetch + play (never before)
      audio
        .play()
        .then(markPlaying)
        .catch(() => {
          btn.classList.add("is-unavailable");
          btn.setAttribute("aria-pressed", "false");
        });
    } else {
      audio.pause();
      btn.classList.remove("is-playing");
      btn.setAttribute("aria-pressed", "false");
      btn.dataset.pending = "";
      sessionStorage.setItem(STORE_KEY, "off"); // silence follows her too
    }
  }

  return { init };
})();

/* ---- scroll reveals via IntersectionObserver ---- */
function initReveals() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  targets.forEach((t) => io.observe(t));
}

/* ---- boot ---- */
document.addEventListener("DOMContentLoaded", () => {
  applyContent();
  Navigation.init();
  applyPhotos();
  applyAnime();
  Ambient.init();
  Music.init();
  initReveals();
  if (window.PageFX && typeof PageFX.init === "function") PageFX.init();
  requestAnimationFrame(() => document.body.classList.add("page-ready"));
});
