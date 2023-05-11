const currentDate = new Date();
function showform(dowhat) {
  /*
   * four DIVS: browse, insert, update, delete
   * this function sets one visible the others not
   */
  if (dowhat == "insert") {
    document.getElementById("browse").style.display = "none";
    document.getElementById("insert").style.display = "block";
    document.getElementById("update").style.display = "none";
    document.getElementById("delete").style.display = "none";
  } else if (dowhat == "update") {
    document.getElementById("browse").style.display = "none";
    document.getElementById("insert").style.display = "none";
    document.getElementById("update").style.display = "block";
    document.getElementById("delete").style.display = "none";
  } else if (dowhat == "delete") {
    document.getElementById("browse").style.display = "none";
    document.getElementById("insert").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("delete").style.display = "block";
  } else if (dowhat == "all") {
    document.getElementById("browse").style.display = "block";
    document.getElementById("insert").style.display = "block";
    document.getElementById("update").style.display = "block";
    document.getElementById("delete").style.display = "block";
  } else {
    //by default display browse
    document.getElementById("browse").style.display = "block";
    document.getElementById("insert").style.display = "none";
    document.getElementById("update").style.display = "none";
    document.getElementById("delete").style.display = "none";
  }
}
function newOrder() {
  showform("insert");
}
function updateOrder(pid) {
  showform("update");
}
function deleteOrder(pid) {
  showform("delete");
}
function browseOrder() {
  showform("browse");
}
function showAll() {
  showform("all");
}