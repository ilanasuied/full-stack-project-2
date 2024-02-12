// store the variables 
let container = document.querySelector('.container');
let btn = document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');

btn.onclick = function(){

    //initialize variables
    let score = 0;
    let time = 10;
    container.innerHTML = "";
    btn.style.display = 'none';
    //show targets every second
    let interval = setInterval(function showTarget(){
        
        //create the target
        let target = document.createElement('img');
        target.id="target";
        target.src="../../images/silly.png";
        //insert our the target in the container
        container.appendChild(target);

        //put the target rendomly inside of the container
        target.style.top = Math.random() *(400 - target.offsetHeight) + 'px';
        target.style.left = Math.random() *(500 - target.offsetWidth) + 'px';

        //make the target disappear
        //2 seconds after the target appears, it disappears
        setInterval(function(){
            target.remove();
        }, 2000)

        //when we click in the target
        target.onclick = function(){
            score++;
            target.style.display = 'none';
        }
        time--;

        //show info
        scoreContainer.innerHTML = `Score : ${score}`;
        timeContainer.innerHTML = `Time : ${time}`;

        //end of game when time is up
        if(time == 0){
            //clear this interval
            clearInterval(interval);
            btn.style.display = 'block';
            btn.innerHTML = 'Restart';
            showGameOver(score);
        }

    }, 1000);
    
}


//show game over message 
function showGameOver(score) {
    let userName = localStorage.getItem('currentUser');
    let user = JSON.parse(localStorage.getItem(userName));
    let maxScore = user.scoreGame2;
    if(maxScore < score){
        maxScore = score;
        user.scoreGame2 = score;
        localStorage.setItem( userName, JSON.stringify(user));
    }
    var modal = document.getElementById("gameOverModal");
    modal.style.display = "block";
    document.getElementById('showScore').textContent  = `Score : ${score} Your best score : ${maxScore}`;
    //disappear the message after 2 seconds
    setInterval(function(){
        modal.style.display = "none";

    }, 2000)

}