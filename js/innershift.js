/* =========================================
   ARCHIVE RETRIEVAL / PAGE LOADER
   ========================================= */

const loader = document.querySelector("#archiveLoader");
const progress = document.querySelector("#loaderProgress");
const loaderStatus = document.querySelector("#loaderStatus");

const statuses = [
    "INDEXING",
    "CHECKING HASH",
    "LOADING ARTIFACT",
    "RECONSTRUCTING",
    "MERGING VISUAL LAYERS",
    "VERIFYING",
    "RECORD READY"
];

let currentProgress = 0;


/*
 * Original archive loading sequence.
 * Kept intentionally close to the original version.
 */

if (loader && progress && loaderStatus) {

    const loading = setInterval(function () {

        currentProgress += Math.floor(Math.random() * 12) + 5;

        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(loading);
        }

        progress.style.width =
            currentProgress + "%";


        const statusIndex = Math.min(
            Math.floor(currentProgress / 15),
            statuses.length - 1
        );


        loaderStatus.textContent =
            statuses[statusIndex];


        if (currentProgress === 100) {

            setTimeout(function () {

                loader.classList.add("hidden");

            }, 500);

        }

    }, 180);

}


/* =========================================
   ARCHIVE NAVIGATION
   ========================================= */

const archiveNav =
    document.querySelector("#archiveNav");

const navToggle =
    document.querySelector("#navToggle");

const navLinks =
    document.querySelectorAll(".nav-content a");


if (navToggle && archiveNav) {

    navToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                archiveNav.classList.toggle("open");


            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            if (archiveNav) {

                archiveNav.classList.remove(
                    "open"
                );

            }


            if (navToggle) {

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});


/* =========================================
   VII DAY RITUAL
   ========================================= */

