# vue-fx

[![NPM version](https://img.shields.io/npm/v/vue-fx.svg?style=flat-square)](https://npmjs.com/package/vue-fx)

针对 Vue.js 应用的 [360 分析](https://fenxi.360.cn/login/present)插件。

## 代码安装

```bash
yarn add vue-fx
# 或
npm install vue-fx --save
```

## 使用方法

### Vue-Router

如果项目使用了 [Vue-Router](https://router.vuejs.org/zh-cn)，请按照如下代码配置：

```js
// ./router/index.js
import VueRouter from 'vue-router'
import fenxi from 'vue-fx'

Vue.use(VueRouter)
const router = new VueRouter()

// domainId 是站点 id
// 可以通过“站点管理 => 获取代码” 找到
fenxi(router, domainId)

export default router
```

### 非 Vue-Router

如果不是 Vue 项目，或没有使用 Vue-Router，则可以按照如下示例引入（请按照项目实际情况处理）：

```js
import fenxi from 'vue-fx'

fenxi(
  function (collect) {
    window.onhashchange = () => {
      collect(location.pathname + location.hash)
    }
  },
  domainId
)
```

Inspired by [vue-ga](https://github.com/egoist/vue-ga/).
