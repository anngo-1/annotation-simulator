const input = document.getElementById('folder');
const container = document.querySelector('.image-container');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById("back-btn")
const download = document.getElementById('downloadbutton')
let jsonData = []
let currentName = ""
/*
STRUCTURE FOR DOWNLOADING LABELED DATA

{
  file_name: 
  tags_labeled:
  file_num:
  ... any other ideas to store?? 
}

*/

let files = [];
let currentFileIndex = 0;

// on the next button click 
nextBtn.addEventListener('click', () => {
  let checkedtags = []
  const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // redefine 

  currentFileIndex++;
  if (currentFileIndex < files.length) {
    displayImage(currentFileIndex);
  } else {
    console.log('no more images');
  }
  
  for (var i = 0; i < checkboxes.length; i++) {

    //get the checkbox's id (tag)
    if (checkboxes[i].checked == true) {
      checkedtags.push(checkboxes[i].id)
    }

    //clear the checkbox
    checkboxes[i].checked = false;
  }
  // first, check if a label has already been made. overwrite if so

  const checkLabel = obj => obj.file_name === currentName;
  
  if (jsonData.some(checkLabel)) //if already labeled, overwrite
  {
  
    jsonData[currentFileIndex-1] =
    {  
      file_name:currentName,  
      tags_labeled: checkedtags,
      file_num: currentFileIndex
    }
    
  } else {


  // case for completely new
  
  jsonData.push(

    {  
    file_name:currentName,  
    tags_labeled: checkedtags,
    file_num: currentFileIndex
  }
  

  )
  }

});



backBtn.addEventListener('click', () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // redefine 
  // go back an index
  if (currentFileIndex!=0) {
    currentFileIndex-=1;
    displayImage(currentFileIndex)
  

  currentArray = jsonData[currentFileIndex]
  for (var i = 0; i < checkboxes.length; i++) {

      //get the checkbox's id (tag)
      currentArrayTags = currentArray.tags_labeled
      if (currentArrayTags.includes(checkboxes[i].id)) {
        checkboxes[i].checked = true;
      }
  
    }
  
  }

})







// adding all of the files uploaded to an array
input.addEventListener('change', (event) => {

  for (i=0;i<input.files.length;i++){
    files.push(input.files[i])
  }
  displayImage(currentFileIndex)
});



// function for displaying an image
function displayImage(index) {

    // if the image is already labeled (for example we are going back), show its tags
  





    file = files[index]
    currentName = file.name
    const breakline = document.createElement("br")
    const image = document.createElement('img');
    const count = document.createTextNode("Image " + (currentFileIndex+1))
    image.style.width = "50%"
    
    image.onload = () => {
      container.innerHTML = '';
      container.appendChild(count)
      container.appendChild(breakline)
      container.appendChild(image);
    };
    image.src = URL.createObjectURL(file);
 

    const jsonDataString = JSON.stringify(jsonData)
    const blob = new Blob([jsonDataString], { type: 'application/json' });
    const urlblob = URL.createObjectURL(blob);
    download.innerHTML = "Download currently labeled images" 
    download.setAttribute('href', urlblob);
    download.setAttribute('download','data.json')
    download.style.visibility = "visible"
}
