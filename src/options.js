var allMetaOptions = [{
  "name": "show_notification",
  "type": "check",
  "text": "显示未读消息数",
  "description": "在图标的右下角显示未读消息的数目。",
  "onchange": function() {
    refreshNotification();
  },
  "sub_options": [{
    "name": "show_notification_answer",
    "type": "check",
    "text": "回答",
    "description": "计算“回答”消息的数量。",
    "onchange": function() {
      refreshNotification();
    },
  }, {
    "name": "show_notification_follow",
    "type": "check",
    "text": "关注",
    "description": "计算“关注”消息的数量。",
    "onchange": function() {
      refreshNotification();
    },
  }, {
    "name": "show_notification_vote",
    "type": "check",
    "text": "赞同和感谢",
    "description": "计算“赞同和感谢”消息的数量。",
    "onchange": function() {
      refreshNotification();
    },
  }]
}, {
  "name": "show_remark",
  "type": "check",
  "text": "在人名后显示备注",
  "description": "在用户名字的后面显示备注，点击备注可以进行更改。",
  "sub_options": [{
    "name": "show_remark_empty",
    "type": "check",
    "text": "显示添加备注按钮",
    "description": "在没有备注的用户名后面显示添加备注按钮。不选择此选项时，可以去用户的页面中添加备注。",
  }]
}, {
  "name": "show_collection",
  "type": "check",
  "text": "在答案下显示收藏",
  "description": "在用户的回答页面中的答案下显示收藏该答案的收藏夹。"
}];

function createOptionDiv(metaOption) {
  var div = document.createElement("div");
  switch (metaOption.type) {
    case "check":
      {
        var label = document.createElement("label");
        if (metaOption.hasOwnProperty("description"))
          label.setAttribute("data-tooltip", metaOption.description);
        div.appendChild(label);
        var input = document.createElement("input");
        label.appendChild(input);
        input.id = metaOption.name;
        input.type = "checkbox";
        input.style.verticalAlign = "middle";
        var text = document.createTextNode(metaOption.text);
        label.appendChild(text);
        if (metaOption.hasOwnProperty("sub_options")) {
          var subDiv = createOptionsDiv(metaOption.sub_options);
          div.appendChild(subDiv);
          subDiv.style.marginLeft = "20px";
        }
        getOption(metaOption.name, function(value) {
          input.checked = value;
          if (typeof subDiv != "undefined")
            subDiv.style.display = value ? "" : "none";
        });
        input.onchange = function() {
          changeOption(metaOption.name, input.checked);
          if (typeof subDiv != "undefined")
            subDiv.style.display = input.checked ? "" : "none";
          if (metaOption.hasOwnProperty("onchange"))
            metaOption.onchange(metaOption.name, input.checked);
        };
        break;
      }
  }
  return div;
}

function createOptionsDiv(metaOptions) {
  var div = document.createElement("div");
  for (var i in metaOptions) {
    div.appendChild(createOptionDiv(metaOptions[i]));
  }
  return div;
}

function init() {
  var resetBtn = document.getElementById("btnReset");
  resetBtn.onclick = function() {
    resetAllOptions();
    window.location.reload();
  };
  var optionsPlaceHolderDiv = document.getElementById("divOptionsPlaceHolder");
  optionsPlaceHolderDiv.appendChild(createOptionsDiv(allMetaOptions));
}

document.addEventListener('DOMContentLoaded', init);
