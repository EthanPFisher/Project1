//GOOGLE DIRECTIONS API

// ---------Best Practices---------??
//-walking, cycling, driviing directions
//-show direction on map using poly lines (animate to show direction)
//-provide image of what destination looks like as well (street view?)

// URL:
// https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY

//Use DirectionsService object to get JSON of directions
//Use DirectionsRenderer to render rather than doing it ourselves


var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;


// declare apiKey variable
apiKey = "AIzaSyB5lSGcPQkieKi9JEwoRUb2IqZ656nfPl0"
// googleMapsEmbed queryURL to call
mapsQueryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyB5lSGcPQkieKi9JEwoRUb2IqZ656nfPl0&q=" + origin

function initMap(){

    var map = new google.maps.Map(document.getElementById("map-embed"),{
        zoom: 13,
        center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

}
function calculateAndDisplayRoute(directionsService, directionsDisplay){

    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    }, function (response, status){
        if (status === 'OK'){
            directionsDisplay.setDirections(response);
        } else{
            alert('Directions request failed due to ' + status);
        }
    }
    
    )
}

            
    // RETURNS LIST OF DIRECTIONS AND PUSHES TO DOM - FUNCTIONAL BELOW
    // push mapsQueryURL with userinput origin to generate initial map
    // $("#directions-map").attr('src',mapsQueryURL);

    //googleDirections queryURL to call
    function displayDirections(){
    directionsQueryURL = "https://maps.googleapis.com/maps/api/directions/json?libraries=places&origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination) + "&key=" + apiKey

    var directionsRequest = {
        // set origin
        origin: origin,
        // set destination
        destination: destination,
        // travelMode parameter (driving, walking, biking)
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        // units parameter (METRIC, IMPERIAL)
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    // get step by step directions between origin and destination
    directionsService.route(directionsRequest, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {                    
        //do work with response data
        
        var legs = response.routes[0].legs[0]
            // for loop to iterate through array of all instructions in directions
            for (var i = 0; i < legs.steps.length; i++ ){
                //log the list of directions to the console
                console.log(legs.steps[i].instructions + 'for ' + legs.steps[i].distance.text);
                //store each step of directions in variable
                var directions = legs.steps[i].instructions + 'for ' + legs.steps[i].distance.text
                var newDiv = $("<p>")
                //add each set of 'directions' to newDiv
                newDiv.html(directions);
                //append to 'get directions' button
                $("#directions-list").append(newDiv)
            }
        }
        else {
            //Error has occured
        }
    })
}


$(document).ready(function(){
    
    $("#get-directions-button").on('click',function(){
        origin = $("#from-input").val();
        destination = $("#to-input").val();
        initMap();
        displayDirections();
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    })
});
    


    
    //to get steps of route
    
    // response.routes[0].legs[0].steps
