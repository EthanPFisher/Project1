//GOOGLE DIRECTIONS API

// ---------Best Practices---------??
//-walking, cycling, driviing directions
//-show direction on map using poly lines (animate to show direction)
//-provide image of what destination looks like as well (street view?)

// URL:
// https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY

//Use DirectionsService object to get JSON of directions
//Use DirectionsRenderer to render rather than doing it ourselves




$(document).ready(function(){
    var directionsService = new google.maps.DirectionsService();

    // declare apiKey variable
    apiKey = "AIzaSyB5lSGcPQkieKi9JEwoRUb2IqZ656nfPl0"
    
    // declare origin variable
    origin = "seattle";
    
    // declare destination variable
    destination = "bellingham";
    
    // googleDirections queryURL to call
    queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination) + "&key=" + apiKey
    
    console.log(queryURL);
    
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
    
            for (var i = 0; i < legs.steps.length; i++ ){
                console.log(legs.steps[i].instructions + 'for ' + legs.steps[i].distance.text);
                var directions = legs.steps[i].instructions + 'for ' + legs.steps[i].distance.text
                var newDiv = $("<p>")
                newDiv.text(directions);
                $("#directions-list").append(newDiv)
            }
        }
        else {
            //Error has occured
        }
    })

    
    //to get steps of route
    
    // response.routes[0].legs[0].steps
})
