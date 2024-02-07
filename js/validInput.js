// var getValueBtn = document.getElementById("submitBtn");
// getValueBtn.addEventListener('click', foo);
// function foo() {
//     event.preventDefault();
// }

//check if the user inout is valid

var currentUser;

function submitFun() {

    //save the username and the password
    const username = document.getElementById("username");
    const password = document.getElementById("password");


    //this flag will be true if the username is invalid
    let userinval = false;
    let passwordinval = false;
    let text = document.createTextNode("");
    //check if the username is valid by calling the checkusername function
    if (!checkUserName(username.value)) {
        text = "please enter a valid name";
        //if the username isnt valid, turn the falg to be true
        userinval = true;
    }

    //check if the oassword is valid by calling the checkpassword function
    if (!checkPassword(password.value)) {
        text = "please enter a valid password";
        passwordinval = true;
        //if the username is also invalid, change the text to correcte message
        if (userinval) {
            text = "please enter a valid name and valid password";
        }
    }

    if (userinval || passwordinval) {
        createDiv(text);
        return;
    }


    if (userinval == false && passwordinval == false) {
        searchUserName(username.value, password.value);
    }
}


function createDiv(text) {

    //create a new text node
    let txt = document.createTextNode(text);
    //create a new p
    let p = document.createElement('p');
    //connect the text to the p element
    p.appendChild(txt);
    //get the div element
    let div = document.getElementById("notValidMessage");

    //connect the new p element with the rext, into the div
    div.appendChild(p);

    //show the alert
    div.style.display = "block";



    //remove the changes 2 seconds later
    setTimeout(gotoInitialFormat, 2000);
    function gotoInitialFormat() {
        div.removeChild(p);
        div.style.display = "none";
    }
}

//this function check if the user set a valid value for the name
function checkUserName(username) {
    let reg = /^[^a-z]/i
    if (username.lenght < 1 || reg.test(username)) {
        return false;
    }
    return true;
}

//this function check if the password set a valid value for the password
function checkPassword(password) {
    if (password < 1000 || isNaN(password)) {
        return false;
    }
    return true;
}

//search if there is this username in the storage
function searchUserName(username, password) {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) == username) {
            if (parseInt(JSON.parse(localStorage.getItem(username)).password) == password) {
                if (JSON.parse(localStorage.getItem(username)).checkConnecting > 3) {
                    createDiv("too many trying!!!");
                }
                localStorage.setItem('currentUser', username);
                return;
            }
            let user = JSON.parse(localStorage.getItem(username));
            user.checkConnecting +=1;
            localStorage.setItem(username, JSON.stringify(user));
            createDiv("incorrect password");
            return;
        }
    }
    createDiv("please register");
}




// users = {
//     username: "",
//     password: "",
//     name:"",
//     country:"",
//     mail: "",
//     entrieCount: 0,
//     winCount: 0
//     checkConnecting: 0
// }

//למחיקה
//document.getElementById('sumbtn').addEventListener('click', foo)


function signin() {

    if (checkUserName(document.getElementById('username').value)) {
        for (let i = 0; i < localStorage.length; i++) {
            if (localStorage.key(i) == username) {
                createDiv("this username is already taken");
                return;
            }
        }
        if (checkPassword(document.getElementById('password').value)) {
            let user = {
                username: document.getElementById('username').value,
                password: document.getElementById('password').value,
                name: document.getElementById('name').value,
                mail: document.getElementById('email').value,
                entrieCount: 1,
                winCount: 0,
                checkConnecting: 0
            }
            //store the date on the local storage
            localStorage.setItem(user.username, JSON.stringify(user));

            //store in the key 'currentuser' the username of the user that is courently log in 
            localStorage.setItem('currentUser', user.username);
            return;
        }
        createDiv("invalid password");
    }   
        createDiv("invalid username");

}



document.getElementById('openProfile').addEventListener('click', fullProfile)
function fullProfile(){
    if(localStorage.getItem('currentUser') === null){
        let user = localStorage.getItem('currentUser');
    document.getElementById('name').innerHTML ='Name:';
    document.getElementById('mail').innerHTML = 'Mail:';
    document.getElementById('amountEntries').innerHTML = 'Amount Of Entries:';
    document.getElementById('amountWins').innerHTML = 'Amount Of Wins';
   
    }
    let user = localStorage.getItem('currentUser');
    document.getElementById('name').innerHTML ='Name: ' + JSON.parse(localStorage.getItem(user)).name;
    document.getElementById('mail').innerHTML = 'Mail: ' + JSON.parse(localStorage.getItem(user)).mail;
    document.getElementById('amountEntries').innerHTML = 'Amount Of Entries: ' + JSON.parse(localStorage.getItem(user)).entrieCount;
    document.getElementById('amountWins').innerHTML = 'Amount Of Wins ' + JSON.parse(localStorage.getItem(user)).winCount;
   
}