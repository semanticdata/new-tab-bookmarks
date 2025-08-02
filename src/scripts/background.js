browser.runtime.onInstalled.addListener(() => {
    browser.tabs.create({
        url: browser.runtime.getURL("src/index.html")
    });
});