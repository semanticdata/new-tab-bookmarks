const options = {
  TITLE: "New Tab Bookmarks",
  ROOT_FOLDER: /(bookmarks (tool)?bar|favou?rites bar)/i,
  TITLE_COLOR: "#c2c6ff", // Default color
  DEFAULT_FONT_SIZE: "16", // Default bookmarks font size
  DEFAULT_NOTES_FONT_SIZE: "16", // Default notes font size
  BACKGROUND_COLOR: "#1e1e2e", // Default background color
  NOTE_BACKGROUND_COLOR: "#1a1b27", // Default note background color
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

  // Background color picker elements
  const bgColorPicker = document.getElementById('bg-color-picker');
  const applyBgColorButton = document.getElementById('apply-bg-color');
  const resetBgColorButton = document.getElementById('reset-bg-color');
  const bodyElement = document.body;

  // Note background color picker elements
  const noteBgColorPicker = document.getElementById('note-bg-color-picker');
  const applyNoteBgColorButton = document.getElementById('apply-note-bg-color');
  const resetNoteBgColorButton = document.getElementById('reset-note-bg-color');

  // Title color picker elements
  const titleColorPicker = document.getElementById('title-color-picker');
  const applyTitleColorButton = document.getElementById('apply-title-color');
  const resetTitleColorButton = document.getElementById('reset-title-color');
  const welcomeElement = document.getElementById('welcome');

  // Settings button click handler
  settingsButton.addEventListener("click", function () {
    settingsSection.classList.toggle("is-visible");
    bookmarksSection.classList.toggle("is-collapsed");
    settingsButton.textContent = settingsSection.classList.contains("is-visible")
      ? "Hide Settings"
      : "Settings";
  });

  // Load saved background color or use default
  const savedBgColor = localStorage.getItem('backgroundColor') || options.BACKGROUND_COLOR;
  bgColorPicker.value = savedBgColor;
  document.documentElement.style.setProperty('--body-background', savedBgColor);

  // Apply background color button
  applyBgColorButton.addEventListener('click', function () {
    const selectedColor = bgColorPicker.value;
    document.documentElement.style.setProperty('--body-background', selectedColor);
    localStorage.setItem('backgroundColor', selectedColor);
  });

  // Reset background color button
  resetBgColorButton.addEventListener('click', function () {
    const defaultColor = options.BACKGROUND_COLOR;
    bgColorPicker.value = defaultColor;
    document.documentElement.style.setProperty('--body-background', defaultColor);
    localStorage.setItem('backgroundColor', defaultColor);
  });

  // Load saved note background color or use default
  const savedNoteBgColor = localStorage.getItem('noteBackgroundColor') || options.NOTE_BACKGROUND_COLOR;
  noteBgColorPicker.value = savedNoteBgColor;
  document.documentElement.style.setProperty('--note-background', savedNoteBgColor);

  // Apply note background color button
  applyNoteBgColorButton.addEventListener('click', function () {
    const selectedColor = noteBgColorPicker.value;
    document.documentElement.style.setProperty('--note-background', selectedColor);
    localStorage.setItem('noteBackgroundColor', selectedColor);
  });

  // Reset note background color button
  resetNoteBgColorButton.addEventListener('click', function () {
    const defaultColor = options.NOTE_BACKGROUND_COLOR;
    noteBgColorPicker.value = defaultColor;
    document.documentElement.style.setProperty('--note-background', defaultColor);
    localStorage.setItem('noteBackgroundColor', defaultColor);
  });

  // Load saved title color or use default
  const savedTitleColor = localStorage.getItem('titleColor') || options.TITLE_COLOR;
  titleColorPicker.value = savedTitleColor;
  document.documentElement.style.setProperty('--title-color', savedTitleColor);
  welcomeElement.style.color = savedTitleColor;

  // Apply title color button
  applyTitleColorButton.addEventListener('click', function () {
    const selectedColor = titleColorPicker.value;
    document.documentElement.style.setProperty('--title-color', selectedColor);
    welcomeElement.style.color = selectedColor;
    localStorage.setItem('titleColor', selectedColor);
  });

  // Reset title color button
  resetTitleColorButton.addEventListener('click', function () {
    const defaultColor = options.TITLE_COLOR;
    titleColorPicker.value = defaultColor;
    document.documentElement.style.setProperty('--title-color', defaultColor);
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
  applyFontButton.addEventListener('click', function () {
    const selectedSize = fontSizeInput.value;
    bookmarksContainer.style.fontSize = `${selectedSize}px`;
    localStorage.setItem('fontSize', selectedSize);
  });

  // Reset bookmarks font size button
  resetFontButton.addEventListener('click', function () {
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
  applyNotesFontButton.addEventListener('click', function () {
    const selectedSize = notesFontSizeInput.value;
    notesTextarea.style.fontSize = `${selectedSize}px`;
    localStorage.setItem('notesFontSize', selectedSize);
  });

  // Reset notes font size button
  resetNotesFontButton.addEventListener('click', function () {
    notesFontSizeInput.value = options.DEFAULT_NOTES_FONT_SIZE;
    notesTextarea.style.fontSize = `${options.DEFAULT_NOTES_FONT_SIZE}px`;
    localStorage.setItem('notesFontSize', options.DEFAULT_NOTES_FONT_SIZE);
  });
});
