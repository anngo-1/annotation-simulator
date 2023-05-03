const getbitmoji = document.getElementById("getbitmoji")
const bitmojicontainer = document.querySelector(".bitmoji-image-container")
getbitmoji.onclick = function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // grab all the checkbox info at this time
    let checkedtags = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {  //get the checkbox's id (tag) and push it into an array
        checkedtags.push(checkboxes[i].id)
      }
    }
    console.log(checkedtags)
    data = {
          "link":"https://docs.google.com/spreadsheets/d/1yLvOGvaroSrhyqPrNUY8Fv-IazWva3Ql0TYjVPKI8VY/edit#gid=0",
          "data": checkedtags
      }
          fetch('http://127.0.0.1:5002/match', {
              method: 'POST',
              body: JSON.stringify(data),
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    for (var j = 0; i < data.length; j++) {
        displayImage(data[1])
    }

    function displayImage(nose) {

        breakline = document.createElement("br")
        const image = document.createElement('img');
        
        image.onload = () => {
            bitmojicontainer.innerHTML = ''
            bitmojicontainer.appendChild(breakline)
            bitmojicontainer.appendChild(image);
        };
        image.src = "bitmojiassets/noses/" + nose + ".png";
        

 

    }

}
