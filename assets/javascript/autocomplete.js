//Autocomplete the location
(function() {
    var placesAutocomplete = places({
      container: document.querySelector('#location-input')
    });
  
    var $address = document.querySelector('#location-input')
    placesAutocomplete.on('change', function(e) {
      $address.textContent = e.suggestion.value 
    });
  
    placesAutocomplete.on('clear', function() {
      $address.textContent = 'none';
    });
  
  })();
  
  //Autocomplete Start from input in the map 
  (function() {
    var placesAutocomplete = places({
      container: document.querySelector('#from-input')
    });
  
    var $address = document.querySelector('#from-input')
    placesAutocomplete.on('change', function(e) {
      $address.textContent = e.suggestion.value 
    });
  
    placesAutocomplete.on('clear', function() {
      $address.textContent = 'none';
    });
  
  })();