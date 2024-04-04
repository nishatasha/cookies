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

    // Overwrite existing cookie with new preferences
    setCookie("userPreferences", JSON.stringify(selectedOptions), 20); // Live for 20 seconds

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
    const screenHeightMsg = savedOptions.screenHeight === 'rejected' ? 'Screen Height: rejected' : `Screen Height: ${window.screen.height}`;
    const screenWidthMsg = savedOptions.screenWidth === 'rejected' ? 'Screen Width: rejected' : `Screen Width: ${window.screen.width}`;
    const browserInfoMsg = savedOptions.browser === 'rejected' ? 'Browser Info: rejected' : `Browser Info: ${navigator.userAgent}`;
    const osInfoMsg = savedOptions.operatingSystem === 'rejected' ? 'Operating System: rejected' : `Operating System: ${getOperatingSystem()}`;

    console.log(screenHeightMsg);
    console.log(screenWidthMsg);
    console.log(browserInfoMsg);
    console.log(osInfoMsg);
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
