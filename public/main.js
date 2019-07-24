var thumbUp = document.getElementsByClassName("fa-thumbs-up");
var thumbDown = document.getElementsByClassName("fa-thumbs-down");
var trash = document.getElementsByClassName("fa-trash");

//THUMBS UP
// Array.from(arrayName), new ES6 syntax
// instead could use,
// var thumbUp = document.querySelectorAll("fa-thumbs-up");
// thumbUp.forEach(function(element) {


Array.from(thumbUp).forEach(function(element) {
      element.addEventListener('click', function(){
        console.log("up")
        //"this" is clickedOn thumb up <i>icon</i>
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        //parseFloat to change to StringValue from DOM to NumberValue
        const countUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('thumbUp', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          //changing to JSON format to send from client to server
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'thumbUp':countUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(thumbDown).forEach(function(element) {
  element.addEventListener('click', function(){
    //"this" is clickedOn thumb up <i>icon</i>
    const name = this.parentNode.parentNode.childNodes[1].innerText
    const msg = this.parentNode.parentNode.childNodes[3].innerText
    //parseFloat to change to StringValue from DOM to NumberValue
    const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    console.log(`thumbUp ${thumbUp}`)
    fetch('messagesDown', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      //changing to JSON format to send from client to server
      body: JSON.stringify({
        'name': name,
        'msg': msg,
        'thumbUp':thumbUp
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

//TRASH CAN
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        //name and message targed
            //this = what you clicked on
            //parentNode = go up a level
            //parentNode = go up a level
            //childNode = go INTO the level (BY INDEX)
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        // messages end point
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
