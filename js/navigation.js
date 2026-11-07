/* ==========================================================================
   NAVIGATION — builds the top header (desktop), the bottom icon bar
   (mobile), the progress dots and the prev/next story links.
   It reads the page list from SITE_CONTENT.nav and the current page
   from <body data-page="...">, so every page shares one source of truth.
   ========================================================================== */

const Navigation = (() => {
  "use strict";

  /* Small inline icon set (stroke-based, inherits currentColor). */
  const icons = {
    welcome:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14.5 5.2 18a2 2 0 0 0 1.9 1.3h9.8a2 2 0 0 0 1.9-1.3L20 14.5Z"/><path d="M8 14.5c-1.2-1-2.5-2.6-2.5-4.4 0-2 1.6-3.4 3.4-3.1-.2-1.8 1.3-3.5 3.1-3.5s3.3 1.7 3.1 3.5c1.8-.3 3.4 1.1 3.4 3.1 0 1.8-1.3 3.4-2.5 4.4"/><path d="M12 3.5v1.6"/></svg>',
    story:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 6.5C10.5 4.8 8.4 4 6 4c-1 0-2 .2-3 .5v13.8c1-.3 2-.5 3-.5 2.4 0 4.5.9 6 2.2 1.5-1.3 3.6-2.2 6-2.2 1 0 2 .2 3 .5V4.5C19 4.2 18 4 17 4c-2.4 0-4.5.8-5 2.5Z"/><path d="M12 6.5V20"/><path d="m12 10 1.8-1.2M12 13l-1.8-1.2"/></svg>',
    anime:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3.2c1.1 2.5 3 4 5.9 4.3-.7 3-2.5 5-5.9 5.9-3.4-.9-5.2-2.9-5.9-5.9 2.9-.3 4.8-1.8 5.9-4.3Z"/><path d="M12 13.4v2.2"/><path d="M8.5 17.5c1 .8 2.2 1.2 3.5 1.2s2.5-.4 3.5-1.2"/><path d="M6.5 20.5c1.6 1 3.5 1.5 5.5 1.5s3.9-.5 5.5-1.5"/></svg>',
    diwali:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15.5h14l-1.2 3.2a2 2 0 0 1-1.9 1.3H8.1a2 2 0 0 1-1.9-1.3Z"/><path d="M12 12.8c-1.1-.9-1.7-2-1.7-3.1 0-1.4 1-2.4 1.7-3.4.7 1 1.7 2 1.7 3.4 0 1.1-.6 2.2-1.7 3.1Z"/><path d="M12 3.5v1.2"/></svg>',
    letter:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="6" width="17" height="12.5" rx="1.5"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
    forever:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20.5C7 16.5 3.5 13.2 3.5 9.6 3.5 7 5.5 5 8 5c1.6 0 3.1.8 4 2.1C12.9 5.8 14.4 5 16 5c2.5 0 4.5 2 4.5 4.6 0 3.6-3.5 6.9-8.5 10.9Z"/><path d="M8.5 9.5c-1.2.3-2 1.3-2 2.6"/></svg>',
  };

  const currentPage = () => document.body.dataset.page || "";
  const pages = () => (SITE_CONTENT && SITE_CONTENT.nav.pages) || [];
  const indexOf = (id) => pages().findIndex((p) => p.id === id);

  /* Escape config-provided text before it meets markup. */
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  function iconFor(id) {
    return icons[id] || icons.welcome;
  }

  /* ---- desktop header: wordmark + inline links + progress dots ---- */
  function renderHeader() {
    const mount = document.getElementById("site-header");
    if (!mount) return;
    const cur = currentPage();
    const { wordmark, pages: list } = SITE_CONTENT.nav;
    const dots = list
      .map((p) => `<span class="dot${p.id === cur ? " dot--active" : ""}" title="${esc(p.label)}"></span>`)
      .join("");
    mount.innerHTML = `
      <div class="site-header__inner">
        <a class="wordmark" href="index.html">${esc(wordmark)}</a>
        <nav class="nav-links" aria-label="Chapters">
          ${list
            .map(
              (p) =>
                `<a href="${p.file}" class="nav-link${p.id === cur ? " nav-link--active" : ""}"${
                  p.id === cur ? ' aria-current="page"' : ""
                }>${esc(p.label)}</a>`
            )
            .join("")}
        </nav>
        <div class="progress-dots" aria-hidden="true">${dots}</div>
      </div>`;
  }

  /* ---- mobile bottom bar: six icon chapters, active one glowing ---- */
  function renderBottomNav() {
    const mount = document.getElementById("bottom-nav");
    if (!mount) return;
    const cur = currentPage();
    const { pages: list } = SITE_CONTENT.nav;
    mount.innerHTML = list
      .map(
        (p, i) => `
        <a href="${p.file}" class="bn-item${p.id === cur ? " bn-item--active" : ""}"${
          p.id === cur ? ' aria-current="page"' : ""
        } aria-label="Chapter ${i + 1}: ${esc(p.label)}">
          ${iconFor(p.id)}
          <span class="bn-label">${esc(p.short)}</span>
        </a>`
      )
      .join("");
  }

  /* ---- prev / next chapter block at the foot of each page ---- */
  function renderStoryNav() {
    const mount = document.getElementById("story-nav");
    if (!mount) return;
    const cur = currentPage();
    const idx = indexOf(cur);
    const list = pages();
    if (idx < 0) return;
    const prev = list[idx - 1];
    const next = list[idx + 1];
    const isFirst = idx === 0;
    const isLast = idx === list.length - 1;
    mount.innerHTML = `
      <div class="story-nav__inner">
        ${
          prev
            ? `<a class="story-nav__link story-nav__prev" href="${prev.file}">
                 <span class="story-nav__dir">Previous chapter</span>
                 <span class="story-nav__title">← ${esc(prev.label)}</span>
               </a>`
            : `<span class="story-nav__link story-nav__prev story-nav__link--muted">
                 <span class="story-nav__dir">The beginning</span>
                 <span class="story-nav__title">Once upon a Diwali…</span>
               </span>`
        }
        ${
          next
            ? `<a class="story-nav__link story-nav__next" href="${next.file}">
                 <span class="story-nav__dir">${isLast ? "The end — for now" : "Continue the story"}</span>
                 <span class="story-nav__title">${esc(next.label)} →</span>
               </a>`
            : `<button type="button" class="story-nav__link story-nav__next" id="relive-btn">
                 <span class="story-nav__dir">The end… or the beginning?</span>
                 <span class="story-nav__title">Relive it from the start ✨</span>
               </button>`
        }
      </div>`;
    const relive = document.getElementById("relive-btn");
    if (relive)
      relive.addEventListener("click", () => {
        document.body.classList.add("page-leaving");
        setTimeout(() => (window.location.href = "index.html"), 450);
      });
  }

  /* ---- soft fade transition between pages (fallback where the
         CSS view-transition API is unavailable) ---- */
  function bindTransitions() {
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href$=".html"]');
      if (!a) return;
      if (a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      document.body.classList.add("page-leaving");
      setTimeout(() => (window.location.href = a.href), 420);
    });
  }

  function init() {
    renderHeader();
    renderBottomNav();
    renderStoryNav();
    bindTransitions();
  }

  return { init, iconFor };
})();
