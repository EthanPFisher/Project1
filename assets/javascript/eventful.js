
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