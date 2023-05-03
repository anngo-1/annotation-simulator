const sendbutton = document.getElementById("sendtosheet")
const resultbutton = document.getElementById("getresults")
const link = document.getElementById("sheetlink")
const results = document.getElementById("results")
const tagstext = document.getElementById("tagstext")








sendbutton.onclick = function(){
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // grab all the checkbox info at this time
    let checkedtags = [];
       for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {  //get the checkbox's id (tag) and push it into an array
        checkedtags.push(checkboxes[i].id)
      }
    }
    const checkLabel = obj => obj.file_name === currentName; // first, check if that label has already been made. overwrite if so
    if (jsonData.some(checkLabel)) 
    {
      jsonData[currentFileIndex] =
      {  
        annotator:entername,
        file_name:currentName,  
        tags_labeled: checkedtags,
        file_num: currentFileIndex
      }
    } else {
    // case for completely new
    jsonData.push(
      {  
      annotator:entername,
      file_name:currentName,  
      tags_labeled: checkedtags,
      file_num: currentFileIndex
    }
    )
    }
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
    const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // grab all the checkbox info at this time
    let checkedtags = [];
       for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {  //get the checkbox's id (tag) and push it into an array
        checkedtags.push(checkboxes[i].id)
      }
    }
    const checkLabel = obj => obj.file_name === currentName; // first, check if that label has already been made. overwrite if so
    if (jsonData.some(checkLabel)) 
    {
      jsonData[currentFileIndex] =
      {  
        annotator:entername,
        file_name:currentName,  
        tags_labeled: checkedtags,
        file_num: currentFileIndex
      }
    } else {
    // case for completely new
    jsonData.push(
      {  
      annotator:entername,
      file_name:currentName,  
      tags_labeled: checkedtags,
      file_num: currentFileIndex
    }
    )
    }
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