const days = {

    1: {
        title: "BIODETOX",
        description:
            "Disconnect from the habitual digital environment and begin paying attention to the world around you."
    },

    2: {
        title: "GO OUTSIDE",
        description:
            "Leave the habitual environment and deliberately redirect your attention toward the world outside."
    },

    3: {
        title: "SELF-REFLECTION",
        description:
            "Create space for reflection and examine the patterns that normally pass unnoticed."
    },

    4: {
        title: "WORK ELSEWHERE",
        description:
            "Change the context in which work happens and interrupt the automatic relationship with routine."
    },

    5: {
        title: "CONNECTION",
        description:
            "Use deliberate connection as part of the ritual rather than leaving social interaction to the algorithm."
    },

    6: {
        title: "MICRO-LEARNING",
        description:
            "Introduce small, intentional learning moments into the day."
    },

    7: {
        title: "FATESMITH",
        description:
            "Finish the seven-day path by turning the accumulated observations into a deliberate next step."
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


const dayPlaceholder =
    document.querySelector("#dayPlaceholder");


const placeholderDay =
    document.querySelector("#placeholderDay");


const placeholderTitle =
    document.querySelector("#placeholderTitle");


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
   APPLY DAY
   ----------------------------------------- */

function applyDay(day) {

    const record = days[day];

    if (!record) {
        return;
    }


    /*
     * Large visual day marker
     */

    if (placeholderDay) {

        placeholderDay.textContent =
            romanDays[day - 1];

    }


    /*
     * Visual panel title
     */

    if (placeholderTitle) {

        placeholderTitle.textContent =
            record.title;

    }


    /*
     * Right-hand text panel
     */

    if (dayNumber) {

        dayNumber.textContent =
            "DAY " + romanDays[day - 1];

    }


    if (dayTitle) {

        dayTitle.textContent =
            record.title;

    }


    if (dayDescription) {

        dayDescription.textContent =
            record.description;

    }


    /*
     * Update selected button
     */

    dayButtons.forEach(function (button) {

        const isActive =
            Number(button.dataset.day) === day;


        button.classList.toggle(
            "active",
            isActive
        );


        button.setAttribute(
            "aria-selected",
            String(isActive)
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


    /*
     * Ignore the currently selected day.
     */

    if (
        animate &&
        day === currentDay
    ) {
        return;
    }


    /*
     * Prevent overlapping transitions.
     */

    if (
        animate &&
        dayTransitioning
    ) {
        return;
    }


    /*
     * Initial state.
     */

    if (!animate) {

        applyDay(day);

        return;

    }


    dayTransitioning = true;


    /*
     * Fade current content out.
     */

    if (dayPlaceholder) {

        dayPlaceholder.classList.add(
            "is-changing"
        );

    }


    if (dayCopy) {

        dayCopy.classList.add(
            "is-changing"
        );

    }


    /*
     * Replace content after the
     * fade has started.
     */

    setTimeout(function () {

        applyDay(day);


        /*
         * Force the browser to register
         * the new content before fading
         * it back in.
         */

        requestAnimationFrame(function () {

            requestAnimationFrame(function () {

                if (dayPlaceholder) {

                    dayPlaceholder.classList.remove(
                        "is-changing"
                    );

                }


                if (dayCopy) {

                    dayCopy.classList.remove(
                        "is-changing"
                    );

                }


                setTimeout(function () {

                    dayTransitioning = false;

                }, 550);

            });

        });

    }, 220);

}


/* -----------------------------------------
   DAY BUTTONS
   ----------------------------------------- */

dayButtons.forEach(function (button) {

    button.setAttribute(
        "aria-selected",
        button.classList.contains("active")
            ? "true"
            : "false"
    );


    button.addEventListener(
        "click",
        function () {

            const day =
                Number(button.dataset.day);


            setDay(day);

        }
    );

});


/*
 * Initial day.
 */

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


const modal =
    document.querySelector("#artifactModal");


const modalImage =
    document.querySelector("#modalImage");


const modalTitle =
    document.querySelector("#modalTitle");


const modalKicker =
    document.querySelector("#modalKicker");


const modalStatus =
    document.querySelector("#modalStatus");


const modalDescription =
    document.querySelector("#modalDescription");


const modalCounter =
    document.querySelector("#modalCounter");


const modalClose =
    document.querySelector("#modalClose");


const modalPrevious =
    document.querySelector("#modalPrevious");


const modalNext =
    document.querySelector("#modalNext");


const artifactCards =
    document.querySelectorAll(".artifact-card");


let currentArtifact = 1;


/* -----------------------------------------
   OPEN ARTIFACT
   ----------------------------------------- */

function openArtifact(index) {

    const artifact =
        artifacts[index];


    if (!artifact || !modal) {
        return;
    }


    currentArtifact = index;


    if (modalTitle) {

        modalTitle.textContent =
            artifact.title;

    }


    if (modalKicker) {

        modalKicker.textContent =
            "SOURCE MATERIAL / ARTIFACT_" +
            String(index).padStart(2, "0");

    }


    if (modalStatus) {

        modalStatus.textContent =
            artifact.status;

    }


    if (modalDescription) {

        modalDescription.textContent =
            artifact.description;

    }


    if (modalImage) {

        modalImage.src =
            artifact.image;

        modalImage.alt =
            artifact.title +
            " source artifact";

    }


    if (modalCounter) {

        modalCounter.textContent =
            String(index).padStart(2, "0") +
            " / " +
            String(
                Object.keys(artifacts).length
            ).padStart(2, "0");

    }


    modal.classList.add("active");


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";


    if (modalClose) {
        modalClose.focus();
    }

}


/* -----------------------------------------
   CLOSE ARTIFACT
   ----------------------------------------- */

function closeArtifact() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "active"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}


/* -----------------------------------------
   PREVIOUS / NEXT ARTIFACT
   ----------------------------------------- */

function stepArtifact(direction) {

    const total =
        Object.keys(artifacts).length;


    const next =
        (
            currentArtifact -
            1 +
            direction +
            total
        ) % total + 1;


    openArtifact(next);

}


/* -----------------------------------------
   ARTIFACT CARDS
   ----------------------------------------- */

artifactCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function () {

            const index =
                Number(
                    card.dataset.artifact
                );


            openArtifact(index);

        }
    );

});


/* -----------------------------------------
   MODAL CONTROLS
   ----------------------------------------- */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeArtifact
    );

}


const modalBackdrop =
    document.querySelector(
        "[data-close-artifact]"
    );


if (modalBackdrop) {

    modalBackdrop.addEventListener(
        "click",
        closeArtifact
    );

}


if (modalPrevious) {

    modalPrevious.addEventListener(
        "click",
        function () {

            stepArtifact(-1);

        }
    );

}


if (modalNext) {

    modalNext.addEventListener(
        "click",
        function () {

            stepArtifact(1);

        }
    );

}


/* =========================================
   KEYBOARD CONTROLS
   ========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        /*
         * Escape closes the modal.
         */

        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("active")
        ) {

            closeArtifact();

            return;

        }


        /*
         * Ignore arrow keys when
         * the modal isn't open.
         */

        if (
            !modal ||
            !modal.classList.contains("active")
        ) {
            return;
        }


        if (event.key === "ArrowLeft") {

            stepArtifact(-1);

        }


        if (event.key === "ArrowRight") {

            stepArtifact(1);

        }

    }
);


/* =========================================
   SMALL ARCHIVE DETAIL
   ========================================= */

const recordEnd =
    document.querySelector(".record-end");


if (recordEnd) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            recordEnd.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    observer.observe(recordEnd);

}