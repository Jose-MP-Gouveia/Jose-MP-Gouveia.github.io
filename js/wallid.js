/* =========================================================
   WALLID — ARCHIVE LOADER
========================================================= */

const loader = document.querySelector("#archiveLoader");
const progress = document.querySelector("#loaderProgress");
const loaderStatus = document.querySelector("#loaderStatus");

if (loader && progress && loaderStatus) {

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

        if (currentProgress >= 85) {
            progress.classList.add("wallid-final");
            loaderStatus.classList.add("wallid-final");
        }

        if (currentProgress === 100) {

            setTimeout(function () {

                loader.classList.add("hidden");

                const record = document.querySelector("#record");

                if (record) {
                    record.classList.add("loaded");
                }

            }, 500);
        }

    }, 180);
}


/* =========================================================
   ARCHIVE MENU
========================================================= */

const navToggle = document.querySelector("#navToggle");
const archiveNav = document.querySelector("#archiveNav");

if (navToggle && archiveNav) {

    navToggle.addEventListener("click", function () {

        navToggle.classList.toggle("active");
        archiveNav.classList.toggle("open");

    });

    archiveNav.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navToggle.classList.remove("active");
            archiveNav.classList.remove("open");

        });

    });
}


/* =========================================================
   ANCHOR LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const href = link.getAttribute("href");

        if (!href || href === "#") {
            return;
        }

        const target = document.querySelector(href);

        if (!target) {
            return;
        }

        event.preventDefault();

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});