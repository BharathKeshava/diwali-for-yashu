/* ==========================================================================
   PAGE EFFECTS — the interactive rituals.
   Each init function checks for its elements, so this file is safe to load
   on every page. Reduced-motion visitors get instant, calm versions.
   ========================================================================== */

window.PageFX = (() => {
  "use strict";

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* one-shot golden sparkle burst at (x, y) inside a container */
  function sparkleBurst(container, x, y, count = 14) {
    if (reduced()) return;
    for (let i = 0; i < count; i++) {
      const s = document.createElement("span");
      s.className = "fx-spark";
      const angle = Math.random() * Math.PI * 2;
      const dist = 40 + Math.random() * 90;
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
      s.style.setProperty("--dy", (Math.sin(angle) * dist - 40).toFixed(0) + "px");
      s.style.setProperty("--sd", (0.7 + Math.random() * 0.8).toFixed(2) + "s");
      container.appendChild(s);
      s.addEventListener("animationend", () => s.remove());
    }
  }

  /* rising hearts layer for the finale */
  function riseHearts(container, duration = 7000) {
    if (reduced()) return;
    const start = Date.now();
    const spawn = () => {
      if (Date.now() - start > duration) return;
      const h = document.createElement("span");
      h.className = "fx-heart";
      h.style.setProperty("--x", 4 + Math.random() * 92 + "vw");
      h.style.setProperty("--hd", (4.5 + Math.random() * 4).toFixed(2) + "s");
      h.style.setProperty("--hs", (0.7 + Math.random() * 1.1).toFixed(2));
      h.textContent = ["❤", "🩷", "💕", "🤍"][Math.floor(Math.random() * 4)];
      container.appendChild(h);
      h.addEventListener("animationend", () => h.remove());
      setTimeout(spawn, 160 + Math.random() * 220);
    };
    spawn();
  }

  /* ------------------------------------------------------------------
     1 · WELCOME — surprise reveal overlay
     ------------------------------------------------------------------ */
  function initWelcome() {
    const btn = document.getElementById("surprise-btn");
    const overlay = document.getElementById("surprise-overlay");
    if (!btn || !overlay) return;
    const burstZone = overlay.querySelector(".surprise-card");

    btn.addEventListener("click", () => {
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add("is-open"));
      btn.setAttribute("aria-expanded", "true");
      const r = btn.getBoundingClientRect();
      sparkleBurst(document.body, r.left + r.width / 2, r.top, 18);
      const go = overlay.querySelector("[data-goto='story.html']");
      if (go) go.focus({ preventScroll: true });
    });
  }

  /* ------------------------------------------------------------------
     2 · STORY — the thread that fills as she scrolls
     ------------------------------------------------------------------ */
  function initStoryThread() {
    const thread = document.querySelector(".timeline-thread");
    const timeline = document.querySelector(".timeline");
    if (!thread || !timeline || reduced()) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = timeline.getBoundingClientRect();
      const total = rect.height;
      const passed = Math.min(Math.max(window.innerHeight * 0.62 - rect.top, 0), total);
      thread.style.transform = `scaleY(${(passed / total).toFixed(4)})`;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  /* ------------------------------------------------------------------
     3 · ANIME — a gentle glow that follows the pointer (desktop only)
     ------------------------------------------------------------------ */
  function initAnimeStage() {
    const stage = document.querySelector(".anime-stage");
    if (!stage || reduced() || !window.matchMedia("(hover: hover)").matches) return;
    stage.addEventListener("pointermove", (e) => {
      const r = stage.getBoundingClientRect();
      stage.style.setProperty("--mx", ((e.clientX - r.left) / r.width).toFixed(3));
      stage.style.setProperty("--my", ((e.clientY - r.top) / r.height).toFixed(3));
    });
    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--mx", 0.5);
      stage.style.setProperty("--my", 0.5);
    });
  }

  /* ------------------------------------------------------------------
     4 · DIWALI — tap-to-light diyas + the grand ritual
     ------------------------------------------------------------------ */
  function initDiwali() {
    const zone = document.querySelector(".diwali-ritual");
    if (!zone) return;

    /* mini diyas wake one by one under her finger */
    zone.querySelectorAll("button.diya").forEach((diya) => {
      diya.addEventListener("click", (e) => {
        if (diya.classList.contains("diya--lit")) return;
        diya.classList.add("diya--lit");
        const r = diya.getBoundingClientRect();
        sparkleBurst(document.body, r.left + r.width / 2, r.top + 6, 10);
        const hint = zone.querySelector(".diya-hint");
        if (hint) {
          const left = zone.querySelectorAll("button.diya:not(.diya--lit)").length;
          hint.textContent =
            left === 0 ? "Every little flame is awake — just like my heart for you." : `${left} little diya${left === 1 ? "" : "s"} still waiting`;
        }
      });
    });

    /* the grand button: light the large diya, rain gold, speak */
    const bigBtn = document.getElementById("light-diya-btn");
    const grand = document.getElementById("grand-diya");
    const message = document.getElementById("diya-lit-message");
    if (bigBtn && grand) {
      bigBtn.addEventListener("click", () => {
        grand.classList.add("diya--lit");
        bigBtn.disabled = true;
        bigBtn.classList.add("btn--done");
        bigBtn.textContent = "Our diya is glowing 🪔";
        const r = grand.getBoundingClientRect();
        sparkleBurst(document.body, r.left + r.width / 2, r.top, 26);
        if (message) {
          message.hidden = false;
          requestAnimationFrame(() => message.classList.add("is-open"));
        }
        /* slow golden rain across the page */
        if (!reduced()) {
          const layer = document.getElementById("spark-rain");
          if (layer) {
            layer.hidden = false;
            for (let i = 0; i < 26; i++) {
              const s = document.createElement("span");
              s.className = "fx-rain";
              s.style.setProperty("--x", Math.random() * 100 + "vw");
              s.style.setProperty("--rd", (2.4 + Math.random() * 3).toFixed(2) + "s");
              s.style.setProperty("--rdel", (Math.random() * 2.6).toFixed(2) + "s");
              layer.appendChild(s);
              s.addEventListener("animationend", () => s.remove());
            }
          }
        }
        grand.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "center" });
      });
    }
  }

  /* ------------------------------------------------------------------
     5 · LETTER — envelope opens, then the letter writes itself
     ------------------------------------------------------------------ */
  function initLetter() {
    const scene = document.getElementById("letter-scene");
    if (!scene) return;
    const btn = document.getElementById("open-letter-btn");
    const envelope = scene.querySelector(".envelope");
    const paper = document.getElementById("letter-paper");
    const skip = document.getElementById("skip-typing");
    if (!btn || !envelope || !paper) return;

    const greetingEl = paper.querySelector(".letter-greeting");
    const bodyEl = paper.querySelector(".letter-body");
    const signEl = paper.querySelector(".letter-sign");
    const caretEl = paper.querySelector(".type-caret");
    const L = SITE_CONTENT.letter;

    /* Build the full text nodes once; the typewriter reveals them. */
    const pEls = L.paragraphs.map(() => {
      const p = document.createElement("p");
      p.className = "letter-line";
      bodyEl.appendChild(p);
      return p;
    });
    const fullTexts = [
      fillTokens(L.greeting),
      ...L.paragraphs.map(fillTokens),
      fillTokens(L.signatureName),
      fillTokens(L.signature),
    ];

    function showAll() {
      const parts = [fullTexts[0]];
      pEls.forEach((p, i) => (p.textContent = fullTexts[i + 1]));
      greetingEl.textContent = fullTexts[0];
      signEl.hidden = false;
      signEl.querySelector(".letter-sign-name").textContent = fullTexts[fullTexts.length - 1];
      signEl.querySelector(".letter-sign-pre").textContent = fullTexts[fullTexts.length - 2];
      if (caretEl) caretEl.remove();
      paper.classList.add("letter-paper--done");
    }

    function typewrite() {
      if (reduced()) {
        showAll();
        return;
      }
      const queue = [];
      fullTexts.forEach((text, idx) => {
        queue.push({ el: idx === 0 ? greetingEl : idx >= fullTexts.length - 2 ? null : pEls[idx - 1], text, idx });
      });
      let qi = 0;
      let ci = 0;
      let timer = null;
      const step = () => {
        const job = queue[qi];
        if (!job) {
          /* finished the body — reveal the signature block gracefully */
          signEl.hidden = false;
          signEl.querySelector(".letter-sign-pre").textContent = fullTexts[fullTexts.length - 2];
          signEl.querySelector(".letter-sign-name").textContent = fullTexts[fullTexts.length - 1];
          paper.classList.add("letter-paper--done");
          if (caretEl) caretEl.remove();
          return;
        }
        if (job.el) {
          job.el.textContent = job.text.slice(0, ++ci);
          if (caretEl && caretEl.parentElement !== job.el) job.el.appendChild(caretEl);
        }
        if (ci >= job.text.length) {
          qi++;
          ci = 0;
          timer = setTimeout(step, job.idx === 0 ? 500 : 420); // breath between lines
        } else {
          timer = setTimeout(step, 26 + Math.random() * 22);
        }
      };
      timer = setTimeout(step, 600);
      if (skip)
        skip.addEventListener("click", () => {
          clearTimeout(timer);
          showAll();
        });
    }

    btn.addEventListener("click", () => {
      btn.closest(".letter-teaser").classList.add("is-opened");
      envelope.classList.add("is-opening");
      setTimeout(() => {
        envelope.classList.add("is-gone");
        paper.hidden = false;
        requestAnimationFrame(() => paper.classList.add("is-open"));
        typewrite();
        paper.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
      }, reduced() ? 150 : 1250);
    });
  }

  /* ------------------------------------------------------------------
     6 · FOREVER — the last surprise
     ------------------------------------------------------------------ */
  function initForever() {
    const btn = document.getElementById("final-surprise-btn");
    const overlay = document.getElementById("finale-overlay");
    if (!btn || !overlay) return;
    const heartsLayer = overlay.querySelector(".hearts-layer");
    const again = overlay.querySelector("[data-replay]");

    btn.addEventListener("click", () => {
      overlay.hidden = false;
      requestAnimationFrame(() => overlay.classList.add("is-open"));
      riseHearts(heartsLayer);
      const title = overlay.querySelector(".finale-title");
      if (title) title.focus({ preventScroll: true });
    });
    if (again)
      again.addEventListener("click", () => {
        overlay.classList.remove("is-open");
        setTimeout(() => {
          overlay.hidden = true;
        }, 400);
        setTimeout(() => {
          overlay.hidden = false;
          requestAnimationFrame(() => overlay.classList.add("is-open"));
          riseHearts(heartsLayer);
        }, 500);
      });
  }

  function init() {
    initWelcome();
    initStoryThread();
    initAnimeStage();
    initDiwali();
    initLetter();
    initForever();
  }

  return { init, sparkleBurst };
})();
