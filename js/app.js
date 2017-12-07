var shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

var options = ['fa-superpowers', 'fa-thermometer-quarter', 'fa-bed', 'fa-cab', 'fa-bell-o', 'fa-flash', 'fa-flask', 'fa-gift'];

var cardsToBuild = options.slice();
cardsToBuild = cardsToBuild.concat(options.slice());
shuffleArray(cardsToBuild);
var cardsBuilded = {};

var response = [];

var moves = 0;
var startDate = false;
var stars = 3;
var rightAnswerNumber = 0;

var init = function () {
  for (var index in cardsToBuild) {
    var newCard = new Card(cardsToBuild[index]);
    newCard.create();
    cardsBuilded[newCard.id] = newCard;
  }
  updateStars();
};

var startTimer = function () {
  if (!startDate) {
    startDate = new Date().getTime();
    var countDown = setInterval(function () {
      var now = new Date().getTime();
      var timeDiference = now - startDate;
      var minutes = Math.floor((timeDiference % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((timeDiference % (1000 * 60)) / 1000);
      document.getElementById('timer').innerHTML = minutes + 'm ' + seconds + 's ';
    }, 1000);
  }
};
var newMove = function () {
  moves++;
  document.getElementById('moves').innerHTML = moves + ' moves';
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
var updateStars = function () {
  var starContainer = document.getElementById('stars');
  starContainer.innerHTML = '';
  for (i = 0; i < stars; i++) {
    var starIcon = document.createElement('I');
    starIcon.classList.add('fa', 'fa-2x', 'star', 'fa-star');
    starContainer.appendChild(starIcon);
  }
  for (i = 0; i < (3 - stars); i++) {
    var staroIcon = document.createElement('I');
    staroIcon.classList.add('fa', 'fa-2x', 'star','fa-star-o');
    starContainer.appendChild(staroIcon);
  }
};
var rightAnswer = function () {
  rightAnswerNumber++;
  response[0].correct();
  response[1].correct();
  response = [];
  if (rightAnswerNumber === options.length) {
    alert('congrats');
  }
};
var wrongAnswer = function () {
  response[0].wrong();
  response[1].wrong();
  response = [];
};

var Card = function (icon) {
  this.id = Math.random();
  this.icon = icon;
  this.turned = false;
};
Card.prototype.create = function () {
  var container = document.getElementById('container');
  var cardItem = document.createElement('DIV');
  cardItem.classList.add('card');
  cardItem.id = this.id;
  cardItem.onclick = this.turn;
  var cardIcon = document.createElement('I');
  cardIcon.classList.add(this.icon, 'fa', 'fa-5x', 'card-icon');
  var backIcon = document.createElement('I');
  backIcon.classList.add('fa-snowflake-o', 'fa', 'fa-5x', 'back-icon');
  cardItem.appendChild(cardIcon);
  cardItem.appendChild(backIcon);
  container.appendChild(cardItem);
};

Card.prototype.wrong = function () {
  var cardItem = document.getElementById(this.id);
  cardItem.classList.add('wrong');
  this.turned = false;
  setTimeout(function () {
    cardItem.classList.remove('open');
  }, 1000);
};
Card.prototype.correct = function () {
  var cardItem = document.getElementById(this.id);
  cardItem.classList.add('right');
};

Card.prototype.turn = function () {
  // Recover the selected card object
  var cardSelected = cardsBuilded[this.id];
  startTimer();
  // only take any action if there is not 2 cards already selected
  // and the click was not on the same card
  if (response.length !== 2 && !cardSelected.turned) {
    // Put it on the response array
    response.push(cardSelected);
    var cardItem = document.getElementById(this.id);
    cardItem.classList.add('open');
    cardSelected.turned = true;
    if (response.length === 2) {
      newMove();
      if (response[0].icon === response[1].icon && response[0].id !== response[1].id) {
        rightAnswer();
      } else {
        wrongAnswer();
      }
    }
  }
};

init();