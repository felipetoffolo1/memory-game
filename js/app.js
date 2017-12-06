var shuffleArray = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
}

var options = ['fa-superpowers', 'fa-thermometer-quarter', 'fa-bed', 'fa-cab', 'fa-bell-o', 'fa-flash', 'fa-flask', 'fa-gift']

var cardsToBuild = options.slice()
cardsToBuild = cardsToBuild.concat(options.slice())
shuffleArray(cardsToBuild)
var cardsBuilded = {}

var response = []

var Card = function (icon) {
  this.id = Math.random()
  this.icon = icon
}

Card.prototype.create = function () {
  var container = document.getElementById('container')
  var cardItem = document.createElement('DIV')
  cardItem.classList.add('card', 'unturned')
  cardItem.id = this.id
  cardItem.onclick = this.turn
  var cardIcon = document.createElement('I')
  cardIcon.classList.add(this.icon, 'fa', 'fa-5x', 'card-icon')
  var backIcon = document.createElement('I')
  backIcon.classList.add('fa-snowflake-o', 'fa', 'fa-5x', 'back-icon')
  cardItem.appendChild(cardIcon)
  cardItem.appendChild(backIcon)
  container.appendChild(cardItem)
}

Card.prototype.hide = function () {
  var cardItem = document.getElementById(this.id)
  cardItem.classList.remove('hide')
}
Card.prototype.unturn = function () {
  var cardItem = document.getElementById(this.id)
  cardItem.classList.add('unturned')
}
Card.prototype.turn = function () {
  // Recover the selected card object
  var cardSelected = cardsBuilded[this.id]
  // only take any action if there is not 2 cards already selected
  // and the click was not on the same card
  if (response.length !== 2 && cardSelected !== response[0]) {
    // Put it on the response array
    response.push(cardSelected)
    // Unturn the choosen card
    var cardItem = document.getElementById(this.id)
    cardItem.classList.remove('unturned')
    if (response.length === 2) {
      if (response[0].icon === response[1].icon && response[0].id !== response[1].id) {
        response[0].hide()
        response[1].hide()
        response = []
      } else {
        setTimeout(function () {
          response[0].unturn()
          response[1].unturn()
          response = []
        }, 1000)
      }
    }
  }
}

for (var index in cardsToBuild) {
  var newCard = new Card(cardsToBuild[index])
  newCard.create()
  cardsBuilded[newCard.id] = newCard
}
