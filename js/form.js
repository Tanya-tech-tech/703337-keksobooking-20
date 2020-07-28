'use strict';

(function () {
  var style = window.data.setupActiveMap.style;
  var map = window.data.setupActiveMap;
  var common = window.data;

  window.form = {
    openMap: function () {
      common.map.classList.remove('map--faded');
      common.form.classList.remove('ad-form--disabled');
      window.backend.load(common.successHandler, common.errorHandler);

      common.anableItem(common.controlsForm);
      common.anableMapFilters(common.filters);
      style.left = Math.round(parseInt(style.left, 10)) + 'px';
      style.top = Math.round(parseInt(style.top, 10) + common.pinMainHeightNotActive / 2
                            - common.pinMainHeightActive) + 'px';
      common.setupAddress.value = window.map.getPinMainCoordinate();

      map.removeEventListener('mousedown', common.activationMap);
      map.removeEventListener('keydown', common.evtEnter);

      common.setupRoomNumber.addEventListener('change', function () {
        for (var j = 0; j < common.optionsCapacity.length; j++) {
          if (parseInt(common.setupRoomNumber.value, 10) >= parseInt(common.optionsCapacity[j].value, 10)
            && parseInt(common.setupRoomNumber.value, 10) < 100
            && common.optionsCapacity[j].value !== '0') {
            common.optionsCapacity[j].disabled = false;
          } else if (common.setupRoomNumber.value === '100' && common.optionsCapacity[j].value === '0') {
            common.optionsCapacity[j].disabled = false;
          } else {
            common.optionsCapacity[j].disabled = true;
            common.optionsCapacity[j].selected = false;
          }
        }
      });
      common.setupTimeIn.addEventListener('change', function () {
        for (var i = 0; i < common.optionsTimeOut.length; i++) {
          if (common.setupTimeIn.value === common.optionsTimeOut[i].value) {
            common.optionsTimeOut[i].selected = true;
          }
        }
      });
      common.setupTimeOut.addEventListener('change', function () {
        for (var i = 0; i < common.optionsTimeIn.length; i++) {
          if (common.setupTimeOut.value === common.optionsTimeIn[i].value) {
            common.optionsTimeIn[i].selected = true;
          }
        }
      });

    }
  };

})();

