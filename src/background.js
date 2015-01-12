function onAlarm(alarm) {
  refreshNotification();
}

chrome.browserAction.onClicked.addListener(function(tab) {
  var url = "http://www.zhihu.com/";
  chrome.tabs.query({
    "url": url,
    "currentWindow": true
  }, function(result) {
    if (result.length > 0)
      chrome.tabs.highlight({
        "tabs": result[0].index,
      }, function(window) {});
    else
      chrome.tabs.create({
        "url": url
      });
  });
});
chrome.webRequest.onCompleted.addListener(function(details) {
  if (details.tabId != -1)
    refreshNotification();
}, {
  "urls": ["http://www.zhihu.com/noti7/*"]
});
chrome.alarms.onAlarm.addListener(onAlarm);
chrome.alarms.create("refresh", {
  "periodInMinutes": 1
});
refreshNotification();
