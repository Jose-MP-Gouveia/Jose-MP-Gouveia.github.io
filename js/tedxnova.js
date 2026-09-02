/* =========================================
   ARCHIVE RETRIEVAL / CORRUPTED RECORD LOADER
   ========================================= */

(function () {

    const loader =
        document.getElementById("archiveLoader");

    const progress =
        document.getElementById("loaderProgress");

    const status =
        document.getElementById("loaderStatus");

    const title =
        document.querySelector(".loader-title");

    const kicker =
        document.querySelector(".loader-kicker");

    const meta =
        document.querySelector(".loader-meta");


    /*
     * If the loader elements do not exist,
     * leave the rest of the page alone.
     */

    if (
        !loader ||
        !progress ||
        !status
    ) {
        return;
    }


    /* =====================================
       STATES
       ===================================== */

    const archiveStatuses = [
        "INDEXING RECORD",
        "CHECKING HASH",
        "LOADING ARTIFACT",
        "RECONSTRUCTING CONTEXT",
        "MERGING VISUAL LAYERS",
        "VERIFYING"
    ];


    const corruptionStatuses = [
        "HASH INSTABILITY",
        "VISUAL LAYER DETECTED",
        "ARCHIVE CORRUPTION",
        "EXTERNAL RECORD INTRUSION"
    ];


    const tedxStatuses = [
        "EXTERNAL LAYER DETECTED",
        "MERGING TEDxNOVA",
        "RECONSTRUCTING EVENT LAYER",
        "VERIFYING",
        "RECORD READY"
    ];


    /* =====================================
       STATE
       ===================================== */

    let currentProgress = 0;
    let corruptionStarted = false;
    let tedxStarted = false;


    /* =====================================
       INITIAL STATE
       ===================================== */

    loader.classList.remove("hidden");
    loader.classList.remove("corrupting");
    loader.classList.remove("tedx-mode");


    progress.style.width = "0%";


    if (title) {
        title.textContent =
            "ARCHIVE RETRIEVAL";
    }


    if (kicker) {
        kicker.textContent =
            "ARCHIVE NODE_01 // RECORD_002";
    }


    if (meta) {

        const spans =
            meta.querySelectorAll("span");


        if (spans[0]) {
            spans[0].textContent =
                "RECORD: 02";
        }


        if (spans[1]) {
            spans[1].textContent =
                "STATUS: RETRIEVING";
        }


        if (spans[2]) {
            spans[2].textContent =
                "YEAR: 2025";
        }
    }


    status.textContent =
        "INDEXING RECORD";


    /* =====================================
       PROGRESS SPEED
       ===================================== */

    function getStep() {

        if (currentProgress < 70) {

            return (
                Math.floor(
                    Math.random() * 7
                ) + 4
            );

        }


        if (currentProgress < 84) {

            return (
                Math.floor(
                    Math.random() * 4
                ) + 2
            );

        }


        return (
            Math.floor(
                Math.random() * 7
            ) + 4
        );
    }


    /* =====================================
       LOADER TICK
       ===================================== */

    const interval =
        setInterval(function () {

            currentProgress +=
                getStep();


            if (currentProgress > 100) {
                currentProgress = 100;
            }


            /* =============================
               ARCHIVE
               ============================= */

            if (
                currentProgress < 70
            ) {

                const index =
                    Math.min(
                        Math.floor(
                            currentProgress / 12
                        ),
                        archiveStatuses.length - 1
                    );


                status.textContent =
                    archiveStatuses[index];

            }


            /* =============================
               CORRUPTION
               ============================= */

            if (
                currentProgress >= 70 &&
                !corruptionStarted
            ) {

                corruptionStarted = true;


                loader.classList.add(
                    "corrupting"
                );


                status.textContent =
                    corruptionStatuses[0];


                if (kicker) {
                    kicker.textContent =
                        "ARCHIVE NODE_01 // INTEGRITY WARNING";
                }
            }


            if (
                currentProgress >= 70 &&
                currentProgress < 84
            ) {

                const index =
                    Math.min(
                        Math.floor(
                            (currentProgress - 70) / 4
                        ),
                        corruptionStatuses.length - 1
                    );


                status.textContent =
                    corruptionStatuses[index];

            }


            /* =============================
               TEDxNOVA TAKEOVER
               ============================= */

            if (
                currentProgress >= 84 &&
                !tedxStarted
            ) {

                tedxStarted = true;


                loader.classList.remove(
                    "corrupting"
                );


                loader.classList.add(
                    "tedx-mode"
                );


                if (title) {

                    title.innerHTML =
                        'TED<span>X</span>NOVA';

                }


                if (kicker) {

                    kicker.textContent =
                        "EXTERNAL RECORD // VISUAL LAYER";

                }


                if (meta) {

                    const spans =
                        meta.querySelectorAll("span");


                    if (spans[0]) {
                        spans[0].textContent =
                            "RECORD: 02";
                    }


                    if (spans[1]) {
                        spans[1].textContent =
                            "STATUS: MERGING";
                    }


                    if (spans[2]) {
                        spans[2].textContent =
                            "TEDxNOVA / 2025";
                    }
                }
            }


            /* =============================
               TEDxNOVA FINAL PHASE
               ============================= */

            if (
                currentProgress >= 84
            ) {

                const index =
                    Math.min(
                        Math.floor(
                            (currentProgress - 84) / 4
                        ),
                        tedxStatuses.length - 1
                    );


                status.textContent =
                    tedxStatuses[index];
            }


            /* =============================
               BAR
               ============================= */

            progress.style.width =
                currentProgress + "%";


            /* =============================
               COMPLETE
               ============================= */

            if (
                currentProgress >= 100
            ) {

                clearInterval(interval);


                progress.style.width =
                    "100%";


                status.textContent =
                    "RECORD READY";


                setTimeout(function () {

                    loader.classList.add(
                        "hidden"
                    );

                }, 700);

            }

        }, 180);

})();

