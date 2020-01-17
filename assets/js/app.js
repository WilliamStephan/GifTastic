console.log("app.js is linked - global vars & main app logic"); // global vars & main app logic

var buttonData = ["saab", "volvo", "bmw", "ford", "chevrolet", "hyundai", "fiat", "honda", "ferrari", "mercedes", "nissan", "toyota", "tesla", "volkswagen"];
var templateURL = "https://api.giphy.com/v1/gifs/search?api_key=AZhHgDRHauOQUs5Ugd5HWbvLX7BuV0UO&limit=10&offset=0&lang=en&q=";
var queryURL;
var myButton;



https://api.giphy.com/v1/gifs/search?api_key=AZhHgDRHauOQUs5Ugd5HWbvLX7BuV0UO&q=Ferarri&limit=10&offset=0&rating=G&lang=en

makeButtons();

document.body.onclick = keyClick;

// launch point for click events 
function keyClick(e) { // looking for clicks  
    e = window.event ? event.srcElement : e.target;
    
    if (e.classList.contains('cars')) { // button clicked
        queryURL = templateURL + e.getAttribute('id');
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            // console.log(response);
            $("#gifs").empty();
            for (const gif of response.data) {
                $("#gifs").append('<img src="' + gif.images.original_still.url + '" data-still="' + gif.images.original_still.url + '" data-animate="' + gif.images.original.url + '" data-state="still" class="gif">');
                $("#gifs").append('<span class="rating">' + gif.rating + '</span>'); 
                console.log(gif.images.original_still)
            }
        });
    }
    if (e.classList.contains('newcar') & document.getElementById("ncar-text").value != "" & !buttonData.includes(document.getElementById("ncar-text").value)) { // new car requested - filters and repeats
      
        buttonData.push(document.getElementById("ncar-text").value);
        $("#buttons").append('<input class="btn btn-primary cars" id="' + (document.getElementById("ncar-text").value) + '" type="button" value="' + document.getElementById("ncar-text").value + '"></input>');
        
        console.log(buttonData);
        console.log("class = newCar: " + e);
    }

    
    if (e.classList.contains('gif')) { // gif clicked
        var state = $(e).attr("data-state");
        if(state === "still") {
            $(e).attr("src", $(e).attr("data-animate"));
            $(e).attr("data-state", "animate");
        } else {
            $(e).attr("src", $(e).attr("data-still"));
            $(e).attr("data-state", "still");
        }
    }
}

function makeButtons() {
    for (const button of buttonData){
        $("#buttons").append('<input class="btn btn-primary cars" id="' + button + '" type="button" value="' + button + '"></input>');
        console.log(button);
    }
}


