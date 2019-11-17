
var topics =["Yankees","Golden Retrievers","Chelsea Soccer","Golf"];

$(document).ready(function() {

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

    $("#btn-create").on("click", function() {
        var a =$("#subject-box").val().trim();
        topics.push(a);
        createButtons();
    });
}

    $(".topic").on("click", function() {
        var topicChosen = $(this).attr("data-subject")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +topicChosen +"&api_key=p3nITdKm6Y1QRGMwkxH7z3dv2c11jB7w&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }) .then(function(response) {
            console.log(response);
            var results = response.data;

            for(var j=0; j<results.length;i++){

                
            }
        })

    });


});