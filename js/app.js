window.addEventListener('load', function(event){
    if(localStorage.getItem('currentUser') !== null){
        this.document.getElementById('openModalBtn').innerHTML = "Disconnect"
    }
})


//show the gif when the cursor is over the img
function mouseoverImage(imageId, gifPath){
    let game = document.getElementById(imageId);
    game.src = gifPath;
    game.style.border = "5px solid blue";
    game.style.transform = 'scale(1.2)';
}

//when the mouse is out on the image, show the inital image 
function mouseoutImage(imageId, imgPath){
    let game = document.getElementById(imageId);
    game.src = imgPath;
    game.style.border = "5px solid rgba(33, 34, 51, 0.9)";
    game.style.transform = 'scale(1.0)';
}


//call the function when the mouse is over/out the images
document.getElementById("space").addEventListener("mouseover", function(){
    mouseoverImage('space', './images/space.gif');
})
document.getElementById("space").addEventListener("mouseout", function(){
    mouseoutImage('space', './images/space-624054_1280.jpg')
})

document.getElementById("first_game").addEventListener("mouseover", function(){
    mouseoverImage('first_game', "./images/rock paper scissor.gif");
});
document.getElementById("first_game").addEventListener("mouseout", function(){
    mouseoutImage('first_game', "./images/first game.png" );
});

document.getElementById("second_game").addEventListener("mouseover", function(){
    mouseoverImage('second_game', './images/giphy (3).gif');
});
document.getElementById("second_game").addEventListener("mouseout", function(){
    mouseoutImage('second_game', './images/istockphoto-1204787034-1024x1024.jpg');
});




// Sélectionnez l'élément d'entrée de la barre de recherche
var searchInput = document.getElementById('search');
function searchGame() {
    // Récupérez la valeur saisie dans la barre de recherche
    var searchText = searchInput.value.toLowerCase();

    // Sélectionnez tous les titres des éléments que vous souhaitez vérifier
    var titles = document.querySelectorAll('.image-container h4');
    var newContent = document.createTextNode("We don't have it yet");
    // Parcourez les titres et vérifiez s'ils correspondent à la recherche
    titles.forEach(function (title) {
        var titleText = title.textContent.toLowerCase();

        // Comparez les textes et affichez/masquez l'élément en conséquence
        if (titleText == searchText) {
            newContent = document.createTextNode("We have this game!");
        }
    });
    const newH2 = document.createElement("h2");
    newH2.appendChild(newContent);
    searchInput.parentNode.appendChild(newH2);


    //remove the changes 2 seconds later
    setTimeout(gotoInitialFormat , 2000);
    function gotoInitialFormat() {
        searchInput.parentNode.removeChild(newH2);
    } 
}


// Ajoutez un écouteur d'événements pour détecter les changements dans la barre de recherche
searchInput.addEventListener('change', searchGame);


document.getElementById('openModalBtn').addEventListener('click', openModal);

function openModal() {
    if(localStorage.getItem('currentUser') === null){
        document.getElementById('modal').style.display = 'block';
    } else {
        document.getElementById('openModalBtn').innerHTML = "Connection";
        localStorage.removeItem('currentUser');
    }
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function openModalProfile() {
    document.getElementById('profile_modal').style.display = 'block';
  }
  
  function closeModalProfile() {
    document.getElementById('profile_modal').style.display = 'none';
  }
// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional, smooth scrolling animation
    });
}

// Event listener to trigger scroll to top function when button is clicked
document.getElementById('scrollToTopBtn').addEventListener('click', scrollToTop);

