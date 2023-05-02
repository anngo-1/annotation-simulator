const sendbutton = document.getElementById("sendtosheet")
const resultbutton = document.getElementById("getresults")
const link = document.getElementById("sheetlink")
const results = document.getElementById("results")
const tagstext = document.getElementById("tagstext")








sendbutton.onclick = function(){

    if (link.value != "" ){
    data = {
        "link":link.value,
        "data": jsonData
    }
        fetch('https://anngo1.pythonanywhere.com/updatesheet', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
    } else {
        alert("please put in a google sheet")
    }

}



resultbutton.onclick = function() {
    if (link.value != "" ){
    const params = new URLSearchParams({
        link:link.value,
        tags_used: tagstext.value
        });
        fetch(`https://anngo1.pythonanywhere.com/sheetstats?${params}`)
        .then(response => response.json())
        .then(data => results.innerHTML = "Tags Used: " + data["tags_used"] + "\n\n" + "Tag agreement per image: \n" + data["agreement/image"] + "\n" + "AVG Annotator agreement/Image (by percentage): " +  data["agreement_percentage"] + "\n")
        .then(data => console.log(data))
        .catch(error => {
            alert(error)
            
            console.error(error)});
    } else {
        alert("please put in a google sheet")
    }

}