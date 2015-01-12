function loadAnswer(answer) {
  var url = answer.children[0].children[0].href;
  requestData("GET", url, function(data) {
    var divHidden = document.createElement("div");
    divHidden.style.display = "none";
    document.getElementsByTagName('body')[0].appendChild(divHidden);
    divHidden.innerHTML = getHTMLBody(data);
    collections = divHidden.getElementsByClassName("zm-item");
    if (collections.length > 0) {
      var fieldset = document.createElement("fieldset");
      var legend = document.createElement("legend");
      legend.innerText = "被收藏于：";
      fieldset.appendChild(legend);
      for (var j = 0; j < collections.length; j++)
        fieldset.appendChild(collections[j]);
      answer.children[1].insertBefore(fieldset, answer.children[1].children[4]);
    }
    divHidden.parentNode.removeChild(divHidden);
  });
}

getOption("show_collection", function(value) {
  if (value) {
    var answers = getArray(document.getElementsByClassName("zm-item"));
    for (var i = 0; i < answers.length; i++) {
      loadAnswer(answers[i]);
    }
  }
});
