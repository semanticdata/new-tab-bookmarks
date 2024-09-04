const options = {
  TITLE: "New Tab Bookmarks",
  ROOT_FOLDER: /(bookmarks (tool)?bar|favou?rites bar)/i,
  TITLE_COLOR: "#c2c6ff", // Default color
  // BACKGROUND: '#1e1e2e',
  SEPARATORS: ["-", ""],
  COLOR_THEME: [
    "#ea51b2",
    "#00f769",
    "#ebff87",
    "#62d6e8",
    "#b45bcf",
    "#a1efe4",
    "#e9e9f4",
  ],
  MAX_NAME_LENGTH: 25,
};

// SETTINGS SECTION
document.addEventListener("DOMContentLoaded", function () {
  const settingsButton = document.getElementById("settings-button");
  const settingsSection = document.getElementById("settings");
  const bookmarksSection = document.getElementById("bookmarks");

  settingsButton.addEventListener("click", function () {
    settingsSection.classList.toggle("is-visible");
    bookmarksSection.classList.toggle("is-collapsed");
    settingsButton.textContent = settingsSection.classList.contains("is-visible")
      ? "Hide Settings"
      : "Settings";
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const headerTitle = document.getElementById("welcome");
  const colorPicker = document.getElementById("color-picker");
  const applyColorButton = document.getElementById("apply-color");
  const resetColorButton = document.getElementById("reset-color");

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

  // Reset color to default
  function resetColor() {
    const defaultColor = "#c2c6ff"; // Directly use the default color
    headerTitle.style.color = defaultColor;
    colorPicker.value = defaultColor;
    options.TITLE_COLOR = defaultColor; // Update the options object
    localStorage.removeItem("titleColor"); // Remove the saved color
  }

  // Apply color change
  applyColorButton.addEventListener("click", () => {
    const selectedColor = colorPicker.value;
    headerTitle.style.color = selectedColor;
    options.TITLE_COLOR = selectedColor; // Update options object
    saveSettings(selectedColor); // Save the color to localStorage
  });

  // Reset color to default when reset button is clicked
  resetColorButton.addEventListener("click", () => {
    resetColor(); // Call the reset function
  });

  // Load settings on page load
  loadSettings();
});
