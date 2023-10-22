// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var $mainContent = $("body").children("div")
  var $timeBlocks = $mainContent.children("div");
  var $currentDay = $("#currentDay");

  var now = dayjs();
  var militaryHour = now.format("H")

$timeBlocks.on("click", "button", function(event) {
  let $parentBlock = $(event.target).parent()//.parent();
  console.log($parentBlock)
  let elId = $parentBlock.attr('id');
  console.log(elId);
  let elInput = $parentBlock.children("textarea").val()
  console.log(elInput);
  localStorage.setItem(elId,elInput);

})

  function renderBlocks() {
    for (let $child of $timeBlocks) {
      // Get information from local storage if it exists
      let storedData = localStorage.getItem($child.id);
      if(storedData) {
        $($child).children("textarea").val(storedData);
      }
      


      let childHour = $child.id.split("-")[1];

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
