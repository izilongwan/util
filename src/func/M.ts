import { generator } from './generator'

/**
 * 中间件函数
 * @param {<Function>Array} functions
 */
export function M (functions: Function[]) {
  const init = () => {
    const iter = generator(functions);

    nextDo(iter);
  }

  function* generator(functions: Function[]) {
    for (const item of functions) {
      yield item;
    }
  }

  function nextDo(iter: Generator<Function, void, unknown>) {
    const { done, value } = iter.next();

    if (done) {
      return;
    }
    // vlaue中的参数是next，也就是下一个待执行的函数
    value && value(() => nextDo(iter));
  }

  init();
};

function test1(next: Function) {
  console.log(1);
  next();
}

function test2(next: Function) {
  console.log(2);
  next();
}

function test3(this: Object, next: () => void) {
  console.log(3, this);
  next();
}

var array = [test1, test2, test3.bind({})];
