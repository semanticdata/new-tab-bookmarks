// TRUNCATE UTILITY
const trunc = (text) => {
  const maxLength = options.MAX_NAME_LENGTH;

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.substring(0, maxLength)}…`;
};

document.addEventListener("DOMContentLoaded", () => {
  // CLOCK COMPONENT
  function updateTime() {
    const now = new Date();
    const formattedTime = now.toTimeString().split(" ")[0];
    document.getElementById("clock").textContent = formattedTime;
  }

  setInterval(updateTime, 1000);
  updateTime(); // Initialize clock and date immediately

  // DATE COMPONENT
  function updateDate() {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    document.getElementById("date").textContent = formattedDate;
  }

  updateDate();
});

// SETTINGS
document.addEventListener("DOMContentLoaded", function () {
  const settingsButton = document.getElementById("settings-button");
  const settingsSection = document.getElementById("settings");

  settingsButton.addEventListener("click", function () {
    settingsSection.classList.toggle("is-visible");
    settingsButton.textContent = settingsSection.classList.contains(
      "is-visible"
    )
      ? "Hide Settings"
      : "Settings";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Get elements
  const headerTitle = document.getElementById("welcome");
  const colorPicker = document.getElementById("color-picker");
  const applyColorButton = document.getElementById("apply-color");

  // Load settings from localStorage
  function loadSettings() {
    const savedColor = localStorage.getItem("titleColor");
    if (savedColor) {
      options.TITLE_COLOR = savedColor;
      headerTitle.style.color = savedColor;
      colorPicker.value = savedColor;
    } else {
      // Set default color if no saved color is found
      headerTitle.style.color = options.TITLE_COLOR;
      colorPicker.value = options.TITLE_COLOR;
    }
  }

  // Save settings to localStorage
  function saveSettings(color) {
    localStorage.setItem("titleColor", color);
  }

  // Apply color change
  applyColorButton.addEventListener("click", () => {
    const selectedColor = colorPicker.value;
    headerTitle.style.color = selectedColor;
    options.TITLE_COLOR = selectedColor; // Update options object
    saveSettings(selectedColor); // Save the color to localStorage
  });

  // Load settings on page load
  document.addEventListener("DOMContentLoaded", loadSettings);
});
