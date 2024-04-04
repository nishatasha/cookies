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
    });

    // Load saved preferences when the page loads
    loadSavedPreferences();
    
    // Display user information
    displayUserInfo();
});

// Set all preferences (checkboxes) to checked
function acceptAllPreferences() {
    const cookieOptions = document.querySelectorAll(".cookieOption");
    cookieOptions.forEach(option => {
        option.checked = true;
    });
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

    setCookie("userPreferences", JSON.stringify(selectedOptions), 20); // Live for 20 seconds
}

// Load saved preferences
function loadSavedPreferences() {
    const savedOptions = JSON.parse(getCookie("userPreferences") || "{}");
    const cookieOptions = document.querySelectorAll(".cookieOption");
    cookieOptions.forEach(option => {
        option.checked = savedOptions[option.name] === true; // Convert 'rejected' back to false
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

// Display user information
function displayUserInfo() {
    const savedOptions = JSON.parse(getCookie("userPreferences") || "{}");

    // Retrieve screen height and width if allowed by preferences
    if (savedOptions.screenHeight === true) {
        const screenHeight = window.screen.height;
        console.log("Screen Height:", screenHeight);
    } else {
        console.log("Screen Height: rejected");
    }

    if (savedOptions.screenWidth === true) {
        const screenWidth = window.screen.width;
        console.log("Screen Width:", screenWidth);
    } else {
        console.log("Screen Width: rejected");
    }

    // Retrieve browser information if allowed by preferences
    if (savedOptions.browser === true) {
        const browserInfo = navigator.userAgent;
        console.log("Browser Info:", browserInfo);
    } else {
        console.log("Browser Info: rejected");
    }

    // Retrieve operating system information if allowed by preferences
    if (savedOptions.operatingSystem === true) {
        const osInfo = getOperatingSystem();
        console.log("Operating System:", osInfo);
    } else {
        console.log("Operating System: rejected");
    }
}

// Save user information to cookies
function saveUserInfoToCookies(screenHeight, screenWidth, browserInfo, osInfo) {
    const userInfo = {
        screenHeight: screenHeight,
        screenWidth: screenWidth,
        browserInfo: browserInfo,
        osInfo: osInfo
    };

    console.log("User Info:", userInfo); // Debugging

    setCookie("userInfo", JSON.stringify(userInfo), 20); // Live for 20 seconds
}

// Get the operating system
function getOperatingSystem() {
    const userAgent = navigator.userAgent;
    let os = "Unknown";
    switch(true) {
        case userAgent.includes("Windows"):
            os = "Windows";
            break;
        case userAgent.includes("Mac"):
            os = "MacOS";
            break;
        case userAgent.includes("Linux"):
            os = "Linux";
            break;
        case userAgent.includes("Android"):
            os = "Android";
            break;
        case userAgent.includes("iOS"):
            os = "iOS";
            break;
    }
    return os;
}
