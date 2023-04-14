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
            link: link.value,
            tags_used: tagstext.value
        });
        fetch(`https://anngo1.pythonanywhere.com/sheetstats?${params}`)
        .then(response => response.json())
        .then(data => {
            let output_str = ""; // Fix 1: Initialize output_str variable

            for (let key in data) { // Fix 2: Use "let" to declare the key variable
                if (data.hasOwnProperty(key)) { // Fix 3: Use "data" instead of "myDict"
                    let value = data[key]; // Fix 4: Use "data" instead of "myDict"
                    output_str += (key + ':' + value + "\n");
                }
            }

            results.innerHTML = output_str;
        })
        .catch(error => {
            alert(error);
            console.error(error);
        });
    } else {
        alert("please put in a google sheet");
    }
}
