'use strict';

var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
var map = document.querySelector('.map');
map.classList.remove('map--faded');


var similarAdsTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');


var NUMBER_PHOTO = [1, 2, 3, 4, 5, 6, 7, 8];

var getRandom = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomNumber = function () {
  return '0' + NUMBER_PHOTO[Math.floor(Math.random() * NUMBER_PHOTO.length)]
}

var result = [];

//отличные случайные числа без повторений
var getRandomResult = function () {
  while (result.length <NUMBER_PHOTO.length) {
    var randomNumber = getRandomNumber();
    if (result.indexOf(randomNumber) < 0) {
      result[result.length] = randomNumber;
    }
  }
  return result;
};

getRandomResult();

var indexRandom;
var valueRandom;

var getRandomNumberNonRepeating = function (arr) {

    var j= Math.floor(Math.random() * arr.length)
    indexRandom = j;
    valueRandom = arr[j];
    var removed = arr.splice(j, 1);
    return valueRandom;
};

var getRandomImg = function () {
  return 'img/avatars/user' + getRandomNumberNonRepeating(result) + '.png';
};

var size = document.querySelector('.map__pins');
//alert(size.offsetWidth +"x"+ size.offsetHeight);
var randomWidth = size.offsetWidth;
var randomHeight = size.offsetHeight;

var getRandomСoordinate = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var sizeMark = document.querySelector('.map__pin');
//alert(sizeMark.offsetWidth +"x"+ size.offsetHeight);
//sizeMark.style.border = '5px solid';

var getSizeMarkX = function (wid) {
  var k = (wid / 2);
  return getRandomСoordinate(0, randomWidth) - k + 'px';
};

var getSizeMarkY = function (hei) {
  var g = hei;
  return getRandomСoordinate(borderX, borderY) - g + 'px';
};

var quantityRooms = 4;
var pricePerDay = 6000;
var quantityGuests = 10;

var borderX = 130;
var borderY = 630;
/*
var loc = 'location';
var coordX = 'x';
var coordY = 'y';*/

var ads = [];

var getAllAds = function () {
  var obj3 = new Object();
  obj3.avatar = getRandomImg();

  var obj4 = new Object();
  obj4.title = 'строка, заголовок предложения';
  obj4.address = '600, 350';
  obj4.price = pricePerDay;
  obj4.type = getRandom(TYPE);
  obj4.rooms = quantityRooms;
  obj4.guests = quantityGuests;
  obj4.checkin = getRandom(CHECKIN);
  obj4.checkout = getRandom(CHECKOUT);
  obj4.features = getRandom(FACILITIES); //массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"
  obj4.description = 'ПРЕКРАСНО';
  obj4.photos = PHOTOS;//массив строк случайной длины, содержащий адреса фотографий

  var obj5 = new Object();
  obj5.coorX =  getSizeMarkX(50);
  obj5.coorY =  getSizeMarkY(70);


  var obj2 = new Object();
  obj2.author = obj3;
  obj2.offer = obj4;
  obj2.location = obj5;

  for (var i = 0; i < 8; i++) {
    ads.push(obj2);
  }
  return ads;
};

getAllAds();

var similarMarkTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var similarListElement = document.querySelector('.map__pins');


var renderMarks = function (arrrr) {
  var adEl = similarMarkTemplate.cloneNode(true);
  adEl.style.left = arrrr.location.coorX;
  adEl.style.top = arrrr.location.coorY;
  adEl.querySelector('img').src = arrrr.author.avatar;
  adEl.querySelector('img').alt = arrrr.offer.title;
  return adEl;
};


var renderAllMarks = function () {
  var fragment = document.createDocumentFragment();
  for (var s = 0; s < ads.length; s++) {
    fragment.appendChild(renderMarks(ads[s]));
  }
  return fragment;
};

similarListElement.appendChild(renderAllMarks());

