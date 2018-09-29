
function generateCards(imgSRC, title, eventAddress, eventLat, eventLong, venueName, startTime, eventWebsite){
    var newResult = $("<div class='col s12 m4'>");
    var newCard = $("<div class='card sticky-action hoverable'>");
    var newCardImage = $("<div class='card-image waves-effect waves-block waves-light'>");
    var newImage = $("<img class='activator'>").attr("src", imgSRC);
    newCardImage.append(newImage);
    var newCardContent = $("<div class='card-content'>");
    var cardTitle = $("<span class='card-title activator'>");
    cardTitle.html(title + "<i class='material-icons right'>more_vert</i>");
    newCardContent.append(cardTitle);
    var newCardAction = $("<div class='card-action'>");
    var newLink = $("<a>").attr({
        "href": "#map-modal", 
        "class": "modal-trigger map-button", 
        "data-address": eventAddress,
        "data-lat": eventLat,
        "data-long": eventLong
    });
    newLink.text("Google Maps");
    newCardAction.append(newLink);
    var newCardReveal = $("<div class='card-reveal'>");
    var revealTitle = $("<span class='card-title grey-text text-darken-4'>");
    revealTitle.html("<u>Event Details: </u><i class='material-icons right'>close</i>");
    var eventDetails = $("<div class='event-details'>");
    var eventVenue = $("<span>").text("Venue: " + venueName);
    var eventTime = $("<span>").text("Start Time: " + startTime);
    var url = $("<a>").attr("href", eventWebsite).html("<u>Eventful</u>");
    var eventURL = $("<span>").text("For more information please visit: ");
    eventDetails.append("<br>", eventVenue, "<br><br>", eventTime, "<br><br>", eventURL, url);
    newCardReveal.append(revealTitle,"<br>", eventDetails);
    newCard.append(newCardImage, newCardContent, newCardAction, newCardReveal);
    newResult.append(newCard);
    $("#results-display").append(newResult);
}

$(document).ready(function () {

    var key = '9SPHrSHsCzcbp2ck'
    var location = ''
    var date = ''
    var category = ''
    var imgSRC = ""

    $('#search-button').on('click', function () {
        $("#results-display").empty();
        if(!inputValidation("#date-input")){
            return;
        };
        if(!inputValidation("#location-input")){
            return;
        }
        $("#search-loader").removeClass("hide");
        if ($('#location-input').val() != '') {
            location = '&location=' + $('#location-input').val().trim()
        }
        if ($('#date-input').val() != '') {
            var dateEl = $('#date-input').val().split("-")
            date = '&date=' + dateEl[0] + dateEl[1] + dateEl[2] + '00-' + dateEl[0] + dateEl[1] + dateEl[2] + '00'
        }
        if ($('#category-input').val() != null) {
            category = '&category=' + $('#category-input').val()
        }
        $("#title-location").text($('#location-input').val().trim());
        $("#title-date").text(moment($("#date-input").val(), "YYYY-MM-DD").format("L"));

        var queryUrl = 'http://api.eventful.com/json/events/search?sort_order=popularity&image_sizes=large&page_size=9&app_key=' + key + location + category + date

        // console.log(queryUrl)

        $.ajax({
            url: queryUrl,
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            dataType: 'jsonp',
        }).then(function (res) {
            $("#search-loader").addClass("hide");

            if(res.events === null){
                console.log("no events");
                $("#no-event-modal").modal("open");
                return;
            }
            // console.log(res)
            var events = res.events.event

            $(".banner").removeClass("page-load");
            $(".results").removeClass("page-load");
            $(".page-footer").removeClass("page-load");
            for (i = 0; i < events.length; i++) {

                var title = events[i].title
                var venue = events[i].venue_name
                var time = moment(events[i].start_time, 'YYYY-MM-DD hh:mm:ss').format("MMMM Do YYYY, h:mm a")
                var address = events[i].venue_address + "," + events[i].city_name
                var url = events[i].url
                var lat = events[i].latitude
                var long = events[i].longitude
                // if event doesn't have image, use placeholder img
                if(events[i].image === null){
                    imgSRC = "https://source.unsplash.com/random/500x500";
                }
                else{
                    imgSRC = events[i].image.large.url;
                }
                generateCards(imgSRC, title, address, lat, long, venue, time, url);
            }

        })

    })

})