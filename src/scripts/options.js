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
  
  // Color picker elements
  const colorPicker = document.getElementById('color-picker');
  const applyColorButton = document.getElementById('apply-color');
  const resetColorButton = document.getElementById('reset-color');
  const welcomeElement = document.getElementById('welcome');
  
  // Settings button click handler
  settingsButton.addEventListener("click", function () {
    settingsSection.classList.toggle("is-visible");
    bookmarksSection.classList.toggle("is-collapsed");
    settingsButton.textContent = settingsSection.classList.contains("is-visible")
      ? "Hide Settings"
      : "Settings";
  });

  // Load saved color or use default
  const savedColor = localStorage.getItem('titleColor') || '#c2c6ff';
  colorPicker.value = savedColor;
  welcomeElement.style.color = savedColor;
  
  // Apply color button
  applyColorButton.addEventListener('click', function() {
    const selectedColor = colorPicker.value;
    welcomeElement.style.color = selectedColor;
    localStorage.setItem('titleColor', selectedColor);
  });
  
  // Reset color button
  resetColorButton.addEventListener('click', function() {
    const defaultColor = '#c2c6ff';
    colorPicker.value = defaultColor;
    welcomeElement.style.color = defaultColor;
    localStorage.setItem('titleColor', defaultColor);
  });
});
