let handle;

handle = {
  isErrorRes: function (res) {
    if (!res || !res.success || res.code != '0000') {
      return true;
    }
    return false;
  },

  // 便于后面替换
  showError: function (msg) {
    console.error('页面错误:' + msg);
  },

  fixPrice: function (s) {
    s = s * 1 / 100;
    s = s + '';
    if (/[^0-9\.]/.test(s)) return "invalid value";
    s = s.replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;
    while (re.test(s))
      s = s.replace(re, "$1,$2");
    s = s.replace(/,(\d\d)$/, ".$1");
    return s.replace(/^\./, "0.")
  },
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  formatDateTime (inputTime, type) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    if (type == 'md') {
      return m + '-' + d;
    }  else {
      return {
        year: y,
        month: m,
        day: d,
        hour:h,
        minute: minute,
        second: second,
      }
    }
  }
}

export default handle;
