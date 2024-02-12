let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};
// הוצאת נתונים מהאחסון המקומי נמיר חזרה לאובייקט
//אובייקט לשמירת הניקוד שלך בכל אחד מן המצבים 
//בדיקה שברגע שנרצה להסיר נתונים מהאחסון וכביכול אין לנו שום דבר כרגע באחסון כלומר ריק אז יכניס את הערכים לאפס

/* if(!score){
      score = {
          wins: 0,
          losses: 0,
          ties: 0
      };
  }
  */
updateScoreElement();

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';//השוואת את המלהך שלנו למהלך אקראי של המחשב 
    if (playerMove === 'scissors') {//תוצאה שמתאימה רק אם מהלך השחקן כלומר המשתמש בחר מספריים
        if (computerMove === 'rock') {
            result = 'You lose.'
        } else if (computerMove === 'paper') {
            result = 'You win.';
        } else if (computerMove === 'scissors') {
            result = 'Tie.';
        }

    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.'
        } else if (computerMove === 'paper') {
            result = 'Tie.';
        } else if (computerMove === 'scissors') {
            result = 'You lose.';
        }

    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.'
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }
    //עידכון הניקוד שלך
    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    //אחרי עידכון הנקודות אנחנו רוצים לשמור אותו באחסון מקומי כדי שגם אם נרענן את הדף התוצאות ישמרו בדיוק כפי שעצרנו ולא יחזרו להיות אפס
    localStorage.setItem('score', JSON.stringify(score));// שמירת הנתונים באחסון מקומי המרנו למחרוזת כי אחסון מקומי תומך רק במחרוזות

    updateScoreElement();

    //אומר לנו מה כל שחקן בחר ומה התוצאה
    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
    <img src="../../images/${playerMove}-emoji.png" class="img-icon">
    <img src="../../images/${computerMove}-emoji.png" class="img-icon">
    Computer`;
}

function updateScoreElement() {
    

    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;


}


function pickComputerMove() {//פונקציה לבחירת מהלך המחשב
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'paper';
    }
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'scissors';
    }
    return computerMove;//מסיים את הפונקציה מיידית
}


    
