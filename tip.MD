## let/const
- 同一作用域下不可重复声明
- 声明不会被提升，暂时性死区
- 只在该作用域下生效
- const 申明时必须赋值，且不可修改

## 箭头函数 =>
- this指向由外层作用域决定，this指向固化
- => 不能作为构造函数来使用
- 没有arguments对象，rest运算符代替
- 在generator函数中，yield命令不能生效

## 遍历
- Object.keys() 遍历自身可枚举、非Symbol属性键名，并返回返回一个数组
- Object.values() 遍历自身可枚举、非Symbol属性键值，并返回一个数组
- Object.entries() 遍历自身可枚举、非Symbol属性，并返回一个类数组
- Object.getOwnPropertySymbols() 遍历自身Symbol属性，并返回一个数组
- Object.assign() 合并（浅拷贝）非继承、可枚举的属性（含Symbol属性）
- for in 遍历自身及继承的可枚举、非Symbol属性
- for of 遍历迭代对象
- JSON.stringify() 遍历自身可枚举属性


## 冻结
- Object.freeze 不可删除、不可新增、不可写
- Object.seal 不可删除、不可新增、可重写原有的属性
- Object.preventExtensons 不可扩展、可修改、可删除

## 拷贝对象
- 深度克隆
- 圣杯模式
- JSON.parse/JSON.stringify

## 引起回流的因素：
- DOM节点的增删
- DOM节点位置
- DOM节点的尺寸
- DOM节点的显示与否（display）
- 页面初始渲染
- 向浏览器请求样式信息（client getComputedStyle currentStyle offset scroll）
