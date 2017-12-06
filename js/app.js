var shuffleArray = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var options = ['fa-superpowers', 'fa-thermometer-quarter', 'fa-bed', 'fa-cab', 'fa-bell-o', 'fa-flash', 'fa-flask', 'fa-gift']

var cardsToBuild = options.slice();
cardsToBuild = cardsToBuild.concat(options.slice());
shuffleArray(cardsToBuild);
var cardsBuilded = {};

var response = [];


for (var index in cardsToBuild) {
    var newCard = new card(cardsToBuild[index]);
    newCard.create();
    cardsBuilded[newCard.id] = newCard;

}