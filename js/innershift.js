/* =========================================
   ARCHIVE NAVIGATION
   ========================================= */

const archiveNav = document.querySelector("#archiveNav");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelectorAll(".nav-content a");

navToggle.addEventListener("click", function () {
    const isOpen = archiveNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        archiveNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});


/* =========================================
   VII DAY RITUAL
   ========================================= */

const days = {
    1: {
        title: "BIODETox",
        image: "assets/innershift/slide-05.png",
        description:
            "Disconnect from the habitual digital environment and begin paying attention to the world around you."
    },
    2: {
        title: "GO OUTSIDE",
        image: "assets/innershift/slide-05.png",
        description:
            "A deliberate change of environment: leave the habitual loop and redirect attention outward."
    },
    3: {
        title: "SELF-REFLECTION",
        image: "assets/innershift/slide-05.png",
        description:
            "Create space for reflection and examine the patterns that normally pass unnoticed."
    },
    4: {
        title: "WORK ELSEWHERE",
        image: "assets/innershift/slide-05.png",
        description:
            "Change the context in which work happens and interrupt the automatic relationship with routine."
    },
    5: {
        title: "CONNECTION",
        image: "assets/innershift/slide-05.png",
        description:
            "Use deliberate connection as part of the ritual rather than leaving social interaction to the algorithm."
    },
    6: {
        title: "MICRO-LEARNING",
        image: "assets/innershift/slide-05.png",
        description:
            "Introduce small, intentional learning moments into the day."
    },
    7: {
        title: "FATESMITH",
        image: "assets/innershift/slide-05.png",
        description:
            "Finish the seven-day path by turning the accumulated observations into a deliberate next step."
    }
};

const dayButtons = document.querySelectorAll(".day-button");
const dayImage = document.querySelector("#dayImage");
const dayNumber = document.querySelector("#dayNumber");
const dayTitle = document.querySelector("#dayTitle");
const dayDescription = document.querySelector("#dayDescription");

dayButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const day = button.dataset.day;
        const record = days[day];

        dayButtons.forEach(function (item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        dayImage.src = record.image;
        dayNumber.textContent = "DAY " + ["I", "II", "III", "IV", "V", "VI", "VII"][day - 1];
        dayTitle.textContent = record.title;
        dayDescription.textContent = record.description;
    });
});


/* =========================================
   SOURCE ARTIFACT RETRIEVAL
   ========================================= */

const artifacts = {
    1: {
        title: "PROJECT CONCEPT",
        image: "assets/innershift/slide-03.png",
        status: "STATUS: RECOVERED",
        description:
            "The project's conceptual layer: the problem space around digital drift, emotional fatigue and the proposed shift toward participation, clarity and control."
    },
    2: {
        title: "VII DAY RITUAL",
        image: "assets/innershift/slide-05.png",
        status: "STATUS: RECOVERED",
        description:
            "The seven-day ritual represented through the original project card system. The artifact preserves the visual language of the proposed experience."
    },
    3: {
        title: "BUSINESS MODEL",
        image: "assets/innershift/slide-07.png",
        status: "STATUS: RECOVERED",
        description:
            "The original business-model artifact, showing strategic partners, activities, resources, value proposition, relationships, channels, segments, costs and revenue."
    },
    4: {
        title: "FINAL FRAME",
        image: "assets/innershift/slide-08.png",
        status: "STATUS: PARTIALLY RECOVERED",
        description:
            "The final presentation frame. The source is available, but the archive cannot reconstruct the surrounding presentation context from the recovered material alone."
    }
};

const modal = document.querySelector("#artifactModal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalKicker = document.querySelector("#modalKicker");
const modalStatus = document.querySelector("#modalStatus");
const modalDescription = document.querySelector("#modalDescription");
const modalCounter = document.querySelector("#modalCounter");
const modalClose = document.querySelector("#modalClose");
const modalPrevious = document.querySelector("#modalPrevious");
const modalNext = document.querySelector("#modalNext");
const artifactCards = document.querySelectorAll(".artifact-card");

let currentArtifact = 1;

function openArtifact(index) {
    const artifact = artifacts[index];

    if (!artifact) {
        return;
    }

    currentArtifact = index;

    modalTitle.textContent = artifact.title;
    modalKicker.textContent = "SOURCE MATERIAL / ARTIFACT_" + String(index).padStart(2, "0");
    modalStatus.textContent = artifact.status;
    modalDescription.textContent = artifact.description;
    modalImage.src = artifact.image;
    modalImage.alt = artifact.title + " source artifact";
    modalCounter.textContent =
        String(index).padStart(2, "0") + " / " +
        String(Object.keys(artifacts).length).padStart(2, "0");

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
}

function closeArtifact() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function stepArtifact(direction) {
    const total = Object.keys(artifacts).length;
    const next = ((currentArtifact - 1 + direction + total) % total) + 1;
    openArtifact(next);
}

artifactCards.forEach(function (card) {
    card.addEventListener("click", function () {
        openArtifact(Number(card.dataset.artifact));
    });
});

modalClose.addEventListener("click", closeArtifact);

document.querySelector("[data-close-artifact]").addEventListener(
    "click",
    closeArtifact
);

modalPrevious.addEventListener("click", function () {
    stepArtifact(-1);
});

modalNext.addEventListener("click", function () {
    stepArtifact(1);
});

document.addEventListener("keydown", function (event) {
    if (!modal.classList.contains("active")) {
        return;
    }

    if (event.key === "Escape") {
        closeArtifact();
    }

    if (event.key === "ArrowLeft") {
        stepArtifact(-1);
    }

    if (event.key === "ArrowRight") {
        stepArtifact(1);
    }
});


/* =========================================
   SMALL ARCHIVE DETAIL
   ========================================= */

const recordEnd = document.querySelector(".record-end");

if (recordEnd) {
    const observer = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    recordEnd.classList.add("visible");
                }
            });
        },
        { threshold: 0.2 }
    );

    observer.observe(recordEnd);
}
