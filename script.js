const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.documentElement.classList.add("js-enabled");

if (!prefersReducedMotion) {
  const revealTargets = document.querySelectorAll(
    [
      ".section-heading",
      ".hero-copy",
      ".hero-visual",
      ".hero-highlights article",
      ".info-card",
      ".catalog-card",
      ".ribbon-visual",
      ".ribbon-copy",
      ".purpose-card",
      ".values-panel",
      ".partner-logo",
      ".workflow-step",
      ".contact-item",
      ".social-link",
      ".map-card",
      ".footer-layout"
    ].join(", ")
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealTargets.forEach(element => observer.observe(element));

  const hero = document.querySelector(".hero");

  if (hero) {
    const updateSpotlight = event => {
      const rect = hero.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      hero.style.setProperty("--spotlight-x", `${Math.max(0, Math.min(100, x))}%`);
      hero.style.setProperty("--spotlight-y", `${Math.max(0, Math.min(100, y))}%`);
    };

    hero.addEventListener("pointermove", updateSpotlight);

    hero.addEventListener("pointerleave", () => {
      hero.style.removeProperty("--spotlight-x");
      hero.style.removeProperty("--spotlight-y");
    });
  }
}
