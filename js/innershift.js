/* =========================
   ARCHIVE RETRIEVAL
========================= */

const loader = document.querySelector("#archiveLoader");
const progress = document.querySelector("#loaderProgress");
const loaderStatus = document.querySelector("#loaderStatus");
const record = document.querySelector("#record");

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

const loading = setInterval(function () {

    currentProgress += Math.floor(Math.random() * 12) + 5;

    if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(loading);
    }

    progress.style.width = currentProgress + "%";

    const statusIndex = Math.min(
        Math.floor(currentProgress / 15),
        statuses.length - 1
    );

    loaderStatus.textContent = statuses[statusIndex];

    if (currentProgress === 100) {

        setTimeout(function () {

            loader.classList.add("hidden");
            record.classList.add("loaded");

        }, 500);
    }

}, 180);


/* =========================
   VII DAY RITUAL
========================= */

const days = {

    1: {
        title: "BIODetox",
        description:
            "The first step of the ritual. Disconnect from the habitual digital environment and begin paying attention to the world around you."
    },

    2: {
        title: "GO OUTSIDE",
        description:
            "Leave the familiar environment behind. Movement and exposure to different surroundings become part of the experience."
    },

    3: {
        title: "SELF-REFLECTION",
        description:
            "A deliberate pause for observing one's own thoughts, habits and current state."
    },

    4: {
        title: "WORK ELSEWHERE",
        description:
            "Change the environment in which work happens. The routine itself becomes something that can be questioned."
    },

    5: {
        title: "CONNECTION",
        description:
            "Shift attention toward other people and meaningful interaction rather than passive consumption."
    },

    6: {
        title: "MICRO-LEARNING",
        description:
            "Introduce small opportunities to learn, explore and remain curious."
    },

    7: {
        title: "FATESMITH",
        description:
            "The final stage: reflect on the experience and consider what should remain after the seven days."
    }

};


const dayButtons = document.querySelectorAll(".day");

const dayNumber = document.querySelector("#dayNumber");
const dayTitle = document.querySelector("#dayTitle");
const dayDescription = document.querySelector("#dayDescription");


dayButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const selectedDay = button.dataset.day;
        const data = days[selectedDay];

        dayButtons.forEach(function(item) {
            item.classList.remove("active");
        });

        button.classList.add("active");

        dayNumber.textContent =
            "DAY " + button.textContent;

        dayTitle.textContent =
            data.title;

        dayDescription.textContent =
            data.description;

    });

});