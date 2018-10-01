var events;
var title;
var venue;
var address;
var time;
var url;
var lat;
var long;
var numberOfPages;
var currentPage;

function getResults(result, startIndex, endIndex){
    for (i = startIndex; i < endIndex ; i++) {

        title = result[i].title
        venue = result[i].venue_name
        address = result[i].venue_address + "," + result[i].city_name
        time = moment(events[i].start_time, 'YYYY-MM-DD hh:mm:ss').format("MMMM Do YYYY, h:mm a")
        url = result[i].url
        lat = result[i].latitude
        long = result[i].longitude
        // if event doesn't have image, use placeholder img
        if(result[i].image === null){
            imgSRC = "https://source.unsplash.com/random/500x500";
        }
        else{
            imgSRC = result[i].image.large.url;
        }
        generateCards(imgSRC, title, address, lat, long, venue, time, url);
    }
}

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

function paginationDisplay(numberOfResults){
    if(numberOfResults === 0){
        return;
    }
    else{
        $(".pagination").removeClass("hide");
        var page = $("<li class='active pages'>")
        var pageNumber = $("<a>").attr({"class":"page-number", "href": "#results-title", "data-number": "1"}).text("1")
        page.append(pageNumber);
        page.insertBefore($("#pagination-end"));
        if(numberOfResults <= 9){
            $("#pagination-end").addClass("disabled").removeClass("waves-effect");
        }
        else{
            numberOfPages = (Math.ceil(numberOfResults/9)) - 1;
            for(var j = 0; j < numberOfPages; j++){
                page=$("<li class='waves-effect pages'>")
                pageNumber = $("<a>").attr({"class": "page-number", "href": "#results-title", "data-number": j+2}).text(j+2);
                page.append(pageNumber);
                page.insertBefore($("#pagination-end"));
            }
        }
    }
}

function displayPage(clicked){
    currentPage = clicked; 
    var newEndIndex = currentPage * 9;
    var newStartIndex = newEndIndex - 9; 
    if(currentPage != 1){
        $("#pagination-start").removeClass("disabled").addClass("waves-effect");
    }
    else{
        if(!$("#pagination-start").hasClass("disabled")){
            $("#pagination-start").addClass("disabled");
        }
    }
    if(currentPage == (numberOfPages+1)){
        $("#pagination-end").addClass("disabled").removeClass("waves-effect");
    }
    else if(currentPage != (numberOfPages+1) && $("#pagination-end").hasClass("disabled")){
        $("#pagination-end").removeClass("disabled").addClass("waves-effect");
    }
    $("#results-display").empty();
    getResults(events, newStartIndex, newEndIndex);
}

$(document).on("click", ".page-number", function(){
    $(".pages").removeClass("active");
    $(this).parents("li").addClass("active");
    var thisPage = parseInt($(this).attr("data-number"));
    displayPage(thisPage);
})

$("#pagination-start").on("click", function(){
    $(".pages").removeClass("active");
    var previousPage = currentPage - 1;
    $(".page-number[data-number=" + previousPage + "]").parents("li").addClass("active");
    displayPage(previousPage);
})

$("#pagination-end").on("click", function(){
    $(".pages").removeClass("active");
    var nextPage = currentPage + 1;
    $(".page-number[data-number=" + nextPage + "]").parents("li").addClass("active");
    displayPage(nextPage);
})

$(document).ready(function () {

    var key = '9SPHrSHsCzcbp2ck'
    var location = ''
    var date = ''
    var category = ''
    var imgSRC = ""

    $('#search-button').on('click', function () {
        $("#results-display").empty();
        $(".pages").remove();
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
        var queryUrl = 'http://api.eventful.com/json/events/search?sort_order=popularity&image_sizes=large&page_size=81&app_key=' + key + location + category + date

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
            console.log(res)
            events = res.events.event;
            currentPage = 1;
            $(".banner").removeClass("page-load");
            $(".results").removeClass("page-load");
            $(".page-footer").removeClass("page-load");
            $("#pagination-start").addClass("disabled").removeClass("waves-effect");
            $("#pagination-end").addClass("waves-effect").removeClass("disabled");
            paginationDisplay(events.length);
            getResults(events, 0, 9);
        })

    })

})