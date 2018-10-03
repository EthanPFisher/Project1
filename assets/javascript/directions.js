//GOOGLE DIRECTIONS API

// ---------Best Practices---------
//-walking, cycling, driviing directions
//-show direction on map using poly lines (animate to show direction)
//-provide image of what destination looks like as well (street view?)

// URL:
// https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&key=YOUR_API_KEY

//Use DirectionsService object to get JSON of directions
//Use DirectionsRenderer to render rather than doing it ourselves

var transportMethod = 'DRIVING';
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
var origin;
var destination;
// var flag = false;

// declare apiKey variable
apiKey = "AIzaSyB5lSGcPQkieKi9JEwoRUb2IqZ656nfPl0"
// googleMapsEmbed queryURL to call
mapsQueryURL = "https://www.google.com/maps/embed/v1/place?key=AIzaSyB5lSGcPQkieKi9JEwoRUb2IqZ656nfPl0&q=" + origin

function initMap(lat, long) {

    var map = new google.maps.Map(document.getElementById("map-embed"), {
        zoom: 13,
        center: { lat: lat, lng: long }
    });
    var marker = new google.maps.Marker({
        position: { lat: lat, lng: long },
        map: map
    })
    directionsDisplay.setMap(map, marker);
}
// function to show route overlay on map embed
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    // var transportMethod = 'DRIVING';
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: transportMethod
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            alert('Directions request failed due to ' + status);
        }
    })
}

function getTransportMethod() {
    // if (flag === false) {
    //     return google.maps.DirectionsTravelMode.DRIVING;
    // } else {
    if (transportMethod === 'DRIVING') {
        return google.maps.DirectionsTravelMode.DRIVING;
    } else if (transportMethod === 'WALKING') {
        return google.maps.DirectionsTravelMode.WALKING;
    } else if (transportMethod === 'BICYCLING') {
        return google.maps.DirectionsTravelMode.BICYCLING;
    } else if (transportMethod === 'TRANSIT') {
        return google.maps.DirectionsTravelMode.TRANSIT;
    }
    // }
}

//googleDirections queryURL to call
function displayDirections() {

    var directionsRequest = {
        // set origin
        origin: origin,
        // set destination
        destination: destination,
        // travelMode parameter (driving, walking, biking)
        travelMode: getTransportMethod(),
        // units parameter (METRIC, IMPERIAL)
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };
    // logs 'driving' to console
    console.log(directionsRequest.travelMode)

    // get step by step directions between origin and destination
    directionsService.route(directionsRequest, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            $("#directions-list").empty();
            //do work with response data
            var legs = response.routes[0].legs[0]
            // dynamically creating table for directions infor
            var table = $("<table class='striped'>");
            var tableHead = $("<thead>");
            var row = $("<tr>");
            var th = $("<th>");
            var newTh = $("<th>").attr("id", "totals");
            var tableBody = $("<tbody>");
            row.append(th, newTh);
            tableHead.append(row);
            table.append(tableHead, tableBody);
            // for loop to iterate through array of all instructions in directions
            for (var i = 0; i < legs.steps.length; i++) {

                //log the list of directions to the console
                console.log(legs.steps[i].instructions + ' for ' + legs.steps[i].distance.text);
                //store each step of directions in variable
                var directions = legs.steps[i].instructions + ' for ' + legs.steps[i].distance.text
                var newDiv = $("<td>")
                //add each set of 'directions' to newDiv
                newDiv.html(directions);
                var stepNumber = $("<td>").text((i + 1) + ".)")
                var newRow = $("<tr>")
                newRow.append(stepNumber, newDiv);
                tableBody.append(newRow);
            }
            newTh.html("<u>Total Distance: </u>" + legs.distance.text + "<br>" + "<u>Total Travel Time: </u>" + legs.duration.text);
            // Append table to DOM
            $("#directions-list").append(table);
        }
        else {
            //Error has occured
        }
    })
}

$(document).on("click", ".map-button", function () {
    // Clicking google maps button grabs the event address
    destination = $(this).attr("data-address");
    var thisLat = parseFloat($(this).attr("data-lat"));
    var thisLong = parseFloat($(this).attr("data-long"));
    $("#to-input").val(destination);
    // Empty's div so directions don't double up
    $("#directions-list").empty();
    console.log(thisLat);
    console.log(thisLong);
    initMap(thisLat, thisLong);
})

$("#google-form").on('submit', function (event) {
    event.preventDefault();
    origin = $("#from-input").val();
    displayDirections();
    calculateAndDisplayRoute(directionsService, directionsDisplay);
})

$(".material-icons").on('click', function () {
    // flag = true;
    transportMethod = $(this).attr('id');
    console.log(transportMethod);
})



