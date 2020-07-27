'use strict';

(function () {
  var style = window.data.setupActiveMap.style;

  window.form = {
    openMap: function () {
      window.data.map.classList.remove('map--faded');
      window.load(window.data.successHandler, window.data.errorHandler);

      window.data.anableItem(window.data.controlsForm);
      window.data.anableMapFilters(window.data.filters);
      style.left = Math.round(parseInt(style.left, 10)) + 'px';
      style.top = Math.round(parseInt(style.top, 10) + window.data.pinMainHeightNotActive / 2
                            - window.data.pinMainHeightActive) + 'px';
      window.data.setupAddress.value = window.map.getPinMainCoordinate();

      window.data.setupActiveMap.removeEventListener('mousedown', window.data.activationMap);
      window.data.setupActiveMap.removeEventListener('keydown', window.data.evtEnter);

      window.data.setupRoomNumber.addEventListener('change', function () {
        for (var j = 0; j < window.data.optionsCapacity.length; j++) {
          if (parseInt(window.data.setupRoomNumber.value, 10) >= parseInt(window.data.optionsCapacity[j].value, 10)
            && parseInt(window.data.setupRoomNumber.value, 10) < 100
            && window.data.optionsCapacity[j].value !== '0') {
            window.data.optionsCapacity[j].disabled = false;
          } else if (window.data.setupRoomNumber.value === '100' && window.data.optionsCapacity[j].value === '0') {
            window.data.optionsCapacity[j].disabled = false;
          } else {
            window.data.optionsCapacity[j].disabled = true;
            window.data.optionsCapacity[j].selected = false;
          }
        }
      });
      window.data.setupTimeIn.addEventListener('change', function () {
        for (var i = 0; i < window.data.optionsTimeOut.length; i++) {
          if (window.data.setupTimeIn.value === window.data.optionsTimeOut[i].value) {
            window.data.optionsTimeOut[i].selected = true;
          }
        }
      });
      window.data.setupTimeOut.addEventListener('change', function () {
        for (var i = 0; i < window.data.optionsTimeIn.length; i++) {
          if (window.data.setupTimeOut.value === window.data.optionsTimeIn[i].value) {
            window.data.optionsTimeIn[i].selected = true;
          }
        }
      });
    }
  };

})();

