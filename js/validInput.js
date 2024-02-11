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
                    return;
                }
                let user = JSON.parse(localStorage.getItem(username));
                user.entrieCount += 1;
                localStorage.setItem(username, JSON.stringify(user));
                //set this user to be the current user
                localStorage.setItem('currentUser', username);
                window.location.href = '../index.html'
                return;
            }
            let user = JSON.parse(localStorage.getItem(username));
            user.checkConnecting += 1;
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
//     mail: "",
//     entrieCount: 0,
//     winCount: 0
//     checkConnecting: 0
//     scoreGame2: 0
// }



function signin() {

    if (checkUserName(document.getElementById('username').value)) {

        //check if this username is free
        if (localStorage.getItem(document.getElementById('username').value === null)) {
           
            if (checkPassword(document.getElementById('password').value)) {
                let user = {
                    username: document.getElementById('username').value,
                    password: document.getElementById('password').value,
                    name: document.getElementById('name').value,
                    mail: document.getElementById('email').value,
                    entrieCount: 1,
                    winCount: 0,
                    checkConnecting: 0,
                    scoreGame2: 0
                }
                //store the date on the local storage
                localStorage.setItem(user.username, JSON.stringify(user));

                //store in the key 'currentuser' the username of the user that is courently log in 
                localStorage.setItem('currentUser', user.username);
                window.location.href = '../index.html'
                return;
            }
            createDiv("invalid password");
        }else{//else if this username is already taken
            createDiv("this username is already taken");
            return;
        }

    }
    createDiv("invalid username");

}



