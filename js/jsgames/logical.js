window.onload = () => {
  "use strict";

  var levelChosen = 8;//משתנה לקביעת מספר הקלפים במשחק
  createDivs();
  dropAndDrag();
  //נאפשר גרירה ונוסיף עיצוב
  function dropAndDrag() {
    const divs = document.querySelectorAll(".box"); // שמירת כל ה הדיבים שיש להם את המחלקה בוקס במערך
    let dragged;
    for (let div of divs) {
      div.ondragstart = (e) => {//ברגע שמתחילים עם הגרירה 
        dragged = div;                   //נשווה ביי רפרנס
        div.classList.add("dragged");   
        e.dataTransfer.setData('text/plain', div.innerHTML); //שומר את כל הנתונים של הנגרר 
      };

      //נוסיף עיצוב למקום שנגרור אליו 
      div.ondragenter = () => {
        if (!div.classList.contains("dragged")) //אם זה לא האלמנט שנגרר
          div.classList.add('dropHover');    
        div.classList.remove('shake');        //מסיר את הרטט 
      };
    
      div.ondragleave = () => div.classList.remove('dropHover'); 

      div.ondragend = () => div.classList.remove("dragged");  

      //הרשאה לדיב שיגררו אליו
      div.ondragover = (e) => e.preventDefault();

      //מעתיק את הנתונים של הנגרר לתוך הדיב הנבחר ומעתיק את העיצוב
      div.ondrop = (e) => {
        dragged.innerHTML = div.innerHTML;                   //הנגרר מחליף תוכן עם המקום שאליו נכנס
        div.innerHTML = e.dataTransfer.getData('text/plain'); //המקום שאליו נכנס לוקח את התוכן של הנגרר
        div.classList.remove('dropHover');               
        div.classList.add("shake");                     
      };
    }
  }



  //reorder the boxs onclick on start
  function shuffleArray() {
    var container = document.getElementById("container");

    //keep all the boxs on an array
    var boxes = Array.from(container.querySelectorAll(".box"));

    //shuffle the array
    for (let i = boxes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [boxes[i], boxes[j]] = [boxes[j], boxes[i]];
    }

    //remove all the element from the continair
    container.innerHTML = '';

    //add in the continair the element in the new order
    boxes.forEach(function (box) {
      container.appendChild(box);
    });
  }


  //level 1 is with 3 cards
  document.getElementById('level1').addEventListener('click', function () {
    levelChosen = 3;
    startGame();
  });

  //level 2 is with 5 cards
  document.getElementById('level2').addEventListener('click', function () {
    levelChosen = 5;
    startGame();
  });

  //level 3 is with 8 cards
  document.getElementById('level3').addEventListener('click', function () {
    levelChosen = 8;
    startGame();
  });

  function startGame() {
    document.getElementById('container').innerHTML = '';
    createDivs();
    dropAndDrag();
    let interval = setInterval(function () {
      showGameOver();
      clearInterval(interval);
    }, 10000)
    let timerInterval = setInterval(function () {
      if (parseInt(document.getElementById('timer').textContent) == 0) {
        document.getElementById('timer').textContent = 10;
      }
      document.getElementById('timer').textContent = parseInt(document.getElementById('timer').textContent) - 1;
      if (parseInt(document.getElementById('timer').textContent) == 0) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }


  function createDivs() {
    //create div like this:
    //<div class="box" draggable="true">1</div>
    for (let i = 0; i < levelChosen; i++) {
      let div = document.createElement('div');
      div.classList.add('box');
      div.setAttribute('draggable', 'true');//מאפשר גרירה
      div.innerHTML = i + 1;
      document.getElementById('container').appendChild(div);
    }
    shuffleArray();
  }

  //show game over message 
  function showGameOver() {

    var modal = document.getElementById("gameOverModal");
    modal.style.display = "block";
    let message = checkStatus();
    document.getElementById('showStatus').textContent = message;
    //disappear the message after 2 seconds
    setInterval(function () {
      modal.style.display = "none";
      let modal_content = document.querySelector(".modal-content");
      modal_content.classList.remove('lose');
      modal_content.classList.remove('win')
    }, 2000)

  }

  function checkStatus() {
    var container = document.getElementById("container");
    let modal_content  = document.querySelector(".modal-content");
    //keep all the boxs on an array
    var boxes = Array.from(container.querySelectorAll(".box"));
    for (let i = 0; i < boxes.length; i++) {
      if (parseFloat(boxes[i].textContent) !== i + 1) {
        modal_content.classList.add("lose");
        return 'you lose' 
      }
    }
    //update the amount of total wins
    if (localStorage.getItem('wins') === null) {
      let wins = 0;
      var winsString = wins.toString();
      localStorage.setItem('wins', winsString);
    }
    let wins = parseInt(localStorage.getItem('wins'));
    console.log(wins);
    wins++;
    localStorage.setItem('wins', wins.toString());

    //if there is a user connected, update his wins count
    if (localStorage.getItem('currentUser') === null) {
      modal_content.classList.add("win");
      return 'you win!!!'
    }
    let username = localStorage.getItem('currentUser');
    let user = JSON.parse(localStorage.getItem(username));
    user.winCount += 1;
    localStorage.setItem(username, JSON.stringify(user));


    return 'you win!!!'
  }
};