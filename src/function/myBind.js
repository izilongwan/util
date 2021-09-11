export function myBind (fn, ctx) {
  ctx = ctx ? Object(ctx) : window;

  var self = fn;

  var func = function () {
    return self.myApply(this instanceof func ? this : ctx, [].slice.call(arguments));
  }

  function Buffer() {}

  Buffer.prototype = fn.prototype;
  func.prototype = new Buffer();

  return func;
}