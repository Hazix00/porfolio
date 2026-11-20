(() => {
  const content = window.PORTFOLIO_CONTENT || {};
  const supported = ["en", "fr"];
  const setLanguage = (lang) => {
    const dict = content[lang] || content.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const value = dict[el.dataset.i18nHtml];
      if (value) el.innerHTML = value;
    });
    [
      ["aria-label", "data-i18n-aria-label"],
      ["alt", "data-i18n-alt"],
      ["title", "data-i18n-title"],
      ["content", "data-i18n-content"],
    ].forEach(([attribute, keyAttribute]) => {
      document.querySelectorAll(`[${keyAttribute}]`).forEach((el) => {
        const value = dict[el.getAttribute(keyAttribute)];
        if (value) el.setAttribute(attribute, value);
      });
    });
    const menuButton = document.getElementById("menuToggle");
    const menuIsOpen = document.getElementById("mobileMenu")?.classList.contains("open");
    if (menuButton) {
      menuButton.setAttribute(
        "aria-label",
        dict[menuIsOpen ? "nav.closeMenu" : "nav.openMenu"],
      );
    }
    document.querySelectorAll("[data-prev]").forEach((el) => {
      el.setAttribute("aria-label", dict["carousel.previous"]);
    });
    document.querySelectorAll("[data-next]").forEach((el) => {
      el.setAttribute("aria-label", dict["carousel.next"]);
    });
    document.querySelectorAll("[data-go-to]").forEach((el) => {
      const index = Number(el.dataset.goTo) + 1;
      el.setAttribute("aria-label", dict[`carousel.show${index}`]);
    });
    document.querySelectorAll("img[alt]").forEach((el) => {
      const source = el.dataset.englishAlt || el.alt;
      el.dataset.englishAlt = source;
      const count = source.match(/image (\d+) of (\d+)/);
      const key = source.startsWith("Keeze ")
        ? "projects.altKeeze"
        : source.startsWith("Lizee ")
          ? "projects.altLizee"
          : source.startsWith("Devis Home ")
            ? "projects.altDevis"
            : source.startsWith("DmpEServices visual")
              ? "projects.altDmpWorkflow"
              : source.startsWith("DmpEServices dynamic")
                ? "projects.altDmpForms"
                : source.startsWith("MetaGIS ")
                  ? "projects.altMetagis"
                  : "projects.altKyc";
      if (dict[key]) {
        const suffix = count
          ? currentLanguage === "fr"
            ? ` — image ${count[1]} sur ${count[2]}`
            : ` — image ${count[1]} of ${count[2]}`
          : "";
        el.alt = `${dict[key]}${suffix}`;
      }
    });
    const toggle = document.getElementById("languageToggle");
    if (toggle) toggle.innerHTML = `${lang.toUpperCase()} <span>↗</span>`;
    updateThemeControl();
    try {
      localStorage.setItem("portfolio-language", lang);
    } catch (_) {}
  };
  const detectLanguage = () => {
    try {
      const saved = localStorage.getItem("portfolio-language");
      if (supported.includes(saved)) return saved;
    } catch (_) {}
    const browser = (
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      "en"
    )
      .slice(0, 2)
      .toLowerCase();
    return supported.includes(browser) ? browser : "en";
  };
  let currentLanguage = detectLanguage();

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("[aria-hidden]");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = (() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      return saved === "light" || saved === "dark" ? saved : null;
    } catch (_) {
      return null;
    }
  })();
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  const updateThemeControl = () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : systemDark.matches;
    const dict = content[currentLanguage] || content.en;
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", dict[dark ? "theme.toLight" : "theme.toDark"]);
      themeToggle.setAttribute("aria-pressed", String(dark));
    }
    if (themeIcon) themeIcon.textContent = dark ? "☀" : "☾";
    if (themeMeta) themeMeta.content = dark ? "#111319" : "#f7f8fc";
  };
  themeToggle?.addEventListener("click", () => {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : systemDark.matches;
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch (_) {}
    updateThemeControl();
  });
  systemDark.addEventListener("change", () => {
    if (!document.documentElement.dataset.theme) updateThemeControl();
  });
  updateThemeControl();
  setLanguage(currentLanguage);
  document.getElementById("languageToggle")?.addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "fr" : "en";
    setLanguage(currentLanguage);
  });
  const menu = document.getElementById("mobileMenu");
  const menuToggle = document.getElementById("menuToggle");
  menuToggle?.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    const dict = content[currentLanguage] || content.en;
    menuToggle.setAttribute("aria-label", dict[open ? "nav.closeMenu" : "nav.openMenu"]);
  });
  menu?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    }),
  );
  const start = new Date(2019, 4, 1);
  const now = new Date();
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) years--;
  const yearsEl = document.getElementById("experienceYears");
  if (yearsEl) yearsEl.textContent = `${years}+`;
  const yearEl = document.getElementById("currentYear");
  if (yearEl) yearEl.textContent = now.getFullYear();

  document.querySelector("[data-copy-email]")?.addEventListener("click", async () => {
    const status = document.querySelector("[data-copy-status]");
    const dict = content[currentLanguage] || content.en;
    try {
      await navigator.clipboard.writeText("taoussi.hamza.dev@gmail.com");
      status.textContent = dict["contact.emailCopied"];
    } catch (_) {
      status.textContent = dict["contact.copyFailed"];
    }
  });

  // Accessible project-image carousels
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const dots = Array.from(carousel.querySelectorAll("[data-go-to]"));
    const current = carousel.querySelector("[data-current]");
    if (slides.length < 2) return;
    let active = 0;
    const show = (index) => {
      active = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const selected = i === active;
        slide.classList.toggle("is-active", selected);
        slide.setAttribute("aria-hidden", String(!selected));
      });
      dots.forEach((dot, i) => {
        const selected = i === active;
        dot.classList.toggle("is-active", selected);
        dot.setAttribute("aria-pressed", String(selected));
      });
      if (current) current.textContent = String(active + 1).padStart(2, "0");
    };

    const onControlBtnClick = (event, next = true) => {
      event.preventDefault();
      event.stopPropagation();
      show(next ? active + 1 : active - 1);
    };
    carousel
      .querySelector("[data-prev]")
      ?.addEventListener("click", (e) => onControlBtnClick(e, false));
    carousel
      .querySelector("[data-next]")
      ?.addEventListener("click", (e) => onControlBtnClick(e));
    dots.forEach((dot) =>
      dot.addEventListener("click", () => show(Number(dot.dataset.goTo))),
    );
  });
})();
