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
    
    $("#get-directions-button").on('click', function(event){
        event.preventDefault;
        // store origin from input
        var origin = $("#from-input").val();
        console.log(origin)
        // store destination from input
        var destination = $("#to-input").val();
        console.log(destination)
        // origin = "seattle";
        // destination = 'portland';
   
        
    //googleDirections queryURL to call
    directionsQueryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination) + "&key=" + apiKey
    
    // googleMapsEmd
    // mapsEmbedQueryURL = "https://www.google.com/maps/embed/v1/place?&q="+eventLocation+"&key="+apiKey
    // console.log(mapsEmbedQueryURL);

    console.log(directionsQueryURL);
    
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
                console.log(legs.steps[i].instructions + ' for ' + legs.steps[i].distance.text);
                //store each step of directions in variable
                var directions = legs.steps[i].instructions + ' for ' + legs.steps[i].distance.text
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
})


    
    //to get steps of route
    
    // response.routes[0].legs[0].steps
})
