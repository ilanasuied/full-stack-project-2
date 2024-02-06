var getValueBtn = document.getElementById("submitBtn");

getValueBtn.addEventListener('click', foo)
function foo() {
    event.preventDefault();
}

//check if the user inout is valid
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

    if(userinval || userinval){
        createDiv(text);
        return;
    }
    

    if(userinval == false && passwordinval == false){
        searchUserName(username.value);
        //cehckCorrectPassword()
    }
}


function createDiv(text){

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
function searchUserName(username){
    for(let i=0; i<localStorage.length; i++) {
       if(localStorage.i(users.username) === username){
            if(localStorage.i(users.password) === password){
                if(localStorage.i(checkConnecting) > 3){
                    createDiv("too many trying!!!");
                }
                return;
            }
            localStorage.i(checkConnecting)++;
            createDiv("incorrect password");
        }
    }
    createDiv("please register");
}


// users = {
//     username: "",
//     password: "",
//     city:"",
//     country:"",
//     mail: "",
//     entrieCount: 0,
//     winCount: 0
//     checkConnecting: 0
// }
