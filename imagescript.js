const input = document.getElementById('folder')
const container = document.querySelector('.image-container')
const nextBtn = document.getElementById('next-btn')
const backBtn = document.getElementById("back-btn")
const download = document.getElementById('downloadbutton')
const randombutton = document.getElementById("shuffle-btn")
const randinput = document.getElementById("shufflebutton")
let files = [];
let currentFileIndex = 0;
let jsonData = []
let currentName = ""
let entername = prompt("Enter your name for annotation analysis")
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
    if (input.files[i].name.endsWith(".jpg") || input.files[i].name.endsWith(".png")) {
    files.push(input.files[i])
    }
  }
  // Sort the file list by their names

files.sort((a, b) => {
  return a.name.localeCompare(b.name);
});










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
    image.style.width = "30%"
  
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


randombutton.onclick = function() {
  shuffleseed = randinput.innerHTML


  function shuffle(array, seed) {                // <-- ADDED ARGUMENT
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(random(seed) * m--);        // <-- MODIFIED LINE
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
      ++seed                                     // <-- ADDED LINE
    }
  
    return array;
  }
  
  function random(seed) {
    var x = Math.sin(seed++) * 10000; 
    return x - Math.floor(x);
  }

 console.log(shuffleseed)
 files = shuffle(files,random(shuffleseed))
 displayImage(0)
 console.log(files)
}