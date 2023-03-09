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
