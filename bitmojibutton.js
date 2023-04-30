const getbitmoji = document.getElementById("getbitmoji")
const bitmojicontainer = document.querySelector(".bitmoji-image-container")
getbitmoji.onclick = function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // grab all the checkbox info at this time
    let checkedtags = []
  
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {  //get the checkbox's id (tag) and push it into an array
        checkedtags.push(checkboxes[i].id)
    }
    }


    const params = new URLSearchParams({
        tags_used: checkedtags
        });
        fetch(`http://127.0.0.1:5002/bitmojiequivalent?${params}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => {
            alert(error)
            
            console.error(error)});

    function displayImage() {

        breakline = document.createElement("br")
        const image = document.createElement('img');
        
        image.onload = () => {
            bitmojicontainer.innerHTML = ''
            bitmojicontainer.appendChild(breakline)
            bitmojicontainer.appendChild(image);
        };
        image.src = "bitmojiassets/noses/nose_1436.png";
        

 

    }

    displayImage()

}
