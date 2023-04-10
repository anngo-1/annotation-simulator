const input = document.getElementById('folder');
const container = document.querySelector('.image-container');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById("back-btn")
const download = document.getElementById('downloadbutton')
let files = [];
let currentFileIndex = 0;
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
nextBtn.addEventListener('click', () => { 
  if (currentFileIndex != files.length) {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]'); // grab all the checkbox info at this time
  let checkedtags = []

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

  clearChecks() // clear the current checkboxes
  currentFileIndex++; //move onto the next image in the folder
  if (currentFileIndex < files.length) {
    displayImage(currentFileIndex);
  } else {
    console.log('no more images');
  }
}

});



backBtn.addEventListener('click', () => {
  // go back an index
  if (currentFileIndex!=0) {
    currentFileIndex-=1;
    clearChecks()
    displayImage(currentFileIndex)
  }



})




// adding all of the files uploaded to an array
input.addEventListener('change', (event) => {

  for (i=0;i<input.files.length;i++){
    if (input.files[i].name.endsWith(".jpg") || input.files[i].name.endsWith(".png"))
    files.push(input.files[i])
  }
  // Sort the file list by their names
  console.log(files)
files.sort((a, b) => {
  return a.name.localeCompare(b.name);
});
  console.log(files)
  displayImage(currentFileIndex)
});

// function for displaying an image
function displayImage(index) {

    file = files[index]
    currentName = file.name // keep track of the current name
    // if the image is already labeled, show its tags when it is displayed
    const checkLabel = obj => obj.file_name === currentName;
    if (jsonData.some(checkLabel)) {
      displayChecks(currentFileIndex)
    }

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

function displayChecks(currentFileIndex) {

  // redefine
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  currentArray = jsonData[currentFileIndex]
  for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      //get the checkbox's id (tag)
    
      currentArrayTags = currentArray.tags_labeled
      if (currentArrayTags.includes(checkboxes[i].id)) {
        checkboxes[i].checked = true;
      }
  
    }
}

function clearChecks() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  for (var i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}
