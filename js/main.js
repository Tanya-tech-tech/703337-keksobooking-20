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

var similarListElement = document.querySelector('.map__pins');
var setupActiveMap = similarListElement.querySelector('.map__pin--main');
var randomWidth = similarListElement.offsetWidth;
var form = document.querySelector('.ad-form');
var setupAddress = form.querySelector('#address');
var setupRoomNumber = form.querySelector('#room_number');
var setupCapacity = form.querySelector('#capacity');
var map = document.querySelector('.map');
var controlsForm = form.querySelectorAll('input, select, textarea');
var optionsRoomQuantity = setupRoomNumber.querySelectorAll('option');
var optionsCapacity = setupCapacity.querySelectorAll('option');
var pinMainWidth = setupActiveMap.offsetWidth;
var pinMainHeightNotActive = setupActiveMap.offsetHeight;
var pinMainHeightActive = setupActiveMap.offsetHeight + 22;// 22 - размер псевдоэлемента after

var similarMarkTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

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

var finalNumberPhoto = getRandomNumberNonRepeating(NUMBER_PHOTO);

var getPhotoNumber = function (array) {
  var j = Math.floor(Math.random() * array.length);
  var v = array[j];
  array.splice(j, 1);
  return v;
};

var getRandomImg = function () {
  return 'img/avatars/user' + getPhotoNumber(finalNumberPhoto) + '.png';
};

var getRandomCoordinate = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getSizeMarkX = function (width) {
  var k = (width / 2);
  return getRandomCoordinate(0, randomWidth) - k + 'px';
};

var getSizeMarkY = function (height) {
  var g = height;
  return getRandomCoordinate(BORDER_X, BORDER_Y) - g + 'px';
};

var getArrayRandomFeatures = function (array) {
  var massive = [];
  massive.length = Math.floor(Math.random() * array.length + 1);
  for (var i = 0; i < massive.length; i++) {
    massive[i] = array[i];
  }
  return massive;
};

var createPin = function () {
  var mark = {
    'author': {
      'avatar': getRandomImg()},
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
    'location': {
      'x': getSizeMarkX(50),
      'y': getSizeMarkY(70)
    }
  };
  return mark;
};

var getAllAds = function () {
  var offer = [];
  for (var i = 0; i < 8; i++) {
    offer.push(createPin());
  }
  return offer;
};

var renderMarks = function (mark) {
  var adEl = similarMarkTemplate.cloneNode(true);
  adEl.style.left = mark.location.x;
  adEl.style.top = mark.location.y;
  adEl.querySelector('img').src = mark.author.avatar;
  adEl.querySelector('img').alt = mark.offer.title;
  return adEl;
};

var checkCapacity = function (roomValue, roomQuantity) {
  for (var j = 0; j < optionsCapacity.length; j++) {
    if (optionsCapacity[j].value === roomValue) {
      optionsCapacity[j].selected = roomQuantity;
    } else {
      optionsCapacity[j].disabled = true;
    }
  }
};

var roomsForGuests = function () {
  for (var i = 0; i < optionsRoomQuantity.length; i++) {
    if (optionsRoomQuantity[i].value === '1') {
      checkCapacity(optionsRoomQuantity[i].value, optionsRoomQuantity[i].selected);
    }
  }
};

roomsForGuests();
var setPinMainInitialCoordinate = function (width, height) {
  var style = setupActiveMap.style;
  style.left = Math.round(parseInt(setupActiveMap.style.left, 10) - width / 2) + 'px';
  style.top = Math.round(parseInt(setupActiveMap.style.top, 10) - height / 2) + 'px';
};

setPinMainInitialCoordinate(pinMainWidth, pinMainHeightNotActive);

var getPinMainCoordinate = function () {
  return parseInt(setupActiveMap.style.left, 10) + ', '
  + parseInt(setupActiveMap.style.top, 10);
};

setupAddress.value = getPinMainCoordinate();

var disableItem = function (controls) {
  for (var i = 0; i < controls.length; i++) {
    controls[i].disabled = true;
  }
};

var anableItem = function (controls) {
  for (var i = 0; i < controls.length; i++) {
    controls[i].disabled = false;
  }
};

disableItem(controlsForm);

var activeMap = function () {
  var pinsArray = getAllAds();
  var renderAllMarks = function () {
    var fragment = document.createDocumentFragment();
    for (var s = 0; s < pinsArray.length; s++) {
      fragment.appendChild(renderMarks(pinsArray[s]));
    }
    return fragment;
  };
  similarListElement.appendChild(renderAllMarks());
};

var openMap = function () {
  map.classList.remove('map--faded');
  activeMap();
  anableItem(controlsForm);
  setupActiveMap.style.left = Math.round(parseInt(setupActiveMap.style.left, 10)) + 'px';
  setupActiveMap.style.top = Math.round(parseInt(setupActiveMap.style.top, 10) + pinMainHeightNotActive / 2
                            - pinMainHeightActive) + 'px';
  setupAddress.value = getPinMainCoordinate();

  setupRoomNumber.addEventListener('change', function () {
    for (var j = 0; j < optionsCapacity.length; j++) {
      if (parseInt(setupRoomNumber.value, 10) >= parseInt(optionsCapacity[j].value, 10) && parseInt(setupRoomNumber.value, 10) < 100
        && optionsCapacity[j].value !== '0') {
        optionsCapacity[j].disabled = false;

      } else if (setupRoomNumber.value === '100' && optionsCapacity[j].value === '0') {
        optionsCapacity[j].disabled = false;
      } else {
        optionsCapacity[j].disabled = true;
        optionsCapacity[j].selected = false;
      }
    }
  });
};

setupActiveMap.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    openMap();
  }
});

setupActiveMap.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    openMap();
  }
});


