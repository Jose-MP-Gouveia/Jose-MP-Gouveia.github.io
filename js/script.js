/* =========================================
   ARCHIVE NAVIGATION
   ========================================= */

const archiveNav = document.querySelector("#archiveNav");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelectorAll(".nav-content a");


navToggle.addEventListener("click", function() {

    const isOpen = archiveNav.classList.toggle("open");

    navToggle.setAttribute("aria-expanded", isOpen);

});


navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        archiveNav.classList.remove("open");

        navToggle.setAttribute("aria-expanded", "false");

    });

});


/* =========================================
   INTERACTIVE RECORD INDEX
   ========================================= */

const indexPoints = document.querySelectorAll(".index-point");
const indexDescription = document.querySelector("#indexDescription");

const recordDescriptions = {
    "record-1": "01 — INNERSHIFT / INNOVATION",
    "record-2": "02 — TEDxNOVA / SOCIAL MEDIA",
    "record-3": "03 — WALLID / WEB OPTIMIZATION"
};


indexPoints.forEach(function(point) {

    point.addEventListener("click", function() {

        const targetId = point.dataset.target;
        const target = document.querySelector("#" + targetId);

        if (!target) {
            return;
        }

        indexPoints.forEach(function(item) {
            item.classList.remove("active");
        });

        point.classList.add("active");

        indexDescription.textContent = recordDescriptions[targetId];

        target.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        target.classList.add("highlighted");

        setTimeout(function() {
            target.classList.remove("highlighted");
        }, 1500);

    });

});


/* =========================================
   ARCHIVE RETRIEVAL
   ========================================= */

const archiveItems = document.querySelectorAll(".archive-item");

const retrievalScreen = document.querySelector("#retrievalScreen");
const retrievalTitle = document.querySelector("#retrievalTitle");
const retrievalLog = document.querySelector("#retrievalLog");
const retrievalProgressBar = document.querySelector("#retrievalProgressBar");
const retrievalStatus = document.querySelector("#retrievalStatus");


const archiveRecords = {

    education: {
        title: "EDUCATION",
        status: "ACTIVE"
    },

    experience: {
        title: "EXPERIENCE",
        status: "ACTIVE"
    },

    certifications: {
        title: "CERTIFICATIONS",
        status: "VERIFIED"
    },

    awards: {
        title: "AWARDS",
        status: "INDEXING"
    },

    projects: {
        title: "PROJECTS",
        status: "INDEXING"
    },

    construction: {
        title: "UNDER CONSTRUCTION",
        status: "CORRUPTED"
    }

};


archiveItems.forEach(function(item) {

    item.addEventListener("click", function() {

        const archiveId = item.dataset.archive;
        const record = archiveRecords[archiveId];

        if (!record) {
            return;
        }

        retrieveArchive(record);

    });

});


function retrieveArchive(record) {

    retrievalTitle.textContent = record.title;

    retrievalLog.innerHTML = `
        <p>> CONNECTING TO ARCHIVE...</p>
    `;

    retrievalProgressBar.style.width = "0%";

    retrievalStatus.textContent = "STATUS: RETRIEVING";

    retrievalScreen.classList.add("active");

    retrievalScreen.setAttribute("aria-hidden", "false");


    const logMessages = [
        "> ACCESSING INDEX",
        "> VERIFYING RECORD",
        "> RETRIEVING DATA"
    ];

    let progress = 0;
    let messageIndex = 0;


    const interval = setInterval(function() {

        progress += 20;

        retrievalProgressBar.style.width = progress + "%";


        if (
            progress % 40 === 0 &&
            messageIndex < logMessages.length
        ) {

            const message = document.createElement("p");

            message.textContent = logMessages[messageIndex];

            retrievalLog.appendChild(message);

            messageIndex++;

        }


        if (progress >= 100) {

            clearInterval(interval);

            retrievalStatus.textContent =
                "STATUS: " + record.status;

            const finalMessage = document.createElement("p");

            if (record.status === "CORRUPTED") {

                finalMessage.textContent =
                    "> RECORD RECOVERED... MOSTLY.";

            } else {

                finalMessage.textContent =
                    "> RECORD READY FOR FUTURE RETRIEVAL.";

            }

            retrievalLog.appendChild(finalMessage);


            setTimeout(function() {

                retrievalScreen.classList.remove("active");

                retrievalScreen.setAttribute(
                    "aria-hidden",
                    "true"
                );

            }, 900);

        }

    }, 180);

}