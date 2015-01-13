function getArray(nl) {
  var arr = [];
  for (var i = nl.length; i--; arr.unshift(nl[i]));
  return arr;
}

function requestData(method, url, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (callback && request.readyState == 4)
      callback(request.responseText);
  };
  request.open(method, url, true);
  request.send(null);
}

function getHTMLBody(content) {
  test = content.toLowerCase();
  var x = test.indexOf("<body");
  if (x == -1) return "";
  x = test.indexOf(">", x);
  if (x == -1) return "";
  var y = test.lastIndexOf("</body>");
  if (y == -1) y = test.lastIndexOf("</html>");
  if (y == -1) y = content.length;
  return content.slice(x + 1, y);
}

//===Notification===
function refreshNotification() {
  requestData("GET", "http://www.zhihu.com/noti7/new?r=" + +new Date, function(data) {
    data = JSON.parse(data);
    getAllOptions(function(options) {
      var num = 0;
      if (options.show_notification) {
        if (options.show_notification_answer)
          num += data[1][0];
        if (options.show_notification_follow)
          num += data[1][1];
        if (options.show_notification_vote)
          num += data[1][2];
      }
      if (num > 0)
        chrome.browserAction.setBadgeText({
          "text": num.toString()
        });
      else
        chrome.browserAction.setBadgeText({
          "text": ""
        });
    });
  });
}

function getPersonID(href) {
  var str = "people/";
  var i = href.indexOf(str);
  if (i < 0)
    return null;
  var j = href.indexOf("/", i + str.length);
  if (j < 0)
    return href.substr(i + str.length);
  return href.substring(i + str.length, j);
}

//===Options===
function resetAllOptions(callback) {
  options = {
    "show_notification": true,
    "show_notification_answer": true,
    "show_notification_follow": true,
    "show_notification_vote": true,
    "show_remark": true,
    "show_remark_empty": true,
    "show_collection": true,
  };
  chrome.storage.sync.set({
    "options": options
  }, function() {
    callback(options);
  });
}

function getAllOptions(callback) {
  chrome.storage.sync.get("options", function(items) {
    if (!items.hasOwnProperty("options"))
      resetAllOptions(function(options) {
        callback(options);
      });
    else
      callback(items.options);
  });
}

function changeOption(name, value) {
  getAllOptions(function(options) {
    options[name] = value;
    chrome.storage.sync.set({
      "options": options
    });
  });
}

function getOption(name, callback) {
  getAllOptions(function(options) {
    callback(options[name]);
  });
}

//===remark===
function getAllRemarks(callback) {
  chrome.storage.sync.get("remarks", function(items) {
    if (!items.hasOwnProperty("remarks")) {
      var remarks = {};
      chrome.storage.sync.set({
        "remarks": remarks
      }, function() {
        callback(remarks)
      });
    }
    else
      callback(items.remarks);
  });
}

function changeRemark(name, value) {
  getAllRemarks(function(remarks) {
    remarks[name] = value;
    chrome.storage.sync.set({
      "remarks": remarks
    });
  });
}

function getRemark(name, callback) {
  getAllRemarks(function(remarks) {
    callback(remarks[name]);
  });
}
