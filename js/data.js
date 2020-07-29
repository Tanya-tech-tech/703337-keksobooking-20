'use strict';

(function () {
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var FACILITIES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var NUMBER_PHOTO = [1, 2, 3, 4, 5, 6, 7, 8];
  var BORDER_Y_MIN = 130;
  var BORDER_Y_MAX = 630;
  var PIN_ORDINARY_WIDTH = 50;
  var PIN_ORDINARY_HEIGHT = 70;

  var QUANTITY_ROOMS = 4;
  var PRICE_PER_DAY = 6000;
  var QUANTITY_GUESTS = 10;
  var MAX_SIMILAR_PIN = 5;

  var PinMainInitialX = 570;
  var PinMainInitialY = 375;
  var similarListElement = document.querySelector('.map__pins');
  var setupActiveMap = similarListElement.querySelector('.map__pin--main');
  var randomWidth = similarListElement.offsetWidth;
  var form = document.querySelector('.ad-form');
  var setupAddress = form.querySelector('#address');
  var setupRoomNumber = form.querySelector('#room_number');
  var setupCapacity = form.querySelector('#capacity');
  var setupTimeIn = form.querySelector('#timein');
  var setupTimeOut = form.querySelector('#timeout');
  var map = document.querySelector('.map');
  var controlsForm = form.querySelectorAll('input, select, textarea');
  var filters = document.querySelector('.map__filters').querySelectorAll('input, select, textarea');
  var optionsRoomQuantity = setupRoomNumber.querySelectorAll('option');
  var optionsCapacity = setupCapacity.querySelectorAll('option');
  var optionsTimeOut = setupTimeOut.querySelectorAll('option');
  var optionsTimeIn = setupTimeIn.querySelectorAll('option');
  var pinMainWidth = setupActiveMap.offsetWidth;
  var pinMainHeightNotActive = setupActiveMap.offsetHeight;
  var pinMainHeightActive = setupActiveMap.offsetHeight + 22;// 22 - размер псевдоэлемента after
  var mapFilters = document.querySelector('.map__filters-container');

  var housingType = document.getElementById('housing-type');
  var housingPrice = document.getElementById('housing-price');
  var housingRooms = document.getElementById('housing-rooms');
  var housingGuests = document.getElementById('housing-guests');
  var housingFeatures = document.getElementById('housing-features');


  var main = document.querySelector('main');
  var body = document.querySelector('body');
  var mapPin = similarListElement.children;
  var hiddenCards = document.querySelector('.containerCard');

  var similarMarkTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var successMessageTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var message = successMessageTemplate.cloneNode(true);

  var errorMessageTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.popup');

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  window.generalArray = [];

  window.data = {
    CHECKIN: CHECKIN,
    CHECKOUT: CHECKOUT,
    TYPE: TYPE,
    FACILITIES: FACILITIES,
    PHOTOS: PHOTOS,
    NUMBER_PHOTO: NUMBER_PHOTO,
    BORDER_Y_MIN: BORDER_Y_MIN,
    BORDER_Y_MAX: BORDER_Y_MAX,
    PIN_ORDINARY_WIDTH: PIN_ORDINARY_WIDTH,
    PIN_ORDINARY_HEIGHT: PIN_ORDINARY_HEIGHT,
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
    setupTimeIn: setupTimeIn,
    setupTimeOut: setupTimeOut,
    map: map,
    controlsForm: controlsForm,
    filters: filters,
    optionsRoomQuantity: optionsRoomQuantity,
    optionsCapacity: optionsCapacity,
    optionsTimeOut: optionsTimeOut,
    optionsTimeIn: optionsTimeIn,
    pinMainWidth: pinMainWidth,
    pinMainHeightNotActive: pinMainHeightNotActive,
    pinMainHeightActive: pinMainHeightActive,
    mapFilters: mapFilters,
    similarMarkTemplate: similarMarkTemplate,
    similarCardTemplate: similarCardTemplate,
    successMessageTemplate: successMessageTemplate,
    mapFiltersContainer: mapFiltersContainer,
    housingType: housingType,
    main: main,

    disableItem: function (controls) {
      for (var i = 0; i < controls.length; i++) {
        controls[i].disabled = true;
      }
    },

    disableMapFilters: function (filter) {
      for (var i = 0; i < filter.length; i++) {
        filter[i].disabled = true;
      }
    },

    setPinMainInitialCoordinate: function (width, height) {
      window.data.setupActiveMap.style.left = Math.round(parseInt(window.data.setupActiveMap.style.left, 10) - width / 2) + 'px';
      window.data.setupActiveMap.style.top = Math.round(parseInt(window.data.setupActiveMap.style.top, 10) - height / 2) + 'px';
    },

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

    onPopupEscPress: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.data.closePopup();
      }
    },

    closePopup: function () {
      message.classList.add('hidden');
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

    removePins: function () {
      for (var i = 0; i < mapPin.length; i++) {
        if (mapPin[i].className === 'map__pin usual') {
          mapPin[i].classList.add('hidden');
        }
      }
      if (hiddenCards) {
        hiddenCards.remove();
      }
    },

    successHandler: function (pins) {
      var fragment = document.createDocumentFragment();
      window.generalArray = pins;

      var successSameTypeHandler = function () {
        var filterWifi = document.getElementById('filter-wifi');
        var filterDishwasher = document.getElementById('filter-dishwasher');
        var filterParking = document.getElementById('filter-parking');
        var filterWasher = document.getElementById('filter-washer');
        var filterElevator = document.getElementById('filter-elevator');
        var filterConditioner = document.getElementById('filter-conditioner');

        var getRank = function (pin) {
          var rank = 0;
          if (pin.offer.type === housingType.value) {
            rank += 6;
          }
          if (housingType.value === 'any') {
            rank += 1;
          }
          if (housingPrice.value === 'middle' && pin.offer.price >= 10000 && pin.offer.price <= 50000) {
            rank += 5;
          }
          if (housingPrice.value === 'low' && pin.offer.price < 10000) {
            rank += 5;
          }
          if (housingPrice.value === 'high' && pin.offer.price > 50000) {
            rank += 5;
          }
          if (housingPrice.value === 'any') {
            rank += 1;
          }
          if (parseInt(housingRooms.value, 10) === pin.offer.rooms) {
            rank += 4;
          }

          if (housingRooms.value === 'any') {
            rank += 1;
          }
          if (pin.offer.guests === parseInt(housingGuests.value, 10)) {
            rank += 3;
          }
          if (housingGuests.value === 'any') {
            rank += 1;
          }
          for (var i = 0; i < pin.offer.features.length; i++) {
            if (filterWifi.checked && pin.offer.features[i] === filterWifi.value) {
              rank += 2;
            } else if (filterDishwasher.checked && pin.offer.features[i] === filterDishwasher.value) {
              rank += 2;
            } else if (filterParking.checked && pin.offer.features[i] === filterParking.value) {
              rank += 2;
            } else if (filterWasher.checked && pin.offer.features[i] === filterWasher.value) {
              rank += 2;
            } else if (filterElevator.checked && pin.offer.features[i] === filterElevator.value) {
              rank += 2;
            } else if (filterConditioner.checked && pin.offer.features[i] === filterConditioner.value) {
              rank += 2;
            }
          }

          return rank;
        };

        var typeComparator = function (left, right) {
          if (left > right) {
            return 1;
          } else if (left < right) {
            return -1;
          } else {
            return 0;
          }
        };

        var updatePins = function () {
          window.generalArray.sort(function (left, right) {
            var rankDiff = getRank(right) - getRank(left);
            if (rankDiff === 0) {
              rankDiff = typeComparator(left.offer.type, right.offer.type);
            }
            return rankDiff;
          });

          for (var i = 0; i < MAX_SIMILAR_PIN; i++) {
            fragment.appendChild(window.map.renderMarks(window.generalArray[i]));
          }

          window.data.similarListElement.appendChild(fragment);
        };

        updatePins();
        window.pinClick.pinClickHandler();
      };

      var hideCard = window.debounce(function () {
        var containerCard = document.querySelector('.containerCard');
        for (var i = 0; i < mapPin.length; i++) {
          if (mapPin[i].className === 'map__pin usual') {
            mapPin[i].classList.add('hidden');
          }
        }

        if (containerCard) {
          containerCard.remove();
        }
        successSameTypeHandler();
      });

      successSameTypeHandler();

      housingType.addEventListener('change', hideCard);
      housingPrice.addEventListener('change', hideCard);
      housingRooms.addEventListener('change', hideCard);
      housingGuests.addEventListener('change', hideCard);
      housingFeatures.addEventListener('change', hideCard);
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
      body.insertAdjacentElement('afterbegin', node);
    },

    errorPostHandler: function () {
      var messageError = errorMessageTemplate.cloneNode(true);
      var errorButton = messageError.querySelector('.error__button');
      var onPopupEscPress = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          closePopup();
        }
      };

      var closePopup = function () {
        messageError.classList.add('hidden');
        document.removeEventListener('keydown', onPopupEscPress);
      };

      messageError.style = 'width: 60%; margin-left: 300px;';
      main.insertAdjacentElement('afterBegin', messageError);

      document.addEventListener('click', function (evt) {
        if (evt.target.className !== 'error') {
          closePopup();
        }
      });
      document.addEventListener('keydown', onPopupEscPress);
      errorButton.addEventListener('click', function () {
        closePopup();
      });
    },

    inactiveState: function () {
      window.data.map.classList.add('map--faded');
      window.data.form.classList.add('ad-form--disabled');
      window.data.form.reset();

      window.data.removePins();

      window.data.setPinMainInitialCoordinate(window.data.pinMainWidth, window.data.pinMainHeightNotActive);
      window.data.setupActiveMap.style.left = PinMainInitialX + 'px';
      window.data.setupActiveMap.style.top = PinMainInitialY + 'px';
      window.data.setupAddress.value = window.map.getPinMainCoordinate();
      window.data.disableItem(window.data.controlsForm);
      window.data.disableMapFilters(window.data.filters);
      window.data.setupActiveMap.addEventListener('mousedown', window.data.activationMap);
      window.data.setupActiveMap.addEventListener('keydown', window.data.evtEnter);
      window.data.form.addEventListener('submit', window.data.submitHandler);
    },

    submitHandler: function (evt) {
      evt.preventDefault();

      window.backend.save(new FormData(window.data.form),
          function () {
            message.style = 'width: 50%; margin-left: 400px;';
            main.insertAdjacentElement('afterbegin', message);
            window.data.inactiveState();

            document.addEventListener('click', function (evtSuccess) {
              if (evtSuccess.target.className !== 'success') {
                window.data.closePopup();
              }
            });

            document.addEventListener('keydown', window.data.onPopupEscPress);
            window.data.inactiveState();
          },
          window.data.errorPostHandler
      );
    }
  };

})();


