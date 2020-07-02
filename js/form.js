'use strict';

(function () {

  window.form = {
    openMap: function () {
      window.data.map.classList.remove('map--faded');
      window.map.renderPins();
      window.data.anableItem(window.data.controlsForm);
      window.data.setupActiveMap.style.left = Math.round(parseInt(window.data.setupActiveMap.style.left, 10)) + 'px';
      window.data.setupActiveMap.style.top = Math.round(parseInt(window.data.setupActiveMap.style.top, 10) + window.data.pinMainHeightNotActive / 2
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
    }
  };

})();

