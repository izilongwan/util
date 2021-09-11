export function myCall (fn, ctx, args) {
  ctx = ctx ? Object(ctx) : window;

  var len    = args.length,
      param  = [],
      random = Math.random();

  for (var i = 0; i < len; i++) {
    param.push('args[' + i + ']');
  }

  ctx[random] = fn;

  var res = eval('ctx[random](' + param + ')');

  delete ctx[random];

  return res;
}