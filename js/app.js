
/**
* @description Shuffle array Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
* @param {array} array - A array to be shuffled
*/
const shuffleArray = function (array) {
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    let newIndex = Math.floor(Math.random() * (currentIndex + 1));
    [array[currentIndex], array[newIndex]] = [array[newIndex], array[currentIndex]];
  }
};
/**
* @description Format number to 2 digits
* @param {number} myNumber
* @returns {number} with 2 digits
*/
const formatNumber = function (myNumber) {
  return ('0' + myNumber).slice(-2);
};

/**
* @description Represents a game
* @constructor
* @param {array} options - A array of icon options to use in the game
*/
var Game = function (options = ['fa-superpowers', 'fa-thermometer-quarter', 'fa-bed', 'fa-cab', 'fa-bell-o', 'fa-flash', 'fa-flask', 'fa-gift']) {
  this.optionsNumber = options.length;
  this.cardsToBuild = options.concat(options);
  this.cardsBuilded = {};
  this.response = [];
  this.moves = 0;
  this.startDate = new Date().getTime();
  this.stars = 3;
  this.rightAnswerNumber = 0;
  this.init();
};

/** Init the game */
Game.prototype.init = function () {
  // shuffle the cards
  shuffleArray(this.cardsToBuild);

  // Clean container
  document.getElementById('container').innerHTML = '';
  document.getElementById('moves').innerHTML = this.moves + ' moves';
  document.getElementById('timer').innerHTML = '00:00';
  // construct ao the cards, create and add to a object
  for (var index in this.cardsToBuild) {
    var newCard = new Card(this.cardsToBuild[index]);
    newCard.create(this);
    this.cardsBuilded[newCard.id] = newCard;
  }
  this.updateStars();
  this.startTimer();
  // Show the right elements on screen
  document.getElementById('container').style = 'display:flex';
  document.getElementById('result').style = 'display:none';
};

/** start the timer */
Game.prototype.startTimer = function () {
  this.countDown = setInterval(() => {
    let now = new Date().getTime();
    let timeDiference = now - this.startDate;
    console.log('here');
    let minutes = formatNumber(Math.floor((timeDiference % (1000 * 60 * 60)) / (1000 * 60)));
    let seconds = formatNumber(Math.floor((timeDiference % (1000 * 60)) / 1000));
    document.getElementById('timer').innerHTML = minutes + ':' + seconds;
  }, 1000);
};

/** called everytime move is made */
Game.prototype.newMove = function () {
  this.moves++;
  document.getElementById('moves').innerHTML = this.moves + ' moves';
  // Alter the number of star according to moves number
  switch (this.moves) {
    case 12:
      this.stars = 2;
      break;
    case 25:
      this.stars = 1;
      break;
    case 35:
      this.stars = 0;
      break;
    default:
      break;
  }
  this.updateStars();
};

/** Set the stars on the UI */
Game.prototype.updateStars = function () {
  let starContainer = document.getElementById('stars');
  starContainer.innerHTML = '';
  for (var i = 0; i < this.stars; i++) {
    let starIcon = document.createElement('I');
    starIcon.classList.add('fa', 'fa-2x', 'star', 'fa-star');
    starContainer.appendChild(starIcon);
  }
  for (var i = 0; i < (3 - this.stars); i++) {
    let staroIcon = document.createElement('I');
    staroIcon.classList.add('fa', 'fa-2x', 'star', 'fa-star-o');
    starContainer.appendChild(staroIcon);
  }
};

/**  Function called when a right answer is  */
Game.prototype.rightAnswer = function (game) {
  // Add the number of right answers
  this.rightAnswerNumber++;
  // Call the correct function for the cards
  this.response[0].correct();
  this.response[1].correct();
  // Clean responses
  this.response = [];
  // Check if the number of correct Answers is equal the number of options
  if (this.rightAnswerNumber === game.optionsNumber) {
    // Show congrats msg
    document.getElementById('container').style = 'display:none';
    document.getElementById('result').style = 'display:block';
    // Stop timer
    clearInterval(this.countDown);
  }
};

/** Function called when a wrong answer is given */
Game.prototype.wrongAnswer = function () {
  this.response[0].wrong();
  this.response[1].wrong();
  this.response = [];
};

var newGame = () => {
  var currentGame = new Game();
};
newGame();
