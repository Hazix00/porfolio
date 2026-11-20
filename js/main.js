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
    const toggle = document.getElementById("languageToggle");
    if (toggle) toggle.innerHTML = `${lang.toUpperCase()} <span>↗</span>`;
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
