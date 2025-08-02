// BACKGROUND SCRIPT - Handles extension installation and new tab creation

/**
 * Detects browser and returns appropriate API
 * @returns {object} Browser API object
 */
const getBrowserAPI = () => {
    if (typeof chrome !== 'undefined') {
        if (typeof browser !== 'undefined') {
            return browser; // Firefox
        } else {
            return chrome; // Chrome
        }
    } else {
        return browser; // Edge
    }
};

/**
 * Opens the new tab page when the extension is installed
 */
const handleInstall = () => {
    try {
        const browserAPI = getBrowserAPI();
        browserAPI.tabs.create({
            url: browserAPI.runtime.getURL("src/newtab.html")
        });
    } catch (error) {
        console.error('Failed to create new tab:', error);
    }
};

const browserAPI = getBrowserAPI();
browserAPI.runtime.onInstalled.addListener(handleInstall);