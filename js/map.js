'use strict';

(function () {
  var BORDER_X = 130;
  var BORDER_Y = 630;

  var shuffle = function (sourceArray) {
    for (var i = sourceArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = sourceArray[j];
      sourceArray[j] = sourceArray[i];
      sourceArray[i] = temp;
    }
    return sourceArray;
  };

  var getRandomNumberNonRepeating = function (array) {
    var innerArray = shuffle(array);
    for (var i = innerArray.length - 1; i >= 0; i--) {
      innerArray[i] = '0' + innerArray[i];
    }
    return innerArray;
  };

  var finalNumberPhoto = getRandomNumberNonRepeating(window.data.NUMBER_PHOTO);
  var getPhotoNumber = function (array) {
    var j = Math.floor(Math.random() * array.length);
    var v = array[j];
    array.splice(j, 1);
    return v;
  };

  var renderMarks = function (mark) {
    var adEl = window.data.similarMarkTemplate.cloneNode(true);
    adEl.style.left = mark.location.x;
    adEl.style.top = mark.location.y;
    adEl.querySelector('img').src = mark.author.avatar;
    adEl.querySelector('img').alt = mark.offer.title;
    return adEl;
  };

  var getAllAds = function () {
    var offer = [];
    for (var i = 0; i < 8; i++) {
      offer.push(window.pin.createPin());
    }
    return offer;
  };

  var getRandomCoordinate = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.map = {

    renderPins: function () {
      var pinsArray = getAllAds();
      var renderAllMarks = function () {
        var fragment = document.createDocumentFragment();
        for (var s = 0; s < pinsArray.length; s++) {
          fragment.appendChild(renderMarks(pinsArray[s]));
        }
        return fragment;
      };
      window.data.similarListElement.appendChild(renderAllMarks());
    },

    renderMarks: function (mark) {
      var adEl = window.data.similarMarkTemplate.cloneNode(true);
      adEl.style.left = mark.location.x + 'px';
      adEl.style.top = mark.location.y + 'px';
      adEl.querySelector('img').src = mark.author.avatar;
      adEl.querySelector('img').alt = mark.offer.title;
      return adEl;
    },

    getRandomImg: function () {
      return 'img/avatars/user' + getPhotoNumber(finalNumberPhoto) + '.png';
    },

    getRandom: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    getAllAds: function () {
      var offer = [];
      for (var i = 0; i < 8; i++) {
        offer.push(window.pin.createPin());
      }
      return offer;
    },

    getArrayRandomFeatures: function (array) {
      var massive = [];
      massive.length = Math.floor(Math.random() * array.length + 1);
      for (var i = 0; i < massive.length; i++) {
        massive[i] = array[i];
      }
      return massive;
    },

    getSizeMarkX: function (width) {
      var k = (width / 2);
      return getRandomCoordinate(0, window.data.randomWidth) - k + 'px';
    },

    getSizeMarkY: function (height) {
      var g = height;
      return getRandomCoordinate(BORDER_X, BORDER_Y) - g + 'px';
    },
    getPinMainCoordinate: function () {
      var style = window.data.setupActiveMap.style;
      return parseInt(style.left, 10) + ', '
      + parseInt(style.top, 10);
    }
  };

})();

