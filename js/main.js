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

var setupForm = document.querySelector('.ad-form');

var setupAddress = setupForm.querySelector('#address');
var setupRoomNumber = setupForm.querySelector('#room_number');
var setupCapacity = setupForm.querySelector('#capacity');

var map = document.querySelector('.map');

var controlsForm = setupForm.querySelectorAll('input, select, textarea');

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
  var ads = [];
  for (var i = 0; i < 8; i++) {
    ads.push(createPin());
  }
  return ads;
};

var renderMarks = function (mark) {
  var adEl = similarMarkTemplate.cloneNode(true);
  adEl.style.left = mark.location.x;
  adEl.style.top = mark.location.y;
  adEl.querySelector('img').src = mark.author.avatar;
  adEl.querySelector('img').alt = mark.offer.title;
  return adEl;
};

for (var i = 0; i < optionsRoomQuantity.length; i++) {
  if (optionsRoomQuantity[i].value === '1') {
    for (var e = 0; e < optionsCapacity.length; e++) {
      if (optionsCapacity[e].value === optionsRoomQuantity[i].value) {
        optionsCapacity[e].selected = optionsRoomQuantity[i].selected;
      } else {
        optionsCapacity[e].disabled = true;
      }
    }
  }
}

var setPinMainInitialСoordinate = function (width, height) {
  setupActiveMap.style.left = Math.round(parseInt(setupActiveMap.style.left, 10) - width / 2) + 'px';
  setupActiveMap.style.top = Math.round(parseInt(setupActiveMap.style.top, 10) - height / 2) + 'px';
};

setPinMainInitialСoordinate(pinMainWidth, pinMainHeightNotActive);

var getPinMainСoordinate = function () {
  return parseInt(setupActiveMap.style.left, 10) + ', '
  + parseInt(setupActiveMap.style.top, 10);
};

setupAddress.value = getPinMainСoordinate();

var disableItem = function (controls) {
  for (var l = 0; l < controls.length; l++) {
    controls[l].disabled = true;
  }
};

var turningOnItem = function (controls) {
  for (var h = 0; h < controls.length; h++) {
    controls[h].disabled = false;
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
  turningOnItem(controlsForm);
  setupActiveMap.style.left = Math.round(parseInt(setupActiveMap.style.left, 10)) + 'px';
  setupActiveMap.style.top = Math.round(parseInt(setupActiveMap.style.top, 10) + pinMainHeightNotActive / 2
                            - pinMainHeightActive) + 'px';
  setupAddress.value = getPinMainСoordinate();

  setupRoomNumber.addEventListener('change', function () {
    var option1 = setupCapacity.querySelector('option:nth-child(1)');
    var option2 = setupCapacity.querySelector('option:nth-child(2)');
    var option3 = setupCapacity.querySelector('option:nth-child(3)');
    var option4 = setupCapacity.querySelector('option:nth-child(4)');
    if (setupRoomNumber.value === '100') {
      option1.disabled = true;
      option1.selected = false;
      option2.disabled = true;
      option2.selected = false;
      option3.disabled = true;
      option3.selected = false;
      option4.disabled = false;
    } else if (setupRoomNumber.value === '1') {
      option1.disabled = true;
      option1.selected = false;
      option2.disabled = true;
      option2.selected = false;
      option3.disabled = false;
      option4.disabled = true;
      option4.selected = false;
    } else if (setupRoomNumber.value === '2') {
      option1.disabled = true;
      option1.selected = false;
      option2.disabled = false;

      option3.disabled = false;

      option4.disabled = true;
      option4.selected = false;
    } else if (setupRoomNumber.value === '3') {
      option1.disabled = false;
      option2.disabled = false;
      option3.disabled = false;
      option4.disabled = true;
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


