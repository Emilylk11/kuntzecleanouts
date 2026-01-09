
// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Text quote builder
const textBtn = document.getElementById("textQuoteBtn");
textBtn?.addEventListener("click", () => {
  const name = document.getElementById("name").value || "";
  const phone = document.getElementById("phone").value || "";
  const address = document.getElementById("address").value || "";
  const service = document.getElementById("service").value || "";
  const time = document.getElementById("time").value || "";
  const details = document.getElementById("details").value || "";

  const msg =
    `Quote request:%0A` +
    `Name: ${encodeURIComponent(name)}%0A` +
    `Phone: ${encodeURIComponent(phone)}%0A` +
    `Address: ${encodeURIComponent(address)}%0A` +
    `Service: ${encodeURIComponent(service)}%0A` +
    `Preferred time: ${encodeURIComponent(time)}%0A` +
    `Details: ${encodeURIComponent(details)}`;

  window.location.href = `sms:+15555555555?&body=${msg}`; // replace number
});

// Before/After slider (mouse + touch + keyboard)
document.querySelectorAll("[data-ba]").forEach((root) => {
  const beforeWrap = root.querySelector("[data-ba-before]");
  const handle = root.querySelector("[data-ba-handle]");
  if (!beforeWrap || !handle) return;

  let dragging = false;

  const setPct = (pct) => {
    const clamped = Math.max(0, Math.min(100, pct));
    beforeWrap.style.width = clamped + "%";
    handle.style.left = clamped + "%";
    handle.setAttribute("aria-valuenow", String(Math.round(clamped)));
  };

  // Start at 50/50
  setPct(50);

  const pctFromEvent = (clientX) => {
    const rect = root.getBoundingClientRect();
    const x = clientX - rect.left;
    return (x / rect.width) * 100;
  };

  const onDown = (e) => {
    dragging = true;
    root.classList.add("dragging");
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPct(pctFromEvent(clientX));
    e.preventDefault();
  };

  const onMove = (e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setPct(pctFromEvent(clientX));
    e.preventDefault();
  };

  const onUp = () => {
    dragging = false;
    root.classList.remove("dragging");
  };

  // Pointer events
  handle.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);

  handle.addEventListener("touchstart", onDown, { passive: false });
  window.addEventListener("touchmove", onMove, { passive: false });
  window.addEventListener("touchend", onUp);

  // Click anywhere on slider to jump
  root.addEventListener("click", (e) => {
    const pct = pctFromEvent(e.clientX);
    setPct(pct);
  });

  // Keyboard accessibility
  handle.addEventListener("keydown", (e) => {
    const current = Number(handle.getAttribute("aria-valuenow") || "50");
    if (e.key === "ArrowLeft") setPct(current - 3);
    if (e.key === "ArrowRight") setPct(current + 3);
  });
});

  (function () {
    const dateInput = document.getElementById("serviceDate");
    if (!dateInput) return;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${yyyy}-${mm}-${dd}`;
  })();

(function () {
  // Desktop dropdown
  const dd = document.getElementById('navServices');
  const ddBtn = dd ? dd.querySelector('.nav-dd-btn') : null;

  function setDropdown(open){
    if(!dd || !ddBtn) return;
    dd.classList.toggle('open', open);
    ddBtn.setAttribute('aria-expanded', String(open));
  }

  if (ddBtn) {
    ddBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = dd.classList.contains('open');
      setDropdown(!isOpen);
    });

    // close if you click outside
    document.addEventListener('click', (e) => {
      if (!dd) return;
      if (!dd.contains(e.target)) setDropdown(false);
    });

    // close after clicking a dropdown link
    dd.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setDropdown(false);
    });
  }

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobileNav');

  function setMobile(open){
    if(!toggle || !mobileNav) return;
    toggle.setAttribute('aria-expanded', String(open));
    mobileNav.hidden = !open;
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      setMobile(open);
      // also close desktop dropdown just in case
      setDropdown(false);
    });

    // close mobile nav on link click
    mobileNav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setMobile(false);
    });

    // close on resize back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 980) setMobile(false);
    });
  }
})();
