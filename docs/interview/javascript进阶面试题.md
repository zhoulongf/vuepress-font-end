<!--
 * @Author: zhoulf
 * @FilePath: /vuepress-font-end/docs/interview/javascript进阶面试题.md
 * @Date: 2022-02-24 14:32:54
 * @LastEditors: zhoulf
 * @LastEditTime: 2022-02-24 14:42:26
 * @Description: 
-->
## 手写getQueryString
::: tip
给定一段URL和参数的名称，获取此参数的值
:::
```js
var url = 'https://www.baidu.com/s?id=123&name=why&phone=13876769797';
function getQueryString(name) {
  var strs = '';
  var index = url.indexOf('?');
  if (index === -1) {
    return undefined
  }
  strs = url.substring(index+1).split('&');
  for (let index = 0; index < strs.length; index++) {
    var splitItem = strs[index].split('=');
    if(splitItem[0]==name) {
      return splitItem[1];
    }
  }
};

// 测试：输出why
console.log(getQueryString('name')); 
```

## 手写自己的setInterval
::: tip
用`requestAnimationFrame`实现自己的`setInterval`方法
:::
```js
const obj = {
  timer: null,
  setInterval: function (callback, interval) {
    const now = Date.now
    let startTime = now()
    let endTime = startTime
    const self = this
    const loop = function () {
      self.timer = requestAnimationFrame(loop)
      endTime = now()
      if (endTime - startTime >= interval) {
        startTime = endTime = now()
        callback && callback()
      }
    }
    this.timer = requestAnimationFrame(loop)
    return this.timer
  },
  clearInterval: function () {
    cancelAnimationFrame(this.timer)
  }
}
let count = 0
const timer = obj.setInterval(() => {
  console.log('interval...')
  count++
  if (count >= 3) {
    obj.clearInterval()
  } 
}, 500)
```

## 手写call、apply和bind方法
### 手写Call
```js
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('not a function')
  }
  const symbolFn = Symbol()
  const args = [...arguments].slice(1)
  context = context || window
  context[symbolFn] = this
  const result = context[symbolFn](...args)
  delete context[symbolFn]
  return result
}
const obj = {
  name: 'obj'
}
function foo () {
  console.log(this.name)
}
foo.myCall(obj) // obj
```

### 手写apply
```js
Function.prototype.myApply = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('error');
  }
  context = context || window;
  context.fn = this;
  var result = arguments[1] ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return result;
}
function foo(){
  console.log(this.age);
}
var obj = {
  age: 101
}
foo.myApply(obj); // 输出101
```

### 手写bind
```js
Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {
    throw TypeError('error');
  }
  const self = this;
  const args = [...arguments].slice(1);
  return function F() {
    if(this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, args.concat(...arguments));
  }
}
function foo() {
  console.log(this.age);
}
var obj = {
  age: 121
}
var newFunc = foo.myBind(obj);
newFunc(); // 输出121
```

## 手写Promise
**简易Promise：** 简易`Promise`并不完全符合`Promise/A+`规范，但面试时能写出简易`Promise`算是已经过关了。
```js
// promise三个状态：pending(等待)、resolved(完成)、rejected(拒绝)
const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';
// 简易Promise
function MyPromise(fn) {
  const self = this;
  self.state = PENDING;
  self.value = null;
  self.resolvedCallbacks = [];
  self.rejectedCallbacks = [];
  // 完成方法
  function resolve(value) {
    if(self.state===PENDING) {
      self.state = RESOLVED;
      self.value = value;
      self.resolvedCallbacks.map(cb => cb(self.value));
    }
  }
  // 拒绝方法
  function reject(value) {
    if(self.state === PENDING) {
      self.state = REJECTED;
      self.value = value;
      self.rejectedCallbacks.map(cb => cb(self.value));
    }
  }
  // 执行传入的方法
  try {
    fn(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
// then方法
MyPromise.prototype.then = function(success, error) {
  const self = this;
  success = typeof success === 'function' ? success : v => {
    return v;
  };
  error = typeof error === 'function' ? error : r => {
    throw r;
  };
  if(self.state === PENDING) {
    self.resolvedCallbacks.push(success);
    self.rejectedCallbacks.push(error);
  }
  if(self.state === RESOLVED) {
    success(self.value);
  }
  if(self.state === REJECTED) {
    error(self.value)
  }
}
// 执行自定义Promise
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(100);
  }, 3000)
}).then(value => {
  console.log(value);
}, error => {
  console.log(error);
})
```


