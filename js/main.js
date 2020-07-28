'use strict';

(function () {
  var formReset = document.querySelector('.ad-form__reset');
  var common = window.data;
  var map = window.data.setupActiveMap;
  var style = window.data.setupActiveMap.style;

  var checkCapacity = function (roomValue, roomQuantity) {
    for (var j = 0; j < common.optionsCapacity.length; j++) {
      if (common.optionsCapacity[j].value === roomValue) {
        common.optionsCapacity[j].selected = roomQuantity;
      } else {
        common.optionsCapacity[j].disabled = true;
      }
    }
  };

  var roomsForGuests = function () {
    for (var i = 0; i < common.optionsRoomQuantity.length; i++) {
      if (common.optionsRoomQuantity[i].value === '1') {
        checkCapacity(common.optionsRoomQuantity[i].value, common.optionsRoomQuantity[i].selected);
      }
    }
  };

  roomsForGuests();

  common.setPinMainInitialCoordinate(common.pinMainWidth, common.pinMainHeightNotActive);

  common.disableItem(common.controlsForm);
  common.disableMapFilters(common.filters);

  map.addEventListener('mousedown', common.activationMap);

  map.addEventListener('keydown', common.evtEnter);

  common.form.addEventListener('submit', common.submitHandler);
  formReset.addEventListener('click', common.inactiveState);

})();


