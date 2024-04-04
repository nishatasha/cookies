'use strict';

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.querySelector('.modal');
    const closeButtons = document.querySelectorAll('.close');
    const settingsButton = document.querySelector('.settings');
    const acceptAllButton = document.querySelector('.acceptAll');

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
        savePreferences(); // Save current preferences when 'Save Preferences' is clicked
        modal.style.display = "none";
    });

    // Accept all button
    acceptAllButton.addEventListener("click", () => {
        acceptAllPreferences();
        savePreferences(); // Save preferences when 'Accept All' is clicked
    });

    // Load saved preferences when the page loads
    loadSavedPreferences();

    // Display user information
    displayUserInfo();
});

// Set all preferences (checkboxes) to checked
function acceptAllPreferences() {
    const savedOptions = JSON.parse(getCookie("userPreferences") || "{}");
    const allUserInfoInCookie = savedOptions.screenHeight !== undefined &&
        savedOptions.screenWidth !== undefined &&
        savedOptions.browser !== undefined &&
        savedOptions.operatingSystem !== undefined;

    if (allUserInfoInCookie) {
        const cookieOptions = document.querySelectorAll(".cookieOption");
        cookieOptions.forEach(option => {
            option.checked = true;
        });

        // Update toggle buttons accordingly
        const toggleButtons = document.querySelectorAll(".toggle");
        toggleButtons.forEach(button => {
            button.checked = true;
        });
    }
}

// Save preferences
function savePreferences() {
    const selectedOptions = {};

    // Save preferences with 'rejected' for unchecked options
    const cookieOptions = document.querySelectorAll(".cookieOption");
    cookieOptions.forEach(option => {
        selectedOptions[option.name] = option.checked ? true : 'rejected';
    });

    console.log("Saved Preferences:", selectedOptions); // Debugging

    // Overwrite existing cookie with new preferences
    setCookie("userPreferences", JSON.stringify(selectedOptions)); // No expiration set

    // Display updated user information
    displayUserInfo();
}

// Load saved preferences
function loadSavedPreferences() {
    const savedOptions = JSON.parse(getCookie("userPreferences") || "{}");
    const cookieOptions = document.querySelectorAll(".cookieOption");
    cookieOptions.forEach(option => {
        option.checked = savedOptions[option.name] === true; // Convert 'rejected' back to false
    });

    // Update toggle buttons accordingly
    const toggleButtons = document.querySelectorAll(".toggle");
    toggleButtons.forEach(button => {
        button.checked = savedOptions[button.name] !== 'rejected'; // Set to true if not 'rejected'
    });

    // Display saved preferences
    displayUserInfo();
}

// Set a cookie
function setCookie(name, value) {
    document.cookie = name + "=" + value + ";path=/";
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

// Get browser information
function getBrowserInfo() {
    const userAgent = navigator.userAgent;
    const vendor = navigator.vendor;

    switch (true) {
        case /Firefox/i.test(userAgent):
            return "Firefox";
        case /Chrome/i.test(userAgent) && /Google Inc/i.test(vendor):
            return "Chrome";
        case /Safari/i.test(userAgent) && /Apple Computer/i.test(vendor):
            return "Safari";
        case /Edg/i.test(userAgent):
            return "Edge";
        case /Opera|OPR/i.test(userAgent):
            return "Opera";
        case /MSIE|Trident/i.test(userAgent):
            return "Internet Explorer";
        default:
            return "Unknown";
    }
}

// Get the operating system
function getOperatingSystem() {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;

    switch (true) {
        case /Win/i.test(platform):
            return "Windows";
        case /Mac/i.test(platform):
            return "MacOS";
        case /Linux/i.test(platform):
            return "Linux";
        case /Android/i.test(userAgent):
            return "Android";
        case /iPhone|iPad|iPod/i.test(userAgent):
            return "iOS";
        default:
            return "Unknown";
    }
}


// Display user information
function displayUserInfo() {
    const savedOptions = JSON.parse(getCookie("userPreferences") || "{}");

    // Retrieve screen height and width if allowed by preferences
    const screenHeightMsg = savedOptions.screenHeight === 'rejected' ? 'Screen Height: rejected' : `Screen Height: ${window.screen.height}px`;
    const screenWidthMsg = savedOptions.screenWidth === 'rejected' ? 'Screen Width: rejected' : `Screen Width: ${window.screen.width}px`;
    const browserInfoMsg = savedOptions.browser === 'rejected' ? 'Browser Info: rejected' : `Browser Info: ${getBrowserInfo()}`;
    const osInfoMsg = savedOptions.operatingSystem === 'rejected' ? 'Operating System: rejected' : `Operating System: ${getOperatingSystem()}`;

    console.log(screenHeightMsg);
    console.log(screenWidthMsg);
    console.log(browserInfoMsg);
    console.log(osInfoMsg);
}
