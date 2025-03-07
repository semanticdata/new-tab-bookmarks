// TRUNCATE UTILITY - Shortens text to a maximum length and adds an ellipsis if needed
const trunc = (text) => {
  const maxLength = options.MAX_NAME_LENGTH;

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}…`;
};

// CLOCK COMPONENT - Updates the digital clock display with the current time in HH:MM:SS format
document.addEventListener("DOMContentLoaded", () => {
  function updateTime() {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0];
    document.getElementById("clock").textContent = formattedTime;
  }

  // Update the clock every second and initialize immediately
  setInterval(updateTime, 1000);
  updateTime(); // Initialize clock and date immediately

  // DATE COMPONENT - Displays the current date in YYYY-MM-DD format
  function updateDate() {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    document.getElementById("date").textContent = formattedDate;
  }

  // Initialize the date display
  updateDate();
});