/* =========================================
   NAVIGATION
   ========================================= */

if (
    navToggle &&
    navContent
) {

    navToggle.addEventListener(
        "click",
        () => {

            const open =
                navContent.classList.toggle(
                    "open"
                );

            navToggle.setAttribute(
                "aria-expanded",
                open
            );

        }
    );


    document
        .querySelectorAll(".nav-content a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navContent.classList.remove(
                        "open"
                    );

                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        });
}


/* =========================================
   ARTIFACT DATA
   ========================================= */

const artifacts = {

    webapp: {

        index: "ART_01",

        title: "LIVE GUIDE",

        text:
            "I designed and built the TEDxNOVA live guide entirely from scratch. It brought the event schedule, speakers, interactive agenda, navigation, venue information and sponsor information into one public-facing digital layer.",

        link:
            "https://tedxnova-live-guide.lovable.app/",

        linkLabel:
            "OPEN LIVE GUIDE",

        log: [

            "SOURCE: INDEPENDENT BUILD",

            "AUTHOR: J. GOUVEIA",

            "STATE: DEPLOYED",

            "ACCESS: EXTERNAL"

        ]

    },


    social: {

        index: "ART_02",

        title: "SOCIAL RECOVERY",

        text:
            "The previous Instagram presence had been corrupted, leaving the team with an almost new account. The work rebuilt the public presence and pushed it beyond its previous state, reaching roughly 200 Instagram followers and moving impressions from dozens into the thousands. LinkedIn reached roughly 2,000 followers.",

        log: [

            "INSTAGRAM: ~200 FOLLOWERS",

            "LINKEDIN: ~2,000 FOLLOWERS",

            "IMPRESSIONS: DOZENS → THOUSANDS",

            "STATE: RECOVERED / IMPROVED"

        ]

    },


    merch: {

        index: "ART_03",

        title: "MERCHANDISE",

        text:
            "T-shirts, tote bags and lanyards were designed around the TEDxNOVA visual identity established by the team and confirmed by the wider TEDxNOVA staff.",

        log: [

            "OBJECTS: T-SHIRT / TOTE / LANYARD",

            "SYSTEM: TEDxNOVA 2025",

            "STATE: APPROVED",

            "MEDIUM: PHYSICAL"

        ]

    },


    coordination: {

        index: "ART_04",

        title: "TEAM SYSTEM",

        text:
            "As Marketing Team Leader, I assigned tasks, organized meetings, supported team members, tracked work and communicated decisions between Marketing, lead organizers and other teams.",

        log: [

            "ROLE: MARKETING TEAM LEADER",

            "INTERFACE: MARKETING ↔ ORGANIZATION",

            "FUNCTION: COORDINATION",

            "STATE: ACTIVE / EVENT COMPLETE"

        ]

    }

};


/* =========================================
   OPEN ARTIFACT
   ========================================= */

function openArtifact(key) {

    const item =
        artifacts[key];

    if (
        !item ||
        !modal ||
        !modalContent ||
        !modalIndex
    ) {
        return;
    }


    modalIndex.textContent =
        item.index;


    const logHtml =
        item.log
            .map(
                line =>
                    `<div>> ${line}</div>`
            )
            .join("");


    modalContent.innerHTML = `

        <h3>${item.title}</h3>

        <p>${item.text}</p>

        ${
            item.link
                ? `
                    <a
                        href="${item.link}"
                        target="_blank"
                        rel="noopener noreferrer">
                        ${item.linkLabel} ↗
                    </a>
                `
                : ""
        }

        <div class="modal-log">
            ${logHtml}
        </div>

    `;


    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


/* =========================================
   CLOSE ARTIFACT
   ========================================= */

function closeArtifact() {

    if (!modal) {
        return;
    }


    modal.classList.remove(
        "open"
    );

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


/* =========================================
   ARTIFACT CONTROLS
   ========================================= */

document
    .querySelectorAll(".artifact-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                openArtifact(
                    card.dataset.artifact
                );

            }
        );

    });


document
    .querySelectorAll("[data-close]")
    .forEach(element => {

        element.addEventListener(
            "click",
            closeArtifact
        );

    });


/* =========================================
   KEYBOARD
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {
            closeArtifact();
        }

    }
);