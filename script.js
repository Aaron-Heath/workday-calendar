// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var $timeBlocks = $("body").children("div").children("div");
  var $currentDay = $("#currentDay");

  var now = dayjs();
  var militaryHour = now.format("H")
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  function renderBlocks() {
    for (let $child of $timeBlocks) {

      // TODO: Add code to get any user input that was saved in localStorage and set
      // the values of the corresponding textarea elements. HINT: How can the id
      // attribute of each time-block be used to do this?
      // Get information from local storage if it exists
      let storedData = localStorage.getItem($child.id);
      if(storedData) {
        console.log(storedData);
        $($child).children("textarea").val(storedData);
      }
      


      let childHour = $child.id.split("-")[1];
      console.log(childHour);

      // Flow control: Add class past, present, or future based on the childElement's ID.
      if(parseInt(childHour) < parseInt(militaryHour)) {
        $($child).addClass("past");
      }
      else if(childHour === now.format("H")) {
        $($child).addClass("present");
      } else {
        $($child).addClass("future");

      }
    }
  }
  //

  //
  // TODO: Add code to display the current date in the header of the page.
  $currentDay.text(now.format("dddd MMMM D, YYYY"))

  renderBlocks();
});
