window.onload = () => {
  "use strict";

  var levelChosen = 8;//משתנה לקביעת מספר הקלפים במשחק
  createDivs();
  dropAndDrag();
  function dropAndDrag() {
    const divs = document.querySelectorAll(".box"); //selection de toutes les divs avec la classe draggable
    let dragged; //servira à stocker la div dragged
    for (let div of divs) {
      div.ondragstart = (e) => {
        dragged = div;                   //copie la reference de la div qui sera dragged
        div.classList.add("dragged");   //ajout de la classe dragged
        e.dataTransfer.setData('text/plain', div.innerHTML); //option du drag permettant de sauvegarder le contenu du dragged
      };

      //Applique un effet CSS à l'entrée d'une zone de drop
      div.ondragenter = () => {
        if (!div.classList.contains("dragged")) //si ce n'est pas l'element dragged
          div.classList.add('dropHover');    //applique la classe dropHover
        div.classList.remove('shake');        //Supprime la classe shake si présente
      };
      //Applique un effet CSS à l'a sortie d'une zone de drop
      div.ondragleave = () => div.classList.remove('dropHover'); //supprime la classe dropHover

      //Applique à un effet à la div qui a subit le drag d'origine
      div.ondragend = () => div.classList.remove("dragged");  //supprime la classe dragged

      //Permet à la div d'etre une zone de drop (interdit par defaut)
      div.ondragover = (e) => e.preventDefault();

      //Copie la div dragged à la zone du drop et applique un effet CSS dessus
      div.ondrop = (e) => {
        dragged.innerHTML = div.innerHTML;                   //le dragged prend la valeur du drop
        div.innerHTML = e.dataTransfer.getData('text/plain'); //le drop prend la valeur du dragged
        div.classList.remove('dropHover');               //supprime la classe dropHover
        div.classList.add("shake");                     //ajout de l'effet shake sur le drop
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

    }, 2000)

  }

  function checkStatus() {
    var container = document.getElementById("container");
    //keep all the boxs on an array
    var boxes = Array.from(container.querySelectorAll(".box"));
    for (let i = 0; i < boxes.length; i++) {
      if (parseFloat(boxes[i].textContent) !== i + 1) {
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
      return 'you win!!!'
    }
    let username = localStorage.getItem('currentUser');
    let user = JSON.parse(localStorage.getItem(username));
    user.winCount += 1;
    localStorage.setItem(username, JSON.stringify(user));


    return 'you win!!!'
  }
};