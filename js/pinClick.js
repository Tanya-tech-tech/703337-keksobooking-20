'use strict';
(function () {

  window.pinClick = {

    pinClickHandler: function() {
      var mapPins = window.data.similarListElement.querySelectorAll('.usual');

        window.data.similarListElement.addEventListener('click', function (evt) {
          for (var h=0; h< mapPins.length; h++) {
            if (mapPins[h].className === 'map__pin usual map__pin--active') {
              mapPins[h].classList.remove('map__pin--active')
            };
          }
          var containerCard = document.querySelector('.containerCard');
          if (evt.target.parentNode.className === 'map__pin usual') {
            evt.target.parentNode.classList.add('map__pin--active');
          };

          if (containerCard) {
            containerCard.remove();
          };

          if (window.data.housingType.value === 'any') {
            for (var i=0; i<window.data.generalArray.length; i++) {
              if (window.data.generalArray[i].offer.title === evt.target.alt) {
                window.data.mapFiltersContainer.insertAdjacentElement('beforeBegin', window.card.renderCards(window.data.generalArray[i]));
              }
            };
          } else {
            for (var j = 0; j < window.data.sameTypeHouseForCard.length; j++) {
              if (window.data.sameTypeHouseForCard[j].offer.title === evt.target.alt) {
                window.data.mapFiltersContainer.insertAdjacentElement('beforeBegin', window.card.renderCards(window.data.sameTypeHouseForCard[j]));
              }
            }
          };
          containerCard = document.querySelector('.containerCard');
        });

    }
  }

})();
