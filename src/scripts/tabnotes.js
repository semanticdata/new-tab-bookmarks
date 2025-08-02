// NOTE TEXTAREA COMPONENT - Handles persistent notes across browser tabs
const { api: browserAPI, type: browserType } = getBrowserInfo();

let timeoutId;
const notes = document.getElementById('notes');

// Add event listeners to detect tab changes and window focus changes
if (browserAPI.tabs && browserAPI.windows) {
  browserAPI.tabs.onActivated.addListener(tabOpen);
  browserAPI.windows.onFocusChanged.addListener(tabOpen);
}

document.addEventListener('keyup', logKey);

/**
 * Debounced function to save notes after user stops typing
 * @param {Event} e - The keyboard event
 */
const logKey = (e) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    saveToDB();
  }, 500); // Increased debounce time for better performance
};

/**
 * Saves the current note content to browser storage
 */
const saveToDB = () => {
  try {
    const notesElement = document.querySelector('#notes');
    if (!notesElement) {
      console.error('Notes element not found');
      return;
    }

    const data = {
      tab_note: notesElement.value
    };

    if (browserType === 'Chrome') {
      browserAPI.storage.sync.set(data, () => {
        if (browserAPI.runtime.lastError) {
          console.error('Error saving notes:', browserAPI.runtime.lastError);
        }
      });
    } else {
      browserAPI.storage.sync.set(data).catch(error => {
        console.error('Error saving notes:', error);
      });
    }
  } catch (error) {
    console.error('Error in saveToDB:', error);
  }
};

/**
 * Loads saved notes when a tab is activated or window is focused
 * @param {Object} tab - The tab object (optional)
 */
const tabOpen = (tab) => {
  try {
    const notesElement = document.querySelector('#notes');
    if (!notesElement) {
      console.error('Notes element not found');
      return;
    }

    if (browserType === 'Chrome') {
      browserAPI.storage.sync.get(['tab_note'], (result) => {
        if (browserAPI.runtime.lastError) {
          console.error('Error loading notes:', browserAPI.runtime.lastError);
          return;
        }
        if (typeof result.tab_note !== 'undefined') {
          notesElement.value = result.tab_note;
        }
      });
    } else {
      browserAPI.storage.sync.get(['tab_note']).then((result) => {
        if (typeof result.tab_note !== 'undefined') {
          notesElement.value = result.tab_note;
        }
      }).catch(error => {
        console.error('Error loading notes:', error);
      });
    }
  } catch (error) {
    console.error('Error in tabOpen:', error);
  }
};

// Load saved notes when the page is first loaded
window.addEventListener('load', () => {
  tabOpen();
});
