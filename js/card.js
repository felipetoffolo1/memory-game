/**
* @description Represents a card
* @constructor
* @param {string} icon - Icon used on the card
*/
var Card = function (icon) {
  this.id = Math.random();
  this.icon = icon;
  this.turned = false;
};

/** Function to createa new card on ui */
Card.prototype.create = function (game) {
  let container = document.getElementById('container');
  let cardItem = document.createElement('DIV');
  cardItem.classList.add('card');
  cardItem.id = this.id;
  cardItem.onclick = () => this.turn(game);
  let cardIcon = document.createElement('I');
  cardIcon.classList.add(this.icon, 'fa', 'fa-5x', 'card-icon');
  let backIcon = document.createElement('I');
  backIcon.classList.add('fa-gg', 'fa', 'fa-2x', 'back-icon');
  cardItem.appendChild(cardIcon);
  cardItem.appendChild(backIcon);
  container.appendChild(cardItem);
};
/** Funciton when a card is wrong */
Card.prototype.wrong = function () {
  let cardItem = document.getElementById(this.id);
  cardItem.classList.add('wrong');
  this.turned = false;
  setTimeout(function () {
    cardItem.classList.remove('wrong');
    cardItem.classList.remove('open');
  }, 1000);
};
/** Function when a card is right */
Card.prototype.correct = function () {
  let cardItem = document.getElementById(this.id);
  cardItem.classList.add('right');
};

/** Function when a card is turned */
Card.prototype.turn = function (game) {
  // Recover the selected card object
  var cardSelected = game.cardsBuilded[this.id];
  // only take any action if there is not 2 cards already selected
  // and the click was not on the same card
  if (game.response.length !== 2 && !cardSelected.turned) {
    // Put it on the response array
    game.response.push(cardSelected);
    let cardItem = document.getElementById(this.id);
    cardItem.classList.add('open');
    cardSelected.turned = true;
    if (game.response.length === 2) {
      // Register the move
      game.newMove();
      // If the two options have the same icon
      if (game.response[0].icon === game.response[1].icon) {
        game.rightAnswer(game);
      } else {
        game.wrongAnswer();
      }
    }
  }
};