## 手写函数节流
::: tip
函数节流：将原本1秒可能执行10次的函数，节流成1秒只执行2次-3次，有许多函数需要节流，例如：<br/>
1. `window.onresize`事件
2. `mouseover`事件
3. `scroll`事件
4. 其他事件
:::
```js
function throttle (fn, interval = 500) {
  let timer = null
  let firstTime = true
  return function () {
    const args = arguments
    const self = this
    if (firstTime) {
      fn.apply(self, args)
      firstTime = false
      return false
    }
    if (timer) {
      return false
    }
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
      fn.apply(self, args)
    }, interval)
  }
}
// 运用
window.onresize = throttle(function() {
  console.log('window onresize');
}, 500)
```

## 手写函数防抖
::: tip
函数防抖：函数防抖的核心思路是利用`setTimeout`延迟执行某个方法，只有在指定的事件后才执行，中间触发的事件不执行。最常见的函数防抖就是，搜索框只有用户在输入完毕后才去服务器执行查询。
:::
```js
function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    if(timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(context, ...arguments);
    }, delay || 500);
  }
}
window.onresize = debounce(function() {
  console.log('window onresize end');
}, 500)
```

## 手写instanceof
::: tip
`instanceof`原理是在对象原型链中是否能找到执行类型的`prototype`
:::
```js
function myInstanceOf (left, right) {
  if (typeof left !== 'object') {
    return false
  }
  while(true) {
    if (left === null) {
      return false
    }
    if (left.__proto__ === right.prototype) {
      return true
    }
    left = left.__proto__
  }
}
function Person (name) {
  this.name = name
}
const p1 = new Person('AAA')
console.log(myInstanceOf(p1, Person)) // true
console.log(myInstanceOf(p1, Object)) // true
console.log(p1 instanceof Person)     // true
console.log(p1 instanceof Object)     // true
```

## 手写简易深拷贝
::: tip
案例只实现了简易的深拷贝函数，工作中推荐使用`lodash`的深拷贝方法。
:::
```js
function isObject (obj) {
  return (typeof obj === 'object') && obj !== null
}
function deepClone (obj) {
  if (!isObject(obj)) {
    return
  }
  const isArray = Array.isArray(obj)
  const newObj = isArray ? [] : {}
  Reflect.ownKeys(obj).forEach(key => {
    const value = obj[key]
    newObj[key] = isObject(value) ? deepClone(value) : value
  })
  return newObj
}
const obj = {
  id: Symbol('id'),
  name: 'AAA',
  age: 23,
  colors: ['red'],
  job: {
    name: 'FE',
    salary: 200
  },
  sayName: function () {
    console.log('funciton')
  }
}
const cloneObj = deepClone(obj)
console.log(cloneObj.id)
console.log(cloneObj.colors, obj.colors)
console.log(cloneObj.job, obj.job)
obj.job.name = 'UI'
obj.job.salary = 300
obj.colors.push('green')
obj.sayName()
console.log(cloneObj.colors, obj.colors)
console.log(cloneObj.job, obj.job)
cloneObj.sayName()
```

## 手写对象属性值迭代器
::: tip
自定义对象属性值迭代器，使之能使用`for of`循环遍历对象属性的值
:::
```js
var obj = {
  name: 'AAA',
  age: 23,
  address: '广州'
}
Object.defineProperty(obj, Symbol.iterator, {
  writable: false,
  enumerable: false,
  configurable: true,
  value: function() {
    var self = this;
    var index = 0;
    var keys = Object.keys(self);
    return {
      next: function() {
        return {
          done: index >= keys.length,
          value: self[keys[index++]]
        }
      }
    }
  }
})
for (const val of obj) {
  console.log(`属性值为：${val}`);
}
```

