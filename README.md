# vue-fx

[![NPM version](https://img.shields.io/npm/v/vue-fx.svg?style=flat-square)](https://npmjs.com/package/vue-fx)

针对 Vue.js 应用的 [360 分析](https://fenxi.360.cn/login/present)插件。

## 代码安装

```bash
yarn add vue-fx
# 或
npm install vue-fx --save
```

> :warning: 本模块将根据 domainId 加载统计脚本。使用本模块无需自行安装基础流量代码。

## 使用方法

### Vue-Router

如果项目使用了 [Vue-Router](https://router.vuejs.org/zh-cn)，请按照如下代码配置：

```js
import VueRouter from 'vue-router'
import Vue360Analysis from 'vue-fx'

// ...

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo}
    { path: '/bar', component: Bar},
  ]
})

Vue.use(VueRouter)

// domainId 是站点 id
// 可以通过“站点管理 => 获取代码” 找到
Vue360Analysis(router, domainId)

new Vue({ router }).$mount('#app')
```

#### Demo

- [Vue and VueRouter](https://code.h5jun.com/desax)

### 非 Vue-Router

如果不是 Vue 项目，或没有使用 Vue-Router，则可以按照如下示例引入（请按照项目实际情况处理）：

```js
import Vue360Analysis from 'vue-fx'

Vue360Analysis(
  function (collect) {
    window.onhashchange = () => {
      collect(location.pathname + location.hash)
    }
  },
  domainId
)
```

请根据项目实际情况（使用的框架和路由工具），在相应的位置（钩子/guard/回调/生命周期）调用。

一种简便的方法如下，下面是示意：

```js
const collect = Vue360Analysis(fn => fn, domainId)

// component A
afterRender () {
  collect('/A')
}

// componentB
afterRender () {}
  collect('/B')
}
```

#### DEMO

- [React hash mode](https://code.h5jun.com/tusa/)
- [React Router 2](https://code.h5jun.com/mexi)

---
Inspired by [vue-ga](https://github.com/egoist/vue-ga/).
