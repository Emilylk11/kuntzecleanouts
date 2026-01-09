/* =========================
   SERVICES PAGE JS (Optional)
   - Anchor offset for sticky header/subnav
   - Active chip highlight on scroll
   ========================= */

(function () {
  // If your main site has a sticky header, add its selector here
  // Example: const header = document.querySelector(".site-header");
  const header = document.querySelector("header"); // safe fallback if you have a header
  const subnav = document.querySelector(".svc-subnav");

  // Compute scroll offset (header + subnav) so anchor targets aren't hidden
  function setScrollOffset() {
    const headerH = header ? header.getBoundingClientRect().height : 0;
    const subnavH = subnav ? subnav.getBoundingClientRect().height : 0;

    // Add a little breathing room (8px)
    const offset = Math.round(headerH + subnavH + 8);
    document.documentElement.style.setProperty("--svc-scroll-offset", offset + "px");
  }

  setScrollOffset();
  window.addEventListener("resize", setScrollOffset);

  // Active chip highlighting
  const chips = Array.from(document.querySelectorAll(".svc-subnav .svc-chip"));
  const sections = Array.from(document.querySelectorAll(".svc-section[id]"));

  if (!chips.length || !sections.length) return;

  const chipById = new Map(
    chips.map((a) => [a.getAttribute("href").replace("#", ""), a])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      // pick the most visible intersecting section
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = visible.target.id;
      chips.forEach((c) => c.classList.remove("is-active"));
      const active = chipById.get(id);
      if (active) active.classList.add("is-active");
    },
    {
      root: null,
      // top offset + a bit so it switches at a nice time
      rootMargin: "-25% 0px -60% 0px",
      threshold: [0.1, 0.2, 0.35, 0.5, 0.65],
    }
  );

  sections.forEach((s) => observer.observe(s));
})();
