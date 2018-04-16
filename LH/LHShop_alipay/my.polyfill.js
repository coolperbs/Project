// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', { 
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    }
  });
}

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, 'endsWith', {
    value: function (search, this_len) {
      if (this_len === undefined || this_len > this.length) {
        this_len = this.length;
      }
      return this.substring(this_len - search.length, this_len) === search;
    }
  })
}

if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, 'startsWith', {
    value: function (search, pos) {
      return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
    }
  })
}
function noop() {}

function paramsMap(options) {
  var maps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var params = {};

  for (var key in options) {
    var myKey = maps.hasOwnProperty(key) ? maps[key] : key;
    params[myKey] = options[key];
  }

  return params;
}

function previewImage(options) {
  var params = paramsMap(options);
  var current = params.current;

  if (current) {
    current = options.urls.indexOf(current);
  }

  if (current === -1 || !current) {
    current = 0;
  }

  params.current = current;

  return params;
}

function makePhoneCall(options) {
  return paramsMap(options, {
    phoneNumber: 'number'
  });
}

function request(options) {
  var params = paramsMap(options, {
    header: 'headers'
  });
  var success = params.success || noop;

  params.success = function (res) {
    var result = paramsMap(res, {
      headers: 'header',
      status: 'statusCode'
    });

    success(result);
  };

  return params;
}

function getSystemInfo(options) {
  var params = paramsMap(options);
  var success = params.success || noop;

  params.success = function (res) {
    success(getSystemInfoSync(res));
  };

  return params;
}

function getSystemInfoSync(res) {
  res.system = res.platform + " " + res.system;

  if (!res.windowHeight) {
    res.windowHeight = parseInt(res.screenHeight * res.windowWidth / res.screenWidth, 10) - 40;
  }

  return res;
}

function showModal(options) {
  var params = paramsMap(options);
  var showCancel = params.showCancel;

  if (typeof showCancel === 'undefined') {
    showCancel = true;
  }

  if (showCancel) {
    params.confirmButtonText = params.confirmText||'确定';
    params.cancelButtonText = params.cancelText||'取消';
  } else {
    params.buttonText = params.confirmText||'确定';
  }

  my[showCancel ? 'confirm' : 'alert'](params);
}

function showToast(options) {
  var params = paramsMap(options, {
    title: 'content',
    icon: 'type'
  });

  return params;
}

function showActionSheet(options) {
  var params = paramsMap(options, {
    itemList: 'items'
  });

  var success = params.success || noop;
  var fail = params.fail || noop;

  params.success = function (_ref) {
    var tapIndex = _ref.index;

    if (tapIndex === -1) {
      fail({
        errMsg: 'showActionSheet:fail cancel'
      });
    } else {
      success({
        tapIndex: tapIndex
      });
    }
  };

  return params;
}

module.exports = {
  previewImage: previewImage,
  makePhoneCall: makePhoneCall,
  request: request,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfoSync,
  showModal: showModal,
  showToast: showToast,
  showActionSheet: showActionSheet
};