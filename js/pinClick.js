'use strict';
(function () {
  var map = window.data.setupActiveMap;
  var common = window.data;

  var openCardHandler = function (evt) {
    var mapPins = common.similarListElement.querySelectorAll('.usual');
    var containerCard = document.querySelector('.containerCard');

    if (containerCard) {
      containerCard.remove();
    }

    for (var h = 0; h < mapPins.length; h++) {
      if (mapPins[h].className === 'map__pin usual map__pin--active') {
        mapPins[h].classList.remove('map__pin--active');
      }
    }

    if (map.className === 'map__pin map__pin--main map__pin--active') {
      map.classList.remove('map__pin--active');
    }

    if (evt.target.parentNode.className === 'map__pin usual') {
      evt.target.parentNode.classList.add('map__pin--active');
    } else if (evt.target.className === 'map__pin usual') {
      evt.target.classList.add('map__pin--active');
    } else if (evt.target.className === 'map__pin map__pin--main') {
      evt.target.classList.add('map__pin--active');
    } else if (evt.target.parentNode.className === 'map__pin map__pin--main') {
      evt.target.parentNode.classList.add('map__pin--active');
    }

    if (evt.target.tagName === 'BUTTON') {
      for (var i = 0; i < window.generalArray.length; i++) {
        if (evt.target.childNodes[0].alt === window.generalArray[i].offer.title) {
          common.mapFiltersContainer.insertAdjacentElement('beforeBegin', window.card.renderCards(window.generalArray[i]));
        }
      }
    }

    for (var s = 0; s < window.generalArray.length; s++) {
      if (window.generalArray[s].offer.title === evt.target.alt) {
        common.mapFiltersContainer.insertAdjacentElement('beforeBegin', window.card.renderCards(window.generalArray[s]));
      }
    }
  };

  window.pinClick = {
    pinClickHandler: function () {
      common.similarListElement.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          openCardHandler();
        }
      });

      common.similarListElement.addEventListener('click', openCardHandler);
    }
  };

})();
