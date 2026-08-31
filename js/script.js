/* =========================================
   ARCHIVE NAVIGATION
   ========================================= */

const archiveNav = document.querySelector("#archiveNav");
const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelectorAll(".nav-content a");


/* Open / close navigation */

navToggle.addEventListener("click", function() {

    archiveNav.classList.toggle("open");

});


/* Close navigation after selecting a section */

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        archiveNav.classList.remove("open");

    });

});