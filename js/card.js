var card = function (icon) {
    this.id = Math.random();
    this.icon = icon;
}

card.prototype.create = function () {
    var cardItem = document.createElement('DIV');
    var cardIcon = document.createElement('I');
    var container = document.getElementById("container");
    cardItem.classList.add('card', 'unturned');
    cardItem.id = this.id;
    cardItem.onclick = this.turn;
    cardIcon.classList.add(this.icon, 'fa', 'fa-5x');
    cardItem.appendChild(cardIcon);
    container.appendChild(cardItem);

}

card.prototype.hide = function () {
    var cardItem = document.getElementById(this.id);
    cardItem.classList.remove('hide');

}
card.prototype.unturn = function () {
    var cardItem = document.getElementById(this.id);
    cardItem.classList.add('unturned');

}
card.prototype.turn = function () {
    var cardSelected = cardsBuilded[this.id];
    response.push(cardSelected);
    var cardItem = document.getElementById(this.id);
    cardItem.classList.remove('unturned');
    if (response.length === 2) {
        if (response[0].icon == response[1].icon && response[0].id != response[1].id) {
            response[0].hide();
            response[1].hide();
            response = [];
        } else {
            setTimeout(function () {
                response[0].unturn();
                response[1].unturn();
                response = [];
            }, 1000)
        }
    }


}