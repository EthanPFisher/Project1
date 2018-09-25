
$("#search-button").on("click", function (){
    $(".banner").removeClass("page-load");
    $(".results").removeClass("page-load");
    $(".page-footer").removeClass("page-load");
});

$('#date-icon').on("click", function(event){
    event.stopPropagation();
    $('.datepicker').datepicker({"format": "yyyy-mm-dd"});
    $(".datepicker").datepicker("open");
});

$("#date-input").on("click", function(){
    $(".datepicker").datepicker("destroy");
})

$(document).ready(function(){
    $('.datepicker').datepicker({"format": "yyyy-mm-dd"});
    $('select').formSelect();
    $('.modal').modal();
  });