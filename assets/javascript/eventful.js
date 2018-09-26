
$(document).ready(function () {

    var key = '9SPHrSHsCzcbp2ck';
    var location = '';
    var date = '';
    var category = '';
    var keyword = '';

    $('#search-button').on('click', function () {
        if (true) {
            location = '&location=' + $('#location-input').val().trim();
            
        }
    });
    var queryUrl = 'http://api.eventful.com/rest/events/search?app_key=' + key + keyword + location + category + date;


});