## 手写图片懒加载
::: tip
图片懒加载是一种常用的技术，如果直接给某个img标签设置src属性，由于图片过大或者网络不佳，图片的位置会出现一片空白，图片懒加载就是使用一个`loading`图片来进行站位，等真正的图片加载完毕后再显示出来。
:::

### 不使用代理模式实现图片懒加载
```js
const loadingSrc = 'https://www.imooc.com/static/img/index/logo2020.png'
const imgSrc = 'https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg'
const myImage = (function () {
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  const img = new Image()
  img.onload = function () {
    imgNode.src = img.src
  }
  return {
    setSrc: function (src) {
      imgNode.src = loadingSrc
      img.src = src
    }
  }
})()
myImage.setSrc(imgSrc)
```

### 使用代理模式实现图片懒加载
```js
const loadingSrc = 'https://www.imooc.com/static/img/index/logo2020.png'
const imgSrc = 'https://img1.sycdn.imooc.com/5c09123400014ba418720632.jpg'
const myImage = (function(){
  const imgNode = document.createElement('img')
  document.body.appendChild(imgNode)
  return {
    setSrc: function (src) {
      imgNode.src = src
    }
  }
})()
const proxyImage = (function(){
  const img = new Image()
  img.onload = function () {
    myImage.setSrc(img.src)
  }
  return {
    setSrc: function (src) {
      myImage.setSrc(loadingSrc)
      img.src = src
    }
  }
})()
proxyImage.setSrc(imgSrc)
```

## 手写事件委托
::: tip 题目
循环创建10个li标签，当点击li标签时，打印其对应的索引
:::
```html
<ul id="list"></ul>
```
```js
function loadNode(len) {
  var html = '';
  for (let index = 0; index < 10; index++) {
    html += '<li>'+index+'</li>';
  }
  var list = document.getElementById('list');
  list.onclick = function(event) {
    event = event || window.event;
    var target = event.target || event.srcElement;
    if(target.nodeName.toLowerCase() === 'li') {
      console.log(target.innerText);
    }
  }
  list.innerHTML = html;
}
loadNode();
```

## 手写原生Ajax请求
::: tip 原生ajax步骤
1. 创建`XMLHttpRequest`对象
2. 使用`open`方法设置和服务器的交互信息
3. 使用`send`发送数据
4. 注册事件
:::

### get请求
```js
var xhr = new XMLHttpRequest();
xhr.open('get','https://www.baidu.com/getUserInfo?name=AAA&age=18');
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState ==4 && xhr.status==200) {
    console.log('请求成功');
  }
}
```
### post请求
```js
var xhr = new XMLHttpRequest();
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
xhr.open('post','https://www.baidu.com/getUserInfo');
xhr.send('name=AAA&age=18');
xhr.onreadystatechange = function() {
  if(xhr.readyState ==4 && xhr.status==200) {
    console.log('请求成功');
  }
}
```

## 手写函数AOP
::: tip
AOP(面向切面编程)的主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些跟业务逻辑无关的功能通常包括日志统计，安全控制，异常处理等。把这些功能抽离出来后，再通过动态织入的方式掺入业务逻辑模块中
:::
```js
Function.prototype.before = function (beforeFn) {
  const self = this
  return function beforeFunc () {
    const args = arguments
    beforeFn.apply(this, args)
    return self.apply(this, args)
  }
}
Function.prototype.after = function (afterFn) {
  const self = this
  return function afterFunc () {
    const args = arguments
    const result = self.apply(this, args)
    afterFn.apply(this, args)
    return result
  }
}
function func () {
  console.log('2')
}
const newFunc = func.before(() => {
  console.log('1')
}).after(() => {
  console.log('3')
})
newFunc() // 1 2 3
```

