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

function displayRemark(person, id, remark, showEmpty) {
  var link = document.createElement("a");
  if (remark != null || showEmpty) {
    link.appendChild(document.createTextNode("（" + (remark != null ? remark : "添加备注") + "）"));
    link.style.cursor = "pointer";
    link.onclick = function() {
      var value = prompt("输入新备注", remark != null ? remark : person.innerText);
      if (value != null) {
        changeRemark(id, value);
        link.innerText = "（" + value + "）";
      }
    };
    person.parentNode.insertBefore(link, person.nextSibling);
  }
}

getOption("show_remark", function(value) {
  if (value) {
    getAllRemarks(function(remarks) {
      var people = getArray(document.getElementsByTagName("a"));
      for (var i = 0; i < people.length; i++) {
        if (people[i].children.length == 0 && people[i].className != "member_mention") {
          var id = getPersonID(people[i].href);
          if (id != null) {
            if (people[i].parentNode.className == "source") // 关注的人
              displayRemark(people[i], id, remarks[id], true);
            else if (people[i].parentNode.className == "zm-item-answer-author-wrap") // 回答的人
              displayRemark(people[i], id, remarks[id], true);
            else if (people[i].parentNode.className == "reason") // 关注的也关注可能感兴趣的人的人
              displayRemark(people[i], id, remarks[id], true);
          }
        }
      }
      var id = getPersonID(window.location.href);
      if (id != null) { // 人的页面
        var people = getArray(document.getElementsByClassName("title-section"));
        for (var i = 0; i < people.length; i++)
          displayRemark(people[i].children[0], id, remarks[id], true);
      }
    });
  }
});
