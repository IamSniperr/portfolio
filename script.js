/* =========================
   SNIPX — INTERACTIONS
   ========================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/* -------------------------
   BOOT PRELOADER
------------------------- */
const preloader = $("#preloader");
const bootProgress = $("#bootProgress");
const bootPercent = $("#bootPercent");
const bootText = $("#bootText");

const bootMessages = [
    [0, "INITIALIZING SYSTEM..."],
    [28, "LOADING PROFILE..."],
    [56, "CONNECTING PROJECT MODULES..."],
    [82, "VERIFYING INTERFACE..."],
    [100, "SYSTEM READY."]
];

let progress = 0;

if (preloader) {
    const boot = setInterval(() => {
        progress = Math.min(100, progress + Math.floor(Math.random() * 10) + 7);

        bootProgress.style.width = `${progress}%`;
        bootPercent.textContent = `${progress}%`;

        const current = [...bootMessages].reverse().find(item => progress >= item[0]);
        if (current) bootText.textContent = current[1];

        if (progress >= 100) {
            clearInterval(boot);
            setTimeout(() => preloader.classList.add("hidden"), 250);
        }
    }, 80);
}

/* -------------------------
   CUSTOM CURSOR
   Uses requestAnimationFrame
   instead of creating timers
   on every mouse event.
------------------------- */
const cursorDot = $(".cursor-dot");
const cursorOutline = $(".cursor-outline");

if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorOutline) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener("mousemove", event => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    const renderCursor = () => {
        outlineX += (mouseX - outlineX) * 0.16;
        outlineY += (mouseY - outlineY) * 0.16;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        requestAnimationFrame(renderCursor);
    };

    renderCursor();

    const cursorTargets = $$("a, button, .project-card, .featured-project");
    cursorTargets.forEach(target => {
        target.addEventListener("mouseenter", () => cursorOutline.classList.add("hover"));
        target.addEventListener("mouseleave", () => cursorOutline.classList.remove("hover"));
    });
}

/* -------------------------
   SCROLL PROGRESS
------------------------- */
const scrollProgress = $(".scroll-progress");

const updateScrollProgress = () => {
    if (!scrollProgress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

/* -------------------------
   MOBILE MENU
------------------------- */
const menuBtn = $("#menuBtn");
const mobileMenu = $("#mobileMenu");

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
        const active = mobileMenu.classList.toggle("active");
        menuBtn.setAttribute("aria-expanded", String(active));
    });

    $$(".mobile-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            menuBtn.setAttribute("aria-expanded", "false");
        });
    });
}

/* -------------------------
   LIVE CLOCK
------------------------- */
const liveClock = $("#liveClock");

const updateClock = () => {
    if (!liveClock) return;

    liveClock.textContent = new Intl.DateTimeFormat(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(new Date());
};

updateClock();
setInterval(updateClock, 1000);

/* -------------------------
   TYPING EFFECT
------------------------- */
const typingElement = $("#typing");
const roles = [
    "FIVEM DEVELOPER",
    "FULL-STACK DEVELOPER",
    "UI / UX DESIGNER",
    "SYSTEM BUILDER"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

const typeEffect = () => {
    if (!typingElement) return;

    const role = roles[roleIndex];

    if (!deleting) {
        charIndex++;
        typingElement.textContent = role.slice(0, charIndex);

        if (charIndex >= role.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        charIndex--;
        typingElement.textContent = role.slice(0, charIndex);

        if (charIndex <= 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(typeEffect, deleting ? 42 : 78);
};

typeEffect();

/* -------------------------
   SCROLL REVEAL
------------------------- */
const revealElements = $$(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index * 35, 180)}ms`;
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => element.classList.add("revealed"));
}

/* -------------------------
   PROJECT MODAL
------------------------- */
const projectModal = $("#projectModal");
const modalOverlay = $("#modalOverlay");
const modalClose = $("#modalClose");
const modalTitle = $("#modalTitle");
const modalCategory = $("#modalCategory");
const modalDescription = $("#modalDescription");
const modalTechList = $("#modalTechList");

const openModal = card => {
    if (!projectModal) return;

    modalTitle.textContent = card.dataset.title || "PROJECT";
    modalCategory.textContent = card.dataset.category || "DEVELOPMENT";
    modalDescription.textContent = card.dataset.description || "Project description unavailable.";

    modalTechList.replaceChildren();

    (card.dataset.tech || "")
        .split(",")
        .map(item => item.trim())
        .filter(Boolean)
        .forEach(tech => {
            const tag = document.createElement("span");
            tag.textContent = tech;
            modalTechList.appendChild(tag);
        });

    projectModal.classList.add("active");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
};

const closeModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove("active");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
};

$$(".project-card, .featured-project").forEach(card => {
    card.addEventListener("click", event => {
        if (event.target.closest("a")) return;
        openModal(card);
    });
});

modalClose?.addEventListener("click", closeModal);
modalOverlay?.addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && projectModal?.classList.contains("active")) {
        closeModal();
    }
});

/* -------------------------
   ACTIVE NAV LINK
------------------------- */
const sections = $$("main section[id]");
const navLinks = $$(".nav-links a");

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === `#${entry.target.id}`
                );
            });
        });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(section => navObserver.observe(section));
}


