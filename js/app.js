//const variables for the first game
const game1 = document.getElementById("first_game")
const initialSrc = game1.src;
const initialBorder = game1.style.border;


//const variables for the second game
const game2 = document.getElementById("second_game")
const initialSrc2 = game2.src;
const initialBorder2 = game2.style.border;


//execute this function when the mouse is over
function onOverImage() {
    game1.src = "./images/giphy (2).gif";
    game1.style.border = "5px solid blue";
    game1.style.transform = 'scale(1.2)';
}

//execute this functioin when the mouse is out
function onoutImage() {
    game1.src = initialSrc;
    game1.style.border = initialBorder;
    game1.style.transform = 'scale(1)';
}

//call the function when the mouse is over/out the image
game1.addEventListener("mouseover", onOverImage)
game1.addEventListener("mouseout", onoutImage)


//execute this function when the mouse is over
function onOverImage2() {
    game2.src = "./images/giphy (3).gif";
    game2.style.border = "5px solid blue";
    game2.style.transform = 'scale(1.2)';
}

//execute this functioin when the mouse is out
function onoutImage2() {
    game2.src = initialSrc2;
    game2.style.border = initialBorder2;
    game2.style.transform = 'scale(1)';
}

//call the function when the mouse is over/out the image
game2.addEventListener("mouseover", onOverImage2)
game2.addEventListener("mouseout", onoutImage2)



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
  document.getElementById('modal').style.display = 'block';
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

