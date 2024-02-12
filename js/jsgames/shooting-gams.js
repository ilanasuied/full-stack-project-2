// store the variables 
let container = document.querySelector('.container');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');
let level1 = document.querySelector('.level1');
let level2 = document.querySelector('.level2');

//in level 1 we have 10 seconds to play
level1.onclick = function () {
    startGame(11);
}

//in level 2 we have just 5 seconds to play
level2.onclick = function () {
    startGame(6);
}
function startGame(time) {

    //initialize variables
    let score = 0;
    container.innerHTML = "";
    level1.style.display = 'none';
    level2.style.display = 'none';
    //show targets every second
    let interval = setInterval(function showTarget() {

        //create the target
        let target = document.createElement('img');
        target.id = "target";
        target.src = "../../images/silly.png";
        //insert our the target in the container
        container.appendChild(target);

        //put the target rendomly inside of the container
        target.style.top = Math.random() * (400 - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (500 - target.offsetWidth) + 'px';

        //make the target disappear
        //2 seconds after the target appears, it disappears
        setInterval(function () {
            target.remove();
        }, 2000)

        //when we click in the target
        target.onclick = function () {
            score++;
            scoreContainer.innerHTML = `Score : ${score}`;
            target.style.display = 'none';
        }
        time--;
        //show info
        timeContainer.innerHTML = `Time : ${time}`;

        //end of game when time is up
        if (time <= 0) {
            //clear this interval
            level1.style.display = 'block';
            level2.style.display = 'block';
            clearInterval(interval);
            showGameOver(score);
            scoreContainer.innerHTML = `Score : 0`;
        }

    }, 1000);

}

//show game over message 
function showGameOver(score) {
    let modal_content  = document.querySelector(".modal-content");
    //if there is a user connected, update his wins count
    if (localStorage.getItem('currentUser') !== null) {
        let userName = localStorage.getItem('currentUser');
        let user = JSON.parse(localStorage.getItem(userName));
        let maxScore = user.scoreGame2;
        if (maxScore <= score) {
            maxScore = score;
            user.scoreGame2 = score;
            user.winCount++;
            localStorage.setItem(userName, JSON.stringify(user));
            document.getElementById('showScore').textContent = ` you Win! Your best score : ${maxScore}`;

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
            modal_content.classList.add('win');
        } else {
            document.getElementById('showScore').textContent = `Score : ${score} Your best score : ${maxScore}`;
            modal_content.classList.add('lose');
        }
        
    }
    var modal = document.getElementById("gameOverModal");
    modal.style.display = "block";

    //disappear the message after 2 seconds
    setInterval(function () {
        modal.style.display = "none";
        modal_content.classList.remove('lose');
        modal_content.classList.remove('win');

    }, 2000)

}