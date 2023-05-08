// Clear any default options in select menus
function removeDefault() {
  var emptySelectBox = document.getElementsByTagName("select");
  for (var i = 0; i < emptySelectBox.length; i++) {
    emptySelectBox[i].selectedIndex = -1;
  }
}

removeDefault();