/* -------------------------
   PREMIUM MOTION
------------------------- */

// Start the hero only after the boot screen has finished.
const startHeroMotion = () => {
    document.documentElement.classList.add("page-ready");
    $$(".hero .reveal").forEach(element => element.classList.add("revealed"));
};

if (preloader) {
    const originalHide = () => {
        preloader.classList.add("hidden");
        setTimeout(startHeroMotion, 180);
    };

    // The boot interval above already controls the loader.
    // This fallback ensures the hero becomes visible if the loader is skipped.
    setTimeout(() => {
        if (!preloader.classList.contains("hidden")) return;
        startHeroMotion();
    }, 2400);
} else {
    startHeroMotion();
}

// Gentle mouse parallax for the hero background and profile card.
if (window.matchMedia("(pointer: fine)").matches) {
    const hero = $(".hero");
    const card = $(".developer-card");
    const glowOne = $(".glow-one");
    const glowTwo = $(".glow-two");

    if (hero && card) {
        let tx = 0, ty = 0, cx = 0, cy = 0;
        let raf = 0;

        hero.addEventListener("mousemove", event => {
            const rect = hero.getBoundingClientRect();
            tx = ((event.clientX - rect.left) / rect.width - .5) * 2;
            ty = ((event.clientY - rect.top) / rect.height - .5) * 2;

            if (!raf) raf = requestAnimationFrame(() => {
                cx += (tx - cx) * .08;
                cy += (ty - cy) * .08;

                card.style.setProperty("--mx", `${cx * 8}px`);
                card.style.setProperty("--my", `${cy * 8}px`);

                if (glowOne) glowOne.style.translate = `${cx * 18}px ${cy * 14}px`;
                if (glowTwo) glowTwo.style.translate = `${cx * -12}px ${cy * -10}px`;

                raf = 0;
            });
        });

        hero.addEventListener("mouseleave", () => {
            card.style.setProperty("--mx", "0px");
            card.style.setProperty("--my", "0px");
        });
    }
}

// Add a subtle 3D tilt to the developer card.
const developerCard = $(".developer-card");

if (developerCard && window.matchMedia("(pointer: fine)").matches) {
    developerCard.addEventListener("mousemove", event => {
        const rect = developerCard.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;

        developerCard.style.transform =
            `translate3d(${x * 8}px, ${y * 8}px, 0) rotateX(${y * -4}deg) rotateY(${x * 5}deg) rotateZ(1.5deg)`;
    });

    developerCard.addEventListener("mouseleave", () => {
        developerCard.style.transform = "";
    });
}

// Give project cards a small pointer-follow glow.
$$(".project-card, .featured-project").forEach(card => {
    card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    });
});

// Smooth anchor navigation with a tiny landing offset.
$$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const id = link.getAttribute("href");
        const target = id && document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        const offset = window.innerWidth <= 980 ? 78 : 92;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top,
            behavior: "smooth"
        });
    });
});
