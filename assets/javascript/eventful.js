
function generateCards(imgSRC, title){
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
    var newLink = $("<a>").attr({"href": "#map-modal", "class": "modal-trigger map-button"});
    newLink.text("Google Maps");
    newCardAction.append(newLink);
    var newCardReveal = $("<div class='card-reveal'>");
    var revealTitle = $("<span class='card-title grey-text text-darken-4'>");
    revealTitle.html(title + "<i class='material-icons right'>close</i>");
}

$(document).ready(function () {

    var key = '9SPHrSHsCzcbp2ck'
    var location = ''
    var date = ''
    var category = ''

    $('#search-button').on('click', function () {
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

        var queryUrl = 'http://api.eventful.com/json/events/search?app_key=' + key + location + category + date

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
            // console.log(events)

            for (i = 0; i < events.length; i++) {

                var title = events[i].title
                var venue = events[i].venue_name
                var address = events[i].venue_address
                var time = events[i].start_time
                var url = events[i].url

                // console.log(title)
                // console.log(venue)
                // console.log(address)
                // console.log(time)
                // console.log(url)

                

            }

        })

    })

})