const sendbutton = document.getElementById("sendtosheet")
const link = document.getElementById("sheetlink")
sendbutton.onclick = function(){

    if (link.value != "" ){
    data = {
        "link":link.value,
        "data": jsonData
    }
        fetch('http://127.0.0.1:5002/updatesheet/', {
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