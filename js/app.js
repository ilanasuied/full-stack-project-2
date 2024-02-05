//const variables
const game1 = document.getElementById("first_game")
const initialSrc = game1.src;

//execute this function when th mouse is over
function onOverImage(){
    game1.src = "../images/giphy.gif"

}

//execute this functioin when the mouse is out
function onoutImage(){
    game1.src = initialSrc;
}

//call the function when the mouse is over/out the image
game1.addEventListener("mouseover", onOverImage)
game1.addEventListener("mouseout", onoutImage)
