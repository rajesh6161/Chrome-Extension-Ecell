chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, "toggle");
});


//Screenshot Function
var id = 100;

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name == 'clicked') {
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
            var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
            var targetId = null;

            chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {

                if (tabId != targetId || changedProps.status != "complete")
                    return;

                chrome.tabs.onUpdated.removeListener(listener);

                var views = chrome.extension.getViews();
                for (var i = 0; i < views.length; i++) {
                    var view = views[i];
                    if (view.location.href == viewTabUrl) {
                        view.setScreenshotUrl(screenshotUrl);
                        break;
                    }
                }
            });

            var views = chrome.extension.getViews();
            for (var i = 0; i < views.length; i++) {
                var view = views[i];
                if (view.location.href == viewTabUrl) {
                    view.setScreenshotUrl(screenshotUrl);
                    break;
                }
            }

            chrome.tabs.create({ url: viewTabUrl }, function(tab) {
                targetId = tab.id;
            });

            sendResponse({ ssUrl: screenshotUrl });
        });

        return true;
    }
})