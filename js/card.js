'use strict';
// модуль, который отвечает за создание карточки объявлений;
(function () {

  var getAllAds = function () {
    var offer = [];
    for (var i = 0; i < 8; i++) {
      offer.push(window.pin.createPin());
    }
    return offer;
  };

  var typeOfHouse = function (card, element) {
    if (card.offer.type === 'palace') {
      element.textContent = 'Дворец';
    } else if (card.offer.type === 'house') {
      element.textContent = 'Дом';
    } else if (card.offer.type === 'bungalo') {
      element.textContent = 'Бунгало';
    } else if (card.offer.type === 'flat') {
      element.textContent = 'Квартира';
    }
    return element.textContent;
  };

  var createCard = function (card) {
    var cardElement = window.data.similarCardTemplate.cloneNode(true);
    var type = cardElement.querySelector('h4');
    var popupFeatures = cardElement.querySelector('ul');

    var blockHidden = function (element1, block) {
      if (element1 === undefined) {
        block.classList.add('hidden');
      }
    };

    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    blockHidden(card.author.avatar, cardElement.querySelector('.popup__avatar'));

    cardElement.querySelector('h3').textContent = card.offer.title;
    blockHidden(card.offer.title, cardElement.querySelector('h3'));

    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    blockHidden(card.offer.address, cardElement.querySelector('.popup__text--address'));

    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    blockHidden(card.offer.price, cardElement.querySelector('.popup__text--price'));

    cardElement.querySelector('h4').textContent = typeOfHouse(card, type);
    blockHidden(typeOfHouse(card, type), cardElement.querySelector('h4'));

    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    blockHidden(card.offer.rooms, cardElement.querySelector('.popup__text--capacity'));
    blockHidden(card.offer.guests, cardElement.querySelector('.popup__text--capacity'));

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    blockHidden(card.offer.checkin, cardElement.querySelector('.popup__text--time'));
    blockHidden(card.offer.checkout, cardElement.querySelector('.popup__text--time'));

    var wifi = popupFeatures.querySelector('li:nth-child(1)');
    var dishwasher = popupFeatures.querySelector('li:nth-child(2)');
    var parking = popupFeatures.querySelector('li:nth-child(3)');
    var washer = popupFeatures.querySelector('li:nth-child(4)');
    var elevator = popupFeatures.querySelector('li:nth-child(5)');
    var conditioner = popupFeatures.querySelector('li:nth-child(6)');

    var setFeatures = function (element) {
      for (var i = 0; i < card.offer.features.length; i++) {
        if (card.offer.features[i] === element.dataset.category) {
          element.classList.remove('hidden');
          break;
        } else {
          element.classList.add('hidden');
        }
      }
    };

    cardElement.querySelector('.popup__feature--wifi').textContent = setFeatures(wifi);
    cardElement.querySelector('.popup__feature--dishwasher').textContent = setFeatures(dishwasher);
    cardElement.querySelector('.popup__feature--parking').textContent = setFeatures(parking);
    cardElement.querySelector('.popup__feature--washer').textContent = setFeatures(washer);
    cardElement.querySelector('.popup__feature--elevator').textContent = setFeatures(elevator);
    cardElement.querySelector('.popup__feature--conditioner').textContent = setFeatures(conditioner);

    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    blockHidden(card.offer.description, cardElement.querySelector('.popup__description'));

    var setPhotos = function (array, element) {
      var containerPhoto = cardElement.querySelector('.popup__photos');
      var popupPhoto = cardElement.querySelector('.popup__photo');

      for (var i = 0; i < array.length; i++) {
        if (array.length === 1 && array[i] === undefined) {
          containerPhoto.classList.add('hidden');
        } else if (array.length > 1) {
          var image = document.createElement('img');
          popupPhoto.classList.add('hidden');
          image.src = array[i];
          image.width = '45';
          image.height = '40';

          containerPhoto.insertAdjacentElement('afterBegin', image);

        } else if (array.length === 1) {
          element.src = array[i];
        }
      }
    };

    var popupPhotos = cardElement.querySelector('.popup__photos').querySelector('img');

    setPhotos(card.offer.photos, popupPhotos);

    return cardElement;
  };

  window.card = {

    renderCards: function () {
      var pinsArray = getAllAds();
      var index = 0;
      var fragment = document.createElement('div');
      fragment.className = 'containerCard';
      fragment.appendChild(createCard(pinsArray[index]));
      return fragment;
    }
  };

})();