## 手写柯里化
**柯里化**：又称部分求值，一个柯里化参数首先会接受一些参数，接受这些参数之后，该函数并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来，待到合适的时机一起求值。<br>
```js
// 通用的柯里化
var currying = function(fn) {
  var args = [];
  return function() {
    if(arguments.length==0) {
      return fn.apply(this,args);
    } else {
      Array.prototype.push.apply(args,arguments);
      return arguments.callee;
    }
  }
}

var cost = (function(){
  var money = 0;
  return function() {
    for(var i = 0,len = arguments.length;i<len;i++) {
      money +=arguments[i];
    }
    return money;
  }
})()
var cost = currying(cost);
cost(100);
cost(200);
cost(20);
cost(10);
console.log(cost()); // 输出330
```

## 手写分时函数
::: tip
分时函数案例：把1秒创建1000个DOM节点，改成每隔200毫秒创建10个节点，这样不用短时间在页面中创建大量的DOM。
:::
```js
var timeChunk = function(arr,fn,count,interval) {
  var timer = null;
  var data = null;
  var start = function() {
    for(var i = 0 ; i < Math.min(count || 1 , arr.length) ; i++) {
      fn(arr.shift());
    }
  }
  return function() {
    timer = setInterval(function(){
      if(arr.length == 0) {
        clearInterval(timer);
        timer = null;
        return;
      }
      start();
    }, interval || 200)
  }
}

var arr = [];
for(var i = 0 ; i < 1000 ; i++) {
  arr.push(i);
}

var renderDOMList = timeChunk(arr, function(data) {
  var div = document.createElement('div');
  div.innerHTML = data;
  document.body.appendChild(div);
},10,200);
renderDOMList();
```


## 手写JSONP
::: tip 原理
JSONP实现跨域的原理是利用`script`标签没有跨域限制，通过`src`指向一个`ajax`的URL，最后跟一个回调函数`callback`
:::
```js
function JSONP (url, data, callback) {
  const cbName = 'callback_' + new Date().getTime()
  const queryString = normalizeParams(data)
  const hasIndex = url.indexOf('?') !== -1
  url = `${hasIndex ? url : url + '?'}${queryString}&jsoncallback=${cbName}`
  const script = document.createElement('script')
  script.src = url
  window[cbName] = function (data) {
    callback(data)
    document.body.removeChild(script)
  }
  document.body.appendChild(script)
}
function normalizeParams (data) {
  if (!data || Object.keys(data).length === 0) {
    return ''
  }
  return Object.keys(data).map((key, index) => {
    return `${index ? '&' : ''}${key}=${data[key]}`
  })
}
const params = {
  name: 'AAA',
  age: 23,
  address: '广东'
}
JSONP('https://www.runoob.com/try/ajax/jsonp.php', params, function (data) {
  console.log(data)
})
```

## 手写new关键词方法
`new`关键词调用构造函数的过程如下：
1. 创建一个空对象，这个对象讲会作为执行构造函数执行之后返回对象的实例。
2. 将空对象的`__proto__`指向构造函数的`prototype`。
3. 将这个空对象赋值给构造函数内部的`this`，并执行构造函数。
4. 根据构造函数的逻辑，返回第一步创建的对象或者构造函数显示的返回值。
```js
function myNew (...args) {
  // 1.获取构造函数
  const constructor = args.shift()
  // 2.创建空对象并设置原型
  const obj = Object.create(constructor.prototype)
  // 3.绑定this并执行构造函数
  const result = constructor.apply(obj, args)
  // 4.返回构造函数显示返回的值或新对象
  return isObject(result) ? result : obj
}
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}
// 案例一
function Person (name) {
  this.name = name
}
const p1 = myNew(Person, 'AAA')
console.log(p1 instanceof Person)   // true
console.log(p1.name)                // AAA

// 案例二
function Student (name) {
  this.name = name
  return {
    name: 'AAA',
    age: 23
  }
}
const stu = myNew(Student, 'BBB')
console.log(stu instanceof Student) // false
console.log(stu) 
```

