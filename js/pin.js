'use strict';

(function () {

  window.pin = {
    createPin: function () {
      var mark = {
        'author': {
          'avatar': window.map.getRandomImg()},
        'offer': {
          'title': 'строка, заголовок предложения',
          'address': '600, 350',
          'price': window.data.PRICE_PER_DAY,
          'type': window.map.getRandom(window.data.TYPE),
          'rooms': window.data.QUANTITY_ROOMS,
          'guests': window.data.QUANTITY_GUESTS,
          'checkin': window.map.getRandom(window.data.CHECKIN),
          'checkout': window.map.getRandom(window.data.CHECKOUT),
          'features': window.map.getArrayRandomFeatures(window.data.FACILITIES),
          'description': 'ПРЕКРАСНО',
          'photos': window.map.getArrayRandomFeatures(window.data.PHOTOS)
        },
        'location': {
          'x': window.map.getSizeMarkX(50),
          'y': window.map.getSizeMarkY(70)
        }
      };
      return mark;
    }
  };

})();

