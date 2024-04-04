'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector('.modal');
    const closeButtons = document.querySelectorAll('.close');
    const settingsButton = document.querySelector('.settings');

    // Always display the modal when the page loads
    modal.style.display = "block";

    // Modal close button
    closeButtons.forEach(closeButton => {
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    });

    // Save settings button
    settingsButton.addEventListener("click", () => {
        saveCookieSettings();
        modal.style.display = "none";
    });

    // Check if cookies are enabled and if there are any cookies stored
    if (getCookie("cookieConsent")) {
        loadSavedSettings();
    }

    // Add event listeners to acceptAllButton and cookieButton if they exist
    const acceptAllButton = document.getElementById('acceptAllButton');
    if (acceptAllButton) {
        acceptAllButton.addEventListener("click", () => {
            acceptAllPreferences();
        });
    }

    const cookieButton = document.getElementById('cookieButton');
    if (cookieButton) {
        cookieButton.addEventListener("click", () => {
            modal.style.display = "block";
        });
    }
});

// Set all preferences (checkboxes) to true
function acceptAllPreferences() {
    const cookieOptions = document.querySelectorAll(".cookieOption");
    cookieOptions.forEach(option => {
        option.checked = true;
    });
}

// Save settings
function saveCookieSettings() {
    const cookieOptions = document.querySelectorAll(".cookieOption");
    const selectedOptions = {};
    cookieOptions.forEach(option => {
        selectedOptions[option.name] = option.checked;
    });
    setCookie("cookieConsent", JSON.stringify(selectedOptions), 20); // Live for 20 seconds
}

// Load saved settings from cookies
function loadSavedSettings() {
    const savedOptions = JSON.parse(getCookie("cookieConsent"));
    const cookieOptions = document.querySelectorAll(".cookieOption");
    cookieOptions.forEach(option => {
        option.checked = savedOptions[option.name];
    });
}

// Set a cookie
function setCookie(name, value, seconds) {
    const d = new Date();
    d.setTime(d.getTime() + (seconds * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Get a cookie
function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let c of ca) {
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) == 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}
