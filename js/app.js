
// Shuffle array
// Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
// Format number to 2 digits
// Source: https://stackoverflow.com/questions/8043026/javascript-format-number-to-have-2-digit
const formatNumber = function (myNumber) {
  return ('0' + myNumber).slice(-2);
};

const options = ['fa-superpowers', 'fa-thermometer-quarter', 'fa-bed', 'fa-cab', 'fa-bell-o', 'fa-flash', 'fa-flask', 'fa-gift'];

var cardsToBuild = options.slice();
cardsToBuild = cardsToBuild.concat(options.slice());
var cardsBuilded = {};

var response = [];

var moves = 0;
var startDate = false;
var stars = 3;
var rightAnswerNumber = 0;
var countDown;

// Init or restart the game
var init = function () {
  // shuffle the cards
  shuffleArray(cardsToBuild);
  // Reset variables
  cardsBuilded = {};
  moves = 0;
  startDate = false;
  stars = 3;
  rightAnswerNumber = 0;
  response = [];
  // Clean container
  document.getElementById('container').innerHTML = '';
  // construct ao the cards, create and add to a object
  for (var index in cardsToBuild) {
    var newCard = new Card(cardsToBuild[index]);
    newCard.create();
    cardsBuilded[newCard.id] = newCard;
  }
  updateStars();
  // Show the right elements on screen
  document.getElementById('container').style = 'display:flex';
  document.getElementById('result').style = 'display:none';
};

// Function to start the timer
var startTimer = function () {
  if (!startDate) {
    startDate = new Date().getTime();
    countDown = setInterval(function () {
      let now = new Date().getTime();
      let timeDiference = now - startDate;
      let minutes = formatNumber(Math.floor((timeDiference % (1000 * 60 * 60)) / (1000 * 60)));
      let seconds = formatNumber(Math.floor((timeDiference % (1000 * 60)) / 1000));
      document.getElementById('timer').innerHTML = minutes + ':' + seconds;
    }, 1000);
  }
};

// Function called everytime move is made
var newMove = function () {
  moves++;
  document.getElementById('moves').innerHTML = moves + ' moves';
  // Alter the number of star according to moves number
  switch (moves) {
    case 12:
      stars = 2;
      break;
    case 25:
      stars = 1;
      break;
    case 35:
      stars = 0;
      break;
    default:
      break;
  }
  updateStars();
};

// Set the stars on the UI
var updateStars = function () {
  let starContainer = document.getElementById('stars');
  starContainer.innerHTML = '';
  for (i = 0; i < stars; i++) {
    let starIcon = document.createElement('I');
    starIcon.classList.add('fa', 'fa-2x', 'star', 'fa-star');
    starContainer.appendChild(starIcon);
  }
  for (i = 0; i < (3 - stars); i++) {
    let staroIcon = document.createElement('I');
    staroIcon.classList.add('fa', 'fa-2x', 'star', 'fa-star-o');
    starContainer.appendChild(staroIcon);
  }
};

// Function called when a right answer is given
var rightAnswer = function () {
  // Add the number of right answers
  rightAnswerNumber++;
  // Call the correct function for the cards
  response[0].correct();
  response[1].correct();
  // Clean responses
  response = [];
  // Check if the number of correct Answers is equal the number of options
  if (rightAnswerNumber === options.length) {
    // Show congrats msg
    document.getElementById('container').style = 'display:none';
    document.getElementById('result').style = 'display:block';
    // Stop timer
    clearInterval(countDown);
  }
};

// Function called when a wrong answer is given
var wrongAnswer = function () {
  response[0].wrong();
  response[1].wrong();
  response = [];
};

// Card

// Card constructor
var Card = function (icon) {
  this.id = Math.random();
  this.icon = icon;
  this.turned = false;
};

// Function to createa new card on ui
Card.prototype.create = function () {
  let container = document.getElementById('container');
  let cardItem = document.createElement('DIV');
  cardItem.classList.add('card');
  cardItem.id = this.id;
  cardItem.onclick = this.turn;
  let cardIcon = document.createElement('I');
  cardIcon.classList.add(this.icon, 'fa', 'fa-5x', 'card-icon');
  let backIcon = document.createElement('I');
  backIcon.classList.add('fa-gg', 'fa', 'fa-2x', 'back-icon');
  cardItem.appendChild(cardIcon);
  cardItem.appendChild(backIcon);
  container.appendChild(cardItem);
};
// Funciton when a card is wrong
Card.prototype.wrong = function () {
  let cardItem = document.getElementById(this.id);
  cardItem.classList.add('wrong');
  this.turned = false;
  setTimeout(function () {
    cardItem.classList.remove('wrong');
    cardItem.classList.remove('open');
  }, 1000);
};
// Function when a card is right
Card.prototype.correct = function () {
  let cardItem = document.getElementById(this.id);
  cardItem.classList.add('right');
};

// Function when a card is turned
Card.prototype.turn = function () {
  // Recover the selected card object
  var cardSelected = cardsBuilded[this.id];
  startTimer();
  // only take any action if there is not 2 cards already selected
  // and the click was not on the same card
  if (response.length !== 2 && !cardSelected.turned) {
    // Put it on the response array
    response.push(cardSelected);
    let cardItem = document.getElementById(this.id);
    cardItem.classList.add('open');
    cardSelected.turned = true;
    if (response.length === 2) {
      // Register the move
      newMove();
      // If the two options have the same icon
      if (response[0].icon === response[1].icon) {
        rightAnswer();
      } else {
        wrongAnswer();
      }
    }
  }
};

init();
