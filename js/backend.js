'use strict';

(function () {
  var TIME_UNIT = ' мс';
  var MAX_TIMEOUT = 3000;
  var TYPE_DATA = 'json';

  var Url = {
    LOAD: 'https://js.dump.academy/kekstagram/data',
    SAVE: 'https://js.dump.academy/kekstagram'
  };

  var MethodHTTP = {
    GET: 'get',
    POST: 'post'
  };

  var HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

  var ErrorMessage = {
    CONNECT: 'Произошла ошибка соединения',
    TIMEOUT: 'Запрос не успел выполниться за ',
    RESPONSE: 'Статус ответа: ',
  };


  var setupXHR = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = TYPE_DATA;

    xhr.timeout = MAX_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === HttpStatus.OK) {
        return onSuccess(xhr.response);
      }
      return onError(ErrorMessage.RESPONSE + xhr.status);
    });

    xhr.addEventListener('error', function () {
      onError(ErrorMessage.CONNECT);
    });

    xhr.addEventListener('timeout', function () {
      onError(ErrorMessage.TIMEOUT + xhr.timeout + TIME_UNIT);
    });

    return xhr;
  };

  var onLoad = function (onSuccess, onError) {
    var xhr = setupXHR(onSuccess, onError);
    xhr.open(MethodHTTP.GET, Url.LOAD);
    xhr.send();
  };

  var onSave = function (onSuccess, onError, data) {
    var xhr = setupXHR(onSuccess, onError);
    xhr.open(MethodHTTP.POST, Url.SAVE);
    xhr.send(data);
  };


  window.backend = {
    load: onLoad,
    save: onSave
  };
})();
