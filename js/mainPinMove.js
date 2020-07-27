'use strict';

(function () {
  window.data.setupActiveMap.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.data.setupActiveMap.offsetTop <= window.data.BORDER_Y_MIN - window.data.pinMainHeightActive) {
        window.data.setupActiveMap.style.top = Math.round(window.data.BORDER_Y_MIN - window.data.pinMainHeightActive) + 'px';
      } else if (window.data.setupActiveMap.offsetLeft <= 0) {
        window.data.setupActiveMap.style.left = Math.round(0 - (window.data.pinMainWidth / 2)) + 'px';
      } else if (window.data.setupActiveMap.offsetLeft >= window.data.randomWidth - window.data.pinMainWidth / 2) {
        window.data.setupActiveMap.style.left = Math.round(window.data.randomWidth - (window.data.pinMainWidth / 2)) + 'px';
      } else if (window.data.setupActiveMap.offsetTop >= window.data.BORDER_Y_MAX - window.data.pinMainHeightActive) {
        window.data.setupActiveMap.style.top = Math.round(window.data.BORDER_Y_MAX - window.data.pinMainHeightActive) + 'px';
      }

      window.data.setupActiveMap.style.top = (window.data.setupActiveMap.offsetTop - shift.y) + 'px';
      window.data.setupActiveMap.style.left = (window.data.setupActiveMap.offsetLeft - shift.x) + 'px';
      window.data.setupAddress.value = window.map.getPinMainCoordinate();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.data.setupAddress.value = window.map.getPinMainCoordinate();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

