
$('#date-icon').on("click", function(event){
    event.stopPropagation();
    $('.datepicker').datepicker({"format": "yyyy-mm-dd"});
    $(".datepicker").datepicker("open");
});

$("#date-input").on("click", function(){
    $(".datepicker").datepicker("destroy");
})

function inputValidation(data){
    var input = $(data);
    // If input is not valid according to preset rules in HTML, then display modal
    if(!input[0].checkValidity()){
        $("#input-validation-modal").modal("open");
        return false;
    }
    else{
        return true;
    }
}

function preventPastDates(){
    var todaysDate = new Date(); // Gets today's date
    // Min date attribute is in "YYYY-MM-DD".  Need to format today's date accordingly
    var year = todaysDate.getFullYear();                        // YYYY
    var month = ("0" + (todaysDate.getMonth() + 1)).slice(-2);  // MM
    var day = ("0" + todaysDate.getDate()).slice(-2);           // DD
    var minDate = (year +"-"+ month +"-"+ day); // Results in "YYYY-MM-DD" for today's date 
    // Now to set the max date value for the calendar to be today's date
    $('#date-input').attr('min',minDate);
}

$(document).ready(function(){
    preventPastDates();
    $('.datepicker').datepicker({"format": "yyyy-mm-dd"});
    $('select').formSelect();
    $('.modal').modal();
  });