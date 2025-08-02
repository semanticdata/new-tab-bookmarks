// BROWSER DETECTION UTILITY - Provides unified browser API access
/**
 * Detects the current browser and returns the appropriate API object
 * @returns {{api: object, type: string}} Browser API object and type
 */
const getBrowserInfo = () => {
  if (typeof chrome !== 'undefined') {
    if (typeof browser !== 'undefined') {
      return { api: browser, type: 'Firefox' };
    } else {
      return { api: chrome, type: 'Chrome' };
    }
  } else {
    return { api: browser, type: 'Edge' };
  }
};

// TRUNCATE UTILITY - Shortens text to a maximum length and adds an ellipsis if needed
/**
 * Truncates text to a maximum length and adds ellipsis if needed
 * @param {string} text - The text to truncate
 * @returns {string} The truncated text with ellipsis if applicable
 */
const trunc = (text) => {
  const maxLength = options.MAX_NAME_LENGTH;

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}…`;
};

// CLOCK COMPONENT - Updates the digital clock display with the current time in HH:MM:SS format
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Updates the clock display with current time
   */
  const updateTime = () => {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0];
    const clockElement = document.getElementById("clock");
    if (clockElement) {
      clockElement.textContent = formattedTime;
    }
  };

  /**
   * Updates the date display with current date
   */
  const updateDate = () => {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    const dateElement = document.getElementById("date");
    if (dateElement) {
      dateElement.textContent = formattedDate;
    }
  };

  // Initialize clock and date immediately
  updateTime();
  updateDate();

  // Update the clock every second using more efficient timing
  setInterval(updateTime, 1000);
});



