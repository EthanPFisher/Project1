
function generateCards(imgSRC, title, eventAddress, venueName, startTime, eventWebsite){
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
    var newLink = $("<a>").attr({"href": "#map-modal", "class": "modal-trigger map-button", "data-address": eventAddress });
    newLink.text("Google Maps");
    newCardAction.append(newLink);
    var newCardReveal = $("<div class='card-reveal'>");
    var revealTitle = $("<span class='card-title grey-text text-darken-4'>");
    revealTitle.html("<u>" + title + "</u>" + "<i class='material-icons right'>close</i>");
    var eventDetails = $("<div>").text("Event Details: ");
    var eventVenue = $("<span>").text("Venue: " + venueName);
    var eventTime = $("<span>").text("Start Time: " + startTime);
    var url = $("<a>").attr("href", eventWebsite).html("<u>Eventful</u>");
    var eventURL = $("<span>").text("For more information please visit: ");
    eventDetails.append(eventVenue, "<br>", eventTime, "<br>", eventURL, url);
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
    var imgSRC = "https://placeimg.com/640/480/any"

    $('#search-button').on('click', function () {
        $("#results-display").empty();
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

        var queryUrl = 'http://api.eventful.com/json/events/search?page_size=9&app_key=' + key + location + category + date

        // console.log(queryUrl)

        $.ajax({
            url: queryUrl,
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            dataType: 'jsonp',
        }).then(function (res) {

            var events = res.events.event
            console.log(res)

            for (i = 0; i < events.length; i++) {

                var title = events[i].title
                var venue = events[i].venue_name
                var address = events[i].venue_address
                var time = events[i].start_time
                var url = events[i].url
                generateCards(imgSRC, title, address, venue, time, url);
                // console.log(title)
                // console.log(venue)
                // console.log(address)
                // console.log(time)
                // console.log(url)

                

            }

        })

    })

})