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
        title: "BIODETOX"
    },
    2: {
        title: "GO OUTSIDE"
    },
    3: {
        title: "SELF-REFLECTION"
    },
    4: {
        title: "WORK ELSEWHERE"
    },
    5: {
        title: "CONNECTION"
    },
    6: {
        title: "MICRO-LEARNING"
    },
    7: {
        title: "FATESMITH"
    }
};

const romanDays = [
    "I",
    "II",
    "III",
    "IV",
    "V",
    "VI",
    "VII"
];

const dayButtons =
    document.querySelectorAll(".day-button");

const dayImage =
    document.querySelector("#dayImage");

const dayCopy =
    document.querySelector(".day-copy");

const dayNumber =
    document.querySelector("#dayNumber");

const dayTitle =
    document.querySelector("#dayTitle");

const dayDescription =
    document.querySelector("#dayDescription");

let currentDay = 1;
let dayTransitioning = false;


/* -----------------------------------------
   DAY DESCRIPTIONS
   ----------------------------------------- */

const dayDescriptions = {
    1:
        "Disconnect from the habitual digital environment and begin paying attention to the world around you.",

    2:
        "Leave the habitual environment and deliberately redirect your attention toward the world outside.",

    3:
        "Create space for reflection and examine the patterns that normally pass unnoticed.",

    4:
        "Change the context in which work happens and interrupt the automatic relationship with routine.",

    5:
        "Use deliberate connection as part of the ritual rather than leaving social interaction to the algorithm.",

    6:
        "Introduce small, intentional learning moments into the day.",

    7:
        "Finish the seven-day path by turning the accumulated observations into a deliberate next step."
};


/* -----------------------------------------
   APPLY DAY
   ----------------------------------------- */

function applyDay(day) {

    const record = days[day];

    if (!record) {
        return;
    }

    dayImage.dataset.day = day;

    dayNumber.textContent =
        "DAY " + romanDays[day - 1];

    dayTitle.textContent =
        record.title;

    dayDescription.textContent =
        dayDescriptions[day];


    dayButtons.forEach(function(button) {

        const active =
            Number(button.dataset.day) === day;

        button.classList.toggle(
            "active",
            active
        );

        button.setAttribute(
            "aria-selected",
            active
        );

    });

    currentDay = day;
}


/* -----------------------------------------
   CHANGE DAY
   ----------------------------------------- */

function setDay(day, animate = true) {

    if (!days[day]) {
        return;
    }

    if (day === currentDay && animate) {
        return;
    }

    if (dayTransitioning) {
        return;
    }

    if (!animate) {

        applyDay(day);

        return;
    }


    dayTransitioning = true;


    /*
     * Fade the existing card and text out.
     */

    dayImage.classList.add("is-changing");
    dayCopy.classList.add("is-changing");


    /*
     * Replace the day after the fade has started.
     */

    setTimeout(function () {

        applyDay(day);


        /*
         * Force the browser to acknowledge
         * the new state before fading it in.
         */

        requestAnimationFrame(function () {

            requestAnimationFrame(function () {

                dayImage.classList.remove(
                    "is-changing"
                );

                dayCopy.classList.remove(
                    "is-changing"
                );


                setTimeout(function () {

                    dayTransitioning = false;

                }, 450);

            });

        });

    }, 220);
}


/* -----------------------------------------
   BUTTONS
   ----------------------------------------- */

dayButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const day =
                Number(button.dataset.day);

            setDay(day);

        }
    );

});


/* -----------------------------------------
   INITIAL STATE
   ----------------------------------------- */

applyDay(1);


function setDay(day, animate = true) {

    const record = days[day];

    if (!record) {
        return;
    }

    if (
        animate &&
        (dayTransitioning || day === currentDay)
    ) {
        return;
    }


    const romanDays = [
        "I",
        "II",
        "III",
        "IV",
        "V",
        "VI",
        "VII"
    ];


    function applyRecord() {

        dayImage.src = record.image;

        dayImage.alt =
            "InnerShift Day " +
            romanDays[day - 1] +
            " ritual card";


        dayNumber.textContent =
            "DAY " + romanDays[day - 1];


        dayTitle.textContent =
            record.title;


        dayDescription.textContent =
            record.description;


        currentDay = day;


        dayButtons.forEach(function(button) {

            const isActive =
                Number(button.dataset.day) === day;


            button.classList.toggle(
                "active",
                isActive
            );


            button.setAttribute(
                "aria-selected",
                isActive
            );

        });

    }


    /* Initial state */

    if (!animate) {

        applyRecord();

        return;

    }


    /* Start transition */

    dayTransitioning = true;


    dayImage.classList.add(
        "is-changing"
    );


    dayCopy.classList.add(
        "is-changing"
    );


    /*
       Wait until the old content has faded
       before replacing it.
    */

    setTimeout(function() {

        applyRecord();


        requestAnimationFrame(function() {

            dayImage.classList.remove(
                "is-changing"
            );


            dayCopy.classList.remove(
                "is-changing"
            );


            setTimeout(function() {

                dayTransitioning = false;

            }, 350);

        });

    }, 180);

}


/* =========================================
   DAY BUTTONS
   ========================================= */

dayButtons.forEach(function(button) {

    button.setAttribute(
        "aria-selected",
        button.classList.contains("active")
    );


    button.addEventListener(
        "click",
        function() {

            const day =
                Number(button.dataset.day);


            setDay(day);

        }
    );

});


/* Initial state */

setDay(1, false);


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
        image: "assets/innershift/slide-04.png",
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
