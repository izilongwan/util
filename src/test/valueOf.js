/**
 * 实现a = ? 使a + a.a + a.a.a + ... == 'abc...'
 * valueOf/toString应用
 */
export var valueOf = (function a(values) {
  const key = arguments.callee.name;
  const o = {
    valueOf: myValueOf,
    value: 0
  };

  function myValueOf () {
    return values[o.value++];
  }

  let str = 'o';

  for (let i = 1, len = values.length; i < len; i++) {
    str += '[key]';
    eval('(' + str + '= { valueOf:' + myValueOf + ' })');

    // const obj = eval('(function () { return ' + str + ' = {}})()');
    // obj.valueOf = myValueOf;
  }

  return o;

})('abcdefghijklmn'.split(''))
