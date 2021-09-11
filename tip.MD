* let
* 1、同一作用域下不可重复声明
* 2、声明不会被提升，暂时性死区
* 3、只在该作用域下生效


* 箭头函数 =>
* 1、this指向由外层作用域决定，this指向固化
* 2、=> 不能作为构造函数来使用
* 3、没有arguments对象，rest运算符代替
* 4、在generator函数中，yield命令不能生效


* Object.keys() 遍历自身可枚举、非Symbol属性键名，并返回返回一个数组
* Object.values() 遍历自身可枚举、非Symbol属性键值，并返回一个数组
* Object.entries() 遍历自身可枚举、非Symbol属性，并返回一个类数组
* Object.getOwnPropertySymbols() 遍历自身Symbol属性，并返回一个数组
* Object.assign() 合并（浅拷贝）非继承、可枚举的属性（含Symbol属性）
* for in 遍历自身及继承的可枚举、非Symbol属性
* for of 遍历迭代对象
* JSON.stringify() 遍历自身可枚举属性


* 拷贝对象
* 1、深度克隆
* 2、圣杯模式
* 3、JSON.parse/JSON.stringify


* 引起回流的因素：
* 1、DOM节点的增删
* 2、DOM节点位置
* 3、DOM节点的尺寸
* 4、DOM节点的显示与否（display）
* 5、页面初始渲染
* 6、向浏览器请求样式信息（client getComputedStyle currentStyle offset scroll）