## 手写类extends关键词方法
```js
function inherit (child, parent) {
  // 1.继承父类原型上的属性
  child.prototype = Object.create(parent.prototype)
  // 2.修复子类的构造函数
  child.prototype.constructor = child
  // 3.存储父类
  child.super = parent
  // 4.继承静态属性
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(child, parent)
  } else if (child.__proto__) {
    child.__proto__ = parent
  } else {
    for (const key in parent) {
      if (parent.hasOwnProperty(k) && !(k in child)) {
        child[key] = parent[key]
      }
    }
  }
}
// 父类
function Parent (name) {
  this.name = name
  this.parentColors = ['red']
}
Parent.prototype.sayName = function () {
  console.log(this.name)
}
Parent.create = function (name) {
  return new Parent(name)
}
// 子类
function Child (name) {
  this.name = name
  this.childColors = ['green']
}
// 继承
inherit(Child, Parent)

// test
const child1 = new Child('child1')
console.log(child1 instanceof Child)  // true
console.log(child1 instanceof Parent) // true
console.log(child1.name)              // child1
console.log(child1.childColors)       // ['green']
console.log(child1.parentColors)      // undefined

const child2 = Child.create('child2')
console.log(child2 instanceof Child)  // false
console.log(child2 instanceof Parent) // true
console.log(child2.name)              // child2
console.log(child2.childColors)       // undefined
console.log(child2.parentColors)      // ['red']
```

## 手写Object.create方法
```js
function create (obj, properties) {
  const strType = typeof obj
  const isObject = strType === 'object' || strType === 'function'
  const isUndefined = strType === 'undefined'
  if (isUndefined || !isObject) {
    throw new TypeError('Object prototype may only be an Object or null')
  }
  // 设置原型
  function F () {}
  F.prototype = obj
  const ret = new F()
  // 兼容第二个参数
  if (properties !== null && properties !== undefined) {
    Object.defineProperties(ret, properties)
  }
  // 兼容null
  if (obj === null) {
    ret.__proto__ = null
  }
  return ret
}
const obj = {
  age: 23,
  name: 'AAA'
}
const myObj1 = create(obj, {
  address: {
    value: '广东'
  }
})
const originObj1 = Object.create(obj, {
  address: {
    value: '广东'
  }
})
console.log(myObj1.name)        // 23
console.log(myObj1.address)     // 广东
console.log(originObj1.name)    // 23
console.log(originObj1.address) // 广东

const myObj2 = create(null)
const originObj2 = Object.create(null)
console.log('toString' in myObj2)     // false
console.log('toString' in originObj2) // false
```

## 手写数组降维flat方法
原生`Array.prototype.flat`方法接受一个`depth`参数，默认值为`1`，`depth`表示要降维的维数：
```js
const arr = [1, [2, 3], [4, [5, 6]]]
console.log(arr.flat(1))         // [1, 2, 3, 4, [5, 6]]
console.log(arr.flat(Infinity))  // [1, 2, 3, 4, 5, 6]
```

### reduce + 递归实现方案
```js
// MDN: 可查看更多flat实现方法
function flat (arr = [], depth = 1) {
  if (arr.length === 0) {
    return []
  }
  let result = []
  if (depth > 0) {
    result = arr.reduce((acc, val) => {
      return acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val)
    }, [])
  } else {
    result = arr.slice()
  }
  return result
}
const arr = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]
const myResult1 = flat(arr, 1)
const originResult1 = arr.flat(1)
const myResult2 = flat(arr, Infinity)
const originResult2 = arr.flat(Infinity)
console.log(myResult1)      // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(originResult1)  // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(myResult2 )     // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
console.log(originResult2 ) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

### forEach + 递归实现方案
```js
// MDN: 可查看更多flat实现方法
function flat (arr = [], depth = 1) {
  if (arr.length === 0) {
    return []
  }
  const result = [];
  // 注意：立即执行函书前的语句必须要有分号
  (function flatFunc(arr, depth) {
    arr.forEach(item => {
      if (Array.isArray(item) && depth > 0) {
        flatFunc(item, depth - 1)
      } else {
        result.push(item)
      }
    })
  })(arr, depth)
  return result
}
const arr = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]
const myResult1 = flat(arr, 1)
const originResult1 = arr.flat(1)
const myResult2 = flat(arr, Infinity)
const originResult2 = arr.flat(Infinity)
console.log(myResult1)      // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(originResult1)  // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(myResult2 )     // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
console.log(originResult2 ) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

