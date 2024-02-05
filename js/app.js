//const variables for the first game
const game1 = document.getElementById("first_game")
const initialSrc = game1.src;
const initialBorder = game1.style.border;


//const variables for the second game
const game2 = document.getElementById("second_game")
const initialSrc2 = game2.src;
const initialBorder2 = game2.style.border;


//execute this function when the mouse is over
function onOverImage(){
    game1.src = "./images/giphy (2).gif";
    game1.style.border = "5px solid blue";
    game1.style.transform = 'scale(1.2)';
}

//execute this functioin when the mouse is out
function onoutImage(){
    game1.src = initialSrc;
    game1.style.border = initialBorder;
    game1.style.transform = 'scale(1)';
}

//call the function when the mouse is over/out the image
game1.addEventListener("mouseover", onOverImage)
game1.addEventListener("mouseout", onoutImage)


//execute this function when the mouse is over
function onOverImage2(){
    game2.src = "./images/giphy (3).gif";
    game2.style.border = "5px solid blue";
    game2.style.transform = 'scale(1.2)';
}

//execute this functioin when the mouse is out
function onoutImage2(){
    game2.src = initialSrc2;
    game2.style.border = initialBorder2;
    game2.style.transform = 'scale(1)';
}

//call the function when the mouse is over/out the image
game2.addEventListener("mouseover", onOverImage2)
game2.addEventListener("mouseout", onoutImage2)


