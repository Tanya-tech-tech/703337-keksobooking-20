'use strict';

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var NUMBER_PHOTO = [1, 2, 3, 4, 5, 6, 7, 8];
var BORDER_X = 130;
var BORDER_Y = 630;
var QUANTITY_ROOMS = 4;
var PRICE_PER_DAY = 6000;
var QUANTITY_GUESTS = 10;

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var similarListElement = document.querySelector('.map__pins');
var randomWidth = similarListElement.offsetWidth;

var similarMarkTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var shuffle = function (stirringAr) {
  for (var i = stirringAr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = stirringAr[j];
    stirringAr[j] = stirringAr[i];
    stirringAr[i] = temp;
  }
  return stirringAr;
};

var getRandomNumberNonRepeating = function (arr) {
  shuffle(arr);
  for (var i = arr.length - 1; i >= 0; i--) {
    arr[i] = '0' + arr[i];
  }
  return arr;
};

var finalNumberPhoto = getRandomNumberNonRepeating(NUMBER_PHOTO);

var getPhotoNumber = function (arry) {
  var j = Math.floor(Math.random() * arry.length);
  var v = arry[j];
  arry.splice(j, 1);
  return v;
};

var getRandomImg = function () {
  return 'img/avatars/user' + getPhotoNumber(finalNumberPhoto) + '.png';
};

var getRandomСoordinate = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getSizeMarkX = function (wid) {
  var k = (wid / 2);
  return getRandomСoordinate(0, randomWidth) - k + 'px';
};

var getSizeMarkY = function (hei) {
  var g = hei;
  return getRandomСoordinate(BORDER_X, BORDER_Y) - g + 'px';
};

var getArrayRandomFeatures = function (arru) {
  var massive = [];
  massive.length = Math.floor(Math.random() * arru.length + 1);
  for (var i = 0; i < massive.length; i++) {
    massive[i] = arru[i];
  }
  return massive;
};

var createPin = function () {
  var mark = {
    'author': {
      avatar: getRandomImg()},
    'offer': {
      'title': 'строка, заголовок предложения',
      'address': '600, 350',
      'price': PRICE_PER_DAY,
      'type': getRandom(TYPE),
      'rooms': QUANTITY_ROOMS,
      'guests': QUANTITY_GUESTS,
      'checkin': getRandom(CHECKIN),
      'checkout': getRandom(CHECKOUT),
      'features': getArrayRandomFeatures(FACILITIES),
      'description': 'ПРЕКРАСНО',
      'photos': getArrayRandomFeatures(PHOTOS)
    },
    'loc': {
      x: getSizeMarkX(50),
      y: getSizeMarkY(70)
    }
  };
  return mark;
};

var getAllAds = function () {
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads.push(createPin());
  }
  return ads;
};


var renderMarks = function (mark) {
  var adEl = similarMarkTemplate.cloneNode(true);
  adEl.style.left = mark.loc.x;
  adEl.style.top = mark.loc.y;
  adEl.querySelector('img').src = mark.author.avatar;
  adEl.querySelector('img').alt = mark.offer.title;
  return adEl;
};

var pinsArray = getAllAds();

var renderAllMarks = function () {
  var fragment = document.createDocumentFragment();
  for (var s = 0; s < pinsArray.length; s++) {
    fragment.appendChild(renderMarks(pinsArray[s]));
  }
  return fragment;
};

similarListElement.appendChild(renderAllMarks());

