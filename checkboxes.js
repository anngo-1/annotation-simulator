$(document).ready(function () {
    $("#tagstext").on("input", function () {
      // Clear previous checkboxes
      $("#checkboxes").empty();
      
      // Split input text into words
      var words = $(this).val().split(" ");
      let tags = []

      //split the words into words and categories

      // Create a checkbox for each word
      for (var i = 0; i < words.length; i++) {

        
        if (words[i].startsWith("<") && words[i].endsWith(">")) { // in the case of a category


          var biglabel = $("<p>").attr({
          });
          
          biglabel.css({"margin":"0", "padding":"0"})
          biglabel.html(words[i].substring(1,words[i].length-1))

          $("#checkboxes").append(biglabel);
        } else {

        var word = words[i];
        var checkbox = $("<input>").attr({
          type: "checkbox",
          id: word,
          class:"checkboxes"
        });
        checkbox.css({"margin":"0", "padding":"0"})
        var label = $("<label>").attr({
          for: "word-" + i,
        }).text(word);
        $("#checkboxes").append("<br>");
        $("#checkboxes").append(checkbox).append(label);
      }
      }
    });
  });