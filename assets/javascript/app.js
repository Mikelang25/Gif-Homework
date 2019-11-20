
var topics =["Yankees","Golden Retrievers","Chelsea Soccer","Golf"];

$(document).ready(function() {

$("#gif").prop("checked",true);

createButtons();

function createButtons(){
    $("#buttons-main").empty();
    for(var i=0; i<topics.length;i++){
        var b = $("<button>");
        b.addClass("topic");
        b.attr("data-subject",topics[i]);
        b.text(topics[i]);
        $("#buttons-main").append(b);
    }


}
    $("#btn-create").on("click", function() {
        if($("#subject-box").val()===""){
            //does nothing if the user has not inputted a value
        }else{
            var a =$("#subject-box").val().trim();
            topics.push(a);
            createButtons();
            $("#subject-box").val("");
        }
    });

    function locateGifs() {
        var topicChosen = $(this).attr("data-subject")
        
        //determines if the user wants to search for a gif or movie related to the button that they are pushing
        var searchType = $("input[name='search']:checked").val();
        if(searchType ==="gif"){

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +topicChosen +"&api_key=p3nITdKm6Y1QRGMwkxH7z3dv2c11jB7w&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
            }) .then(function(response) {
                console.log(response);
                var results = response.data;
    
                for(var j=0; j<results.length;j++){
                   var newGif = $("<div>"); 
                   newGif.addClass("gif-container");
                   gifImage = $("<img>");
                   gifImage.addClass("gif");
                   gifImage.attr("src",results[j].images.fixed_height_still.url);
                   gifImage.attr("gif-still",results[j].images.fixed_height_still.url);
                   gifImage.attr("gif-animate",results[j].images.fixed_height.url);
                   gifImage.attr("state","still");
                   var t = $("<p>");
                   t.text(results[j].title);
                   var r = $("<p>");
                   r.text("Rating: " + results[j].rating);
                   newGif.append(gifImage);
                   newGif.append(t);
                   newGif.append(r);
                   $("#gifs-main").prepend(newGif);
                }
            });

        }else if (searchType ==="movie"){
            //code to search and return for the movie items 
            var queryURL = "https://www.omdbapi.com/?t=" + topicChosen + "&apikey=trilogy";

            $.ajax({
                url: queryURL,
                method: "GET"
            }) .then(function(response) {
                console.log(response);
                var movieDiv = $("<div>")
                var movieImage = $("<img>");
                movieImage.attr("src",response.Poster);
                var mt = $("<p>");
                mt.text(response.Title);
                var mr = $("<p>");
                mr.text(response.Rated);
                movieDiv.append(movieImage);
                movieDiv.append(mt);
                movieDiv.append(mr);
                $("#gifs-main").prepend(movieDiv);
            });
        }

    }

    function alterGifs(){
        var state = $(this).attr("state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("gif-animate"));
          $(this).attr("state", "animate");
        } else {
          $(this).attr("src", $(this).attr("gif-still"));
          $(this).attr("state", "still");
        }
    }

    $(document).on("click", ".topic", locateGifs);
    $(document).on("click", ".gif", alterGifs);

});