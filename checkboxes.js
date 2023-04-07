$(document).ready(function () {
    $("#tagstext").on("input", function () {
      // Clear previous checkboxes
      $("#checkboxes").empty();
      
      // Split input text into words
      var words = $(this).val().split(" ");
      
      // Create a checkbox for each word
      for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var checkbox = $("<input>").attr({
          type: "checkbox",
          id: word,
          class:"checkboxes"
        });
        var label = $("<label>").attr({
          for: "word-" + i,
        }).text(word);
        $("#checkboxes").append("<br>");
        $("#checkboxes").append(checkbox).append(label);
      }
    });
  });