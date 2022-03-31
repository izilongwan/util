/**
 * cookie 写/删/读  操作
 */
export const mCookie = (function (doc) {
  if (!doc) {
    // console.log(`mCookie is not in browser`)
    return {}
  }

  return {
    set: function (key: string, value: string, seconds = -1) {
      doc.cookie = key + '=' + value + ';max-age=' + seconds;
      return this;
    },

    get: function (key: string, cb: Function) {
      var cookies = doc.cookie;

      if (cookies) {
        var cookiesArr = doc.cookie.split('; '),
            arr = [];

        var res = cookiesArr.some((val) => {
          	arr = val.split('=');

          if (arr[0] === key) {
            typeof(cb) === 'function' && cb(arr[1]);
            return true;
          }
        })

        !res && typeof(cb) === 'function' && cb(null);
        return this;
      }
      typeof(cb) === 'function' && cb(null);
      return this;
    },

    delete: function (key: string) {
      this.set(key, '', -1);
      return this;
    }
  }
})(globalThis.document);
