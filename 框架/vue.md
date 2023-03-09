## option api 和 composition api

option api 选项式 api

一个组件的状态 可能需要定义 data methods computed watch 才能实现我们想要的效果
如果组件复杂 那么 对应的属性列表会很长 我们可能想查看一个逻辑 要看几个地方 才能完全梳理出来，
组件会变得难以阅读和理解 不是很清晰

Composition Api 组合式 api

组件根据逻辑功能来组织 一个功能所定义的 api 都会放在一起 高内聚 低耦合

从逻辑组织的角度上看 组合式 api 也具有明显的优势 查看一个功能只需要看一个函数即可 而不用像 选项式 api 跳转不同的模块
从逻辑复用的角度来蓝 选项式 api 是用 mixin 方式复用 这个有明显的缺点 如果混入了多个 mixins 命名冲突 数据来源不清晰问题 都是缺点
而组合式 api 在组件复用上就比较清晰 不会有命名冲突和数据来源不清晰问题

小结

1. 在逻辑组织和逻辑复用方面，Composition API 是优于 Options API
2. 因为 Composition API 几乎是函数，会有更好的类型推断。
3. Composition API 对 tree-shaking 友好，代码也更容易压缩
4. Composition API 中见不到 this 的使用，减少了 this 指向不明的情况
5. 如果是小型组件，可以继续使用 Options API，也是十分友好的

## vue2 响应式 和 vue3 响应式区别

vue2 是采用 object.defineProperty

vue2 在初始化的时候会对 data 进行属性全部遍历，并且使用 object.defineProperty 全部转化成 getter/setter 这样当追踪数据变化的时候 setter 就会被调用 访问属性时触发 getter

object.defineProperty 缺陷是 添加或者删除对象属性的时候 vue 检测不到 因为添加或者删除的属性没有在 初始化的时候进行响应式处理，需要调用$set 来调用 object.defineProperty 使其具备响应式

无法监控数组长度和下标变化

而且如果嵌套过深 那么深层次的监听 性能也不是很好

vue3 是用 ES6 语法 Proxy

Proxy 在阮一峰的一书中 大意是 Proxy 可以理解为，在目标对象之前拦截，外界所有对对象的访问都必须经过这层拦截，所以提供了一层机制，所有对对象的访问都可以改写和过滤 所以 Proxy 可以称为代理器

所以 Proxy 相比 object.defineProperty 优势 则是

1. 不需要 $set $delete 去触发响应式
2. 可以全方位的检测数组的变化
3. 并且还支持 Map Set 等数据

唯一的缺点 Proxy 不兼容 IE 没有 polyfill

## 插槽

插槽本质上就是是 在父组件中引用子组件的中间 插入 自己当前组件想在 子组件中特定位置的 内容

例如

```js
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>

// FancyButton 组件模版
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>
```
