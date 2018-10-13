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
    window.alert('页面错误:' + msg);
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

  addTraderId : function( id ) {
    if ( !id ) {
      return;
    }

    // 这里要判断这个参数是否有userId了

    var href = window.location.href + '',
        search, hash,link, list = [], i, s,
        result = '', k, v;

    if ( href.indexOf( 'userId' ) < 0 ) {
      href = href.indexOf('?') > 0 ? href : href + '?';
      setTimeout( function() {
        window.history.replaceState( null, null, href + '&userId=' + id );
      }, 10 );
      return;
    }
    search = href.split( '#' ); 
    hash = search[1] || '';
    search = search[0] || '';
    search = search.split( '?' );
    link = search[0] || '';
    search = search[1] || '';

    search = search.split( '&' );
    for ( i = 0; s = search[i]; ++i ) {
      s = s.split( '=' );
      if ( s[0] == 'userId' && ( s[1] + '' ) != ( id + '' )  ) {
        list.push( s[0] + '=' + id );
      } else {
        list.push( s[0] + '=' + s[1] );
      }
    }

    link = link + '?' + list.join( '&' );
    link = hash ? link + '#' + hash : link;
    if ( link == href ) {
      return;
    }
    setTimeout( function() {
      window.history.replaceState( null, null, link );
    }, 10 );
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
