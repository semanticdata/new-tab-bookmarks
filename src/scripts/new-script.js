// new-script.js now combines scripts.js, options.js and utils.js

const options = {
  TITLE: "New Tab Bookmarks",
  ROOT_FOLDER: /(bookmarks (tool)?bar|favou?rites bar)/i,
  TITLE_COLOR: "#c2c6ff",
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
    settingsButton.textContent = settingsSection.classList.contains(
      "is-visible"
    )
      ? "Hide Settings"
      : "Settings";
  });
  // });

  // document.addEventListener("DOMContentLoaded", function () {
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

const columns = [];

chrome.bookmarks.getTree((items) => {
  const bookmarksBar = items[0].children.find((x) =>
    options.ROOT_FOLDER.test(x.title)
  );

  if (!bookmarksBar) {
    console.error(`Expected a folder called '${options.ROOT_FOLDER}'`);
    return;
  }

  const rootColumn = { title: "/", children: [] };
  bookmarksBar.children.forEach((node) => {
    if (node.children) {
      const column = { title: node.title, children: [] };
      visit(column, node);
      columns.push(column);
    } else {
      addBookmark(rootColumn, node);
    }
  });

  if (rootColumn.children.length > 0) {
    columns.push(rootColumn);
  }

  render(columns);
});

const visit = (column, node, path = []) => {
  if (!node.children) {
    addBookmark(column, node, path);
    return;
  }

  node.children.forEach((child) => visit(column, child, [...path, node.title]));
};

const addBookmark = (column, node, path = []) => {
  if (!node.url || node.url.startsWith("javascript:")) {
    // Ignore bookmarklets
    return;
  }

  const isSeparator =
    options.SEPARATORS.includes(node.title) || node.type === "separator";

  column.children.push({
    title: node.title,
    url: node.url,
    path: path,
    isSeparator,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("welcome").style.color = options.TITLE_COLOR;
});

if (window.browser) {
  window.browser.runtime.getBrowserInfo().then((browser) => {
    if (browser.name === "Firefox") {
      console.log(
        `New Tab Bookmarks. On ${browser.name}, you can make this your home page by setting the following URL in your home page preferences:`
      );
      console.log(window.location.href);
    }
  });
}

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
  updateTime();

  // DATE COMPONENT
  function updateDate() {
    const now = new Date();
    const formattedDate = now.toISOString().split("T")[0];
    document.getElementById("date").textContent = formattedDate;
  }

  updateDate();
});
