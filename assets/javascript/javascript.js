    $("#add-animal").on("click", function() {
       //build the new button
        var newAnimalBtn = $("<button>");
        newAnimalBtn.attr("class", "btn btn-primary")
        var newAnimalName = $("#new-animal-txt").val().trim();
        newAnimalBtn.attr("value", newAnimalName);
        newAnimalBtn.text($("#new-animal-txt").val().trim());
            //hang onClick onto the newly created button
            newAnimalBtn.on("click", function() {
                callGiffyAPI((this.value));
            }),

        $(".buttons-sec").append(newAnimalBtn);
    });

    function callGiffyAPI(animal) {
        console.log("animal=" + animal);

        var limitNbr = 10;
        var offset = 0;
        var rating = "PG-13";
        var queries = "&q=" + animal;
        var queryDetails = "&limit=" + limitNbr + "&offset=0&rating=" + rating + "&lang=en" + queries;
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jRQKz8EdbFfrbcpQW00gqpwr30QebFwC" + queryDetails;

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        // define the funtion to be executed when the api returns
        .then(function(response) {
            console.log(response);
            var animalDiv = $("<div>");
            for (var i = 0; i < response.data.length; i++) {
                // Creating and storing a div tag
                var p = $("<p>");
                var ratingDiv = $("<div>");
                ratingDiv.text("GIF Rating: " + response.data[i].rating);
                p.append(ratingDiv);
                var animalImage = $("<img>");
                animalImage.attr("src", response.data[i].images.fixed_width_small_still.url);

                animalImage.attr("data-animate", response.data[i].images.fixed_width_small.url);
                animalImage.attr("data-still", response.data[i].images.fixed_width_small_still.url);
                animalImage.attr("data-state", "still");

                animalImage.on("click", function() {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                      } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                      }
                }),

                animalDiv.append(p);
                animalDiv.append(animalImage);
            }
            $("#gif-section").empty();
            $("#gif-section").append(animalDiv);
        })
    };

    // $(".gif").on("click", function() {
    //     // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        
    //     // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    //     // Then, set the image's data-state to animate
    //     // Else set src to the data-still value
       
    //   });