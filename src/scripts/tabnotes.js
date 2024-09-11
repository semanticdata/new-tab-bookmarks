// NOTE TEXTAREA COMPONENT

document.addEventListener("DOMContentLoaded", () => {
  const notes = document.getElementById("notes");
  let timeoutId;
  const browserType = getBrowser();
  const browserObj = browserType === "Chrome" ? chrome : browser;

  document.addEventListener("keyup", () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(saveToDB, 100); // Increased delay to 100ms for performance
  });

  browserObj.tabs.onActivated.addListener(tabOpen);
  browserObj.windows.onFocusChanged.addListener(tabOpen);

  function getBrowser() {
    if (typeof chrome !== "undefined") {
      return typeof browser !== "undefined" ? "Firefox" : "Chrome";
    }
    return "Edge";
  }

  function saveToDB() {
    const data = { tab_note: notes.value };
    if (browserType === "Chrome") {
      chrome.storage.sync.set(data);
    } else {
      browserObj.storage.sync.set(data);
    }
  }

  function tabOpen() {
    const getTabNote =
      browserType === "Chrome"
        ? chrome.storage.sync.get
        : browserObj.storage.sync.get;

    getTabNote(["tab_note"]).then((result) => {
      if (result.tab_note !== undefined) {
        notes.value = result.tab_note;
      }
    });
  }

  // Call tabOpen on load to initialize the textarea with stored value
  tabOpen();
});
