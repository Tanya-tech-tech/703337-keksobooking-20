'use strict';

(function () {
  //var map = ;

  var checkCapacity = function (roomValue, roomQuantity) {
    for (var j = 0; j < window.data.optionsCapacity.length; j++) {
      if (window.data.optionsCapacity[j].value === roomValue) {
        window.data.optionsCapacity[j].selected = roomQuantity;
      } else {
        window.data.optionsCapacity[j].disabled = true;
      }
    }
  };

  var roomsForGuests = function () {
    for (var i = 0; i < window.data.optionsRoomQuantity.length; i++) {
      if (window.data.optionsRoomQuantity[i].value === '1') {
        checkCapacity(window.data.optionsRoomQuantity[i].value, window.data.optionsRoomQuantity[i].selected);
      }
    }
  };

  roomsForGuests();

  var setPinMainInitialCoordinate = function (width, height) {
    var style = window.data.setupActiveMap.style;
    style.left = Math.round(parseInt(style.left, 10) - width / 2) + 'px';
    style.top = Math.round(parseInt(style.top, 10) - height / 2) + 'px';
  };

  setPinMainInitialCoordinate(window.data.pinMainWidth,
                              window.data.pinMainHeightNotActive);

  var disableItem = function (controls) {
    for (var i = 0; i < controls.length; i++) {
      controls[i].disabled = true;
    }
  };

  disableItem(window.data.controlsForm);

  window.data.setupActiveMap.addEventListener('mousedown', window.data.activationMap);

  window.data.setupActiveMap.addEventListener('keydown', window.data.evtEnter);

})();


