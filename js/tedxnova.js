const loader = document.querySelector("#archiveLoader");
const progress = document.querySelector("#loaderProgress");
const loaderStatus = document.querySelector("#loaderStatus");
const navToggle = document.querySelector("#navToggle");
const navContent = document.querySelector("#navContent");
const modal = document.querySelector("#artifactModal");
const modalContent = document.querySelector("#modalContent");
const modalIndex = document.querySelector("#modalIndex");

const statuses = [
    "INDEXING RECORD",
    "CHECKING HASH",
    "LOADING ARTIFACT",
    "RECONSTRUCTING CONTEXT",
    "MERGING VISUAL LAYERS",
    "VERIFYING",
    "RECORD READY"
];

let currentProgress = 0;

const loading = setInterval(() => {
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
        setTimeout(() => {
            loader.classList.add("hidden");
        }, 500);
    }
}, 180);

navToggle.addEventListener("click", () => {
    const open = navContent.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-content a").forEach(link => {
    link.addEventListener("click", () => {
        navContent.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

const artifacts = {
    webapp: {
        index: "ART_01",
        title: "LIVE GUIDE",
        text: "I designed and built the TEDxNOVA live guide entirely from scratch. It brought the event schedule, speakers, interactive agenda, navigation, venue information and sponsor information into one public-facing digital layer.",
        link: "https://tedxnova-live-guide.lovable.app/",
        linkLabel: "OPEN LIVE GUIDE",
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
        text: "The previous Instagram presence had been corrupted, leaving the team with an almost new account. The work rebuilt the public presence and pushed it beyond its previous state, reaching roughly 200 Instagram followers and moving impressions from dozens into the thousands. LinkedIn reached roughly 2,000 followers.",
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
        text: "T-shirts, tote bags and lanyards were designed around the TEDxNOVA visual identity established by the team and confirmed by the wider TEDxNOVA staff.",
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
        text: "As Marketing Team Leader, I assigned tasks, organized meetings, supported team members, tracked work and communicated decisions between Marketing, lead organizers and other teams.",
        log: [
            "ROLE: MARKETING TEAM LEADER",
            "INTERFACE: MARKETING ↔ ORGANIZATION",
            "FUNCTION: COORDINATION",
            "STATE: ACTIVE / EVENT COMPLETE"
        ]
    }
};

function openArtifact(key) {
    const item = artifacts[key];
    if (!item) return;

    modalIndex.textContent = item.index;

    const logHtml = item.log
        .map(line => `<div>> ${line}</div>`)
        .join("");

    modalContent.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        ${item.link ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.linkLabel} ↗</a>` : ""}
        <div class="modal-log">${logHtml}</div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeArtifact() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

document.querySelectorAll(".artifact-card").forEach(card => {
    card.addEventListener("click", () => openArtifact(card.dataset.artifact));
});

document.querySelectorAll("[data-close]").forEach(element => {
    element.addEventListener("click", closeArtifact);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeArtifact();
});
