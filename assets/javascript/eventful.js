
$(document).ready(function () {

    var key = '9SPHrSHsCzcbp2ck'
    var location = ''
    var date = ''
    var category = ''
    var keyword = ''

    $('#search-button').on('click', function () {
        if ($('#location-input').val() != '') {
            location = '&location=' + $('#location-input').val().trim()
        }
        if ($('#date-input').val() != '') {
            var dateEl = $('#date-input').val().split("-")
            // console.log(dateEl)
            date = '&date=' + dateEl[0] + dateEl[1] + dateEl[2] + '00-' + dateEl[0] + dateEl[1] + dateEl[2] + '00'
            // console.log(date)
        }
        if ($('#category-input').val() != null) {
            console.log($('#category-input').val())
        }

        var queryUrl = 'http://api.eventful.com/json/events/search?app_key=' + key + keywords + location + category + date
        console.log(queryUrl)
        

        $.ajax({
            url: queryUrl,
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            dataType: 'jsonp',
        }).then(function (res) {
            console.log(res)
        })

    })

})