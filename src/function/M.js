import { generator } from './generator'

/**
 * 中间件函数
 * @param {<Function>Array} functions
 */
export function M (functions) {
  const init = () => {
    const iter = generator(functions);

    nextDo(iter);
  }

  function* generator(functions) {
    for (const item of functions) {
      yield item;
    }
  }

  function nextDo(iter) {
    const { done, value } = iter.next();

    if (done) {
      return;
    }
    // vlaue中的参数是next，也就是下一个待执行的函数
    value && value(() => nextDo(iter));
  }

  init();
};

function test1(next) {
  console.log(1);
  next();
}

function test2(next) {
  console.log(2);
  next();
}

function test3(next) {
  console.log(3, this);
  next();
}

var array = [test1, test2, test3.bind({})];
