let piece = document.querySelector(".pieces");
let puzzles = document.querySelector(".puzzle");
let imgLeft = document.createElement("img");
imgLeft.src = "../images/israelLeft.jpeg";
let imgRight = document.createElement("img");
imgRight.src = "../images/israelRight.jpeg";
let imgLeftPuzzle = document.createElement("img");
imgLeftPuzzle.src = "../images/israelLeft.jpeg";

let imgRightPuzzle = document.createElement("img");
imgRightPuzzle.src = "../images/israelRight.jpeg";

puzzles.appendChild(imgLeftPuzzle);
puzzles.appendChild(imgRightPuzzle);

piece.appendChild(imgLeft);
piece.appendChild(imgRight);






