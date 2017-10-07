$(document).ready(function(){



var countries=["America", "Mexico", "Ireland", "Great Britian", "Canada", "New Zealand", "Japan", "India", "Morocco"]

for(i=0; i<countries.length; i++){
 var starting= $('<button>').addClass("country").html(countries[i]).attr("data-name", countries[i]);
  $("#buttons").append(starting);
  
}


$("#search").on("click", function(){
  
  countries.push($("#submit").val());
  for(x=i; x<countries.length; x++){
    var fresh = $("<button>").addClass("country").html($("#submit").val()).attr("data-name", countries[i]);
    console.log($("#submit").val());
    console.log(countries);
    $("#buttons").append(fresh);  
  }
  
  i++;

});


    $("#buttons").on("click", ".country", function() {
      $("#gifs-appear-here").empty();
       // Attaches event listener function
      
      var country = $(this).attr("data-name");
      console.log(country); // $(this) refers to the button that was clicked

      // The URL to the API, with the person variable and API key
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=dc6zaTOxFJmzC&limit=10";
      console.log($("#submit").val());
      //The AJAX call to the server (AJAX = Asynchronous Javascript and XML)
      $.ajax({ url: queryURL, method: "GET" })

        .done(function(response) { // This is called when the API call successfully completes

          var results = response.data; // response.data holds the actual information that came back from the server


          for (var i = 0; i < results.length; i++) { // Loops through all items in the results array


            console.log(results[i]);

            var gifDiv = $("<div class='item'>"); // Creates a new DIV element and stores it in gifDiv

            var rating = results[i].rating; // Gets the GIF rating from the result item

            var p = $("<p class='rating'>").text("Rating: " + rating); // Creates a new P element and puts the rating text into it

            var personImage = $('<img .col-md-6>'); // Creates a new IMG element and stores in personImage
            personImage.addClass("test");
            personImage.attr("src", results[i].images.fixed_height_still.url);
            personImage.attr("data-Still", results[i].images.fixed_height_still.url);
            personImage.attr("data-Animate", results[i].images.fixed_height.url);
            personImage.attr("data-State", "Still");
             // Sets the images' URL to result URL
            
            
            gifDiv.prepend(p); // Opposite of append. Puts the rating P element at the beginning of the gifDiv element

            gifDiv.prepend(personImage); // Puts the IMG element into gifDiv on top of the rating

            $("#gifs-appear-here").prepend(gifDiv); // Puts the combined elements into the main page inside gifs-appear-here
            
            
          }
          
          $(".test").on("click", function(){
            var state = $(this).attr("data-State");
            console.log(state);
          if(state === "Still"){
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-State", "Animate");
          }else{
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-State", "Still");
          }
         
      });
        });
        
        
      
    
  });
});