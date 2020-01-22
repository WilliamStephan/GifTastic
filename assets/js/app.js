console.log("app.js is linked - global vars & main app logic"); // global vars & main app logic

var buttonData = ["saab", "volvo", "bmw", "ford", "chevrolet", "hyundai", "fiat", "honda", "ferrari", "mercedes", "nissan", "toyota", "tesla", "volkswagen"];
var templateURL = "https://api.giphy.com/v1/gifs/search?api_key=AZhHgDRHauOQUs5Ugd5HWbvLX7BuV0UO&limit=10&offset=0&lang=en&q=";
var queryURL;

makeButtons();

document.body.onclick = keyClick;

// launch point for click events 
function keyClick(e) { // looking for clicks  
    e = window.event ? event.srcElement : e.target;
    i = 0;
    if (e.classList.contains('cars')) { // car button clicked
        queryURL = templateURL + e.getAttribute('id');
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                $("#gifs").empty();
                for (const gif of response.data) {
                    i++
                    str = "#gif-" + i;
                    $("#gifs").append('<div id="gif-' + i + '" class="clip"></div>');
                    $(str).append('<img src="' + gif.images.original_still.url + '" data-still="' + gif.images.original_still.url + '" data-animate="' + gif.images.original.url + '" data-state="still" class="gif">');
                    $(str).append('<p class="rating">RATED: ' + gif.rating + '</p>');
                }
            });
    }
    if (e.classList.contains('newcar')) { // add make clicked
        if (document.getElementById("ncar-text").value != "" & !buttonData.includes(document.getElementById("ncar-text").value.toLowerCase())) { // new car requested - filters blanks and repeats
            buttonData.push(document.getElementById("ncar-text").value.toLowerCase());
            $("#buttons").append('<input class="btn btn-primary cars" id="' + (document.getElementById("ncar-text").value) + '" type="button" value="' + document.getElementById("ncar-text").value + '">');
            document.getElementById("ncar-text").value = "";
        }
    }

    if (e.classList.contains('gif')) { // gif clicked
        var state = $(e).attr("data-state");
        if (state === "still") {
            $(e).attr("src", $(e).attr("data-animate"));
            $(e).attr("data-state", "animate");
        } else {
            $(e).attr("src", $(e).attr("data-still"));
            $(e).attr("data-state", "still");
        }
    }

    if (e.classList.contains('clearall')) { // clear clicked
        $("#gifs").empty();
    }
}

function makeButtons() { // create buttons 
    for (const button of buttonData) {
        $("#buttons").append('<input class="btn btn-primary cars" id="' + button + '" type="button" value="' + button + '"></input>');
    }

}