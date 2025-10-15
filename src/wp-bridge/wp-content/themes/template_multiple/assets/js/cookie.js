(function() {
    /**
     * クッキー操作
     */
    var COOKIECTRL = {
      get: function(name) {
        var cookies = document.cookie.split(';');
        for (var index = 0, length = cookies.length; index < length; index += 1) {
          var temp = cookies[index].replace(/\s/g, '').split('=');
          if (temp[0] === name) {
            return decodeURIComponent(temp[1]);
          }
        }
        return null;
      },
      set: function(name, value, expires, path, domain, secure) {
        var d = document;
        var today = new Date();
        if (expires) {
          expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));
        d.cookie = name + '=' + encodeURIComponent(value) +
          ((expires) ? ';expires=' + expires_date.toUTCString() : '') +
          ((path) ? ';path=' + path : '') +
          ((domain) ? ';domain=' + domain : '') +
          ((secure) ? ';secure' : '');
      },
      del: function(name, path, domain) {
        var d = document;
        if (this.get(name)) {
          d.cookie = name + '=' +
            ((path) ? ';path=' + path : '') +
            ((domain) ? ';domain=' + domain : '') +
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
        }
      }
    };

    var body = document.querySelector('body');
    var wrap = document.querySelector('div[data-gdpr="wrap"]');
    var button = document.querySelector('a[data-gdpr="button"]');
    var COOKIE_NAME = 'dinc_cookieAccepted';
    var GDPR = 'gdpr';

    var getClassList = function() {
      return Array.prototype.slice.call(body.classList);
    };

    if (COOKIECTRL.get(COOKIE_NAME)) {
      // GDPR表示なし
      // GDPRを非表示にする
      wrap.style.display = 'none';
    } else {
      // GDPR表示あり
      // body要素のclass属性値に「gdpr」を付加する
      var classes = getClassList();
      classes.push(GDPR);
      body.className = classes.join(' ');

      // ボタンをクリックされた際の動作
      button.addEventListener('click', function() {
        // body要素のclass属性値から「gdpr」を削除する
        var classes = getClassList();
        body.className = classes.filter(function(className) {
          return className !== GDPR;
        }).join(' ');

        // クッキーにフラグをGDPR非表示フラグを立てる
        COOKIECTRL.set(COOKIE_NAME, 'true', 365, '/');

        // GDPRを非表示にする
        wrap.style.display = 'none';
      });
      wrap.style.display = 'block';
    }
  })();