### generator方案
```js
// MDN: 可查看更多flat实现方法
function * flat (arr = [], depth = 1) {
  if (arr.length === 0) {
    return []
  }
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      yield * flat(item, depth - 1)
    } else {
      yield item
    }
  }
}
const arr = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]
const myResult1 = [...flat(arr, 1)]
const originResult1 = arr.flat(1)
const myResult2 = [...flat(arr, Infinity)]
const originResult2 = arr.flat(Infinity)
console.log(myResult1)      // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(originResult1)  // [1, 2, 3, 1, 2, 3, 4, [2, 3, 4]]
console.log(myResult2 )     // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
console.log(originResult2 ) // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

## 手写数组map方法
`map`方法接受两个参数，其中第二个参数为`callback`回调函数执行时的`this`。

### while循环方案
```js
// MDN: Array.prototype.map
Array.prototype.myMap = function (callback, context) {
  if (this === null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }
  let arr = Object(this)
  let thisArg = arguments.length > 1 ? arguments[1] : undefined
  const len = arr.length >>> 0
  let result = new Array(len)
  let index = 0
  while (index < len) {
    let value, mapValue
    if (index in arr) {
      value = arr[index]
      mapValue = callback.call(this.thisArg, value, index, arr)
      result[index] = mapValue
    }
    index++
  }
  return result
}
const arr = [1, 2, 3, , 4]
const myResult = arr.myMap(value => value + 1)
const originResult = arr.map(value => value + 1)
console.log(myResult)     // [2, 3, 4, empty, 5]
console.log(originResult) // [2, 3, 4, empty, 5]
```

### reduce方案
```js
// MDN: Array.prototype.reduce
Array.prototype.myMap = function (callback, context) {
  return this.reduce((acc, cur, index, array) => {
    acc[index] = callback.call(context, cur, index, array)
    return acc
  }, [])
}
const arr = [1, 2, 3, , 4]
const myResult = arr.myMap(value => value + 1)
const originResult = arr.map(value => value + 1)
console.log(myResult)     // [2, 3, 4, empty, 5]
console.log(originResult) // [2, 3, 4, empty, 5]
```

## 手写数组reduce方法
此小节先介绍`reduce`方法的实现，再介绍基于`reduce`方法的两个经典案例。
#### reduce实现
```js
// MDN: Array.prototype.reduce
Array.prototype.myReduce = function (callback, initialValue) {
  if (this === null) {
    throw new TypeError('Array.prototype.reduce called on null or undefined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} is not a function`)
  }
  const array = Object(this)
  const len = array.length >>> 0
  let index = 0
  let result
  // 处理初始值
  if (arguments.length > 1) {
    result = initialValue
  } else {
    // example: [,,,,5]
    while(index < len && !(index in array)) {
      index++
    }
    if (index >= len) {
      throw new TypeError('Reduce of empty array with no initial value')
    }
    value = array[index++]
  }
  while (index < len) {
    if (index in array) {
      result = callback(result, array[index], index, array)
    }
    index++
  }
  return result
}
const array = [1, , 2, 3, , , 5]
const myResult = array.myReduce((acc, cur) => acc + cur, 0)
const originResult = array.reduce((acc, cur) => acc + cur, 0)
console.log(myResult)     // 11
console.log(originResult) // 11
```

### 基于reduce顺序执行promise
```js
function p1 (val) {
  return new Promise(resolve => {
    resolve(val * 1)
  })
}
function p2 (val) {
  return new Promise(resolve => {
    resolve(val * 2)
  })
}
function p3 (val) {
  return val * 3
}
function runPromiseInSequence (promiseArr, val) {
  return promiseArr.reduce((promiseChain, currentFunc) => {
    return promiseChain.then(currentFunc)
  }, Promise.resolve(val))
}

const promiseArr = [p1, p2, p3]
runPromiseInSequence(promiseArr, 1).then(console.log) // 6
```

### 基于reduce实现管道函数pie
```js
// pie顺序执行每一个参数函数
const pieFunc1 = x => x + 1
const pieFunc2 = x => x + 2
const pieFunc3 = x => x + 3
function pie () {
  const funcArr = [...arguments]
  return function (val) {
    return funcArr.reduce((acc, fn) => {
      acc = fn(acc)
      return acc
    }, val)
  }
}
const func1 = pie(pieFunc1, pieFunc2)
const func2 = pie(pieFunc1, pieFunc3)
console.log(func1(0))   // 3
console.log(func2(10))  // 14
```

## 手写数组去重方法
数组去重有很多种方法，这里只介绍两种：`Set`结构去重和`reduce`方法去重。
```js
// 定义变量
const arr = [1, 2, 3, 1, 3, 4, 5, 4]
let uniqueArray = []

// 1.Set结构去重
uniqueArr = Array.from(new Set(arr))
console.log(uniqueArr) // [1, 2, 3, 4, 5]

// 2.reduce方法去重
function deDuplicationArray (array) {
  if (!array || array.length === 0) {
    return []
  }
  return array.reduce((acc, cur) => {
    if (acc.indexOf(cur) === -1) {
      acc.push(cur)
    }
    return acc
  }, [])
}
uniqueArr = deDuplicationArray(arr)
console.log(uniqueArr) // [1, 2, 3, 4, 5]
```

## 手写基于发布/订阅的事件系统
事件系统包括如下几个方法：
1. `on`监听事件方法。
2. `off`取消监听事件方法。
3. `emit`触发事件方法。
4. `once`绑定一次事件监听方法。
```js
function invokeCallback (callback, context, args) {
  try {
    callback && callback.apply(context, args)
  } catch {
    console.log('invoke callback error')
  }
}
const event = {
  subs: {},
  on: function (event, callback) {
    if (Array.isArray(event)) {
      for (let index = 0; index < event.length; index++) {
        this.on(event[index], callback)
      }
    } else {
      if (!this.subs[event]) {
        this.subs[event] = []
      }
      this.subs[event].push(callback)
    }
  },
  off: function (event, callback) {
    // 1、一个参数都没有，解绑全部
    // 2、只传event，解绑改event所有事件
    // 3、两个参数都传递，只移除指定某一个
    if(!arguments.length) {
      this.subs = Object.create(null)
      return
    }
    if (Array.isArray(event)) {
      for (let index = 0; index < event.length; index++) {
        this.off(event[index], callback)
      }
      return
    }
    const cbs = this.subs[event]
    if (!cbs || cbs.length === 0) {
      return
    }
    if (!callback) {
      this.subs[event] = null
      return
    }
    let cb
    let i = cbs.length
    while(i--) {
      cb = cbs[i]
      if (cb === callback || cb.fn === callback) {
        cbs.splice(i, 1)
        break
      }
    }
  },
  once: function (event, callback) {
    const self = this
    function on () {
      self.off(event, on)
      callback.apply(self, arguments)
    }
    this.on(event, on)
  },
  emit: function (event) {
    const cbs = this.subs[event]
    if (cbs && cbs.length > 0) {
      const args = [...arguments].slice(1)
      for (let index = 0, len = cbs.length; index < len; index++) {
        invokeCallback(cbs[index], this, args)
      }
    }
  }
}
const speakCallback1 = () => {
  console.log('speak callback1')
}
const speakCallback2 = () => {
  console.log('speak callback2')
}
const combineCallback = () => {
  console.log('write or listen callback')
}
const runningCallback1 = (msg) => {
  console.log('running callback1')
}
const runningCallback2 = (msg) => {
  console.log('running callback2')
}
event.on('speak', speakCallback1)
event.on('speak', speakCallback2)
event.on(['write', 'listen'], combineCallback)
event.once('running', runningCallback1)
event.once('running', runningCallback2)

event.emit('speak')   // speak callback1, speak callback2
event.emit('running') // running callback1
event.emit('running') // running callback2
event.emit('write')   // write or listen callback

event.off('speak', speakCallback1)
event.off(['write', 'listen'])
event.emit('speak')   // speak callback2
event.emit('write')   //
event.emit('listen')  // 

event.off()
event.emit('speak')   // 
event.emit('running') //
```

## 手写Vue 数据响应式原理

### Object.defineProperty方案
```js
function observe (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}
function defineReactive (target, key, val) {
  observe(val)
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('get value')
      return val
    },
    set: function (newVal) {
      val = newVal
      console.log('change value')
    }
  })
}
const obj = {
  name: 'AAA',
  age: 23,
  job: {
    name: 'FE',
    salary: 1000
  }
}
observe(obj)
const name = obj.name
obj.name = 'BBB'
const jobName = obj.job.name
obj.job.name = 'fe'
```

### Proxy方案
```js
function observe (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  const handler = {
    get: function (target, key) {
      const val = target[key]
      if (typeof val === 'object' && val !== null) {
        return new Proxy(val, handler)
      }
      console.log('get value')
      return Reflect.get(target, key)
    },
    set: function (target, key, val) {
      console.log('change value')
      return Reflect.set(target, key, val)
    }
  }
  return new Proxy(obj, handler)
}
const obj = {
  name: 'AAA',
  age: 23,
  job: {
    name: 'FE',
    salary: 1000
  }
}
const proxyObj = observe(obj)
const name = proxyObj.name
proxyObj.name = 'BBB'
const jobName = proxyObj.job.name
proxyObj.job.name = 'fe'
```


## 手写Vue nextTick方法
`nextTick`支持两种形式使用方式：
1. 回调函数形式。
2. 如果当前环节支持`Promise`，还支持`Promise.then`的形式。
```js
this.$nextTick(() => {
  // callback形式
})
this.$nextTick().then(() => {
  // Promise.then形式
})
```
基于`Vue`源码，`nextTick`手写代码如下：
```js
let pending = false
let timeFunc
const callbacks = []
function flushCallbacks () {
  pending = false
  const cbs = callbacks.slice()
  callbacks.length = 0
  for (let index = 0, len = cbs.length; index < len; index++) {
    cbs[index]()
  }
}

