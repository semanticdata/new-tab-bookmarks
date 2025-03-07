// NOTE TEXTAREA COMPONENT - Handles persistent notes across browser tabs
var timeoutId
const notes = document.getElementById('notes')
document.addEventListener('keyup', logKey)

// Detect browser type to handle browser-specific APIs
const browser_type = getBrowser()
if (browser_type === 'Chrome') {
  var browser_obj = chrome
} else {
  var browser_obj = browser
}

// Add event listeners to detect tab changes and window focus changes
browser_obj.tabs.onActivated.addListener(tabOpen)
browser_obj.windows.onFocusChanged.addListener(tabOpen)

// Debounce function to save notes after user stops typing
function logKey(e) {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(function () {
    saveToDB()
  }, 10)
}

// Detect which browser is being used to handle API differences
function getBrowser() {
  if (typeof chrome !== 'undefined') {
    if (typeof browser !== 'undefined') {
      return 'Firefox'
    } else {
      return 'Chrome'
    }
  } else {
    return 'Edge'
  }
}

// Save the current note content to browser storage
function saveToDB() {
  data = {
    tab_note: document.querySelector('#notes').value
  }
  if (browser_type === 'Chrome') {
    chrome.storage.sync.set(data, function () { })
  } else {
    browser_obj.storage.sync.set(data)
  }
}

// Load saved notes when a tab is activated or window is focused
function tabOpen(tab) {
  if (browser_type === 'Chrome') {
    chrome.storage.sync.get(['tab_note'], function (result) {
      if (typeof result.tab_note !== 'undefined') {
        document.querySelector('#notes').value = result.tab_note
      }
    })
  } else {
    browser_obj.storage.sync.get(['tab_note']).then((result) => {
      if (typeof result.tab_note !== 'undefined') {
        document.querySelector('#notes').value = result.tab_note
      }
    })
  }
}

// Load saved notes when the page is first loaded
window.addEventListener('load', () => {
  tabOpen()
})
