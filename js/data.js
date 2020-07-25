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
  var MAX_SIMILAR_PIN = 5;

  var similarListElement = document.querySelector('.map__pins');
  var setupActiveMap = similarListElement.querySelector('.map__pin--main');
  var randomWidth = similarListElement.offsetWidth;
  var form = document.querySelector('.ad-form');
  var setupAddress = form.querySelector('#address');
  var setupRoomNumber = form.querySelector('#room_number');
  var setupCapacity = form.querySelector('#capacity');
  var map = document.querySelector('.map');
  var controlsForm = form.querySelectorAll('input, select, textarea');
  var filters = document.querySelector('.map__filters').querySelectorAll('input, select, textarea');
  var optionsRoomQuantity = setupRoomNumber.querySelectorAll('option');
  var optionsCapacity = setupCapacity.querySelectorAll('option');
  var pinMainWidth = setupActiveMap.offsetWidth;
  var pinMainHeightNotActive = setupActiveMap.offsetHeight;
  var pinMainHeightActive = setupActiveMap.offsetHeight + 22;// 22 - размер псевдоэлемента after
  var mapFilters = document.querySelector('.map__filters-container');
  var housingType = document.getElementById('housing-type');
  var mapPin = similarListElement.children;

  var similarMarkTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');
  var cardElement = similarCardTemplate.cloneNode(true);
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  window.generalArray = [];
  var sameTypeHouseForCard = [];

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
    filters: filters,
    optionsRoomQuantity: optionsRoomQuantity,
    optionsCapacity: optionsCapacity,
    pinMainWidth: pinMainWidth,
    pinMainHeightNotActive: pinMainHeightNotActive,
    pinMainHeightActive: pinMainHeightActive,
    mapFilters: mapFilters,
    similarMarkTemplate: similarMarkTemplate,
    similarCardTemplate: similarCardTemplate,
    mapFiltersContainer: mapFiltersContainer,
    housingType: housingType,

    sameTypeHouseForCard: sameTypeHouseForCard,

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

    closePopup: function () {
      cardElement.classList.add('hidden');
      document.removeEventListener('keydown', window.data.onPopupEscPress);
    },

    anableItem: function (controls) {
      for (var i = 0; i < controls.length; i++) {
        controls[i].disabled = false;
      }
    },

    anableMapFilters: function (filter) {
      for (var i = 0; i < filter.length; i++) {
        filter[i].disabled = false;
      }
    },

    successHandler: function (pins) {
      var fragment = document.createDocumentFragment();
      window.generalArray = pins;
      var successSameTypeHandler = function () {
        var sameTypeHouse = pins.filter(function (it) {
          return it.offer.type === window.data.housingType.value;
        });
        var takeNumber = sameTypeHouse.length > MAX_SIMILAR_PIN ? MAX_SIMILAR_PIN : sameTypeHouse.length;

        if (window.data.housingType.value === 'any') {
          for (var i = 0; i < MAX_SIMILAR_PIN; i++) {
            fragment.appendChild(window.map.renderMarks(pins[i]));
          }
        } else {
          for (var j = 0; j < takeNumber; j++) {
            fragment.appendChild(window.map.renderMarks(sameTypeHouse[j]));
            sameTypeHouseForCard.push(sameTypeHouse[j]);
          }
        }

        window.data.similarListElement.appendChild(fragment);
        window.pinClick.pinClickHandler();
      };

      var hideCard = function () {
        var hiddenCards = document.querySelector('.containerCard');
        for (var i = 0; i < mapPin.length; i++) {
          if (mapPin[i].className === 'map__pin usual') {
            mapPin[i].classList.add('hidden');
          }
        }
        if (hiddenCards) {
          hiddenCards.remove();
        }
        successSameTypeHandler();
      };

      successSameTypeHandler();
      window.data.housingType.addEventListener('change', hideCard);
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