function invokeCallback (callback, context) {
  try {
    callback.call(context)
  } catch {
    console.log('invoke nextTick callback error')
  }
}

function nextTick (cb, context) {
  context = context || window
  let _resolve
  callbacks.push(() => {
    if (cb) {
      invokeCallback(cb, context)
    } else if (_resolve) {
      _resolve(context)
    }
  })
  if (!pending) {
    pending = true
    timeFunc()
  }
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
function setTimeFunc () {
  if (typeof Promise !== 'undefined') {
    const p = Promise.resolve()
    timeFunc = () => {
      p.then(flushCallbacks)
    }
  } else if (typeof MutationObserver !== 'undefined') {
    let number = 1
    const observer = new MutationObserver(flushCallbacks)
    const textNode = document.createTextNode(String(number))
    observer.observe(textNode, {
      characterData: true
    })
    timeFunc = () => {
      number = (number + 1) % 2
      textNode.data = number
    }
  } else if (typeof setImmediate !== 'undefined') {
    timeFunc = () => {
      setImmediate(flushCallbacks)
    }
  } else {
    timeFunc = () => {
      setTimeout(flushCallbacks, 0)
    }
  }
}
setTimeFunc()

nextTick(() => {
  console.log('nextTick callback')
})
nextTick().then(() => {
  console.log('nextTick promise')
})
```