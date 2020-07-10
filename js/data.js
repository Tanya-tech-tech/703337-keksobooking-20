'use strict';
(function () {
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var NUMBER_PHOTO = [1, 2, 3, 4, 5, 6, 7, 8];

  var QUANTITY_ROOMS = 4;
  var PRICE_PER_DAY = 6000;
  var QUANTITY_GUESTS = 10;
  var MAX_SIMILAR_PIN = 8;

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

  window.data = {
    CHECKIN: CHECKIN,
    CHECKOUT: CHECKOUT,
    TYPE: TYPE,
    FACILITIES: FACILITIES,
    PHOTOS: PHOTOS,
    NUMBER_PHOTO: NUMBER_PHOTO,
    QUANTITY_ROOMS: QUANTITY_ROOMS,
    PRICE_PER_DAY: PRICE_PER_DAY,
    QUANTITY_GUESTS: QUANTITY_GUESTS,

    similarListElement: similarListElement,
    setupActiveMap: setupActiveMap,
    randomWidth: randomWidth,
    form: form,
    setupAddress: setupAddress,
    setupRoomNumber: setupRoomNumber,
    setupCapacity: setupCapacity,
    map: map,
    controlsForm: controlsForm,
    optionsRoomQuantity: optionsRoomQuantity,
    optionsCapacity: optionsCapacity,
    pinMainWidth: pinMainWidth,
    pinMainHeightNotActive: pinMainHeightNotActive,
    pinMainHeightActive: pinMainHeightActive,
    similarMarkTemplate: similarMarkTemplate,
    activationMap: function (evt) {
      if (evt.button === 0) {
        window.form.openMap();
      }
    },

    evtEnter: function (evt) {
      if (evt.key === 'Enter') {
        window.form.openMap();
      }
    },

    anableItem: function (controls) {
      for (var i = 0; i < controls.length; i++) {
        controls[i].disabled = false;
      }
    },
    successHandler: function (pins) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < MAX_SIMILAR_PIN; i++) {
        fragment.appendChild(window.map.renderMarks(pins[i]));
      }
      window.data.similarListElement.appendChild(fragment);
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: white; color: red';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.paddingTop = '50px';
      node.style.fontSize = '40px';
      node.style.height = '150px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };

})();



/*
  var successHandler = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < MAX_SIMILAR_PIN; i++) {
      fragment.appendChild(window.map.renderMarks(pins[i]));
    }
    window.data.similarListElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: white; color: red';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.paddingTop = '50px';
    node.style.fontSize = '40px';
    node.style.height = '150px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };*/