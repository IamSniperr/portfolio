/* =========================
BOOT PRELOADER
========================= */

const preloader = document.getElementById("preloader");
const bootProgress = document.getElementById("bootProgress");
const bootPercent = document.getElementById("bootPercent");
const bootText = document.getElementById("bootText");

let progress = 0;

const bootMessages = [
    "INITIALIZING SYSTEM...",
    "LOADING DEVELOPER PROFILE...",
    "CONNECTING MODULES...",
    "LOADING PROJECT DATA...",
    "SYSTEM READY."
];


const bootInterval = setInterval(() => {

    progress += Math.floor(Math.random() * 8) + 3;

    if (progress > 100) {
        progress = 100;
    }

    bootProgress.style.width = progress + "%";
    bootPercent.textContent = progress + "%";


    if (progress < 25) {

        bootText.textContent = bootMessages[0];

    } else if (progress < 50) {

        bootText.textContent = bootMessages[1];

    } else if (progress < 75) {

        bootText.textContent = bootMessages[2];

    } else if (progress < 100) {

        bootText.textContent = bootMessages[3];

    } else {

        bootText.textContent = bootMessages[4];

        clearInterval(bootInterval);


        setTimeout(() => {

            preloader.classList.add("hidden");

        }, 600);

    }

}, 120);


/* =========================
CUSTOM CURSOR
========================= */

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");


window.addEventListener("mousemove", (e) => {

    cursorDot.style.left = e.clientX + "px";
    cursorDot.style.top = e.clientY + "px";


    setTimeout(() => {

        cursorOutline.style.left = e.clientX + "px";
        cursorOutline.style.top = e.clientY + "px";

    }, 70);

});


const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-card"
);


hoverElements.forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursorOutline.classList.add("hover");

    });


    element.addEventListener("mouseleave", () => {

        cursorOutline.classList.remove("hover");

    });

});


/* =========================
SCROLL PROGRESS
========================= */

const scrollProgress = document.querySelector(".scroll-progress");


window.addEventListener("scroll", () => {

    const scrollTop =
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrollPercent =
        (scrollTop / scrollHeight) * 100;

    scrollProgress.style.width =
        scrollPercent + "%";

});


/* =========================
MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");


if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });

}


document
    .querySelectorAll(".mobile-menu a")
    .forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });


/* =========================
LIVE CLOCK
========================= */

const liveClock =
    document.getElementById("liveClock");


function updateClock() {

    if (!liveClock) return;

    const now = new Date();

    const hours =
        String(now.getHours()).padStart(2, "0");

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");


    liveClock.textContent =
        `${hours}:${minutes}:${seconds}`;

}


updateClock();

setInterval(updateClock, 1000);


/* =========================
TYPING EFFECT
========================= */

const typingElement =
    document.getElementById("typing");


const roles = [
    "FIVEM DEVELOPER",
    "UI / UX DESIGNER",
    "WEB DEVELOPER",
    "CREATIVE DESIGNER"
];


let roleIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    if (!typingElement) return;


    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;

        }

    } else {

        typingElement.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    const speed =
        deleting ? 45 : 90;


    setTimeout(
        typeEffect,
        speed
    );

}


typeEffect();


/* =========================
SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".skill-card, .project-card, .mini-card, .service-item, .terminal-window"
    );


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity =
                        "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: 0.1
        }

    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(30px)";

    element.style.transition =
        "0.6s ease";

    revealObserver.observe(element);

});


/* =========================
SKILL PROGRESS ANIMATION
========================= */

const progressBars =
    document.querySelectorAll(
        ".skill-progress"
    );


const progressObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const progress =
                        entry.target.dataset.progress;

                    entry.target.style.width =
                        progress + "%";


                    progressObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.5
        }

    );


progressBars.forEach(bar => {

    progressObserver.observe(bar);

});


/* =========================
PROJECT MODAL
========================= */

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


const projectModal =
    document.getElementById(
        "projectModal"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalCategory =
    document.getElementById(
        "modalCategory"
    );


const modalDescription =
    document.getElementById(
        "modalDescription"
    );


const modalTechList =
    document.getElementById(
        "modalTechList"
    );


projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const title =
            card.dataset.title ||
            "PROJECT";


        const category =
            card.dataset.category ||
            "DEVELOPMENT";


        const description =
            card.dataset.description ||
            "No project description available.";


        const tech =
            card.dataset.tech ||
            "";


        modalTitle.textContent =
            title;


        modalCategory.textContent =
            category;


        modalDescription.textContent =
            description;


        modalTechList.innerHTML =
            "";


        const technologies =
            tech.split(",");


        technologies.forEach(item => {

            if (item.trim() !== "") {

                const techItem =
                    document.createElement(
                        "span"
                    );

                techItem.textContent =
                    item.trim();


                modalTechList.appendChild(
                    techItem
                );

            }

        });


        projectModal.classList.add(
            "active"
        );


        document.body.style.overflow =
            "hidden";

    });

});


function closeModal() {

    projectModal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeModal
    );

}


document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            projectModal &&
            projectModal.classList.contains(
                "active"
            )
        ) {

            closeModal();

        }

    }
);