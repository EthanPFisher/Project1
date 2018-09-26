//GOOGLE DIRECTIONS API

// ---------Best Practices---------??
//-walking, cycling, driviing directions
//-show direction on map using poly lines (animate to show direction)
//-provide image of what destination looks like as well (street view?)

// URL:
// https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY

//Use DirectionsService object to get JSON of directions
//Use DirectionsRenderer to render rather than doing it ourselves


var directionsService = new google.maps.DirectionsService();


apiKey = "AIzaSyB5lSGcPQkieKi9JEwoRUb2IqZ656nfPl0"

origin = "seattle";

destination = "bellingham";

queryURL = "https://maps.googleapis.com/maps/api/directions/json?origin=" + encodeURIComponent(origin) + "&destination=" + encodeURIComponent(destination) + "&key=" + apiKey

console.log(queryURL);

var directionsRequest = {
    origin: origin,
    destination: destination,
    travelMode: google.maps.DirectionsTravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC
};
directionsService.route(directionsRequest, function (response, status) {
    if (status == google.maps.DirectionsStatus.OK) {                    
    //do work with response data
    console.log(response.routes[0].legs[0].steps);
    }
    else{
        //Error has occured
    }
})

//to get steps of route

// response.routes[0].legs[0].steps