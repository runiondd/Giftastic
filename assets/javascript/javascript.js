    var topics = ["Monkey", "Horse", "Dog"];
    
    $(document).ready(function() {
        console.log("here");
        buildButtonsFromArrayOfTopics();
    });

    $("#add-animal").on("click", function() {
        topics.push($("#new-animal-txt").val().trim());
        console.log("new value=" + $("#new-animal-txt").val().trim());
        buildButtonsFromArrayOfTopics();
    });

    function buildButtonsFromArrayOfTopics() {
        console.log("enter buildButtonsFromArrayOfTopics");
        $(".buttons-sec").empty();
        for (var i=0;i<topics.length;i++) {
            var newAnimalBtn = $("<button>");
            newAnimalBtn.attr("class", "btn btn-primary")
            // ..var newAnimalName = topics[i];
            console.log("topics[i]=" + topics[i]);
            newAnimalBtn.attr("value", topics[i]);
            newAnimalBtn.text(topics[i]);
            //hang onClick onto the newly created button
            newAnimalBtn.on("click", function() {
                callGiffyAPI((this.value));
            }),
            
            $(".buttons-sec").append(newAnimalBtn);
        }
    }

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

  