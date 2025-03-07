const options = {
  TITLE: "New Tab Bookmarks",
  ROOT_FOLDER: /(bookmarks (tool)?bar|favou?rites bar)/i,
  TITLE_COLOR: "#c2c6ff", // Default color
  DEFAULT_FONT_SIZE: "16", // Default bookmarks font size
  DEFAULT_NOTES_FONT_SIZE: "16", // Default notes font size
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
  
  // Bookmarks font size elements
  const fontSizeInput = document.getElementById('font-size');
  const applyFontButton = document.getElementById('apply-font');
  const resetFontButton = document.getElementById('reset-font');
  const bookmarksContainer = document.getElementById('bookmarks');
  
  // Load saved bookmarks font size or use default
  const savedFontSize = localStorage.getItem('fontSize') || options.DEFAULT_FONT_SIZE;
  fontSizeInput.value = savedFontSize;
  bookmarksContainer.style.fontSize = `${savedFontSize}px`;
  
  // Apply bookmarks font size button
  applyFontButton.addEventListener('click', function() {
    const selectedSize = fontSizeInput.value;
    bookmarksContainer.style.fontSize = `${selectedSize}px`;
    localStorage.setItem('fontSize', selectedSize);
  });
  
  // Reset bookmarks font size button
  resetFontButton.addEventListener('click', function() {
    fontSizeInput.value = options.DEFAULT_FONT_SIZE;
    bookmarksContainer.style.fontSize = `${options.DEFAULT_FONT_SIZE}px`;
    localStorage.setItem('fontSize', options.DEFAULT_FONT_SIZE);
  });
  
  // Notes font size elements
  const notesFontSizeInput = document.getElementById('notes-font-size');
  const applyNotesFontButton = document.getElementById('apply-notes-font');
  const resetNotesFontButton = document.getElementById('reset-notes-font');
  const notesTextarea = document.getElementById('notes');
  
  // Load saved notes font size or use default
  const savedNotesFontSize = localStorage.getItem('notesFontSize') || options.DEFAULT_NOTES_FONT_SIZE;
  notesFontSizeInput.value = savedNotesFontSize;
  notesTextarea.style.fontSize = `${savedNotesFontSize}px`;
  
  // Apply notes font size button
  applyNotesFontButton.addEventListener('click', function() {
    const selectedSize = notesFontSizeInput.value;
    notesTextarea.style.fontSize = `${selectedSize}px`;
    localStorage.setItem('notesFontSize', selectedSize);
  });
  
  // Reset notes font size button
  resetNotesFontButton.addEventListener('click', function() {
    notesFontSizeInput.value = options.DEFAULT_NOTES_FONT_SIZE;
    notesTextarea.style.fontSize = `${options.DEFAULT_NOTES_FONT_SIZE}px`;
    localStorage.setItem('notesFontSize', options.DEFAULT_NOTES_FONT_SIZE);
  });
});
