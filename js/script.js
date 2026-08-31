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

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================================
   RECORD SELECTOR
   ========================================= */

const records = [

    {
        id: "record-1",
        number: "01",
        name: "INNERSHIFT",
        category: "INNOVATION"
    },

    {
        id: "record-2",
        number: "02",
        name: "TEDxNOVA",
        category: "SOCIAL MEDIA"
    },

    {
        id: "record-3",
        number: "03",
        name: "WALLID",
        category: "WEB OPTIMIZATION"
    }

];


let currentRecord = 2;


const selectorPrevious =
    document.querySelector("#selectorPrevious");

const selectorCurrent =
    document.querySelector("#selectorCurrent");

const selectorNext =
    document.querySelector("#selectorNext");

const selectorNumber =
    document.querySelector("#selectorNumber");

const selectorName =
    document.querySelector("#selectorName");

const selectorCategory =
    document.querySelector("#selectorCategory");


function updateRecordSelector() {

    const current = records[currentRecord];

    const previous =
        records[
            (currentRecord - 1 + records.length)
            % records.length
        ];

    const next =
        records[
            (currentRecord + 1)
            % records.length
        ];


    selectorNumber.textContent =
        current.number;

    selectorName.textContent =
        current.name;

    selectorCategory.textContent =
        current.category;


    selectorPrevious.querySelector(
        ".selector-number"
    ).textContent = previous.number;


    selectorNext.querySelector(
        ".selector-number"
    ).textContent = next.number;

}


function selectRecord(index) {

    currentRecord = index;

    updateRecordSelector();


    const target =
        document.querySelector(
            "#" + records[currentRecord].id
        );

    if (!target) {
        return;
    }


    target.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    document
        .querySelectorAll(".record-card")
        .forEach(function(card) {

            card.classList.remove("highlighted");

        });


    target.classList.add("highlighted");


    setTimeout(function() {

        target.classList.remove("highlighted");

    }, 1500);

}


selectorPrevious.addEventListener(
    "click",
    function() {

        const previousIndex =
            (currentRecord - 1 + records.length)
            % records.length;

        selectRecord(previousIndex);

    }
);


selectorNext.addEventListener(
    "click",
    function() {

        const nextIndex =
            (currentRecord + 1)
            % records.length;

        selectRecord(nextIndex);

    }
);


selectorCurrent.addEventListener(
    "click",
    function() {

        selectRecord(currentRecord);

    }
);


/* Initial state */

updateRecordSelector();


/* =========================================
   ARCHIVE RETRIEVAL
   ========================================= */

const archiveItems =
    document.querySelectorAll(".archive-item");

const retrievalScreen =
    document.querySelector("#retrievalScreen");

const retrievalTitle =
    document.querySelector("#retrievalTitle");

const retrievalLog =
    document.querySelector("#retrievalLog");

const retrievalProgressBar =
    document.querySelector("#retrievalProgressBar");

const retrievalStatus =
    document.querySelector("#retrievalStatus");


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

    item.addEventListener(
        "click",
        function() {

            const archiveId =
                item.dataset.archive;

            const record =
                archiveRecords[archiveId];

            if (!record) {
                return;
            }

            retrieveArchive(record);

        }
    );

});


function retrieveArchive(record) {

    retrievalTitle.textContent =
        record.title;


    retrievalLog.innerHTML = `
        <p>> CONNECTING TO ARCHIVE...</p>
    `;


    retrievalProgressBar.style.width =
        "0%";


    retrievalStatus.textContent =
        "STATUS: RETRIEVING";


    retrievalScreen.classList.add(
        "active"
    );


    retrievalScreen.setAttribute(
        "aria-hidden",
        "false"
    );


    const logMessages = [

        "> ACCESSING INDEX",

        "> VERIFYING RECORD",

        "> RETRIEVING DATA"

    ];


    let progress = 0;

    let messageIndex = 0;


    const interval =
        setInterval(function() {

            progress += 20;


            retrievalProgressBar.style.width =
                progress + "%";


            if (
                progress % 40 === 0 &&
                messageIndex < logMessages.length
            ) {

                const message =
                    document.createElement("p");


                message.textContent =
                    logMessages[messageIndex];


                retrievalLog.appendChild(
                    message
                );


                messageIndex++;

            }


            if (progress >= 100) {

                clearInterval(interval);


                retrievalStatus.textContent =
                    "STATUS: " + record.status;


                const finalMessage =
                    document.createElement("p");


                if (
                    record.status ===
                    "CORRUPTED"
                ) {

                    finalMessage.textContent =
                        "> RECORD RECOVERED... MOSTLY.";

                } else {

                    finalMessage.textContent =
                        "> RECORD READY FOR FUTURE RETRIEVAL.";

                }


                retrievalLog.appendChild(
                    finalMessage
                );


                setTimeout(function() {

                    retrievalScreen.classList.remove(
                        "active"
                    );


                    retrievalScreen.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                }, 900);

            }

        }, 180);

}