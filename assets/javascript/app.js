$("#search-button").on("click", function (){
    $(".banner").removeClass("page-load");
    $(".results").removeClass("page-load");
    $(".page-footer").removeClass("page-load");
})

$(document).ready(function(){
    $('.datepicker').datepicker();
    $('select').formSelect();
  });