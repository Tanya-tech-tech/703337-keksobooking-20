'use strict';

(function () {
  var common = window.data;
  var map = window.data.setupActiveMap;
  var style = window.data.setupActiveMap.style;

  map.addEventListener('mousedown', function (evt) {
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

      if (map.offsetTop <= common.BORDER_Y_MIN - common.pinMainHeightActive) {
        style.top = Math.round(common.BORDER_Y_MIN - common.pinMainHeightActive) + 'px';
      } else if (map.offsetLeft <= 0) {
        style.left = Math.round(0 - (common.pinMainWidth / 2)) + 'px';
      } else if (map.offsetLeft >= common.randomWidth - common.pinMainWidth / 2) {
        style.left = Math.round(common.randomWidth - (common.pinMainWidth / 2)) + 'px';
      } else if (map.offsetTop >= common.BORDER_Y_MAX - common.pinMainHeightActive) {
        style.top = Math.round(common.BORDER_Y_MAX - common.pinMainHeightActive) + 'px';
      }

      style.top = (map.offsetTop - shift.y) + 'px';
      style.left = (map.offsetLeft - shift.x) + 'px';
      common.setupAddress.value = window.map.getPinMainCoordinate();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      common.setupAddress.value = window.map.getPinMainCoordinate();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

