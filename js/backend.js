'use strict';
(function () {
  var URLGET = 'https://javascript.pages.academy/keksobooking/data';
  var URLPOST = 'https://javascript.pages.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var makeRequest = function (url, method, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      makeRequest(URLGET, 'GET', onSuccess, onError);
      /*var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = TIMEOUT_IN_MS;
      xhr.open('GET', URLGET);
      xhr.send();*/
    },

    save: function (data, onSuccess, onError) {
      makeRequest(URLPOST, 'POST', onSuccess, onError, data);
    }
  };

})();
