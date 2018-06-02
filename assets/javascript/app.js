$(document).ready(function () {

  var topics = ["Tom Hiddleson", "Han Solo", "Michael Fassbender", "Ewan McGregor", "Chris Pratt", "Chris Pine", "Tom Hardy", "Dave Matthews"];

  // Function for displaying movie data
  function renderButtons() {

    // Deleting the movie buttons prior to adding new movie buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#men-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

      // Then dynamicaly generating buttons for each man in the array.
      // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
      var a = $("<button>");
      // Adding a class
      a.addClass("men btn btn-dark");
      // Adding a data-attribute with a value of the topic at index i
      a.attr("data-name", topics[i]);
      // Providing the button's text with a value of the topic at index i
      a.text(topics[i]);
      // Adding the button to the HTML
      $("#men-view").append(a);
    }
  }

  // This function handles events where one button is clicked
  $("#add-man").on("click", function (event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var topic = $("#man-input").val().trim();
    // The movie from the textbox is then added to our array
    topics.push(topic);

    // calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  // Calling the renderButtons function at least once to display the initial list of movies
  renderButtons();
  $("button").on("click", function () {
    var person = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=NsDtPNnfuLldTnO6zlkab0mHMMtKBHBm&q=" + person + "&limit=10&offset=0&rating=R&lang=en";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var personImage = $("<img class='gif'>");
          personImage.attr("src", results[i].images.fixed_height_still.url);
          personImage.attr("data-animate",results[i].images.fixed_height.url);
          personImage.attr("data-still",results[i].images.fixed_height_still.url);
          personImage.attr("data-state","still");

          gifDiv.prepend(p);
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });
  $("body").on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element

    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});