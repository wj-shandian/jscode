## class 组件和函数式组件的区别

- 函数式组件是一个纯函数，没有组件实例，也没有生命周期方法，只能接收 props 作为参数；
- class 组件是一个类，有自己的实例，可以使用 state 和 setState 管理内部状态，也可以使用生命周期方法控制组件的更新和销毁；
- 函数式组件在更新时会重新执行函数，得到返回的 React 元素后就销毁中间变量；class 组件在更新时会重新调用 render 方法，但原来的实例还是原来的实例；
- 函数式组件可以使用 React hooks 功能，实现状态管理、生命周期方法、自定义逻辑等功能；class 组件可以使用更多的 React 特性，如错误边界、静态方法等；
- 函数式组件更符合函数式编程的思想，更简洁、纯粹、易于测试；class 组件更符合面向对象编程的思想，更灵活、丰富、易于扩展。

## 介绍下 hooks

React Hooks 是一种函数，它可以让你在函数组件中 使用 React 的状态和生命周期特性。Hooks 不在类中工作——它们让你在不使用类的情况下使用 React。Hooks 在 React 16.8 版本中被添加，它们允许函数组件访问状态和其他 React 功能。因此，通常不再需要类组件

## diff 算法

## react 渲染优化

## 组件通信

## react-router 原理

## 长列表优化

## react 15 和 16 的区别

react 16 服务器渲染 比 15 快了三倍
react 16 比 15 体积更小一点

react 15 架构分为两层

- Reconciler 协调器 通过 diff 算法 找出变化的 组件 然后交给 渲染器
- Renderer 渲染器 将变化的组件重新渲染

react 15 的更新机制

首先由 Reconciler（协调器）通过 diff 算法计算出需要更新的组件，然后通过 Renderer（渲染器）去执行更新并渲染组件。接着继续由 Reconciler 计算出需要更新的组件，Renderer 继续更新渲染。整个过程是同步的，Reconciler 与 Renderer 交替进行的。并且使用递归实现，所以不可中断。

react 16 架构分为三层

- Scheduler（调度器） 调度任务优先级，使优先级高的任务进入 Reconciler
- Reconciler（协调器） 通过 diff 算法找出变化的组件交给 Renderer 渲染器。
- Renderer（渲染器） 负责将变化的组件重新渲染。

react 16 的更新机制

首先由 Scheduler（调度器）去调度任务的优先级，将优先级比较高的任务加入到 Reconciler（协调器）中。Reconciler（协调器）通过 diff 算法计算出需要更新的组件，并标记更新状态。等整个组件更新完成之后，再通过 Renderer（渲染器）去执行更新并渲染组件。

Reconciler （协调器）是通过可中断的循环去计算出需要更新的组件，并且是等整个组件协调完之后再通过 Renderer 渲染更新

## fiber 原理

## useEffect 和 useLayoutEffect 的区别

## react 事件机制

## 类组件 hoc

## hooks 代码复用的缺点

## shouldcomponentupdate

## useCallback 和 useMemo 底层原理

## 为什么引入 unsafe

## 为什么 commit 阶段不会多次调用

## hooks 使用限制

## redux 中间件原理
