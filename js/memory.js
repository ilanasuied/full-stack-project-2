const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const resetButton = document.querySelector(".reset");
const scoreYouGet = document.querySelector(".score")
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//items array
const items = [
    { name: "bee", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
    { name: "crocodile", image: "crocodaile.png" },
]
for( var i=0; i<items.length)
let box = document.createElement('div');
document.querySelector('.game').appendChild(box);
//initial time
let seconds = 0,
    minutes = 0;

//initial moves and win count
let movesCount = 0,
    winCount = 0;

//for timer
const timerGenerator = () =>{
    seconds +=1;
    if(seconds>=60){
        minutes +=1;
        seconds= 0;
    }
}

//format time befor displaying
let secondValue =seconds

